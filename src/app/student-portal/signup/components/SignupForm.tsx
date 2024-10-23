'use client';
import React from 'react';
import { Button, Input, Form, FormProps } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import Image from 'next/image';

type FieldType = {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
};

const SignupForm: React.FC = () => {
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
            <a href="/student-portal/signup" className="text-indigo-500">
              Sign in
            </a>
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

        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
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
          <a href="/student-portal/signup" className="text-blue-600">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/student-portal/signup" className="text-blue-600">
            Terms of Use
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
