import React, { useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

let timeout: ReturnType<typeof setTimeout> | null;

const fetch = (value: string, callback: Function) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  function fake() {
    callback([
      {
        id: 1,
        name: 'Viet Nam',
        value: 'vn',
      },
      {
        id: 2,
        name: 'English',
        value: 'en',
      },
      {
        id: 3,
        name: 'Japan',
        value: 'jp',
      },
    ]);
  }
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback([]);
  }
};

export default function SearchInput(props: any) {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    fetch(newValue, setData);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.id,
        label: d.name,
      }))}
    />
  );
}
