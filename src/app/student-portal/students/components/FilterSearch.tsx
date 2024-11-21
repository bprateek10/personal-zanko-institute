import React, { useState } from 'react';
import { Select, Tag } from 'antd';

interface FilterItem {
  field: string;
  value: string;
}

const FilterSearch: React.FC = () => {
  const [filters, setFilters] = useState<FilterItem[]>([]);

  const handleChange = (field: string, value: string) => {
    setFilters((prev) => [...prev, { field, value }]);
  };

  const handleRemoveFilter = (field: string, index: number) => {
    let updatedFilter = filters.filter((filter, ind) => ind !== index);
    setFilters(updatedFilter);
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        <Select
          aria-label="Degree Level"
          placeholder="Degree Level"
          className="w-full"
          options={[
            { value: 'bachelors', label: 'Bachelors' },
            { value: 'masters', label: 'Masters' },
          ]}
          onChange={(value, option) =>
            handleChange('degreeLevel', value as string)
          }
          value={''}
        />
        <Select
          aria-label="Area of Study"
          placeholder="Area of Study"
          className="w-full"
          options={[
            { value: 'accounting', label: 'Accounting' },
            { value: 'engineering', label: 'Engineering' },
          ]}
          onChange={(value, option) =>
            handleChange('areaOfStudy', value as string)
          }
          value={''}
        />
        <Select
          aria-label="Country/Region"
          placeholder="Country/Region"
          className="w-full"
          options={[
            { value: 'india', label: 'India' },
            { value: 'usa', label: 'USA' },
          ]}
          onChange={(value, option) => handleChange('country', value as string)}
          value={''}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <Tag
            key={`${index}${filter.value}`}
            closable
            onClose={() => handleRemoveFilter(filter.field, index)}
          >
            {filter.value}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default FilterSearch;
