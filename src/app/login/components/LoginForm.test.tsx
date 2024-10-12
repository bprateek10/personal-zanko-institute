// LoginForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm'; // Adjust the import path if necessary

describe('LoginForm Component', () => {
  it('renders correctly', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('validates email input', async () => {
    render(<LoginForm />);

    // Submit the form without entering an email
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check for the validation error
    expect(
      await screen.findByText(/please input your valid email/i),
    ).toBeInTheDocument();
  });

  it('validates password input', async () => {
    render(<LoginForm />);

    // Enter an email and submit the form without entering a password
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check for the validation error
    expect(
      await screen.findByText(/please input your password/i),
    ).toBeInTheDocument();
  });
});
