import { MdAddShoppingCart } from 'react-icons/md';
import { IBook } from '../../types';
import s from './styles.module.scss';

interface IBookCard {
  book: IBook;
}

export function BookCard({ book }: IBookCard) {
  return (
    <div className={s.bookCardContainer}>
      <h3 className={s.bookTitle}>{book.title}</h3>
      <img src={book.image} alt={book.title} />
      <div className={s.bookInfos}>
        <legend>{book.subtitle}</legend>
        <p>{book.price}</p>
        <button
          type="button"
          data-testid="add-product-button"
          className={s.addToCardButton}
        >
          <div data-testid="cart-product-quantity">
            <MdAddShoppingCart />
          </div>

          <span>Adicionar ao Carrinho</span>
        </button>
        
      </div>
    </div>
  )
}