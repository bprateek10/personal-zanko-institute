import { Button, Select } from 'antd';
import React from 'react';

const Filter = () => {
  return (
    <div
      data-testid="filter"
      className="ml-auto grid w-full grid-cols-12 grid-rows-2 gap-3 rounded-lg bg-white p-4 shadow-lg md:w-2/5 md:grid-rows-1"
    >
      <div className="col-span-12 md:col-span-5">
        <Select
          aria-label="Status"
          showSearch
          style={{ width: '100%' }}
          placeholder="Status"
          optionFilterProp="label"
          options={[
            {
              value: '1',
              label: 'Not Identified',
            },
          ]}
        />
      </div>
      <div className="col-span-12 md:col-span-5">
        <Select
          aria-label="Select Authors"
          showSearch
          style={{ width: '100%' }}
          placeholder="Select Authors"
          optionFilterProp="label"
          options={[
            {
              value: '1',
              label: 'Not Identified',
            },
          ]}
        />
      </div>
      <div className="col-span-10 mx-auto md:col-span-2 md:mx-0">
        <Button className="md!px-0 !rounded-md !bg-primary !px-8 !text-white md:!w-full">
          Filter
        </Button>
      </div>
    </div>
  );
};

export default Filter;
