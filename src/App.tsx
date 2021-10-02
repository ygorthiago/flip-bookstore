import { BookDetailsModal } from './components/BookDetailsModal';
import { CartProvider } from './contexts/useCart';
import { Routes } from './routes';
import './styles/global.scss';

function App(): JSX.Element {
  return (
    <CartProvider>
      <Routes />
      <BookDetailsModal />
    </CartProvider>
  );
}

export default App;
