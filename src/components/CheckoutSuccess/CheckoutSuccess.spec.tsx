import { render, fireEvent } from '@testing-library/react';
import { CheckoutSuccessModal } from '.';
import { useFlipContext } from '../../contexts/useFlipContext';

const mockedPush = jest.fn();

jest.mock('react-router', () => {
  return {
    useHistory: () => ({
      push: mockedPush,
    }),
  };
});

const mockedSetIsCheckoutSuccessOpen = jest.fn();
const mockedFlipContext = useFlipContext as jest.Mock;

jest.mock('../../contexts/useFlipContext');

describe('BookCard Component', () => {
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
      setIsCheckoutSuccessOpen: mockedSetIsCheckoutSuccessOpen,
      isCheckoutSuccessOpen: true,
    });
  });

  it('should be able to render BookCardModal component', () => {
    const component = render(<CheckoutSuccessModal />);

    expect(component).toBeTruthy();
  });

  it('should return to home page when continue button is clicked', () => {
    const { getByTestId } = render(<CheckoutSuccessModal />);

    const continueShoppingButton = getByTestId('continue-shopping-button');

    fireEvent.click(continueShoppingButton);

    expect(mockedSetIsCheckoutSuccessOpen).toHaveBeenCalled();
    expect(mockedPush).toHaveBeenCalled();
  });
});
