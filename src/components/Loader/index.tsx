import s from './styles.module.scss';

export function Loader() {
  return (
    <div className={s.loader} data-testid='loader'></div>
  )
}