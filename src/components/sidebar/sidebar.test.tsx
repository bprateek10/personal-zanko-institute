import { render, screen, act } from '@testing-library/react';
import {
  SidebarToggleContext,
  SidebarToggleContextType,
} from '../../context/AppContext';
import Sidebar from '.';
import { items } from './sidebarItems';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
  usePathname: vi.fn().mockReturnValue('/home'),
}));

const renderWithContext = (collapsed: boolean) => {
  const contextValue: SidebarToggleContextType = {
    collapsed,
    setCollapsed: vi.fn(),
  };

  return render(
    <SidebarToggleContext.Provider value={contextValue}>
      <Sidebar />
    </SidebarToggleContext.Provider>,
  );
};

describe('Sidebar Component', () => {
  it('renders with expanded width when not collapsed', async () => {
    await act(async () => {
      renderWithContext(false);
    });

    const sidebar = screen.getByRole('navigation');

    expect(sidebar).toHaveClass('w-32');
    expect(sidebar).toHaveClass('md:w-44');
  });

  it('renders with collapsed width when collapsed', async () => {
    await act(async () => {
      renderWithContext(true);
    });

    const sidebar = screen.getByRole('navigation');

    expect(sidebar).toHaveClass('w-[75px]');
    expect(sidebar).toHaveClass('md:w-20');
  });

  it('renders menu items', async () => {
    await act(async () => {
      renderWithContext(false);
    });

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems.length).toBe(items.length);
  });
});
