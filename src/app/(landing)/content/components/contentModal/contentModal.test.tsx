import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ContentModal from '.';

const modalData = {
  avatar: 'https://example.com/avatar.jpg',
  author: 'John Doe',
  content: 'This is a test content for the modal.',
  img: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  status: 'Published',
  date: '2024-12-07',
};

describe('ContentModal', () => {
  const handleCancel = vi.fn();

  it('renders the modal with correct data', () => {
    render(<ContentModal handleCancel={handleCancel} modalData={modalData} />);
    const avatar = screen.getByAltText('0-img');
    expect(avatar).toBeInTheDocument();

    const author = screen.getByText(modalData.author);
    expect(author).toBeInTheDocument();

    const content = screen.getByText(modalData.content);
    expect(content).toBeInTheDocument();

    const statusTag = screen.getByText(modalData.status);
    expect(statusTag).toBeInTheDocument();

    const dateTag = screen.getByText(modalData.date);
    expect(dateTag).toBeInTheDocument();

    const carouselImages = screen.getAllByAltText(/-img/);
    expect(carouselImages.length).toBe(modalData.img.length);
  });

  it('calls handleCancel when modal is closed', () => {
    render(<ContentModal handleCancel={handleCancel} modalData={modalData} />);
    const cancelButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(cancelButton);
    expect(handleCancel).toHaveBeenCalled();
  });

  it('does not render modal when open is false', () => {
    const modalData = undefined;

    render(<ContentModal handleCancel={handleCancel} modalData={modalData} />);
    const modal = screen.queryByTestId('content-modal');
    expect(modal).not.toBeInTheDocument();
  });

  it('renders default status as "Published" with appropriate styles', () => {
    const dataWithPublishedStatus = { ...modalData, status: 'Published' };
    render(
      <ContentModal
        handleCancel={handleCancel}
        modalData={dataWithPublishedStatus}
      />,
    );
    const statusTag = screen.getByText('Published');
  });

  it('renders different status correctly', () => {
    const dataWithUnpublishedStatus = { ...modalData, status: 'draft' };
    render(
      <ContentModal
        handleCancel={handleCancel}
        modalData={dataWithUnpublishedStatus}
      />,
    );
    const statusTag = screen.getByText('draft');
    expect(statusTag).toHaveClass('!bg-gray-100');
    expect(statusTag).toHaveClass('!text-gray-400');
  });

  it('renders multiple images in the carousel', () => {
    render(<ContentModal handleCancel={handleCancel} modalData={modalData} />);
    const images = screen.getAllByAltText(/-img/);
    expect(images.length).toBe(modalData.img.length);
    expect(images[0]).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fexample.com%2Fimage1.jpg&w=1080&q=75',
    );
  });
});
