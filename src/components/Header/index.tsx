import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { GiBookmarklet } from 'react-icons/gi';

import s from './styles.module.scss';
import { useFlipContext } from '../../contexts/useFlipContext';

export function Header(): JSX.Element {
  const { cart } = useFlipContext();
  const cartSize = cart.length;

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
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
          </span>
        </div>
        <FaShoppingCart />
      </Link>
    </header>
  );
}
