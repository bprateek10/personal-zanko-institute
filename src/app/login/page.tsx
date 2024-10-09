import React from 'react';
import Image from 'next/image';
import LoginForm from '@/components/login';

const Login = () => {
  return (
    <>
      <div className="flex h-screen flex-col-reverse md:w-full md:flex-row">
        <div className="bg-[#F2F2FDFF] px-8 py-10 md:w-1/2">
          <Image
            className="hidden md:block"
            src={`/images/auth/logo.png`}
            alt="logo"
            width="100"
            height="100"
          />
          <div className="flex h-full flex-col items-center justify-center gap-5">
            <p className="max-w-96 text-center text-[32px] font-semibold leading-[48px] text-[#636AE8FF]">
              Where amazing things happen
            </p>
            <Image
              src={`/images/auth/cover.png`}
              alt="cover"
              width="400"
              height="400"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center px-6 py-6 md:w-1/2">
          <div className="flex justify-center">
            <p className="text-[32px] font-bold leading-[48px] text-[#171A1FFF]">
              Sign In
            </p>
          </div>
          <div className="my-auto md:ml-56">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
