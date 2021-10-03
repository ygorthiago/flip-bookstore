import { MdAddShoppingCart } from 'react-icons/md';
import { useFlipContext } from '../../contexts/useFlipContext';
import { IBook } from '../../types';
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
      <button
        type="button"
        data-testid="add-book-button"
        className={s.addToCardButton}
        onClick={e => {
          addBookToCart(book);
          e.stopPropagation();
        }}
      >
        <div>
          <MdAddShoppingCart />
        </div>
        <span>Adicionar ao Carrinho</span>
      </button>
    </section>
  );
}
