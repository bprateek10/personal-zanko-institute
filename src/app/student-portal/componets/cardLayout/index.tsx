import React from 'react';
import { Card, Avatar, Button, Typography } from 'antd';

const { Meta } = Card;

type CardProps = {
  title: string;
  discription: React.ReactNode;
  content: React.ReactNode;
  image: string;
};

const CardLayout: React.FC<CardProps> = ({
  title,
  discription,
  content,
  image,
}) => {
  return (
    <Card
      hoverable
      bordered
      data-testid="card-layout"
      className="!mt-4 rounded-lg border border-gray-200 transition-shadow hover:shadow-xl"
    >
      <Meta
        avatar={
          <Avatar
            alt={`${title}'s profile`}
            src={image}
            size={100}
            className="object-cover"
          />
        }
        title={title}
        description={discription}
      />

      <div className="mt-4">
        <Button
          type="primary"
          block
          className="border-none bg-green-600 font-semibold text-white hover:bg-green-700"
        >
          Chat with {title.split(' ')[0]}
        </Button>
      </div>

      <div className="mt-4">{content}</div>
    </Card>
  );
};

export default CardLayout;
