import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Listing from '.';

const mockOpenModal = vi.fn();

const mockData = [
  {
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    author: 'John Doe',
    content:
      'This is a content preview. It should be trimmed if it is too long.',
    img: [
      'https://via.placeholder.com/500x500',
      'https://via.placeholder.com/500x500',
    ],
    status: 'Published',
    date: '2024-12-09',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    author: 'Jane Smith',
    content: 'A short content.',
    img: ['https://via.placeholder.com/500x500'],
    status: 'Draft',
    date: '2024-12-10',
  },
];

describe('Listing Component', () => {
  it('should render correctly with given data', () => {
    render(<Listing data={mockData} openModal={mockOpenModal} />);
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
    expect(screen.getByText(/This is a content preview/)).toBeInTheDocument();
    expect(screen.getByText(/A short content./)).toBeInTheDocument();
    expect(screen.getByText('Published'));
    expect(screen.getByText('Draft'));
  });

  it('should render images inside the carousel', async () => {
    render(<Listing data={mockData} openModal={mockOpenModal} />);
    const carousel = document.querySelector('.ant-carousel');
    expect(carousel).not.toBeNull();
    if (carousel) {
      const images = carousel.querySelectorAll('img');
      expect(images).toHaveLength(2);
    }
  });

  it('should render "Draft" or "Publish" in the dropdown based on the item status', () => {
    render(<Listing data={mockData} openModal={mockOpenModal} />);
    const dropdownButton = screen.getAllByRole('button')[0];
    fireEvent.mouseEnter(dropdownButton);
    expect(screen.getByText(/Preview/i)).toBeInTheDocument();
    expect(screen.getByText(/Draft/i)).toBeInTheDocument();
    const dropdownButton2 = screen.getAllByRole('button')[1];
    fireEvent.mouseEnter(dropdownButton2);
    expect(screen.getByText(/Publish/i)).toBeInTheDocument();
  });

  it('should truncate content and show "Read More" when content exceeds 150 characters and openModal when "Read More" is clicked', () => {
    const longContentData = [
      {
        avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
        author: 'John Doe',
        content: 'A very long content '.repeat(10),
        img: ['https://via.placeholder.com/500x500'],
        status: 'Published',
        date: '2024-12-09',
      },
    ];
    render(<Listing data={longContentData} openModal={mockOpenModal} />);
    const content = screen.getByText(/A very long content/);
    expect(content).toBeInTheDocument();
    expect(content.textContent?.length).toBeGreaterThan(150);
    expect(screen.getByText('Read More')).toBeInTheDocument();
    const readMoreLink = screen.getByText('Read More');
    fireEvent.click(readMoreLink);
    expect(mockOpenModal).toHaveBeenCalledWith(longContentData[0]);
  });

  it('should show the correct date tag', () => {
    render(<Listing data={mockData} openModal={mockOpenModal} />);
    expect(screen.getByText('2024-12-09')).toBeInTheDocument();
  });
});
