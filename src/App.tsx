import { BookDetailsModal } from './components/BookDetailsModal';
import ToastContainer from './components/ToastContainer';
import { FlipProvider } from './contexts/useFlipContext';
import { Routes } from './routes';
import './styles/global.scss';

function App(): JSX.Element {
  return (
    <FlipProvider>
      <Routes />
      <BookDetailsModal />
      <ToastContainer />
    </FlipProvider>
  );
}

export default App;
