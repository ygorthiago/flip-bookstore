import { useEffect } from 'react';
import { BookCard } from '../../components/BookCard';
import { ErrorRetry } from '../../components/ErrorRetry';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { useFlipContext } from '../../contexts/useFlipContext';
import s from './styles.module.scss';

export function Home(): JSX.Element {
  const { books, isGetBooksLoading, getBooks, isGetBooksError } =
    useFlipContext();

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <main className={s.homeContainer}>
      <Header />
      <article className={s.bookListContainer} data-testid="list-books">
        {books && books.map(book => <BookCard key={book.isbn13} book={book} />)}
      </article>
      <div className={s.loaderAndErrorContainer}>
        {isGetBooksLoading && <Loader />}
        {isGetBooksError && <ErrorRetry retryFunction={() => getBooks()} />}
      </div>
    </main>
  );
}
