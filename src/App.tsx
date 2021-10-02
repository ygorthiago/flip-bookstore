import { BookDetailsModal } from "./components/BookDetailsModal";
import { CartProvider } from "./hooks/useCart";
import { Routes } from "./routes";
import './styles/global.scss'

function App() {
  return (
    <CartProvider>
      <Routes />
      <BookDetailsModal />
    </CartProvider>
  );
}

export default App;
