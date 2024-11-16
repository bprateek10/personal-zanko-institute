import { render, screen } from '@testing-library/react';
import Login from './page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const renderWithQueryClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('Login Component', () => {
  it('renders correctly', () => {
    renderWithQueryClient(<Login />);

    const titleElement = screen.getByRole('heading', { name: /sign in/i });
    expect(titleElement).toBeInTheDocument();

    const logoImage = screen.getByAltText('logo');
    const coverImage = screen.getByAltText('cover');
    expect(logoImage).toBeInTheDocument();
    expect(coverImage).toBeInTheDocument();

    const descriptionElement = screen.getByText(/where amazing things happen/i);
    expect(descriptionElement).toBeInTheDocument();

    const loginForm = screen.getByLabelText(/email/i);
    expect(loginForm).toBeInTheDocument();
  });
});
