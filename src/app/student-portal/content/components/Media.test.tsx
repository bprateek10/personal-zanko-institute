import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Media from './Media';

describe('GetContent Component', () => {
  const singleImage = ['https://example.com/image1.jpg'];
  const multipleImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ];

  it('renders a single image when contentType is "image"', () => {
    render(<Media contentType="image" images={singleImage} />);
    const backgroundDiv = screen.getByTestId('image-content');
    expect(backgroundDiv).toHaveStyle(
      `background-image: url(${singleImage[0]})`,
    );
    expect(screen.queryByText('prev')).not.toBeInTheDocument();
    expect(screen.queryByText('next')).not.toBeInTheDocument();
  });

  it('renders a multi-image carousel when contentType is "multiimage"', () => {
    render(<Media contentType="multiimage" images={multipleImages} />);
    const carouselItems = screen.getAllByTestId('carousel-content');
    multipleImages.forEach((image, index) => {
      expect(carouselItems[index + 1]).toHaveStyle(
        `background-image: url(${image})`,
      );
    });
  });

  it('renders a default blank container for an unsupported contentType', () => {
    render(<Media contentType="unknown" images={[]} />);
    const defaultDiv = screen.getByTestId('default-content');
    expect(defaultDiv).toHaveClass('h-96 bg-cover bg-color bg-center');
  });
});
