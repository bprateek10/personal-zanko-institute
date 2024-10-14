import { render, screen } from '@testing-library/react';
import Login from './page';

describe('Login Component', () => {
  it('renders correctly', () => {
    render(<Login />);

    // Check for the presence of the title
    const titleElement = screen.getByRole('heading', { name: /sign in/i });
    expect(titleElement).toBeInTheDocument();

    // Check for the presence of images
    const logoImage = screen.getByAltText('logo');
    const coverImage = screen.getByAltText('cover');
    expect(logoImage).toBeInTheDocument();
    expect(coverImage).toBeInTheDocument();

    // Check for the descriptive paragraph
    const descriptionElement = screen.getByText(/where amazing things happen/i);
    expect(descriptionElement).toBeInTheDocument();

    // Check if LoginForm is rendered by looking for an element inside it
    const loginForm = screen.getByLabelText(/email/i); // Example to find an email input
    expect(loginForm).toBeInTheDocument();
  });
});
