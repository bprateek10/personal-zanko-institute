import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import StaffList from './StaffList';

describe('StaffList Component', () => {
  beforeEach(() => {
    render(<StaffList />);
  });

  it('renders the header text', () => {
    const header = screen.getByRole('heading', {
      name: /choose a member of staff to chat to/i,
    });
    expect(header).toBeInTheDocument();
  });

  it('renders the correct number of staff cards', () => {
    // Each card should be rendered directly based on the staffMembers array
    const staffCards = screen.getAllByRole('img');
    expect(staffCards.length).toBe(2); // Replace with the number of staff members in the array
  });

  it('renders staff member details correctly for the first staff member', () => {
    // Ensure the first staff card renders the correct information
    const firstStaffCard = screen.getByText('Chandra Kretzer');
    expect(firstStaffCard).toBeInTheDocument();

    const firstRole = screen.getByText(
      'MBA and Graduate Certificate in Leadership (GCL) Programs Advisor',
    );
    expect(firstRole).toBeInTheDocument();

    const firstDepartment = screen.getByText('Edwards Graduate Programs');
    expect(firstDepartment).toBeInTheDocument();

    const firstDescription = screen.getByText(
      'Welcome to the Edwards School of Business, University of Sask...',
    );
    expect(firstDescription).toBeInTheDocument();

    const firstImage = screen.getByAltText("Chandra Kretzer's profile");
    expect(firstImage).toHaveAttribute(
      'src',
      'https://images.unibuddy.co/64d2b3713cb33d55cb1e783c.jpg',
    );
  });

  it('renders staff member details correctly for the second staff member', () => {
    // Ensure the second staff card renders the correct information
    const secondStaffCard = screen.getByText('Kim Stranden');
    expect(secondStaffCard).toBeInTheDocument();

    const secondRole = screen.getByText('Coop Coordinator');
    expect(secondRole).toBeInTheDocument();

    const secondDepartment = screen.getByText('Edwards Career Services');
    expect(secondDepartment).toBeInTheDocument();

    const secondDescription = screen.getByText(
      'I’m here to help answer your queries related to the Co-op Program...',
    );
    expect(secondDescription).toBeInTheDocument();

    const secondImage = screen.getByAltText("Kim Stranden's profile");
    expect(secondImage).toHaveAttribute(
      'src',
      'https://images.unibuddy.co/64d2b3713cb33d55cb1e783c.jpg',
    );
  });
});
