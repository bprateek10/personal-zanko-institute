'use client';
import React from 'react';
import { Form, Select, Button, Checkbox, Typography, FormProps } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getUser } from '@/utils/user';
import { modules } from '@/utils/app-constant';
import { all } from 'country-codes-list';

type CountyType = {
  [key: string]: string;
};

type FormType = {
  joiningDate: string;
  location: string;
  degreeLevel: string;
  areaOfStudy: string[];
  languagePreference: string;
  studyInterest: string;
  marketingConsent: boolean;
};

const { Title, Text } = Typography;
const { Option } = Select;

const ProfileDetailsForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const userData = getUser(modules.students);

  const countriesName: CountyType[] = all();

  const onFinish: FormProps<FormType>['onFinish'] = (values) => {
    try {
      router.push('/student-portal/setting');
    } catch (error) {
      let err = error;
    }
  };

  return (
    <div className="mt-4 flex min-h-screen items-center justify-center">
      <div className="-full max-w-sm rounded-lg border-2 border-gray-300 bg-white p-8 shadow">
        <div className="mb-6 text-center">
          <Image
            src={`/images/auth/logo.png`}
            className="mx-auto mb-4"
            alt="Unib logo"
            width="100"
            height="100"
            priority
          />
          <Title
            level={4}
          >{`${userData?.first_name || 'User'}, tell us a bit about you`}</Title>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          title="unibFormState"
        >
          <Form.Item
            label="When do you hope to join us?"
            name="joiningDate"
            rules={[
              { required: true, message: 'Please select a joining date' },
            ]}
          >
            <Select id="Selectmonth" placeholder="Select month and year">
              <Select.Option value="January 2025">January 2025</Select.Option>
              <Select.Option value="May 2025">May 2025</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Where do you live?"
            name="location"
            rules={[{ required: true, message: 'Please select your location' }]}
          >
            <Select placeholder="Select location">
              {countriesName.map((item: CountyType, itemId: number) => {
                return (
                  <Option key={itemId} value={item.countryNameEn}>
                    {item.countryNameEn}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="What degree level are you interested in?"
            name="degreeLevel"
            rules={[
              { required: true, message: 'Please select a degree level' },
            ]}
          >
            <Select placeholder="Select degree level">
              <Option value="Graduate">Graduate</Option>
              <Option value="Undergraduate">Undergraduate</Option>
              <Option value="Postgraduate">Postgraduate</Option>
              <Option value="Alumni">Alumni</Option>
              <Option value="Certificate">Certificate</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Area of study"
            name="areaOfStudy"
            rules={[
              {
                required: true,
                message: 'Degrees field must have at least 1 item',
              },
            ]}
          >
            <Select placeholder="Select one or more" mode="multiple">
              <Option value="MBA">MBA</Option>
              <Option value="B.Tech">B.Tech</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Preferred language for notifications?"
            name="languagePreference"
            rules={[
              {
                required: true,
                message: 'Language preference is a required field',
              },
            ]}
          >
            <Select placeholder="Select Language">
              <Option value="English, United Kingdom">
                English, United Kingdom
              </Option>
              <Option value="English, United State">
                English, United State
              </Option>
              <Option value="French, Canada">French, Canada</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Are you interested in undergraduate or graduate studies?"
            name="studyInterest"
            rules={[{ required: true, message: 'Please select your interest' }]}
          >
            <Select placeholder="Select">
              <Option value="Undergraduate">Undergraduate</Option>
              <Option value="Graduate">Graduate</Option>
            </Select>
          </Form.Item>

          <Form.Item name="marketingConsent" valuePropName="checked">
            <Checkbox>
              By checking this box, you agree to receive marketing
              communication. You can unsubscribe at any time.
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Complete profile
            </Button>
          </Form.Item>
        </Form>

        <Text
          type="secondary"
          style={{ fontSize: '12px', textAlign: 'center', display: 'block' }}
        >
          By completing your profile, you agree to the University’s{' '}
          <a href="/student-portal/signin">Privacy Policy</a>, which outlines if
          your data is shared with third parties.
        </Text>
      </div>
    </div>
  );
};

export default ProfileDetailsForm;
