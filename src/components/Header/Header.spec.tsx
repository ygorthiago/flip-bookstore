import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { Header } from '.';
import { useFlipContext } from '../../contexts/useFlipContext';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

const mockedFlipContext = useFlipContext as jest.Mock;

jest.mock('../../contexts/useFlipContext');

describe('Header Component', () => {
  beforeEach(() => {
    mockedFlipContext.mockReturnValue({
      cart: [
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936399',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
          amount: 1,
        },
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936398',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
          amount: 2,
        },
      ],
    });
  });

  it('should be able to render Header component', () => {
    const headerComponent = render(<Header />);

    expect(headerComponent).toBeTruthy();
  });

  it('should be able to render the amount of books added to cart', () => {
    const { getByTestId } = render(<Header />);

    const cartSizeCounter = getByTestId('cart-size');
    expect(cartSizeCounter.textContent).toBe('2 itens');
  });

  it(`should show 'item' when cart have only 1 item`, () => {
    mockedFlipContext.mockReturnValue({
      cart: [
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936398',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
          amount: 2,
        },
      ],
    });
    const { getByTestId } = render(<Header />);

    const cartSizeCounter = getByTestId('cart-size');
    expect(cartSizeCounter.textContent).toBe('1 item');
  });
});
