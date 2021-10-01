import { render, fireEvent } from '@testing-library/react';
import { BookCard } from '.'
import { useCart } from '../../hooks/useCart';

const mockedBook = {
  title: "Java Notes for Professionals",
  subtitle: "Your Guided Tour Through the Programming Jungle",
  isbn13: "1001630936399",
  price: "$0.00",
  image: "https://itbook.store/img/books/1001630936399.png",
  url: "https://itbook.store/books/1001630936399",
  amount: 2
}

const mockedAddBook = jest.fn();
const mockedUseCartHook = useCart as jest.Mock;

jest.mock('../../hooks/useCart');

describe('BookCard Component', () => {
  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [
        {
          title: "Java Notes for Professionals",
          subtitle: "Your Guided Tour Through the Programming Jungle",
          isbn13: "1001630936399",
          price: "$0.00",
          image: "https://itbook.store/img/books/1001630936399.png",
          url: "https://itbook.store/books/1001630936399",
          amount: 1
        },
        {
          title: "Java Notes for Professionals",
          subtitle: "Your Guided Tour Through the Programming Jungle",
          isbn13: "1001630936398",
          price: "$0.00",
          image: "https://itbook.store/img/books/1001630936399.png",
          url: "https://itbook.store/books/1001630936399",
          amount: 1
        },
      ],
      addBook: mockedAddBook,
    });
  });

  it('should be able to render BookCard component', () => {
    const headerComponent = render(<BookCard book={mockedBook} />)

    expect(headerComponent).toBeTruthy();
  });

  it('should be able to add a book to cart', async () => {
    const { getAllByTestId } = render(<BookCard book={mockedBook} />);

    const [addFirstBook] = getAllByTestId('add-book-button');

    fireEvent.click(addFirstBook);

    expect(mockedAddBook).toHaveBeenCalled();
  })
});
