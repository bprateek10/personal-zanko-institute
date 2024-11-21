import React from 'react';
import { Card, Button, Avatar, Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

interface StudentCardProps {
  name: string;
  degree: string;
  location: string;
  about: string;
  qualification: string;
  countryFlags: string[];
  profileImage: string;
}

// git checkout staging
// git pull origin staging
// git checkout feature-branch
// git rebase staging
// git push origin feature-branch
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
    <Card className="!mt-4 rounded-lg border border-gray-200 transition-shadow hover:shadow-xl">
      <div className="flex flex-col items-center gap-2">
        <div className="text-center">
          <Avatar
            size={80}
            src={profileImage}
            alt={`${name}'s profile`}
            className="border border-gray-300"
          />

          <Title level={4} className="mb-1 text-gray-800">
            {name}
          </Title>
          <Text className="block text-sm text-gray-600">{degree}</Text>
          <Text className="text-sm text-gray-500">{location}</Text>
        </div>

        <Button
          type="primary"
          className="w-full border-none bg-green-600 font-medium text-white hover:bg-green-700"
        >
          Chat with {name}
        </Button>

        <div className="mt-4 w-full space-y-3 text-left">
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
      </div>
    </Card>
  );
};

export default StudentCard;
