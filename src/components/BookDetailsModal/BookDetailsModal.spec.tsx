import { render, fireEvent } from '@testing-library/react';
import { BookDetailsModal } from '.';
import { useFlipContext } from '../../contexts/useFlipContext';

const mockedAddBookToCart = jest.fn();
const mockedAddToast = jest.fn();
const mockedFlipContext = useFlipContext as jest.Mock;

jest.mock('../../contexts/useFlipContext');

describe('BookDetailsModal Component', () => {
  beforeEach(() => {
    mockedFlipContext.mockReturnValue({
      bookDetails: {
        desc: 'description',
        authors: 'authors',
        publisher: 'publisher',
        year: '2021',
        language: 'english',
        pages: '832',
        rating: '3',
      },
      addBookToCart: mockedAddBookToCart,
      isBookDetailsOpen: true,
      addToast: mockedAddToast,
    });
  });

  it('should be able to render component', () => {
    const component = render(<BookDetailsModal />);

    expect(component).toBeTruthy();
  });

  it('should be able to add a book to cart', () => {
    const { getByTestId } = render(<BookDetailsModal />);

    const addBookToCardButton = getByTestId('add-book-button');

    fireEvent.click(addBookToCardButton);

    expect(mockedAddBookToCart).toHaveBeenCalled();
  });

  it('should show loading component when data is fetching', () => {
    mockedFlipContext.mockReturnValue({
      bookDetails: undefined,
      addBookToCart: mockedAddBookToCart,
      isBookDetailsOpen: true,
      addToast: mockedAddToast,
    });

    const { getByTestId } = render(<BookDetailsModal />);

    const loadingComponent = getByTestId('loader');

    expect(loadingComponent).toBeTruthy();
  });
});
