import { useCallback, useState } from 'react';
import { api } from '../services/api';
import { IBook, IBookDetails } from '../types';

export interface IUseBookHook {
  isBookDetailsOpen: boolean;
  setIsBookDetailsOpen: (isOpen: boolean) => void;
  openBookDetailsModal: (bookIsbn13: string) => void;
  closeBookDetailsModal: () => void;
  bookDetails: IBookDetails | undefined;
  isCheckoutSuccessOpen: boolean;
  setIsCheckoutSuccessOpen: (isOpen: boolean) => void;
  books: IBook[];
  isGetBooksLoading: boolean;
  getBooks: () => void;
}

export function useBooksHook(): IUseBookHook {
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);
  const [isBookDetailsOpen, setIsBookDetailsOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState<IBookDetails | undefined>();
  const [books, setBooks] = useState<IBook[]>([]);
  const [isGetBooksLoading, setIsGetBooksLoading] = useState(false);

  const openBookDetailsModal = useCallback((bookIsbn13: string) => {
    setIsBookDetailsOpen(true);

    api
      .get(`/books/${bookIsbn13}`)
      .then(response => {
        setBookDetails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const getBooks = useCallback(() => {
    setIsGetBooksLoading(true);

    api
      .get('/search/prog')
      .then(response => {
        setBooks(response.data.books);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setIsGetBooksLoading(false));
  }, []);

  const closeBookDetailsModal = useCallback(() => {
    setIsBookDetailsOpen(false);
    setBookDetails(undefined);
  }, []);

  return {
    isBookDetailsOpen,
    setIsBookDetailsOpen,
    openBookDetailsModal,
    closeBookDetailsModal,
    bookDetails,
    isCheckoutSuccessOpen,
    setIsCheckoutSuccessOpen,
    books,
    isGetBooksLoading,
    getBooks,
  };
}
