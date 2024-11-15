import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from './SignupForm';
import { describe, it, expect, vi } from 'vitest';
import { useMutateData } from '@/hooks/useApi';
import { useRouter } from 'next/navigation';

// Mock useMutateData and useRouter hooks
vi.mock('@/hooks/useApi', () => ({
  useMutateData: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('SignupForm Component', () => {
  const mockPush = vi.fn();
  const mockMutateAsync = vi.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useMutateData as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isError: false,
      error: null,
    });
  });

  it('should render the form with all fields', () => {
    render(<SignupForm />);

    expect(screen.getByText('Sign up with Google')).toBeDefined();
    expect(screen.getByLabelText(/First name/i)).toBeDefined();
    expect(screen.getByLabelText(/Last name/i)).toBeDefined();
    expect(screen.getByLabelText(/Email/i)).toBeDefined();
    expect(screen.getByLabelText(/Password/i)).toBeDefined();
    expect(screen.getByText('Sign up')).toBeDefined();
  });

  it('should show validation messages when required fields are not filled', async () => {
    render(<SignupForm />);

    const submitButton = screen.getByText('Sign up');
    await fireEvent.click(submitButton);

    expect(
      await screen.findByText('Please input your first name!'),
    ).toBeDefined();
    expect(screen.getByText('Please input your last name!')).toBeDefined();
    expect(screen.getByText('Please input your email!')).toBeDefined();
    expect(screen.getByText('Please input your password!')).toBeDefined();
  });

  it('should allow the form to be submitted when all fields are valid', async () => {
    mockMutateAsync.mockResolvedValueOnce({ access_token: 'fake-token' });

    render(<SignupForm />);

    // Fill in the form fields
    const firstNameInput = screen.getByLabelText(/First name/i);
    const lastNameInput = screen.getByLabelText(/Last name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    await fireEvent.change(firstNameInput, { target: { value: 'John' } });
    await fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    await fireEvent.change(emailInput, {
      target: { value: 'johndoe@example.com' },
    });
    await fireEvent.change(passwordInput, {
      target: { value: 'password1234' },
    });

    const submitButton = screen.getByText('Sign up');
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        student: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@example.com',
          password: 'password1234',
        },
      });
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/student-portal/setting');
    });
  });

  it('should trigger Google Sign-in button click', async () => {
    render(<SignupForm />);

    const googleButton = screen.getByText('Sign up with Google');
    await fireEvent.click(googleButton);

    expect(screen.getByText('Sign up with Google')).toBeDefined();
  });

  it('should show error message when API request fails', async () => {
    (useMutateData as jest.Mock).mockReturnValueOnce({
      mutateAsync: vi.fn().mockRejectedValueOnce({ message: 'Server Error' }),
      isError: true,
      error: { message: 'Server Error' },
    });

    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password1234' },
    });

    const submitButton = screen.getByText('Sign up');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Server Error')).toBeDefined();
    });
  });
});
