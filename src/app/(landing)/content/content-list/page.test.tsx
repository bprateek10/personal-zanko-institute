import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ContentListing from './page';

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src }: { src: string }) => <img src={src} alt="mocked" />,
}));

describe('Content Component', () => {
  describe('Rendering UI Elements', () => {
    it('should render the Content heading', () => {
      render(<ContentListing />);
      const heading = screen.getByText('Content');
      expect(heading).toBeInTheDocument();
    });

    it('should render the New Post button and be clickable', () => {
      render(<ContentListing />);
      const newPostButton = screen.getByRole('button', { name: /New Post/i });
      expect(newPostButton).toBeInTheDocument();
      fireEvent.click(newPostButton);
    });

    it('should render the Filter component', () => {
      render(<ContentListing />);
      expect(screen.getByTestId('filter')).toBeInTheDocument();
    });
  });

  describe('Infinite Scroll', () => {
    it('should load more data when "Load More" button is clicked', async () => {
      render(<ContentListing />);
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
    it('should render the Listing component', () => {
      render(<ContentListing />);
      expect(screen.getByTestId('list')).toBeInTheDocument();
    });
  });
});
