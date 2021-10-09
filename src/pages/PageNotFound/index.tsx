import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';
import s from './styles.module.scss';

export function PageNotFound(): JSX.Element {
  const history = useHistory();

  return (
    <main className={s.pageNotFoundContainer}>
      <h1>404</h1>
      <h3>Página não encontrada</h3>
      <p>
        Oops! A página que você está procurando não existe. Ela pode ter sido
        movida ou excluída.
      </p>
      <Button
        onClick={() => history.push('/')}
        data-testid="back-to-home-button"
      >
        Voltar para Home
      </Button>
    </main>
  );
}
