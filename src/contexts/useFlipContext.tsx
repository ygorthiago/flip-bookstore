import { createContext, ReactNode, useCallback, useContext } from 'react';
import { IBook } from '../types';
import { IUseBookHook, useBooksHook } from '../hooks/useBooks';
import { IToastHook, useToastHook } from '../hooks/useToast';
import { useCartHook } from '../hooks/useCart';

interface ICartProviderProps {
  children: ReactNode;
}

interface IUpdateBookAmount {
  bookIsbn13: string;
  amount: number;
}

interface IFlipContextData extends IUseBookHook, IToastHook {
  cart: IBook[];
  addBook: (book: IBook) => Promise<void>;
  removeBook: (bookIsbn13: string) => void;
  updateBookAmount: ({ bookIsbn13, amount }: IUpdateBookAmount) => void;
  addBookToCart: (book: IBook) => void;
  finishCheckout: () => void;
}

const CartContext = createContext<IFlipContextData>({} as IFlipContextData);
export function FlipProvider({ children }: ICartProviderProps): JSX.Element {
  const useBook = useBooksHook();
  const useToast = useToastHook();
  const useCart = useCartHook();

  const addBookToCart = useCallback(
    async (book: IBook) => {
      await useCart.addBook(book);
      useToast.addToast('Livro adicionado ao carrinho');
    },
    [useCart, useToast],
  );

  const finishCheckout = useCallback(() => {
    useBook.setIsCheckoutSuccessOpen(true);
    useCart.setCart([]);
  }, [useBook, useCart]);

  return (
    <CartContext.Provider
      value={{
        addBookToCart,
        finishCheckout,
        ...useCart,
        ...useBook,
        ...useToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useFlipContext(): IFlipContextData {
  const context = useContext(CartContext);

  return context;
}
