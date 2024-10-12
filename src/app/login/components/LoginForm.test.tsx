// LoginForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('renders the form with input fields', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith('Success:', {
        email: 'test@example.com',
        password: 'password123',
        remember: true,
      });
    });

    logSpy.mockRestore();
  });

  it('shows validation messages on submit with empty fields', async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(
      await screen.findByText(/please input your valid email!/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please input your password!/i),
    ).toBeInTheDocument();
  });

  it('shows password validation message if too short', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'short' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(
      await screen.findByText(/password must be at least 8 characters long!/i),
    ).toBeInTheDocument();
  });
});
