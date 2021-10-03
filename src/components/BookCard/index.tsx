import { useFlipContext } from '../../contexts/useFlipContext';
import { IBook } from '../../types';
import { ButtonAddToCart } from '../ButtonAddToCart';
import s from './styles.module.scss';

interface IBookCard {
  book: IBook;
}

export function BookCard({ book }: IBookCard): JSX.Element {
  const { addBookToCart, openBookDetailsModal } = useFlipContext();

  return (
    <section
      className={s.bookCardContainer}
      onClick={() => openBookDetailsModal(book.isbn13)}
      data-testid="book-card-info"
      onKeyPress={() => openBookDetailsModal(book.isbn13)}
    >
      <h3 className={s.bookTitle}>{book.title}</h3>
      <img src={book.image} alt={book.title} loading="lazy" />
      <div className={s.bookInfos}>
        <legend>{book.subtitle}</legend>
        <p>{book.price}</p>
      </div>
      <ButtonAddToCart
        data-testid="add-book-button"
        onClick={e => {
          addBookToCart(book);
          e.stopPropagation();
        }}
      />
    </section>
  );
}
