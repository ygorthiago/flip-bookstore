import { useEffect, useState } from "react";
import { BookCard } from "../../components/BookCard";
import { Header } from "../../components/Header";
import { Loader } from "../../components/Loader";
import { api } from "../../services/api";
import { IBook } from "../../types";
import s from './styles.module.scss';

export function Home() {
  const [books, setBooks] = useState<IBook[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    setIsLoading(true)

    api.get('/search/prog').then(response => {
      setBooks(response.data.books) 
    }).catch(error => {
      console.error(error)
    }).finally(() => setIsLoading(false))
  }, [])

  return (
    <main className={s.homeContainer}>
      <Header />
      <article className={s.bookListContainer} data-testid='list-books'>
        {books && books.map(book =>{
          return <BookCard key={book.isbn13} book={book} />
        } 
        )}
        {isLoading && <Loader />}
      </article>
    </main>
  )
}