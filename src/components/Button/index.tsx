import { ButtonHTMLAttributes } from 'react';
import s from './styles.module.scss';

export function Button({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button className={s.button} type="button" {...rest}>
      {children}
    </button>
  );
}
