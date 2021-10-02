import { useCallback, useEffect, useRef, useState } from 'react';
import { IBook } from '../types';

interface IUpdateBookAmount {
  bookIsbn13: string;
  amount: number;
}

export interface ICartHook {
  cart: IBook[];
  addBook: (book: IBook) => Promise<void>;
  removeBook: (bookIsbn13: string) => void;
  updateBookAmount: ({ bookIsbn13, amount }: IUpdateBookAmount) => void;
}

export function useCartHook(): ICartHook {
  const [cart, setCart] = useState<IBook[]>(() => {
    const storagedCart = localStorage.getItem('@Flip:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const prevCartRef = useRef<IBook[]>();

  useEffect(() => {
    prevCartRef.current = cart;
  });

  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    if (cartPreviousValue !== cart) {
      localStorage.setItem('@Flip:cart', JSON.stringify(cart));
    }
  }, [cart, cartPreviousValue]);

  const addBook = useCallback(
    async (book: IBook) => {
      try {
        const updatedCart = [...cart];
        const bookAlreadyExistsOnCart = updatedCart.find(
          updatedCartBook => updatedCartBook.isbn13 === book.isbn13,
        );

        const currentAmount = bookAlreadyExistsOnCart
          ? bookAlreadyExistsOnCart.amount
          : 0;
        const amount = currentAmount + 1;

        if (bookAlreadyExistsOnCart) {
          bookAlreadyExistsOnCart.amount = amount;
        } else {
          const newBook = {
            ...book,
            amount: 1,
          };

          updatedCart.push(newBook);
        }

        setCart(updatedCart);
      } catch {
        console.error('Error adding item.');
      }
    },
    [cart],
  );

  const removeBook = useCallback(
    (bookIsbn13: string) => {
      try {
        const updatedCart = [...cart];
        const bookIndex = updatedCart.findIndex(
          book => book.isbn13 === bookIsbn13,
        );

        if (bookIndex >= 0) {
          updatedCart.splice(bookIndex, 1);

          setCart(updatedCart);
        } else {
          throw Error();
        }
      } catch {
        console.error('Error removing item.');
      }
    },
    [cart],
  );

  const updateBookAmount = useCallback(
    async ({ bookIsbn13, amount }: IUpdateBookAmount) => {
      try {
        if (amount <= 0) {
          return;
        }

        const updatedCart = [...cart];

        const bookAlreadyExistsOnCart = updatedCart.find(
          book => book.isbn13 === bookIsbn13,
        );

        if (bookAlreadyExistsOnCart) {
          bookAlreadyExistsOnCart.amount = amount;
          setCart(updatedCart);
        } else {
          throw Error();
        }
      } catch {
        console.error('Error updating item.');
      }
    },
    [cart],
  );

  return { cart, addBook, removeBook, updateBookAmount };
}
