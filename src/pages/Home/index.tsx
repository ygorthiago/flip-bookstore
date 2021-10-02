import { useEffect, useState } from 'react';
import { BookCard } from '../../components/BookCard';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { useCart } from '../../contexts/useCart';
import { api } from '../../services/api';
import { IBook } from '../../types';
import s from './styles.module.scss';

export function Home(): JSX.Element {
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { openBookDetailsModal } = useCart();

  useEffect(() => {
    setIsLoading(true);

    api
      .get('/search/prog')
      .then(response => {
        setBooks(response.data.books);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className={s.homeContainer}>
      <Header />
      <article className={s.bookListContainer} data-testid="list-books">
        {books &&
          books.map(book => {
            return (
              <BookCard
                key={book.isbn13}
                book={book}
                openDetails={() => openBookDetailsModal(book.isbn13)}
              />
            );
          })}
        {isLoading && <Loader />}
      </article>
    </main>
  );
}
