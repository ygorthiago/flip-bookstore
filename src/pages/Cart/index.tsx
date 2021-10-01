import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { Header } from '../../components/Header';
import s from './styles.module.scss';

import { useCart } from '../../hooks/useCart';
import { IBook } from '../../types';
import { formatPrice } from '../../utils/FormatPrice';

export function Cart() {
  const { cart, removeBook, updateBookAmount } = useCart();

  const cartFormatted = cart.map(book => {
    const price = book.price.replace('$', '')

    return {
    ...book,
    priceFormatted: formatPrice(+price),
    subTotal: formatPrice(+price * book.amount)
  }});

  const total =
    formatPrice(
      cart.reduce((sumTotal, book) => {
        return sumTotal + (+book.price.replace('$', '') * book.amount)
      }, 0)
    )

  function handleBookIncrement(book: IBook) {
    updateBookAmount({ bookIsbn13: book.isbn13, amount: book.amount + 1 })
  }

  function handleBookDecrement(book: IBook) {
    updateBookAmount({ bookIsbn13: book.isbn13, amount: book.amount - 1 })
  }

  function handleRemoveBook(bookIsbn13: string) {
    removeBook(bookIsbn13)
  }

  return (
    <main className={s.cartContainer}>
      <Header />
      <h1>Carrinho</h1>
      {cartFormatted.map(book => {
        return (
          <div className={s.cartItem} key={book.isbn13}>
            <img src={book.image} alt={book.title} />
            <div className={s.cartItemInfo}>
              <h3>{book.title}</h3>
              <legend>{book.subtitle}</legend>
              <span>{book.subTotal}</span>
              <div className={s.amount}>
                <button
                  type="button"
                  data-testid="decrement-book"
                  disabled={book.amount <= 1}
                  onClick={() => handleBookDecrement(book)}
                >
                  <MdRemoveCircleOutline size={20} />
                </button>
                <p>{book.amount}</p>
                <button
                  type="button"
                  data-testid="increment-book"
                  onClick={() => handleBookIncrement(book)}
                >
                  <MdAddCircleOutline size={20} />
                </button>
              </div>
            </div>
            <button
              className={s.removeCartItem}
              type="button"
              data-testid="remove-book"
              onClick={() => handleRemoveBook(book.isbn13)}
            >
              <MdDelete />
            </button>
          </div>
        )
      })}
      <footer className={s.total}>
        <span>TOTAL</span>
        <strong>{total}</strong>
      </footer>
    </main>
  );
};
