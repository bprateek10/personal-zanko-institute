import React, { useState } from 'react';
import { Card, Avatar, Tooltip, Typography } from 'antd';
import {
  EyeOutlined,
  ClockCircleOutlined,
  LikeOutlined,
  LikeFilled,
} from '@ant-design/icons';
import Media from './Media';
import { hasStudentToken } from '@/utils/student/student-auth';
import { useRouter } from 'next/navigation';

const { Text, Paragraph } = Typography;

type PostCardProps = {
  author: string;
  profilePicture: string;
  title: string;
  description: string;
  date: string;
  views: number;
  readTime: string;
  location: string;
  degree: string;
  images: string[];
  contentType: string;
  countryFlags: string[];
  liked: number;
};

const ContentCard: React.FC<PostCardProps> = ({
  author,
  profilePicture,
  title,
  description,
  date,
  views,
  liked,
  readTime,
  location,
  degree,
  images,
  contentType,
  countryFlags,
}) => {
  const router = useRouter();
  const [isliked, setIsLiked] = useState<boolean>(false);
  return (
    <Card
      className="overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-xl"
      hoverable
      bordered
      cover={
        <div className="relative h-96">
          <Media contentType={contentType} images={images} />

          <div className="absolute left-3 top-3 flex items-start space-x-3">
            <Avatar src={profilePicture} size={60} />
            <div>
              <Text className="text-sm font-bold !text-white">
                Published by {author}
              </Text>
              <br />
              <Text className="text-xs !text-white">{degree}</Text>
              <Text className="flex items-center space-x-1 text-xs !text-white">
                {countryFlags.map((flag, idx) => (
                  <Avatar
                    key={idx}
                    src={flag}
                    alt="flag"
                    size={14}
                    className="rounded-full border border-gray-300"
                  />
                ))}{' '}
                <span>Comes from {location}</span>
              </Text>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-2">
        <div className="space-x-2">
          {!isliked ? (
            <LikeOutlined
              onClick={() => {
                if (!hasStudentToken()) {
                  router.push('/student-portal/signin');
                  return;
                }
                setIsLiked(!isliked);
              }}
            />
          ) : (
            <LikeFilled
              onClick={() => {
                setIsLiked(!isliked);
              }}
            />
          )}
          <Text className="!text-gray-600">{isliked ? liked + 1 : liked}</Text>
        </div>
        <Text strong>{title}</Text>
        <Paragraph ellipsis={{ rows: 2 }} className="mt-1">
          {description}
        </Paragraph>
      </div>
      <div className="mt-4 flex items-center space-x-4 text-xs text-gray-500">
        <Tooltip title="Date Published">
          <span>{date}</span>
        </Tooltip>
        <Tooltip title="Views">
          <span className="flex items-center space-x-1">
            <EyeOutlined /> <span>{views}</span>
          </span>
        </Tooltip>
        <Tooltip title="Read Time">
          <span className="flex items-center space-x-1">
            <ClockCircleOutlined /> <span>{readTime}</span>
          </span>
        </Tooltip>
      </div>
    </Card>
  );
};

export default ContentCard;
