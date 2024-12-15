import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import RequestsList from './page';

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src }: { src: string }) => <img src={src} alt="mocked" />,
}));

describe('Content Component', () => {
  describe('Rendering UI Elements', () => {
    it('should render the Content heading', () => {
      render(<RequestsList />);
      const heading = screen.getByText('Approval Requests');
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Infinite Scroll', () => {
    it('should load more data when "Load More" button is clicked', async () => {
      render(<RequestsList />);
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(21);

      const scrollableDiv = screen.getByTestId('scrollableDiv');
      fireEvent.scroll(scrollableDiv, {
        target: { scrollY: 1000 },
      });

      await waitFor(() => {
        const updatedListItems = screen.getAllByRole('listitem');
        expect(updatedListItems).toHaveLength(42);
      });
    });
  });

  it('should render the Listing component', () => {
    render(<RequestsList />);
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });
});
