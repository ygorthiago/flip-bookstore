import { CartProvider } from "./hooks/useCart";
import { Routes } from "./routes";
import './styles/global.scss'

function App() {
  return (
    <CartProvider>
      <Routes />
    </CartProvider>
  );
}

export default App;
