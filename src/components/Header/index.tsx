import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { GiBookmarklet } from 'react-icons/gi';

import s from './styles.module.scss';

export function Header() {
  return (
    <header className={s.headerContainer}>
      <Link className={s.headerTitle} to="/">
        <GiBookmarklet />
        Livraria Flip
      </Link>

      <Link className={s.cart} to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span data-testid="cart-size">
            {/* TO DO */}
            2 itens
          </span>
        </div>
        <FaShoppingCart />
      </Link>
    </header>
  );
};

