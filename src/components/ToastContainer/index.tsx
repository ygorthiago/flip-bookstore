import { useTransition } from 'react-spring';
import Toast from './Toast';
import s from './styles.module.scss';
import { useCart } from '../../contexts/useCart';

function ToastContainer(): JSX.Element {
  const { messages } = useCart();

  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <div className={s.toastContainer}>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} id={item.id} message={item.message} style={props} />
      ))}
    </div>
  );
}

export default ToastContainer;
