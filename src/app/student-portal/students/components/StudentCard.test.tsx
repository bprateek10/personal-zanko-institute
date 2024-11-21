import { render, screen, fireEvent } from '@testing-library/react';
import StudentCard from './StudentCard';

describe('StudentCard Component', () => {
  const mockProps = {
    name: 'John Doe',
    degree: 'Masters in Computer Science',
    location: 'California, USA',
    about:
      'I am passionate about technology and coding. I love building innovative projects.',
    qualification: 'Bachelors in Software Engineering',
    countryFlags: ['https://flagcdn.com/us.svg', 'https://flagcdn.com/ca.svg'],
    profileImage: 'https://example.com/john-doe.jpg',
  };

  test('renders student details correctly', () => {
    render(<StudentCard {...mockProps} />);

    // Check that name, degree, and location are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Masters in Computer Science')).toBeInTheDocument();
    const locationTexts = screen.getAllByText('California, USA');
    expect(locationTexts[0]).toBeInTheDocument();

    // Check the "Chat with" button
    expect(
      screen.getByRole('button', { name: /Chat with John Doe/i }),
    ).toBeInTheDocument();

    // Check that the about text is rendered
    expect(
      screen.getByText(
        'I am passionate about technology and coding. I love building innovative projects.',
      ),
    ).toBeInTheDocument();

    // Check that the qualification text is rendered
    expect(screen.getByText('Previous Qualification:')).toBeInTheDocument();
    expect(
      screen.getByText('Bachelors in Software Engineering'),
    ).toBeInTheDocument();
  });

  test('renders the profile image', () => {
    render(<StudentCard {...mockProps} />);
    const avatarImage = screen.getByAltText("John Doe's profile");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      'src',
      'https://example.com/john-doe.jpg',
    );
  });

  test('renders the country flags', () => {
    render(<StudentCard {...mockProps} />);

    // Check that all country flags are rendered
    const flagImages = screen.getAllByAltText('flag');
    expect(flagImages).toHaveLength(2);
    expect(flagImages[0]).toHaveAttribute('src', 'https://flagcdn.com/us.svg');
    expect(flagImages[1]).toHaveAttribute('src', 'https://flagcdn.com/ca.svg');
  });

  test('handles button click event', async () => {
    render(<StudentCard {...mockProps} />);

    // Simulate a button click
    const chatButton = screen.getByRole('button', {
      name: /Chat with John Doe/i,
    });
    await fireEvent.click(chatButton);

    // Expect no action here as there's no click handler (can add mocks later)
    expect(chatButton).toBeInTheDocument();
  });

  test('renders about text with ellipsis', () => {
    render(<StudentCard {...mockProps} />);

    const aboutParagraph = screen.getByText(
      /I am passionate about technology/i,
    );
    expect(aboutParagraph).toBeInTheDocument();
  });
});
