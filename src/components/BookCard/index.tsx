import { MdAddShoppingCart } from 'react-icons/md';
import { useCart } from '../../contexts/useCart';
import { IBook } from '../../types';
import s from './styles.module.scss';

interface IBookCard {
  book: IBook;
  openDetails: () => void;
}

export function BookCard({ book, openDetails }: IBookCard): JSX.Element {
  const { addBook } = useCart();

  return (
    <section className={s.bookCardContainer}>
      <div className={s.book} onClick={openDetails} onKeyPress={openDetails}>
        <h3 className={s.bookTitle}>{book.title}</h3>
        <img src={book.image} alt={book.title} loading="lazy" />
        <div className={s.bookInfos}>
          <legend>{book.subtitle}</legend>
          <p>{book.price}</p>
        </div>
      </div>
      <button
        type="button"
        data-testid="add-book-button"
        className={s.addToCardButton}
        onClick={() => addBook(book)}
      >
        <div>
          <MdAddShoppingCart />
        </div>
        <span>Adicionar ao Carrinho</span>
      </button>
    </section>
  );
}
