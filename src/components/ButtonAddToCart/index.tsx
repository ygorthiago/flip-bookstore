import { ButtonHTMLAttributes } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { Button } from '../Button';
import s from './styles.module.scss';

export function ButtonAddToCart({
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <Button className={s.addToCartButton} {...rest}>
      <div>
        <MdAddShoppingCart />
      </div>
      <span>Adicionar ao carrinho</span>
    </Button>
  );
}
