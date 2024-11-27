import React from 'react';
import { Typography } from 'antd';
import CardLayout from '../../componets/cardLayout';

const { Text, Paragraph } = Typography;

type StaffCardProps = {
  name: string;
  role: string;
  department: string;
  description: string;
  image: string;
};

const StaffCard: React.FC<StaffCardProps> = ({
  name,
  role,
  department,
  description,
  image,
}) => {
  return (
    <CardLayout
      title={name}
      discription={
        <div>
          <Text className="text-sm !text-gray-600">{role}</Text>
          <br />
          <Text className="text-sm !text-gray-400">{department}</Text>
        </div>
      }
      content={
        <>
          <Text strong>Role Description</Text>
          <Paragraph className="text-sm text-gray-700">{description}</Paragraph>
        </>
      }
      image={image}
    />
  );
};

export default StaffCard;
