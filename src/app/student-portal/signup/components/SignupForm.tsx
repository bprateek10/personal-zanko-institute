'use client';
import React, { useEffect } from 'react';
import { Button, Input, Form, FormProps } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutateData, useGetData } from '@/hooks/useApi';
import { modules } from '@/utils/app-constant';
import { setToken } from '@/utils/auth';
import { setUser } from '@/utils/user';
import Alerts from '@/components/alert';
import { ApiError } from '@/interface/common';
import { Student } from '@/interface/modals';

type FieldType = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
};

const SignupForm: React.FC = () => {
  const router = useRouter();

  const signUpMutation = useMutateData<{ access_token: string }>(
    '/api/students/v1/registrations',
    'Post',
    modules.students,
  );

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const { first_name, last_name, email, password } = values;
      const res = await signUpMutation.mutateAsync({
        student: { email, first_name, last_name, password },
      });
      setToken(res.access_token, modules.students);
      setUser(values as Student, modules.students);
      router.push('/student-portal/setting');
    } catch (error) {
      const err = error;
    }
  };

  return (
    <div className="mt-4 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border-2 border-gray-300 bg-white p-8 shadow">
        <div className="mb-6 text-center">
          <Image
            src={`/images/auth/logo.png`}
            className="mx-auto mb-4"
            alt="Unib logo"
            width="100"
            height="100"
            priority
          />
          <h2 className="text-lg font-semibold">Create your account</h2>
          <p className="text-gray-500">
            Already have an account?{' '}
            <Link href="/student-portal/signin" className="text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>

        <Button
          className="mb-4 flex w-full items-center justify-center gap-2"
          type="primary"
          icon={<GoogleOutlined />}
        >
          Sign up with Google
        </Button>

        <div className="my-4 flex items-center">
          <hr className="w-1/6 border-gray-300" />
          <span className="px-2 text-sm text-gray-500">
            OR CONTINUE WITH EMAIL
          </span>
          <hr className="w-1/6 border-gray-300" />
        </div>
        {signUpMutation.isError && (
          <div className="my-2">
            <Alerts
              message={
                (signUpMutation.error as unknown as ApiError)?.status === 401
                  ? 'Credentials are wrong.'
                  : (signUpMutation.error as unknown as ApiError)?.message
              }
            />
          </div>
        )}
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="First name"
            name="first_name"
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="last_name"
            rules={[
              { required: true, message: 'Please input your last name!' },
            ]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <div className="mb-4 text-gray-500">
            Must be at least 12 characters
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Sign up
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-center text-sm text-gray-500">
          {"By signing up you agree to Unibuddy's"}{' '}
          <Link href="/student-portal/signup" className="text-blue-600">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/student-portal/signup" className="text-blue-600">
            Terms of Use
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
