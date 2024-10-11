import Image from 'next/image';
import React from 'react';
import OnboardingForm from './components/OnbordingForm';

const Onboarding = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-200">
      <div className="-mt-40 md:-mt-4">
        <Image
          src={`/images/auth/logo.png`}
          alt="logo"
          width="200"
          height="200"
          priority
        />
      </div>
      <div className="flex w-full flex-col justify-center bg-white px-8 py-6 md:w-1/3">
        <div className="mb-4 flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Welcome!</h2>
          <p>Please complete your profile</p>
        </div>
        <OnboardingForm />
      </div>
      <p className="text-sm">
        Powered by <span className="text-blue-400">Zanko</span>
      </p>
    </div>
  );
};

export default Onboarding;
