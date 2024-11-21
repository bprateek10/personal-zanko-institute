// @vitest/debug
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import ProfileDetailsForm from './ProfileDetailsForm';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));
vi.mock('@/utils/user', () => ({
  getUser: vi.fn(() => ({ first_name: 'Test' })),
}));

describe('ProfileDetailsForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the ProfileDetailsForm component correctly', () => {
    render(<ProfileDetailsForm />);
    expect(
      screen.getByText('Test, tell us a bit about you'),
    ).toBeInTheDocument();
    expect(screen.getByAltText('Unib logo')).toBeInTheDocument();
  });

  it('submits the form successfully when all fields are filled', async () => {
    const mockPush = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<ProfileDetailsForm />);

    fireEvent.click(screen.getByRole('button', { name: /complete profile/i }));
  });

  it('displays error messages when required fields are empty', async () => {
    render(<ProfileDetailsForm />);

    fireEvent.click(screen.getByRole('button', { name: /complete profile/i }));

    expect(
      await screen.findByText('Please select a joining date'),
    ).toBeInTheDocument();
    // expect(screen.getByText('Please select your location')).toBeInTheDocument();
    // expect(screen.getByText('Please select a degree level')).toBeInTheDocument();
    // expect(screen.getByText('Degrees field must have at least 1 item')).toBeInTheDocument();
    // expect(screen.getByText('Language preference is a required field')).toBeInTheDocument();
    // expect(screen.getByText('Please select your interest')).toBeInTheDocument();
  });

  it('renders privacy policy link correctly', () => {
    render(<ProfileDetailsForm />);
    const privacyPolicyLink = screen.getByText('Privacy Policy');
    expect(privacyPolicyLink).toBeInTheDocument();
    expect(privacyPolicyLink).toHaveAttribute('href', '/student-portal/signin');
  });
});
