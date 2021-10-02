import { useEffect } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { animated } from 'react-spring';
import { useCart } from '../../../contexts/useCart';

import s from './styles.module.scss';

interface ToastProps {
  id: string;
  message: string;
  style: Record<string, unknown>; // object
}

function Toast({ id, message, style }: ToastProps): JSX.Element {
  const { removeToast } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 2 * 1000);

    return () => clearTimeout(timer);
  }, [removeToast, id]);

  return (
    <animated.div className={s.toast} style={style}>
      <FiCheckCircle size={24} />
      <div>
        <strong>{message}</strong>
      </div>

      <button onClick={() => removeToast(id)} type="button">
        <FiXCircle size={18} />
      </button>
    </animated.div>
  );
}

export default Toast;
