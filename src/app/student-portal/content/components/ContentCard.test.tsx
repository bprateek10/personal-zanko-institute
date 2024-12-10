import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContentCard from './ContentCard';
import { useRouter } from 'next/navigation';
import { hasStudentToken } from '@/utils/student/student-auth';

// Mock useRouter from Next.js
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock hasStudentToken function
vi.mock('@/utils/student/student-auth', () => ({
  hasStudentToken: vi.fn(),
}));

describe('ContentCard Component', () => {
  const mockRouterPush = vi.fn();

  const defaultProps = {
    author: 'John Doe',
    profilePicture: 'https://via.placeholder.com/150',
    title: 'Test Title',
    description: 'Test Description',
    date: '2024-11-30',
    views: 123,
    liked: 10,
    readTime: '5 min',
    location: 'New York',
    degree: 'B.Sc',
    images: ['https://via.placeholder.com/600'],
    contentType: 'image',
    countryFlags: ['https://via.placeholder.com/16'],
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (hasStudentToken as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with props', () => {
    render(<ContentCard {...defaultProps} />);

    expect(screen.getByText(/Published by John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    expect(screen.getByText(/123/i)).toBeInTheDocument();
  });

  it('navigates to sign-in when like button is clicked without a token', () => {
    render(<ContentCard {...defaultProps} />);

    const likeButton = screen.getByRole('img', { name: /like/i });
    fireEvent.click(likeButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/student-portal/signin');
  });

  it('toggles the like state when clicked', () => {
    (hasStudentToken as jest.Mock).mockReturnValue(true);

    render(<ContentCard {...defaultProps} />);

    const likeButton = screen.getByRole('img', { name: /like/i });
    fireEvent.click(likeButton);

    expect(screen.getByText('11')).toBeInTheDocument();
  });

  it('displays country flags', () => {
    render(<ContentCard {...defaultProps} />);

    const flags = screen.getAllByAltText('flag');
    expect(flags).toHaveLength(defaultProps.countryFlags.length);
  });

  it('renders the date, views, and read time correctly', () => {
    render(<ContentCard {...defaultProps} />);

    expect(screen.getByText(/2024-11-30/i)).toBeInTheDocument();
    expect(screen.getByText(/123/i)).toBeInTheDocument();
    expect(screen.getByText(/5 min/i)).toBeInTheDocument();
  });
});
