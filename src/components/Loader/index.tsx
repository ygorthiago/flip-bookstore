import s from './styles.module.scss';

export function Loader(): JSX.Element {
  return <div className={s.loader} data-testid="loader" />;
}
