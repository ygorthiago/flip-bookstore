import { MdAddShoppingCart } from 'react-icons/md';
import { useCart } from '../../hooks/useCart';
import { IBook } from '../../types';
import s from './styles.module.scss';

interface IBookCard {
  book: IBook;
}

export function BookCard({ book }: IBookCard) {
  const { addBook } = useCart();

  return (
    <div className={s.bookCardContainer}>
      <h3 className={s.bookTitle}>{book.title}</h3>
      <img src={book.image} alt={book.title} />
      <div className={s.bookInfos}>
        <legend>{book.subtitle}</legend>
        <p>{book.price}</p>
        <button
          type="button"
          data-testid="add-book-button"
          className={s.addToCardButton}
          onClick={() => addBook(book)}
        >
          <div data-testid="cart-book-quantity">
            <MdAddShoppingCart />
          </div>

          <span>Adicionar ao Carrinho</span>
        </button>
        
      </div>
    </div>
  )
}