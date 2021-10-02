import { useCallback, useState } from 'react';
import { api } from '../services/api';

export interface IUseBookHook {
  isBookDetailsOpen: boolean;
  setIsBookDetailsOpen: (isOpen: boolean) => void;
  openBookDetailsModal: (bookIsbn13: string) => void;
  closeBookDetailsModal: () => void;
  bookDetails: any;
}

export function useBooksHook(): IUseBookHook {
  const [isBookDetailsOpen, setIsBookDetailsOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState();

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
  };
}
