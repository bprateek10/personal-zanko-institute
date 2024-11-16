import { render, screen } from '@testing-library/react';
import MainPage from './page';

describe('MainPage', () => {
  it('renders Home Page by default when no pathname matches', () => {
    render(<MainPage />);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
