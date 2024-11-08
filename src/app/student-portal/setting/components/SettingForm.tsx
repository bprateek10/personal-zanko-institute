'use client';
import React, { useState } from 'react';
import { Form, Input, Select, Button, Switch, Radio, Row, Col } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
const countryCodes = require('country-codes-list');
import { useMutateData } from '@/hooks/useApi';
const { Option } = Select;
import { modules } from '@/utils/app-constant';
import { removeToken } from '@/utils/auth';
import { removeUser } from '@/utils/user';
import { useRouter } from 'next/navigation';

type Editable = {
  [key: string]: boolean;
};

type CountyCodeType = {
  [key: string]: string;
};

const SettingForm: React.FC = () => {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState<Editable>({
    firstName: false,
    lastName: false,
    email: false,
    mobile: false,
  });
  const phoneCodes: [CountyCodeType] = countryCodes.all();
  const [form] = Form.useForm();
  const signOutMutation = useMutateData<{ access_token: string }>(
    '/api/students/v1/sessions',
    'Delete',
    modules.students,
  );

  const toggleEdit = (field: string) => {
    setIsEditable((prevState: Editable) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSave = (field: string) => {
    form
      .validateFields([field])
      .then(() => {
        toggleEdit(field);
      })
      .catch((errorInfo) => {
        // eslint-disable-next-line no-console
      });
  };

  const logOut = async () => {
    try {
      await signOutMutation.mutateAsync({});
      removeToken(modules.students);
      removeUser(modules.students);
      router.push('/student-portal/signin');
    } catch (error) {
      const err = error;
    }
  };

  return (
    <div className="flex justify-center bg-gray-50">
      <div className="w-full rounded-md bg-white p-8">
        <h2 className="mb-6 text-2xl font-semibold">Personal Information</h2>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            firstName: 'Ronak',
            lastName: '',
            email: '',
            mobile: { phoneNo: '9313771269', prefix: '+98' },
            country: 'India',
            degreeLevel: 'Graduate',
            areaOfStudy: 'MBA',

            notifications: {
              language: 'English, United Kingdom',
              newMessages: { email: true, sms: false, whatsapp: false },
              marketing: true,
            },
          }}
        >
          <Row gutter={16} align="middle">
            <Col span={21}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: 'Please enter your first name' },
                ]}
              >
                <Input disabled={!isEditable.firstName} />
              </Form.Item>
            </Col>
            <Col className="!flex !justify-end" span={3}>
              <Button
                icon={
                  isEditable.firstName ? <SaveOutlined /> : <EditOutlined />
                }
                onClick={() =>
                  isEditable.firstName
                    ? handleSave('firstName')
                    : toggleEdit('firstName')
                }
              >
                {isEditable.firstName ? 'Save' : 'Edit'}
              </Button>
            </Col>
          </Row>

          <Row gutter={16} align="middle">
            <Col span={21}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: 'Please enter your last name' },
                ]}
              >
                <Input disabled={!isEditable.lastName} />
              </Form.Item>
            </Col>
            <Col className="!flex !justify-end" span={3}>
              <Button
                icon={isEditable.lastName ? <SaveOutlined /> : <EditOutlined />}
                onClick={() =>
                  isEditable.lastName
                    ? handleSave('lastName')
                    : toggleEdit('lastName')
                }
              >
                {isEditable.lastName ? 'Save' : 'Edit'}
              </Button>
            </Col>
          </Row>

          <Row gutter={16} align="middle">
            <Col span={21}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please enter a valid email',
                  },
                ]}
              >
                <Input disabled={!isEditable.email} />
              </Form.Item>
            </Col>
            <Col className="!flex !justify-end" span={3}>
              <Button
                icon={isEditable.email ? <SaveOutlined /> : <EditOutlined />}
                onClick={() =>
                  isEditable.email ? handleSave('email') : toggleEdit('email')
                }
              >
                {isEditable.email ? 'Save' : 'Edit'}
              </Button>
            </Col>
          </Row>

          <Row gutter={16} align="middle">
            <Col span={21}>
              <Form.Item
                label="Mobile"
                name={['mobile', 'phoneNo']}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your mobile number',
                  },
                ]}
              >
                <Input
                  addonBefore={
                    <Form.Item name={['mobile', 'prefix']} noStyle>
                      <Select disabled={!isEditable.mobile}>
                        {phoneCodes.map(
                          (item: CountyCodeType, itemId: number) => {
                            return (
                              <Option
                                key={itemId}
                                value={`+${item.countryCallingCode || ''}`}
                              >{`+${item.countryCallingCode} ${item.countryNameEn}`}</Option>
                            );
                          },
                        )}
                      </Select>
                    </Form.Item>
                  }
                  disabled={!isEditable.mobile}
                />
              </Form.Item>
            </Col>

            <Col className="!flex !justify-end" span={3}>
              <Button
                icon={isEditable.mobile ? <SaveOutlined /> : <EditOutlined />}
                onClick={() =>
                  isEditable.mobile
                    ? handleSave('mobile')
                    : toggleEdit('mobile')
                }
              >
                {isEditable.mobile ? 'Save' : 'Edit'}
              </Button>
            </Col>
          </Row>

          <Form.Item label="I come from" name="country">
            <Select>
              {phoneCodes.map((item: CountyCodeType, itemId: number) => {
                return (
                  <Option key={itemId} value={item.countryNameEn}>
                    {item.countryNameEn}
                  </Option>
                );
              })}
              <Option value="India">India</Option>
              <Option value="United Kingdom">United Kingdom</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="What degree level are you interested in?"
            name="degreeLevel"
          >
            <Select>
              <Option value="Graduate">Graduate</Option>
              <Option value="Undergraduate">Undergraduate</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Area of Study" name="areaOfStudy">
            <Select>
              <Option value="MBA">
                Master of Business Administration (MBA)
              </Option>
            </Select>
          </Form.Item>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            Unib Notification Preferences
          </h2>

          <Form.Item
            label="Preferred Language for notifications?"
            name="notification.language"
          >
            <Select>
              <Option value="English, United Kingdom">
                English, United Kingdom
              </Option>
              <Option value="English, United State">
                English, United State
              </Option>
              <Option value="English, United State">French, Canada</Option>
            </Select>
          </Form.Item>

          <div className="mb-2 text-lg">New messages</div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Form.Item name={['notifications', 'newMessages', 'email']}>
                <Switch
                  defaultChecked
                  title="Email"
                  id="Email"
                  className="EmailSwitch !mr-2"
                />
                <span>Email</span>
              </Form.Item>
            </div>

            <div className="flex items-center">
              <Form.Item name={['notifications', 'newMessages', 'sms']}>
                <Switch title="SMS" id="SMS" className="!mr-2" />
                <span>SMS</span>
              </Form.Item>
            </div>

            <div className="flex items-center">
              <Form.Item name={['notifications', 'newMessages', 'whatsapp']}>
                <Switch title="WhatsApp" id="WhatsApp" className="!mr-2" />
                <span>WhatsApp</span>
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Receive institutional marketing messages within Unib?"
            name="notification.marketing"
          >
            <Radio.Group defaultValue="No">
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Radio.Group>
          </Form.Item>

          <div className="space-y-1 pt-4 text-sm text-gray-600">
            <p>
              <Link href="/student-portal/signup" className="text-indigo-500">
                Unib Privacy Policy
              </Link>
            </p>
            <p>
              <Link href="/student-portal/signup" className="text-indigo-500">
                Institution Privacy Policy
              </Link>
            </p>
            <p>
              <Link href="/student-portal/signup" className="text-indigo-500">
                Terms of Use
              </Link>
            </p>
            <p>
              <Link href="/student-portal/signup" className="text-indigo-500">
                Acceptable Use Policy
              </Link>
            </p>
            <p>
              <Link href="/student-portal/signup" className="text-indigo-500">
                Cookie Policy
              </Link>
            </p>
            <p>
              <Link href="/student-portal/signup" className="text-indigo-500">
                List of Sub-Processors
              </Link>
            </p>
            <p>
              <Link href="/student-portal/signup" className="text-indigo-500">
                Contact Unibuddy for technical support questions
              </Link>
            </p>
          </div>
          <div className="space-y-2 pt-4 text-sm text-gray-600">
            <Link href="/student-portal/signup" className="text-indigo-500">
              {'Delete account'}
            </Link>
          </div>
          <Button
            onClick={logOut}
            className="!border-0 !pl-0 text-sm !text-indigo-600"
          >
            {'Log out'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SettingForm;
