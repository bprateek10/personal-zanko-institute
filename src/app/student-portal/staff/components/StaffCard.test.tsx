import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StaffCard from './StaffCard';

describe('StaffCard Component', () => {
  const mockProps = {
    name: 'Chandra Kretzer',
    role: 'MBA and Graduate Certificate in Leadership (GCL) Programs Advisor',
    department: 'Edwards Graduate Programs',
    description:
      'Welcome to the Edwards School of Business, University of Sask...',
    image: 'https://images.unibuddy.co/64d2b3713cb33d55cb1e783c.jpg',
  };

  it('renders the staff name', () => {
    render(<StaffCard {...mockProps} />);
    const nameElement = screen.getByText(mockProps.name);
    expect(nameElement).toBeInTheDocument();
  });

  it('renders the staff role', () => {
    render(<StaffCard {...mockProps} />);
    const roleElement = screen.getByText(mockProps.role);
    expect(roleElement).toBeInTheDocument();
  });

  it('renders the staff department', () => {
    render(<StaffCard {...mockProps} />);
    const departmentElement = screen.getByText(mockProps.department);
    expect(departmentElement).toBeInTheDocument();
  });

  it('renders the role description', () => {
    render(<StaffCard {...mockProps} />);
    const descriptionElement = screen.getByText(mockProps.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the staff image', () => {
    render(<StaffCard {...mockProps} />);
    const avatarImage = screen.getByAltText(`${mockProps.name}'s profile`);
    expect(avatarImage).toHaveAttribute('src', mockProps.image);
  });

  it('renders the chat button with the correct text', () => {
    render(<StaffCard {...mockProps} />);
    const buttonElement = screen.getByRole('button', {
      name: `Chat with ${mockProps.name.split(' ')[0]}`,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies correct styles to the card and button', () => {
    render(<StaffCard {...mockProps} />);
    const cardElement = screen.getByText(mockProps.name).closest('.ant-card');
    const buttonElement = screen.getByRole('button', {
      name: `Chat with ${mockProps.name.split(' ')[0]}`,
    });

    expect(cardElement).toHaveClass('!mt-4 rounded-lg');
    expect(buttonElement).toHaveClass(
      'border-none bg-green-600 font-semibold text-white hover:bg-green-700',
    );
  });
});
