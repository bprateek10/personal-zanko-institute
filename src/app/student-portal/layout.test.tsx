import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmbeddedLayout from './layout';
import {
  UserOutlined,
  PlayCircleOutlined,
  MailOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('EmbeddedLayout Component', () => {
  const items = [
    { label: 'Students', key: 'students', icon: UserOutlined },
    { label: 'Staff', key: 'staff', icon: UserOutlined },
    { label: 'Content', key: 'content', icon: PlayCircleOutlined },
    { label: 'Conversation', key: 'conversation', icon: MailOutlined },
    { label: 'Sign-Up', key: 'signup', icon: LogoutOutlined },
  ];

  it('should render all navigation items', () => {
    render(<EmbeddedLayout>Test Child Content</EmbeddedLayout>);

    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('should highlight the "Students" tab by default', () => {
    render(<EmbeddedLayout>Test Child Content</EmbeddedLayout>);

    const studentsTab = screen.getByText('Students');
    expect(studentsTab).toHaveClass('text-indigo-600');
  });

  it('should change the active tab when a tab is clicked', () => {
    render(<EmbeddedLayout>Test Child Content</EmbeddedLayout>);

    const staffTab = screen.getByText('Staff');
    const studentsTab = screen.getByText('Students');

    // Staff tab is inactive at the beginning
    expect(staffTab).toHaveClass('text-gray-600');

    // Simulate clicking on the 'Staff' tab
    fireEvent.click(staffTab);

    // Expect 'Staff' tab to be active
    expect(staffTab).toHaveClass('text-indigo-600');

    // Expect 'Students' tab to become inactive
    expect(studentsTab).toHaveClass('text-gray-600');
  });

  it('should navigate to correct href when a tab is clicked', () => {
    render(<EmbeddedLayout>Test Child Content</EmbeddedLayout>);

    const contentTab = screen.getByText('Content');

    // Simulate clicking on 'Content' tab
    fireEvent.click(contentTab);

    expect(contentTab.closest('a')).toHaveAttribute(
      'href',
      '/student-portal/content',
    );

    const staffTab = screen.getByText('Staff');

    // Simulate clicking on 'Staff' tab
    fireEvent.click(staffTab);

    expect(staffTab.closest('a')).toHaveAttribute(
      'href',
      '/student-portal/staff',
    );

    const conversationTab = screen.getByText('Conversation');

    // Simulate clicking on 'Conversation' tab
    fireEvent.click(conversationTab);

    expect(conversationTab.closest('a')).toHaveAttribute(
      'href',
      '/student-portal/conversation',
    );

    const signUpTab = screen.getByText('Sign-Up');

    // Simulate clicking on 'Sign-Up' tab
    fireEvent.click(signUpTab);

    expect(signUpTab.closest('a')).toHaveAttribute(
      'href',
      '/student-portal/signup',
    );
  });

  it('should render children content', () => {
    render(<EmbeddedLayout>Test Child Content</EmbeddedLayout>);

    expect(screen.getByText('Test Child Content')).toBeDefined();
  });
});
