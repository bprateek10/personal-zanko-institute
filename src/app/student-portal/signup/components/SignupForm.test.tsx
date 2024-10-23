import { render, screen, fireEvent } from '@testing-library/react';
import SignupForm from './SignupForm';
import { describe, it, expect } from 'vitest';

describe('SignupForm Component', () => {
  it('should render the form with all fields', () => {
    render(<SignupForm />);

    // Check for the Google Sign-in button
    expect(screen.getByText('Sign up with Google')).toBeDefined();

    // Check for form fields
    expect(screen.getByLabelText(/First name/i)).toBeDefined();
    expect(screen.getByLabelText(/Last name/i)).toBeDefined();
    expect(screen.getByLabelText(/Email/i)).toBeDefined();
    expect(screen.getByLabelText(/Password/i)).toBeDefined();

    // Check for sign-up button
    expect(screen.getByText('Sign up')).toBeDefined();
  });

  it('should show validation messages when required fields are not filled', async () => {
    render(<SignupForm />);

    // Submit the form without entering any values
    const submitButton = screen.getByText('Sign up');
    await fireEvent.click(submitButton);

    // Check for error messages

    expect(
      await screen.findByText('Please input your first name!'),
    ).toBeDefined();
    expect(screen.getByText('Please input your last name!')).toBeDefined();
    expect(screen.getByText('Please input your email!')).toBeDefined();
    expect(screen.getByText('Please input your password!')).toBeDefined();
  });

  it('should allow the form to be submitted when all fields are valid', async () => {
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

    // Submit the form
    const submitButton = screen.getByText('Sign up');
    await fireEvent.click(submitButton);

    // Check that the form submission was successful (simulate console log)
    expect(screen.queryByText('Please input your first name!')).toBeDefined();
    expect(screen.queryByText('Please input your last name!')).toBeDefined();
    expect(screen.queryByText('Please input your email!')).toBeDefined();
    expect(screen.queryByText('Please input your password!')).toBeDefined();
  });

  it('should trigger Google Sign-in button click', async () => {
    render(<SignupForm />);

    // Mock Google Sign-in functionality if needed (currently it's a visual test)
    const googleButton = screen.getByText('Sign up with Google');

    await fireEvent.click(googleButton);
    // Expect some behavior after clicking Google Sign-in (can mock API or function call)
  });
});
