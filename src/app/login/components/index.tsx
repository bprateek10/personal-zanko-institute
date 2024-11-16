'use client';
import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Alerts from '@/components/alert';
import {
  useInstituteMutateData,
  useInstituteGetData,
} from '@/hooks/institute/useInstituteApi';
import { setInstituteToken } from '@/utils/institute/institute-auth';
import { setInstituteUser } from '@/utils/institute/institute-user';
import { ApiError } from '@/interface/common';
import { Institute } from '@/interface/modals';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const LoginForm: React.FC = (): JSX.Element => {
  const loginMutation = useInstituteMutateData<{ access_token: string }>(
    '/api/institutes/v1/sessions',
  );
  const { data, refetch } = useInstituteGetData<Institute>(
    '/api/institutes/v1/institute_admins/me',
    ['me'],
    false,
  );
  const router = useRouter();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { email, password } = values;
    const res = await loginMutation.mutateAsync({ email, password });
    setInstituteToken(res.access_token);
    refetch();
  };

  useEffect(() => {
    if (data) {
      setInstituteUser(data as Institute);
      router.push('/');
    }
  }, [data, refetch, router]);

  return (
    <>
      {loginMutation.isError && (
        <div className="my-2">
          <Alerts
            message={
              (loginMutation.error as unknown as ApiError)?.status === 401
                ? 'Credentials are wrong.'
                : (loginMutation.error as unknown as ApiError)?.message
            }
          />
        </div>
      )}
      <Form
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        data-testid="login-form"
        className="!max-w-[600px]"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter a valid email',
              type: 'email',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="!text-primary" />}
            className="rounded-md !border-none !bg-primary-light !py-2"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please enter a password' },
            { min: 8, message: 'Password must be at least 8 characters long!' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="!text-primary" />}
            className="rounded-md !border-none !bg-primary-light !py-2"
          />
        </Form.Item>

        <Form.Item<FieldType> name="remember" valuePropName="checked">
          <div className="flex justify-between">
            <Checkbox>Remember me</Checkbox>
            <p className="text-primary">Forgot password?</p>
          </div>
        </Form.Item>

        <Form.Item className="!mb-2 flex justify-center">
          <Button
            type="primary"
            htmlType="submit"
            loading={loginMutation.isPending}
            className="!bg-primary !px-20 !py-5"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
