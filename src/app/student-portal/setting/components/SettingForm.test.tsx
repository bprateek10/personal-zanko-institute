import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingForm from './SettingForm';
import { vi } from 'vitest';
import { useRouter } from 'next/navigation';
import { useMutateData } from '@/hooks/useApi';
import { removeToken } from '@/utils/auth';
import { removeUser } from '@/utils/user';

vi.mock('@/hooks/useApi');
vi.mock('@/utils/auth');
vi.mock('@/utils/user');
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('SettingForm', () => {
  const mockMutateAsync = vi.fn();
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useMutateData as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });
    vi.clearAllMocks();
  });

  test('renders form with initial values', () => {
    render(<SettingForm />);
    expect(screen.getByLabelText('First Name')).toHaveValue('Ronak');
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Mobile')).toHaveValue('9313771269');
  });

  test('toggles edit mode for first name and validates input', async () => {
    render(<SettingForm />);

    const editButton = screen.getAllByText('Edit')[0];
    fireEvent.click(editButton);

    const firstNameInput = screen.getByLabelText('First Name');
    expect(firstNameInput).not.toBeDisabled();

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => expect(firstNameInput).toHaveValue('John'));
  });

  test('displays validation error for required fields', async () => {
    render(<SettingForm />);

    const emailEditButton = screen.getAllByText('Edit')[2];
    fireEvent.click(emailEditButton);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: '' } });
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(await screen.findByText('Please enter a valid email')).toBeDefined();
  });

  test('switch toggles for notification preferences', () => {
    render(<SettingForm />);

    const switches = screen.getAllByRole('switch');
    //Email
    expect(switches[0]).toBeChecked();

    fireEvent.click(switches[0]);
    expect(switches[0]).not.toBeChecked();

    //SMS
    expect(switches[1]).not.toBeChecked();

    fireEvent.click(switches[1]);
    expect(switches[1]).toBeChecked();
  });

  test('renders privacy policy and other links', () => {
    render(<SettingForm />);

    expect(
      screen.getByRole('link', { name: 'Unib Privacy Policy' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Terms of Use' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: 'Contact Unibuddy for technical support questions',
      }),
    ).toBeInTheDocument();
  });

  test('renders delete account and log out buttons', () => {
    render(<SettingForm />);

    expect(
      screen.getByRole('link', { name: 'Delete account' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });

  test('calls logout mutation and redirects on log out', async () => {
    render(<SettingForm />);

    const logoutButton = screen.getByRole('button', { name: 'Log out' });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
      expect(removeToken).toHaveBeenCalledWith('students');
      expect(removeUser).toHaveBeenCalledWith('students');
      expect(mockPush).toHaveBeenCalledWith('/student-portal/signin');
    });
  });
});
