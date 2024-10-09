'use client';
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const LoginForm = () => {
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
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 0, span: 16 }}
      >
        <div className="flex justify-between">
          <Checkbox>Remember me</Checkbox>
          <p className="text-[#636AE8FF]">Forgot password?</p>
        </div>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%', backgroundColor: '#636AE8FF' }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
