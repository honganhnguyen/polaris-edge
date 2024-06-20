import React, { ReactNode } from "react";
import { Form, Select } from "antd";
const { Option } = Select;

interface SelectOptionProps {
  value: string | undefined;
  defaultValue: string | undefined;
  placeholder: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  options: { value: string; label: ReactNode }[];
  rules?: any[];
}

const SelectOption: React.FC<SelectOptionProps> = ({
  value,
  onChange,
  disabled,
  options,
  placeholder,
  defaultValue,
  rules,
}) => {
  return (
    // <Form.Item
    //   rules={rules} 
    // >
    <Select
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      defaultValue={defaultValue}
    >
      {options.map((opt) => (
        <Option key={opt.value} value={opt.value}>
          {opt.label}
        </Option>
      ))}
    </Select>
    // </Form.Item>
  );
};

export default SelectOption;
