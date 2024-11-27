'use client';
import React, { useState } from 'react';
import FilterSection from './FilterSection';
import StaffCard from './StaffCard';

type StaffMember = {
  name: string;
  role: string;
  department: string;
  description: string;
  image: string;
};

const staffMembers: StaffMember[] = [
  {
    name: 'Chandra Kretzer',
    role: 'MBA and Graduate Certificate in Leadership (GCL) Programs Advisor',
    department: 'Edwards Graduate Programs',
    description:
      'Welcome to the Edwards School of Business, University of Sask...',
    image: 'https://images.unibuddy.co/64d2b3713cb33d55cb1e783c.jpg',
  },
  {
    name: 'Kim Stranden',
    role: 'Coop Coordinator',
    department: 'Edwards Career Services',
    description:
      'I’m here to help answer your queries related to the Co-op Program...',
    image: 'https://images.unibuddy.co/64d2b3713cb33d55cb1e783c.jpg',
  },
  // Add more members...
];

const StaffList: React.FC = () => {
  return (
    <div className="flex justify-center bg-gray-50">
      <div className="w-full rounded-md bg-white p-4">
        <h1 className="text-2xl font-bold">
          Choose a member of staff to chat to
        </h1>
        <FilterSection />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {staffMembers.map((member, index) => (
            <StaffCard
              key={index}
              name={member.name}
              role={member.role}
              department={member.department}
              description={member.description}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffList;
