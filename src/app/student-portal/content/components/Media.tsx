import React from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

type GetContentProps = {
  contentType: string;
  images: string[];
};

const Media: React.FC<GetContentProps> = ({ contentType, images = [] }) => {
  switch (contentType) {
    case 'image':
      return (
        <div
          data-testid="image-content"
          className="h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[0]})` }}
        />
      );
    case 'multiimage':
      return (
        <Carousel
          arrows
          prevArrow={
            <LeftOutlined className="absolute left-2 top-1/2 -translate-y-1/2 transform text-white" />
          }
          nextArrow={
            <RightOutlined className="absolute right-2 top-1/2 -translate-y-1/2 transform text-white" />
          }
          dots={{ className: 'carousel-dots' }}
        >
          {images.map((image, index) => (
            <div key={index}>
              <div
                data-testid={`carousel-content`}
                className="h-96 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </Carousel>
      );
    default:
      return (
        <div
          data-testid="default-content"
          data-test
          className="bg-color h-96 bg-cover bg-center"
        />
      );
  }
};

export default Media;
