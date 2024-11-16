import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import LoginForm from '.';
import {
  useInstituteMutateData,
  useInstituteGetData,
} from '@/hooks/institute/useInstituteApi';
import { setInstituteToken } from '@/utils/institute/institute-auth';
import { useRouter } from 'next/navigation';

vi.mock('@/hooks/institute/useInstituteApi', () => ({
  useInstituteMutateData: vi.fn(),
  useInstituteGetData: vi.fn(),
}));

vi.mock('@/utils/institute/institute-auth', () => ({
  setInstituteToken: vi.fn(),
}));

vi.mock('@/utils/institute/institute-user', () => ({
  setInstituteUser: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('LoginForm', () => {
  const mockPush = vi.fn();
  const mockMutateAsync = vi.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useInstituteMutateData as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isError: false,
      isPending: false,
    });
    (useInstituteGetData as jest.Mock).mockReturnValue({
      data: null,
      refetch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();
  });

  it('submits the form and handles login', async () => {
    const mockData = { access_token: 'fake_token' };
    mockMutateAsync.mockResolvedValue(mockData);
    (useInstituteGetData as jest.Mock).mockReturnValue({
      data: { id: 1, email: 'test@example.com' },
      refetch: vi.fn(),
    });

    render(<LoginForm />);

    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(setInstituteToken).toHaveBeenCalledWith(mockData.access_token);
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('validates email and password fields', async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByText(/Login/i));

    expect(
      await screen.findByText(/Please enter a valid email/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Please enter a password/i),
    ).toBeInTheDocument();
  });
});
