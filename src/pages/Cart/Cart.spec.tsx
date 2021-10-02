import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ReactNode } from 'react';
import { useCart } from '../../contexts/useCart';
import { Cart } from '.';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

const mockedRemoveBook = jest.fn();
const mockedUpdateBookAmount = jest.fn();
const mockedUseCartHook = useCart as jest.Mock;

jest.mock('../../contexts/useCart');

describe('Cart Page', () => {
  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
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
      removeBook: mockedRemoveBook,
      updateBookAmount: mockedUpdateBookAmount,
    });
  });

  it('should be able to increase/decrease a book amount', () => {
    const { getAllByTestId, rerender } = render(<Cart />);

    const [incrementFirstBook] = getAllByTestId('increment-book');
    const [, decrementSecondBook] = getAllByTestId('decrement-book');
    const [firstBookAmount, secondBookAmount] = getAllByTestId('book-amount');

    expect(firstBookAmount.textContent).toBe('1');
    expect(secondBookAmount.textContent).toBe('2');

    fireEvent.click(incrementFirstBook);
    fireEvent.click(decrementSecondBook);

    expect(mockedUpdateBookAmount).toHaveBeenCalledWith({
      amount: 2,
      bookIsbn13: '1001630936399',
    });
    expect(mockedUpdateBookAmount).toHaveBeenCalledWith({
      amount: 1,
      bookIsbn13: '1001630936398',
    });

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936399',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
          amount: 2,
        },
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936398',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
          amount: 1,
        },
      ],
    });

    rerender(<Cart />);

    expect(firstBookAmount.textContent).toBe('2');
    expect(secondBookAmount.textContent).toBe('1');
  });

  it('should not be able to decrease a book amount when value is 1', () => {
    const { getAllByTestId } = render(<Cart />);

    const [decrementFirstBook] = getAllByTestId('decrement-book');
    const [firstBookAmount] = getAllByTestId('book-amount');

    expect(firstBookAmount.textContent).toBe('1');

    fireEvent.click(decrementFirstBook);

    expect(decrementFirstBook).toHaveProperty('disabled');
    expect(mockedUpdateBookAmount).not.toHaveBeenCalled();
  });

  it('should be able to remove a book', () => {
    const { getAllByTestId, rerender } = render(<Cart />);

    const [removeFirstBook] = getAllByTestId('remove-book');
    const [firstBook, secondBook] = getAllByTestId('book-amount');

    expect(firstBook).toBeInTheDocument();
    expect(secondBook).toBeInTheDocument();

    fireEvent.click(removeFirstBook);

    expect(mockedRemoveBook).toHaveBeenCalledWith('1001630936399');

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936398',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
          amount: 1,
        },
      ],
    });

    rerender(<Cart />);

    expect(firstBook).not.toBeInTheDocument();
    expect(secondBook).toBeInTheDocument();
  });
});
