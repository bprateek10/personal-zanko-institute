import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FilterSection from './FilterSection';
import { describe, it, expect } from 'vitest';

describe('FilterSection Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders all input fields', () => {
    render(<FilterSection />);

    expect(screen.getByPlaceholderText('Search title')).toBeInTheDocument();

    expect(screen.getByText('Topic')).toBeInTheDocument();

    expect(screen.getByText('Area Of Study')).toBeInTheDocument();

    expect(screen.getByText('Sort')).toBeInTheDocument();
  });

  it('updates state when search title is changed', () => {
    render(<FilterSection />);

    const searchInput = screen.getByPlaceholderText('Search title');
    fireEvent.change(searchInput, { target: { value: 'New Title' } });

    expect(searchInput).toHaveValue('New Title');
  });

  it('updates state when a topic is selected', async () => {
    render(<FilterSection />);

    const topicDropdown = screen.getByRole('combobox', { name: 'topics' });
    await fireEvent.change(topicDropdown, { target: { value: 'Science' } });

    await expect(screen.getByText('Science')).toBeInTheDocument();
  });

  it('updates state when area of study is selected', async () => {
    render(<FilterSection />);
    const areaDropdown = screen.getByRole('combobox', { name: 'areaOfStudy' });

    await fireEvent.change(areaDropdown, { target: { value: 'Business' } });

    await expect(screen.getByText('Business')).toBeInTheDocument();
  });

  it('updates state when sort option is selected', async () => {
    render(<FilterSection />);

    const sortDropdown = screen.getByRole('combobox', { name: 'sort' });

    await fireEvent.change(sortDropdown, { target: { value: 'Most viewed' } });

    waitFor(() => {
      expect(screen.getByText('Most viewed')).toBeInTheDocument();
    });
  });
});
