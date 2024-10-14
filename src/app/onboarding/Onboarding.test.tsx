import { render, screen } from '@testing-library/react';
import Onboarding from './page';

describe('Onboarding Component', () => {
  it('renders logo image', () => {
    render(<Onboarding />);

    // Check if the logo is rendered
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('renders welcome message and instruction', () => {
    render(<Onboarding />);

    // Check if the welcome message and instruction are rendered
    expect(screen.getByText(/welcome!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please complete your profile/i),
    ).toBeInTheDocument();
  });

  it('renders OnboardingForm component', () => {
    render(<Onboarding />);

    // Check if the email input is rendered
    const emailInput = screen.getByLabelText(/email/i); // Adjust the label text as per your form
    expect(emailInput).toBeInTheDocument();
  });

  it('renders powered by text', () => {
    render(<Onboarding />);

    // Check if the powered by text is rendered
    expect(screen.getByText(/powered by/i)).toBeInTheDocument();
  });
});
