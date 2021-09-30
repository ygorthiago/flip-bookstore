import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { Header } from '.'

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

describe('Header Component', () => {
  it('should be able to render Header component', () => {
    const headerComponent: any = render(<Header />)

    expect(headerComponent).toBeTruthy();
  });

  it.todo('should be able to render the amount of products added to cart');
});
