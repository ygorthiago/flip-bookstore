import { render, fireEvent } from '@testing-library/react';
import { BookCard } from '.';
import { useFlipContext } from '../../contexts/useFlipContext';

const mockedBook = {
  title: 'Java Notes for Professionals',
  subtitle: 'Your Guided Tour Through the Programming Jungle',
  isbn13: '1001630936399',
  price: '$0.00',
  image: 'https://itbook.store/img/books/1001630936399.png',
  url: 'https://itbook.store/books/1001630936399',
  amount: 2,
};

const mockedAddBook = jest.fn();
const mockedOpenBookDetails = jest.fn();
const mockedUseCartHook = useFlipContext as jest.Mock;

jest.mock('../../contexts/useFlipContext');

describe('BookCard Component', () => {
  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936399',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
          amount: 1,
        },
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936398',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
          amount: 1,
        },
      ],
      addBookToCart: mockedAddBook,
      openBookDetailsModal: mockedOpenBookDetails,
    });
  });

  it('should be able to render BookCard component', () => {
    const component = render(<BookCard book={mockedBook} />);

    expect(component).toBeTruthy();
  });

  it('should be able to add a book to cart', async () => {
    const { getAllByTestId } = render(<BookCard book={mockedBook} />);

    const [addFirstBook] = getAllByTestId('add-book-button');

    fireEvent.click(addFirstBook);

    expect(mockedAddBook).toHaveBeenCalled();
  });

  it('should be able to open BookDetailsModal when the card is clicked', async () => {
    const { getByTestId } = render(<BookCard book={mockedBook} />);

    const bookCardInfo = getByTestId('book-card-info');

    fireEvent.click(bookCardInfo);
    fireEvent.keyPress(bookCardInfo, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });

    expect(mockedOpenBookDetails).toHaveBeenCalled();
  });
});
