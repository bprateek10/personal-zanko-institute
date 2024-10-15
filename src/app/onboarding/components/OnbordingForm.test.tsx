import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OnboardingForm from './OnbordingForm';

describe('OnboardingForm Component', () => {
  it('renders correctly', () => {
    render(<OnboardingForm />);

    // Check if the form fields are rendered
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm pass/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /continue/i }),
    ).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<OnboardingForm />);

    // Click the continue button without filling out the form
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Check for validation messages
    expect(
      await screen.findByText(/please input your first name/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please input your last name/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please input your valid email/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please input your password/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please confirm your password/i),
    ).toBeInTheDocument(); // Confirm Password
  });

  it('logs correct values on valid submission', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<OnboardingForm />);

    // Fill out the form with valid data
    fireEvent.input(screen.getByLabelText(/first name/i), {
      target: { value: 'John' },
    });
    fireEvent.input(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.input(screen.getByLabelText(/confirm pass/i), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Verify that console.log was called with the correct values
    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith('Success:', {
        fName: 'John',
        lName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        confirm_password: 'password123',
      });
    });

    logSpy.mockRestore();
  });
});
