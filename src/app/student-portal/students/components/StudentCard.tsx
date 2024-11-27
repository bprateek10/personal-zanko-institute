import React from 'react';
import { Card, Button, Avatar, Typography } from 'antd';
import CardLayout from '../../componets/cardLayout';

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;
interface StudentCardProps {
  name: string;
  degree: string;
  location: string;
  about: string;
  qualification: string;
  countryFlags: string[];
  profileImage: string;
}

const StudentCard: React.FC<StudentCardProps> = ({
  name,
  degree,
  location,
  about,
  qualification,
  countryFlags,
  profileImage,
}) => {
  return (
    <>
      <CardLayout
        title={name}
        discription={
          <div>
            <Text className="text-sm !text-gray-600">{degree}</Text>
            <br />
            <Text className="text-sm !text-gray-400">{location}</Text>
          </div>
        }
        content={
          <div className="w-full space-y-3 text-left">
            <div>
              <Text strong className="block">
                I come from:
              </Text>
              <div className="mt-1 flex items-center gap-2">
                <Text>{location}</Text>
                {countryFlags.map((flag, idx) => (
                  <Avatar
                    key={idx}
                    src={flag}
                    alt="flag"
                    size={16}
                    className="rounded-full border border-gray-300"
                  />
                ))}
              </div>
            </div>
            <div>
              <Text strong>Previous Qualification:</Text>
              <Text className="ml-2">{qualification}</Text>
            </div>
            <div>
              <Text strong>About me:</Text>
              <Paragraph ellipsis={{ rows: 4 }} className="mt-1">
                {about}
              </Paragraph>
            </div>
          </div>
        }
        image={profileImage}
      />
    </>
  );
};

export default StudentCard;
