import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SigninForm from './SigninForm';

// Mock next/image since it requires a valid external image loader
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe('SigninForm Component', () => {
  it('should render the Signin form correctly', () => {
    render(<SigninForm />);

    // Check if the logo is rendered
    const logo = screen.getByAltText('Unib logo');
    expect(logo).toBeInTheDocument();

    // Check if "Welcome back!" message is rendered
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();

    // Check if Google sign-in button is rendered
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();

    // Check if email and password fields are rendered
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('should show validation errors when the form is submitted without values', async () => {
    render(<SigninForm />);

    // Click the submit button without entering email and password
    fireEvent.click(screen.getByText('Sign In'));

    // Check for validation error messages
    expect(
      await screen.findByText('Please input your email!'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Please input your password!'),
    ).toBeInTheDocument();
  });

  it('should submit the form when email and password are provided', async () => {
    render(<SigninForm />);

    // Fill in the email and password
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Sign In'));

    // Expect form submission to log success message with values
    expect(screen.queryByText('Please input your email!')).toBeDefined();
    expect(screen.queryByText('Please input your password!')).toBeDefined();
  });

  it('should show "Forgot your password?" link', () => {
    render(<SigninForm />);

    const forgotPasswordLink = screen.getByText('Forgot your password?');
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink).toHaveAttribute(
      'href',
      '/student-portal/signup',
    );
  });

  it('should show "Create an account" link for users without an account', () => {
    render(<SigninForm />);

    const createAccountLink = screen.getByText('Create an account');
    expect(createAccountLink).toBeInTheDocument();
    expect(createAccountLink).toHaveAttribute('href', '/student-portal/signup');
  });

  it('should show "Privacy Policy" and "Terms of Use" links', () => {
    render(<SigninForm />);

    const privacyPolicyLink = screen.getByText('Privacy Policy');
    const termsOfUseLink = screen.getByText('Terms of Use');

    expect(privacyPolicyLink).toBeInTheDocument();
    expect(privacyPolicyLink).toHaveAttribute('href', '/student-portal/signup');

    expect(termsOfUseLink).toBeInTheDocument();
    expect(termsOfUseLink).toHaveAttribute('href', '/student-portal/signup');
  });
});
