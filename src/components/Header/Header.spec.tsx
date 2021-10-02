import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { Header } from '.';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

jest.mock('../../contexts/useFlipContext', () => {
  return {
    useFlipContext: () => ({
      cart: [
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
          isbn13: '1001630936399',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
        },
      ],
    }),
  };
});

describe('Header Component', () => {
  it('should be able to render Header component', () => {
    const headerComponent = render(<Header />);

    expect(headerComponent).toBeTruthy();
  });

  it('should be able to render the amount of books added to cart', () => {
    const { getByTestId } = render(<Header />);

    const cartSizeCounter = getByTestId('cart-size');
    expect(cartSizeCounter.textContent).toBe('2 itens');
  });
});
