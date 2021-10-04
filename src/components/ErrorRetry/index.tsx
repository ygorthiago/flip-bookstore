import { Button } from '../Button';
import s from './styles.module.scss';

interface IErrorRetry {
  retryFunction: () => void;
}

export function ErrorRetry({ retryFunction }: IErrorRetry): JSX.Element {
  return (
    <div data-testid="error-component" className={s.errorRetryContainer}>
      <h3>Algum erro ocorreu</h3>
      <Button onClick={retryFunction} data-testid="error-retry-button">
        Tentar novamente
      </Button>
    </div>
  );
}
