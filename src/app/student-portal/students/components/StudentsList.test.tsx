import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StudentsList from './StudentsList';
import { describe, it, expect } from 'vitest';

describe('StudentsList Component', () => {
  it('renders the title and subtitle correctly', () => {
    render(<StudentsList />);
    expect(
      screen.getByRole('heading', { name: /choose a student to chat to/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Since September 2020,/i)).toBeInTheDocument();
    expect(screen.getByText(/9099 questions/i)).toBeInTheDocument();
    expect(
      screen.getByText(/have been answered by our Students./i),
    ).toBeInTheDocument();
  });

  it('renders a StudentCard for each student', () => {
    render(<StudentsList />);
    expect(screen.getByText('Sunaina')).toBeInTheDocument();
    expect(
      screen.getByText(/Bachelor of Commerce - Accounting \(B.Com\)/i),
    ).toBeInTheDocument();
    const location = screen.getAllByText('Jeddah, Saudi Arabia');
    expect(location[0]).toBeInTheDocument();
  });

  it('toggles the loading state when the button is clicked', () => {
    render(<StudentsList />);

    const button = screen.getByRole('button', { name: /see more students/i });
    expect(button).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });
});
