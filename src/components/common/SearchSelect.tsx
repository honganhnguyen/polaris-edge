import { Select } from 'antd';
import type { SelectProps } from 'antd';

export default function SearchSelect(props: SelectProps) {
  const { options, ...otherProps } = props;
  return (
    <Select
      showSearch
      options={options}
      optionFilterProp='children'
      filterOption={(input, option) =>
        (option?.label ?? '').toString().toLowerCase().includes(input?.toLowerCase())
      }
      {...otherProps}
    />
  );
}
