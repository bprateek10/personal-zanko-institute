'use client';
import React, { useState } from 'react';
import FilterSearch from './FilterSearch';
import StudentCard from './StudentCard';
import { Button } from 'antd';

const students = [
  {
    name: 'Sunaina',
    degree: 'Bachelor of Commerce - Accounting (B.Com)',
    location: 'Jeddah, Saudi Arabia',
    about:
      'I am passionate about accounting and hope to become an auditor in the future. Along with accounting, I am also passionate about giving back to the community through social entrepreneurship.',
    profileImage: 'https://images.unibuddy.co/646e2b30319d11039a1e2725.jpg',

    qualification:
      'Central Board of Secondary Education (CBSE) School Leaving Diploma',
    countryFlags: [],
  },
];

const StudentsList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex justify-center bg-gray-50">
      <div className="w-full rounded-md bg-white p-4">
        <h1 className="text-2xl font-bold">Choose a student to chat to</h1>
        <p className="mt-2 text-sm text-gray-600">
          Since September 2020,{' '}
          <span className="text-indigo-600">9099 questions</span> have been
          answered by our Students.
        </p>
        <FilterSearch />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {students.map((student, index) => (
            <StudentCard key={index} {...student} />
          ))}
        </div>
        <div className="mt-3 h-8 text-center leading-8">
          <Button
            onClick={() => {
              setLoading(!loading);
            }}
            loading={loading}
          >
            {loading ? '' : 'See more Students'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
