import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContentList from './ContentList';

// Mock components used in ContentList
vi.mock('./FilterSection', () => ({
  default: () => <div>Mock Filter Section</div>,
}));

vi.mock('./ContentCard', () => ({
  default: (props: any) => <div>Mock ContentCard - {props.title}</div>,
}));

describe('ContentList Component', () => {
  it('renders the FilterSection and ContentCard components', () => {
    render(<ContentList />);

    // Verify the FilterSection is rendered
    expect(screen.getByText('Mock Filter Section')).toBeInTheDocument();

    // Verify the ContentCards are rendered
    expect(
      screen.getByText('Mock ContentCard - Top 5 things to do in Saskatoon'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Mock ContentCard - Improving your Mental Health'),
    ).toBeInTheDocument();
  });

  it('renders the "See more" button', () => {
    render(<ContentList />);

    const button = screen.getByRole('button', { name: /See more/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles the loading state on button click', () => {
    render(<ContentList />);

    const button = screen.getByRole('button', { name: /See more/i });

    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('ant-btn-loading');

    fireEvent.click(button);

    expect(button).toHaveClass('ant-btn-loading');
  });

  it('displays correct number of content cards', () => {
    render(<ContentList />);

    const contentCards = screen.getAllByText(/Mock ContentCard -/);
    expect(contentCards).toHaveLength(2);
  });
});
