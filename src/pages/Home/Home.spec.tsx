import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactNode } from 'react';
import { Home } from '.';
import { useFlipContext } from '../../contexts/useFlipContext';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

const mockedUseFlipContext = useFlipContext as jest.Mock;
jest.mock('../../contexts/useFlipContext');

describe('Home Page', () => {
  beforeEach(() => {
    mockedUseFlipContext.mockReturnValue({
      cart: [],
      isGetBooksLoading: false,
      getBooks: jest.fn(),
    });
  });

  it('should be able to render the books list container', async () => {
    mockedUseFlipContext.mockReturnValue({
      books: [
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936399',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
        },
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936398',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
        },
      ],
      cart: [],
      isGetBooksLoading: false,
      getBooks: jest.fn(),
    });

    const { getAllByTestId } = render(<Home />);

    const [fistBookCard] = getAllByTestId('book-card-info');
    expect(fistBookCard).toBeInTheDocument();
  });

  it('should show Loader component when data is fetching', async () => {
    mockedUseFlipContext.mockReturnValue({
      books: [],
      cart: [],
      isGetBooksLoading: true,
      getBooks: jest.fn(),
    });
    const { getByTestId } = render(<Home />);

    const loader = getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('should show error/retry component when some error ocurred', () => {
    mockedUseFlipContext.mockReturnValue({
      books: [],
      cart: [],
      isGetBooksLoading: false,
      isGetBooksError: true,
      getBooks: jest.fn(),
    });

    const { getByTestId } = render(<Home />);

    const errorComponent = getByTestId('error-component');

    expect(errorComponent).toBeTruthy();
  });

  it('should show error/retry component when some error ocurred', () => {
    mockedUseFlipContext.mockReturnValue({
      books: [],
      cart: [],
      isGetBooksLoading: false,
      isGetBooksError: true,
      getBooks: jest.fn(),
    });

    const { getByTestId } = render(<Home />);

    const errorComponent = getByTestId('error-component');

    expect(errorComponent).toBeTruthy();
  });

  it('should show retry getBooks request when retry button is clicked', () => {
    const mockedGetBooks = jest.fn();

    mockedUseFlipContext.mockReturnValue({
      books: [],
      cart: [],
      isGetBooksLoading: false,
      isGetBooksError: true,
      getBooks: mockedGetBooks,
    });

    const { getByTestId } = render(<Home />);

    const retryButton = getByTestId('error-retry-button');

    fireEvent.click(retryButton);

    expect(mockedGetBooks).toHaveBeenCalled();
  });
});
