import { useCallback, useState } from 'react';
import { api } from '../services/api';
import { IBook, IBookDetails } from '../types';

export interface IUseBookHook {
  isBookDetailsOpen: boolean;
  setIsBookDetailsOpen: (isOpen: boolean) => void;
  openBookDetailsModal: (bookIsbn13: string) => void;
  getBookDetails: (bookIsbn13: string) => void;
  closeBookDetailsModal: () => void;
  bookDetails: IBookDetails | undefined;
  isCheckoutSuccessOpen: boolean;
  setIsCheckoutSuccessOpen: (isOpen: boolean) => void;
  books: IBook[];
  isGetBooksLoading: boolean;
  getBooks: () => void;
  isGetBooksError: boolean;
  isBookDetailsError: boolean;
  isBookDetailsLoading: boolean;
  selectedBook: string;
}

export function useBooksHook(): IUseBookHook {
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);

  const [selectedBook, setSelectedBook] = useState('');

  const [isBookDetailsOpen, setIsBookDetailsOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState<IBookDetails | undefined>();
  const [isBookDetailsLoading, setBookDetailsLoading] = useState(false);
  const [isBookDetailsError, setBookDetailsError] = useState(false);

  const [books, setBooks] = useState<IBook[]>([]);
  const [isGetBooksLoading, setIsGetBooksLoading] = useState(false);
  const [isGetBooksError, setIsGetBooksError] = useState(false);

  const getBookDetails = useCallback((bookIsbn13: string) => {
    setBookDetailsError(false);
    setBookDetailsLoading(true);

    api
      .get(`/books/${bookIsbn13}`)
      .then(response => {
        setBookDetails(response.data);
      })
      .catch(() => {
        setBookDetailsError(true);
      })
      .finally(() => setBookDetailsLoading(false));
  }, []);

  const openBookDetailsModal = useCallback(
    (bookIsbn13: string) => {
      setIsBookDetailsOpen(true);
      setSelectedBook(bookIsbn13);

      getBookDetails(bookIsbn13);
    },
    [getBookDetails],
  );

  const getBooks = useCallback(() => {
    setIsGetBooksLoading(true);
    setIsGetBooksError(false);
    api
      .get('/search/prog')
      .then(response => {
        setBooks(response.data.books);
      })
      .catch(() => {
        setIsGetBooksError(true);
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
    isGetBooksError,
    isBookDetailsError,
    isBookDetailsLoading,
    getBookDetails,
    selectedBook,
  };
}
