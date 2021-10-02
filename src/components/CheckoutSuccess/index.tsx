import { FaCheckCircle } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { useFlipContext } from '../../contexts/useFlipContext';
import Modal from '../Modal';
import s from './styles.module.scss';

export function CheckoutSuccessModal(): JSX.Element {
  const { isCheckoutSuccessOpen, setIsCheckoutSuccessOpen } = useFlipContext();
  const history = useHistory();

  function continueShopping() {
    setIsCheckoutSuccessOpen(false);
    history.push('/');
  }

  return (
    <Modal
      isOpen={isCheckoutSuccessOpen}
      setIsOpen={() => continueShopping()}
      closeOnOverlay={false}
    >
      <div className={s.checkoutSuccessContainer}>
        <FaCheckCircle size={60} />
        <h1>Compra finalizada com sucesso!</h1>
        <h3>Boa leitura!</h3>
        <button type="button" className="" onClick={continueShopping}>
          Continuar comprando
        </button>
      </div>
    </Modal>
  );
}
