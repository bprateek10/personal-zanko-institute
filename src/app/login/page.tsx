import React from 'react';
import Image from 'next/image';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="flex h-full w-full flex-col-reverse justify-center overflow-hidden rounded-lg border shadow-xl md:h-3/5 md:w-3/5 md:flex-row">
        <div className="bg-indigo-50 px-8 py-6 md:w-1/2">
          <Image
            src={`/images/auth/logo.png`}
            alt="logo"
            width="100"
            height="100"
            priority
          />
          <div className="flex h-full flex-col items-center justify-center gap-5">
            <p className="max-w-80 text-center text-2xl font-semibold leading-10 text-blue-500">
              Where amazing things happen
            </p>
            <Image
              src={`/images/auth/cover.png`}
              alt="cover"
              width="300"
              height="300"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center bg-white px-6 py-6 md:w-1/2">
          <div className="flex justify-center">
            <h1 className="text-[32px] font-bold leading-10">Sign In</h1>
          </div>
          <div className="my-auto" data-testid="login-form">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
