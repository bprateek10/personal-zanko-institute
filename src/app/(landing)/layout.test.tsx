import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { SidebarToggleContext } from '@/context/AppContext';
import { hasInstituteToken } from '@/utils/institute/institute-auth';
import '@testing-library/jest-dom';
import Layout from './layout';

vi.mock('@/components/header', () => ({
  default: () => <div>Header</div>,
}));

vi.mock('@/components/sidebar', () => ({
  default: () => <div>Sidebar</div>,
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/utils/institute/institute-auth', () => ({
  hasInstituteToken: vi.fn(),
}));

describe('Layout Component', () => {
  let routerPushMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    routerPushMock = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
  });

  describe('when the user has a token', () => {
    beforeEach(() => {
      (hasInstituteToken as jest.Mock).mockReturnValue(true);
    });

    it('should render children and the header and sidebar', () => {
      render(
        <SidebarToggleContext.Provider
          value={{ collapsed: false, setCollapsed: vi.fn() }}
        >
          <Layout>
            <div>Child Content</div>
          </Layout>
        </SidebarToggleContext.Provider>,
      );

      expect(screen.getByText('Child Content')).toBeInTheDocument();
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Sidebar')).toBeInTheDocument();
    });

    it('should not show the loading state', () => {
      render(
        <SidebarToggleContext.Provider
          value={{ collapsed: false, setCollapsed: vi.fn() }}
        >
          <Layout>
            <div>Child Content</div>
          </Layout>
        </SidebarToggleContext.Provider>,
      );

      expect(screen.queryByTestId('loader')).toBeNull();
    });

    it('should render the correct sidebar collapse behavior', () => {
      const { rerender } = render(
        <SidebarToggleContext.Provider
          value={{ collapsed: true, setCollapsed: vi.fn() }}
        >
          <Layout>
            <div>Child Content</div>
          </Layout>
        </SidebarToggleContext.Provider>,
      );

      expect(screen.getByText('Child Content')).toBeInTheDocument();
      expect(screen.getByText('Sidebar')).toBeInTheDocument();

      rerender(
        <SidebarToggleContext.Provider
          value={{ collapsed: false, setCollapsed: vi.fn() }}
        >
          <Layout>
            <div>Child Content</div>
          </Layout>
        </SidebarToggleContext.Provider>,
      );

      expect(screen.getByText('Sidebar')).toBeInTheDocument();
    });
  });

  describe('when the user does not have a token', () => {
    beforeEach(() => {
      (hasInstituteToken as jest.Mock).mockReturnValue(false);
    });
    it('should redirect to the login page', async () => {
      render(
        <SidebarToggleContext.Provider
          value={{ collapsed: false, setCollapsed: vi.fn() }}
        >
          <Layout>
            <div>Child Content</div>
          </Layout>
        </SidebarToggleContext.Provider>,
      );

      await waitFor(() =>
        expect(routerPushMock).toHaveBeenCalledWith('/login'),
      );
    });

    it('should show the loading state while checking the token', () => {
      render(
        <SidebarToggleContext.Provider
          value={{ collapsed: false, setCollapsed: vi.fn() }}
        >
          <Layout>
            <div>Child Content</div>
          </Layout>
        </SidebarToggleContext.Provider>,
      );

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });
});
