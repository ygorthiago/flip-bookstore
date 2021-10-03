import { useEffect } from 'react';
import { BookCard } from '../../components/BookCard';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { useFlipContext } from '../../contexts/useFlipContext';
import s from './styles.module.scss';

export function Home(): JSX.Element {
  const { books, isGetBooksLoading, getBooks } = useFlipContext();

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <main className={s.homeContainer}>
      <Header />
      <article className={s.bookListContainer} data-testid="list-books">
        {books && books.map(book => <BookCard key={book.isbn13} book={book} />)}
      </article>
      {isGetBooksLoading && (
        <div className={s.loaderContainer}>
          <Loader />
        </div>
      )}
    </main>
  );
}
