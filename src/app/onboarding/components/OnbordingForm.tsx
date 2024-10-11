'use client';
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

type FieldType = {
  fName?: string;
  lName?: string;
  email?: string;
  password?: string;
  remember?: string;
};

const OnboardingForm = () => {
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
    <Form
      layout="vertical"
      name="basic"
      style={{
        maxWidth: 600,
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="First Name"
        name="fName"
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
          },
        ]}
        style={{ marginBottom: '10px' }}
      >
        <Input
          prefix={<UserOutlined style={{ color: '#636AE8FF' }} />}
          placeholder="Enter your first name"
          style={{
            backgroundColor: '#F2F2FDFF',
            borderRadius: '6px',
            border: '0px',
            paddingTop: '7px',
            paddingBottom: '7px',
          }}
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="Last Name"
        name="lName"
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
          },
        ]}
        style={{ marginBottom: '10px' }}
      >
        <Input
          prefix={<UserOutlined style={{ color: '#636AE8FF' }} />}
          placeholder="Enter your last name"
          style={{
            backgroundColor: '#F2F2FDFF',
            borderRadius: '6px',
            border: '0px',
            paddingTop: '7px',
            paddingBottom: '7px',
          }}
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your valid email!',
            type: 'email',
          },
        ]}
        style={{ marginBottom: '10px' }}
      >
        <Input
          prefix={<MailOutlined style={{ color: '#636AE8FF' }} />}
          placeholder="Enter your email"
          style={{
            backgroundColor: '#F2F2FDFF',
            borderRadius: '6px',
            border: '0px',
            paddingTop: '7px',
            paddingBottom: '7px',
          }}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        style={{ marginBottom: '10px' }}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: '#636AE8FF' }} />}
          placeholder="Enter your password"
          style={{
            backgroundColor: '#F2F2FDFF',
            borderRadius: '6px',
            border: '0px',
            paddingTop: '7px',
            paddingBottom: '7px',
          }}
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: '#636AE8FF' }} />}
          placeholder="Enter your password"
          style={{
            backgroundColor: '#F2F2FDFF',
            borderRadius: '6px',
            border: '0px',
            paddingTop: '7px',
            paddingBottom: '7px',
          }}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: '10px' }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: '100%',
            backgroundColor: '#636AE8FF',
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          Continue
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OnboardingForm;
