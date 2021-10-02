import { BookDetailsModal } from './components/BookDetailsModal';
import ToastContainer from './components/ToastContainer';
import { CartProvider } from './contexts/useCart';
import { Routes } from './routes';
import './styles/global.scss';

function App(): JSX.Element {
  return (
    <CartProvider>
      <Routes />
      <BookDetailsModal />
      <ToastContainer />
    </CartProvider>
  );
}

export default App;
