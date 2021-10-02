import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import AxiosMock from 'axios-mock-adapter';
import { Home } from '.';
import { ReactNode } from 'react';
import { api } from '../../services/api';
import { useCart } from '../../hooks/useCart';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

const apiMock = new AxiosMock(api);
const mockedUseCartHook = useCart as jest.Mock;
jest.mock('../../hooks/useCart');

describe('Home Page', () => {
  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [],
    });
  });

  it('should be able to render the books list container', async () => {
    const { getByTestId } = render(<Home />);
    await waitFor(() => {
      apiMock.onGet('/search/prog').reply(200, 
        [
          {
          title: "Java Notes for Professionals",
          subtitle: "Your Guided Tour Through the Programming Jungle",
          isbn13: "1001630936399",
          price: "$0.00",
          image: "https://itbook.store/img/books/1001630936399.png",
          url: "https://itbook.store/books/1001630936399"
        }],
      );
    })
   
      const listItems = getByTestId('list-books')
      expect(listItems).toBeInTheDocument()
  });

  it('should show Loader component when data is fetching', async () => {
    const { getByTestId } = render(<Home />);

    const loader = getByTestId('loader')
    expect(loader).toBeInTheDocument()

    await waitFor(() => {
      apiMock.onGet('/search/prog').reply(200, 
        [
          {
          title: "Java Notes for Professionals",
          subtitle: "Your Guided Tour Through the Programming Jungle",
          isbn13: "1001630936399",
          price: "$0.00",
          image: "https://itbook.store/img/books/1001630936399.png",
          url: "https://itbook.store/books/1001630936399"
        }
      ],
      );
    })
   
    expect(loader).not.toBeInTheDocument()
  });
});
