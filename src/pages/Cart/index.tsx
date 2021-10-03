import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import s from './styles.module.scss';

import { useFlipContext } from '../../contexts/useFlipContext';
import { IBook } from '../../types';
import { formatPrice } from '../../utils/FormatPrice';
import { CheckoutSuccessModal } from '../../components/CheckoutSuccess';
import { Button } from '../../components/Button';

export function Cart(): JSX.Element {
  const {
    cart,
    removeBook,
    updateBookAmount,
    openBookDetailsModal,
    finishCheckout,
  } = useFlipContext();

  const cartFormatted = cart.map(book => {
    const price = book.price.replace('$', '');

    return {
      ...book,
      priceFormatted: formatPrice(+price),
      subTotal: formatPrice(+price * book.amount),
    };
  });

  const total = formatPrice(
    cart.reduce((sumTotal, book) => {
      return sumTotal + +book.price.replace('$', '') * book.amount;
    }, 0),
  );

  function handleBookIncrement(book: IBook) {
    updateBookAmount({ bookIsbn13: book.isbn13, amount: book.amount + 1 });
  }

  function handleBookDecrement(book: IBook) {
    updateBookAmount({ bookIsbn13: book.isbn13, amount: book.amount - 1 });
  }

  function handleRemoveBook(bookIsbn13: string) {
    removeBook(bookIsbn13);
  }

  return (
    <main className={s.cartContainer}>
      <Header />
      <span className={s.backContainer}>
        <Link to="/">
          <IoChevronBack />
          Voltar
        </Link>
      </span>
      <h1 className={s.title}>Carrinho</h1>
      {cartFormatted.map(book => {
        return (
          <section className={s.cartItem} key={book.isbn13}>
            <img
              src={book.image}
              alt={book.title}
              onClick={() => openBookDetailsModal(book.isbn13)}
              onKeyPress={() => openBookDetailsModal(book.isbn13)}
              data-testid="cart-book-image"
            />
            <div className={s.cartItemInfo}>
              <h3
                data-testid="cart-book-title"
                onClick={() => openBookDetailsModal(book.isbn13)}
                onKeyPress={() => openBookDetailsModal(book.isbn13)}
              >
                {book.title}
              </h3>
              <legend>{book.subtitle}</legend>
              <p className={s.subTotal}>{book.subTotal}</p>
              <div className={s.amount}>
                <button
                  type="button"
                  data-testid="decrement-book"
                  disabled={book.amount <= 1}
                  onClick={() => handleBookDecrement(book)}
                >
                  <MdRemoveCircleOutline size={20} />
                </button>
                <p data-testid="book-amount">{book.amount}</p>
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
          </section>
        );
      })}
      {cartFormatted.length ? (
        <footer className={s.total}>
          <Button type="button" onClick={finishCheckout}>
            Finalizar compra
          </Button>
          <div>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </div>
        </footer>
      ) : (
        <footer className={s.cartEmpty} data-testid="cart-empty">
          Carrinho vazio
        </footer>
      )}
      <CheckoutSuccessModal />
    </main>
  );
}
