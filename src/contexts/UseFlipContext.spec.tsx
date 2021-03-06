import { renderHook, act } from '@testing-library/react-hooks';
import { FlipProvider, useFlipContext } from './useFlipContext';

const mockedSetItemLocalStorage = jest.spyOn(Storage.prototype, 'setItem');
const initialStoragedData = [
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
];

describe('UseFlip Context', () => {
  beforeEach(() => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(JSON.stringify(initialStoragedData));
  });

  it('should be able to initialize cart with localStorage value', () => {
    const { result } = renderHook(useFlipContext, {
      wrapper: FlipProvider,
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
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
      ]),
    );
  });

  it('should be able to add a new book', async () => {
    const { result } = renderHook(useFlipContext, {
      wrapper: FlipProvider,
    });

    const mockedBook = {
      title: 'Java Notes for Professionals',
      subtitle: 'Your Guided Tour Through the Programming Jungle',
      isbn13: '1001630936397',
      price: '$0.00',
      image: 'https://itbook.store/img/books/1001630936399.png',
      url: 'https://itbook.store/books/1001630936399',
      amount: 0,
    };

    act(() => {
      result.current.addBookToCart(mockedBook);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
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
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936397',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
          amount: 1,
        },
      ]),
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@Flip:cart',
      JSON.stringify(result.current.cart),
    );
  });

  it('should be able to increase a book amount when adding a book that already exists on cart', async () => {
    const bookThatAlreadyExists = {
      title: 'Java Notes for Professionals',
      subtitle: 'Your Guided Tour Through the Programming Jungle',
      isbn13: '1001630936399',
      price: '$0.00',
      image: 'https://itbook.store/img/books/1001630936399.png',
      url: 'https://itbook.store/books/1001630936399',
      amount: 1,
    };

    const { result } = renderHook(useFlipContext, {
      wrapper: FlipProvider,
    });

    act(() => {
      result.current.addBook(bookThatAlreadyExists);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936399',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
          amount: 2,
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
      ]),
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@Flip:cart',
      JSON.stringify(result.current.cart),
    );
  });

  it('should be able to remove a book', () => {
    const bookIsbn13 = '1001630936398';

    const { result } = renderHook(useFlipContext, {
      wrapper: FlipProvider,
    });

    act(() => {
      result.current.removeBook(bookIsbn13);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936399',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
          amount: 1,
        },
      ]),
    );

    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@Flip:cart',
      JSON.stringify(result.current.cart),
    );
  });

  it('should not be able to remove a book that does not exist on cart', () => {
    const bookIsbn13 = '9999999999';

    const { result } = renderHook(useFlipContext, {
      wrapper: FlipProvider,
    });

    act(() => {
      result.current.removeBook(bookIsbn13);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData),
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('should be able to update a book amount', async () => {
    const bookIsbn13 = '1001630936399';

    const { result } = renderHook(useFlipContext, {
      wrapper: FlipProvider,
    });

    act(() => {
      result.current.updateBookAmount({ amount: 2, bookIsbn13 });
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          title: 'Java Notes for Professionals',
          subtitle: 'Your Guided Tour Through the Programming Jungle',
          isbn13: '1001630936399',
          price: '$0.00',
          image: 'https://itbook.store/img/books/1001630936399.png',
          url: 'https://itbook.store/books/1001630936399',
          amount: 2,
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
      ]),
    );

    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@Flip:cart',
      JSON.stringify(result.current.cart),
    );
  });

  it('should be able to finish checkout', () => {
    const { result } = renderHook(useFlipContext, {
      wrapper: FlipProvider,
    });

    act(() => {
      result.current.finishCheckout();
    });

    expect(result.current.cart).toEqual(expect.arrayContaining([]));

    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@Flip:cart',
      JSON.stringify(result.current.cart),
    );
  });
});
