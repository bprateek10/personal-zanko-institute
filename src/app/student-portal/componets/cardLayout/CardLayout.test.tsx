import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardLayout from '.';
import '@testing-library/jest-dom';

describe('CardLayout Component', () => {
  const mockProps = {
    title: 'John Doe',
    discription: <p>This is a description.</p>,
    content: <p>This is the content.</p>,
    image: 'https://via.placeholder.com/150',
  };

  it('renders the Card with title, description, and content', () => {
    render(<CardLayout {...mockProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();

    expect(screen.getByText('This is a description.')).toBeInTheDocument();

    expect(screen.getByText('This is the content.')).toBeInTheDocument();
  });

  it('renders the Avatar with the correct image and alt text', () => {
    render(<CardLayout {...mockProps} />);

    const avatar = screen.getByAltText(
      "John Doe's profile",
    ) as HTMLImageElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toBe(mockProps.image);
  });

  it('renders the button with the correct text', () => {
    render(<CardLayout {...mockProps} />);

    const button = screen.getByRole('button', { name: /chat with john/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Chat with John');
  });
});
