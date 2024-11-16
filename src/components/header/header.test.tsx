import { render, screen, fireEvent } from '@testing-library/react';
import Header from '.';
import { useQueryClient } from '@tanstack/react-query';
import { getInstituteUser } from '@/utils/institute/institute-user';
import { vi } from 'vitest';
import { useInstituteMutateData } from '@/hooks/institute/useInstituteApi';
import { useRouter } from 'next/navigation';
import { SidebarToggleContext } from '@/context/AppContext';

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(),
}));

vi.mock('@/utils/institute/institute-user', () => ({
  getInstituteUser: vi.fn(),
  removeInstituteUser: vi.fn(),
}));

vi.mock('@/hooks/institute/useInstituteApi', () => ({
  useInstituteMutateData: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Header Component', () => {
  const mockUser = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
  };

  const setCollapsedMock = vi.fn();
  const mockPush = vi.fn();

  const mockLogoutMutation = {
    mutate: vi.fn(),
    isSuccess: false,
  };

  beforeEach(() => {
    (getInstituteUser as jest.Mock).mockReturnValue(mockUser);
    (useQueryClient as jest.Mock).mockReturnValue({
      removeQueries: vi.fn(),
    });
    (useInstituteMutateData as jest.Mock).mockReturnValue(mockLogoutMutation);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('toggles sidebar collapse when button is clicked', () => {
    render(
      <SidebarToggleContext.Provider
        value={{ collapsed: false, setCollapsed: setCollapsedMock }}
      >
        <Header />
      </SidebarToggleContext.Provider>,
    );

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(setCollapsedMock).toHaveBeenCalledWith(true);
  });

  it('opens user profile popover when avatar is clicked', () => {
    render(
      <SidebarToggleContext.Provider
        value={{ collapsed: false, setCollapsed: setCollapsedMock }}
      >
        <Header />
      </SidebarToggleContext.Provider>,
    );

    const avatar = screen.getByAltText('user');
    fireEvent.click(avatar);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls logout mutation on logout click and navigates to login', () => {
    (useInstituteMutateData as jest.Mock).mockReturnValue({
      ...mockLogoutMutation,
      isSuccess: true,
    });

    render(
      <SidebarToggleContext.Provider
        value={{ collapsed: false, setCollapsed: setCollapsedMock }}
      >
        <Header />
      </SidebarToggleContext.Provider>,
    );

    const avatar = screen.getByAltText('user');
    fireEvent.click(avatar);

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockLogoutMutation.mutate).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});
