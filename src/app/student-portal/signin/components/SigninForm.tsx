'use client';
import React from 'react';
import { Button, Input, Form, FormProps } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';

type FieldType = {
  email?: string;
  password?: string;
};

const SigninForm: React.FC = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
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
          <h2 className="text-lg font-semibold">Welcome back!</h2>
          <p className="text-gray-500">
            Don’t have an account?{' '}
            <Link href="/student-portal/signup" className="text-indigo-600">
              Create an account
            </Link>
          </p>
        </div>

        <Button
          className="mb-4 flex w-full items-center justify-center gap-2 bg-indigo-500"
          icon={<GoogleOutlined />}
        >
          Sign in with Google
        </Button>

        <div className="my-4 flex items-center">
          <hr className="w-1/6 border-gray-300" />
          <span className="px-2 text-sm text-gray-500">
            OR CONTINUE WITH EMAIL
          </span>
          <hr className="w-1/6 border-gray-300" />
        </div>

        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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

          <p className="mb-4 text-gray-500">
            <a href="/student-portal/signup" className="text-indigo-600">
              Forgot your password?
            </a>
          </p>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-indigo-500"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-center text-sm text-gray-500">
          {'By signing up you agree to Unib global'}{' '}
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

export default SigninForm;
