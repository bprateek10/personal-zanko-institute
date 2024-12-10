'use client';
import React, { useState } from 'react';
import FilterSection from './FilterSection';
import ContentCard from './ContentCard';
import { Button } from 'antd';

const content = [
  {
    author: 'Makenna',
    profilePicture: 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg',
    title: 'Top 5 things to do in Saskatoon',
    description:
      'Hi everyone, my name is Makenna Gerwing and I’m currently in my 4th year here at Edwards School of Business. This is ...',
    date: 'Aug 30, 2023',
    views: 18,
    readTime: '2 mins',
    location: 'Canada',
    images: [
      'https://images.unibuddy.co/651c7a87230f751d6997e596.JPG',
      'https://images.unibuddy.co/651c7a87230f751d6997e596.JPG',
      'https://images.unibuddy.co/651c7a87230f751d6997e596.JPG',
    ],
    countryFlags: [
      'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/ca.svg',
      'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/ca.svg',
    ],
    contentType: 'multiimage',
    degree: 'Bachelor of Commerce - Accounting (B.Com)',
    liked: 800,
  },
  {
    author: 'Mickayla',
    profilePicture: 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg',
    title: 'Improving your Mental Health',
    description:
      'Hi everyone, my name is Makenna Gerwing and I’m currently in my 4th year here at Edwards School of Business. This is ...',
    date: 'Nov 21, 2023',
    views: 26,
    readTime: '5 mins',
    location: 'Canada',
    images: [
      'https://images.unibuddy.co/64eeb0f99a7ef27564263c0a.jpeg',
      'https://images.unibuddy.co/64eeb0f99a7ef27564263c0a.jpeg',
      'https://images.unibuddy.co/64eeb0f99a7ef27564263c0a.jpeg',
    ],
    countryFlags: [
      'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/ca.svg',
    ],
    contentType: 'image',
    degree: 'Bachelor of Commerce - Accounting (B.Com)',
    liked: 90,
  },
];

const ContentList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex justify-center bg-gray-50">
      <div className="w-full rounded-md bg-white p-8">
        <FilterSection />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {content.map((card, index) => (
            <ContentCard key={index} {...card} />
          ))}
        </div>
        <div className="mt-3 h-8 text-center leading-8">
          <Button
            onClick={() => {
              setLoading(!loading);
            }}
            type="primary"
            className="w-full"
            loading={loading}
          >
            {loading ? '' : 'See more'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentList;
