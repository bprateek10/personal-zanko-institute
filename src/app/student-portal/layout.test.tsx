import { render, screen, fireEvent } from '@testing-library/react';
import EmbeddedLayout from './layout';
import { describe, it, expect, vi } from 'vitest';
import { useRouter } from 'next/navigation';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('EmbeddedLayout Component', () => {
  it('renders the tabs correctly', () => {
    render(
      <EmbeddedLayout>
        <div>Test Content</div>
      </EmbeddedLayout>,
    );

    expect(screen.getByText('Students')).toBeDefined();
    expect(screen.getByText('Staff')).toBeDefined();
    expect(screen.getByText('Content')).toBeDefined();
    expect(screen.getByText('Conversation')).toBeDefined();
    expect(screen.getByText('Sign-Up')).toBeDefined();
  });

  it('should navigate to the correct route on tab change', () => {
    const router = useRouter();
    render(
      <EmbeddedLayout>
        <div>Test Content</div>
      </EmbeddedLayout>,
    );

    // Simulate a tab click on "Staff"
    fireEvent.click(screen.getByText('Staff'));

    // Verify if the `router.push` was called with the correct route
    expect(mockPush).toHaveBeenCalledWith('/student-portal/staff');

    // Simulate a tab click on "Conversation"
    fireEvent.click(screen.getByText('Conversation'));
    expect(mockPush).toHaveBeenCalledWith('/student-portal/conversation');

    // Simulate a tab click on "Content"
    fireEvent.click(screen.getByText('Content'));
    expect(mockPush).toHaveBeenCalledWith('/student-portal/content');

    // Simulate a tab click on "SignUp"
    fireEvent.click(screen.getByText('Sign-Up'));
    expect(mockPush).toHaveBeenCalledWith('/student-portal/signup');
  });
});
