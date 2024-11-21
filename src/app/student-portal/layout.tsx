'use client';
import React from 'react';
import Header from './componets/header';

const EmbeddedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-auto max-w-4xl">
      <Header />

      {children}
    </div>
  );
};

export default EmbeddedLayout;
