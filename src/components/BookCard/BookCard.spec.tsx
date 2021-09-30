import { render } from '@testing-library/react';
import { BookCard } from '.'

const mockedBook = {
  title: "Java Notes for Professionals",
  subtitle: "Your Guided Tour Through the Programming Jungle",
  isbn13: "1001630936399",
  price: "$0.00",
  image: "https://itbook.store/img/books/1001630936399.png",
  url: "https://itbook.store/books/1001630936399"
}

describe('BookCard Component', () => {
  it('should be able to render BookCard component', () => {
    const headerComponent: any = render(<BookCard book={mockedBook} />)

    expect(headerComponent).toBeTruthy();
  });

  it.todo('should be able to add a product to cart');
});
