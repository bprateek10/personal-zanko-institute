import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Header from '.';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/student-portal/students'),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/utils/student/student-auth', () => ({
  hasStudentToken: vi.fn(),
}));

import { hasStudentToken } from '@/utils/student/student-auth';

describe('Header Component', () => {
  it('should render all visible tabs when user is authenticated', async () => {
    (hasStudentToken as jest.Mock).mockReturnValue(true);
    render(<Header />);

    const contentTab = screen.getByText('Conversation');
    fireEvent.click(contentTab);

    expect(screen.getByText('Students')).toBeInTheDocument();
    expect(screen.getByText('Staff')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Conversation')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();

    expect(screen.queryByText('Sign-Up')).toBeNull();
  });

  it('should render all visible tabs when user is not authenticated', () => {
    (hasStudentToken as jest.Mock).mockReturnValue(false);
    render(<Header />);

    const contentTab = screen.getByText('Conversation');
    fireEvent.click(contentTab);

    expect(screen.getByText('Students')).toBeInTheDocument();
    expect(screen.getByText('Staff')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Conversation')).toBeInTheDocument();
    expect(screen.getByText('Sign-Up')).toBeInTheDocument();

    expect(screen.queryByText('Settings')).toBeNull();
  });

  it('should navigate to the correct tab when clicked', async () => {
    (hasStudentToken as jest.Mock).mockReturnValue(true);
    render(<Header />);

    const staffTab = screen.getByText('Staff');
    const studentsTab = screen.getByText('Students');

    expect(staffTab).toHaveClass('text-gray-600');

    await fireEvent.click(staffTab);

    expect(studentsTab).toHaveClass('text-gray-600');

    expect(staffTab).toHaveClass('text-indigo-600');
  });

  it('should highlight the current tab based on pathname', () => {
    (hasStudentToken as jest.Mock).mockReturnValue(true);
    render(<Header />);

    const studentsTab = screen.getByText('Students');
    expect(studentsTab).toHaveClass('text-indigo-600');

    const staffTab = screen.getByText('Staff');
    expect(staffTab).not.toHaveClass('text-indigo-600');
  });

  it('should replace "Sign-Up" tab with "Settings" tab if authenticated', async () => {
    (hasStudentToken as jest.Mock).mockReturnValue(true);
    render(<Header />);

    const contentTab = screen.getByText('Conversation');
    fireEvent.click(contentTab);

    await waitFor(() => {
      expect(screen.queryByText('Sign-Up')).toBeNull();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
  });
});
