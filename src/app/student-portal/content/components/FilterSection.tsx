// components/Filters/Filters.tsx
import React, { useState } from 'react';
import { Input, Select, Form } from 'antd';

const { Option } = Select;
type FilterType = {
  topic: string;
  sort: string;
  areaOfStudy: string;
  searchTitle: string;
};

const FilterSection: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>({
    topic: 'none',
    sort: 'datePublished',
    areaOfStudy: 'none',
    searchTitle: '',
  });

  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Search title">
        <Input
          value={filter.searchTitle}
          placeholder="Search title"
          className="rounded-lg bg-gray-100"
          onChange={(e) => {
            setFilter((prev) => ({ ...prev, searchTitle: e.target.value }));
          }}
        />
      </Form.Item>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        <Form.Item label="Topic" className="w-full">
          <Select
            value={filter.topic}
            placeholder="None Selected"
            aria-label="topics"
            onChange={(value) => {
              setFilter((prev) => ({ ...prev, topic: value }));
            }}
          >
            <Option value="none">None Selected</Option>
            <Option value="science">Science</Option>
            <Option value="technology">Technology</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Area Of Study" className="w-full">
          <Select
            value={filter.areaOfStudy}
            placeholder="None Selected"
            aria-label="areaOfStudy"
            onChange={(value) => {
              setFilter((prev) => ({ ...prev, areaOfStudy: value }));
            }}
          >
            <Option value="none">None Selected</Option>
            <Option value="business">Business</Option>
            <Option value="arts">Arts</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Sort" className="w-full">
          <Select
            value={filter.sort}
            placeholder="Date published"
            aria-label="sort"
            onChange={(value) => {
              setFilter((prev) => ({ ...prev, sort: value }));
            }}
          >
            <Option value="datePublished">Date Published</Option>
            <Option value="mostViewed">Most viewed</Option>
          </Select>
        </Form.Item>
      </div>
    </Form>
  );
};

export default FilterSection;
