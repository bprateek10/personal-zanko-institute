import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

type FilterItem = {
  role: string;
  department: string;
};

const FilterSection: React.FC = () => {
  const [filters, setFilters] = useState<FilterItem>({
    role: '',
    department: '',
  });

  const handleChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <Select
          placeholder="Role"
          className="w-full"
          aria-label="Role"
          onChange={(value, option) => {
            handleChange('role', value);
          }}
          allowClear
        >
          <Option value="advisor">Advisor</Option>
          <Option value="coordinator">Coordinator</Option>
        </Select>
        <Select
          placeholder="Department"
          className="w-full"
          aria-label="Department"
          onChange={(value, option) => {
            handleChange('department', value);
          }}
          allowClear
        >
          <Option value="career-services">Career Services</Option>
          <Option value="graduate-programs">Graduate Programs</Option>
        </Select>
      </div>
    </div>
  );
};

export default FilterSection;
