import { render, fireEvent } from '@testing-library/react';
import { PageNotFound } from '.';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
  };
});

describe('Page Not Found', () => {
  it('should return to Home page when button is clicked', () => {
    const { getByTestId } = render(<PageNotFound />);

    const backToHomeButton = getByTestId('back-to-home-button');

    fireEvent.click(backToHomeButton);

    expect(mockedHistoryPush).toHaveBeenCalledWith('/');
  });
});
