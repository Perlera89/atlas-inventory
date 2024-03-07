import { Select } from 'antd'
const filterOption = (input, option) => {
  const label = option?.label
  const labelValue = typeof label === 'object' ? label.props.children : label
  return labelValue.toLowerCase().includes(input.toLowerCase())
}

const SelectItem = ({
  value,
  placeholder,
  options,
  handleSelect,
  disabled,
  bordered = 'bordered'
}) => (
  <Select
    variant={bordered}
    showSearch
    disabled={disabled}
    allowClear
    value={value}
    onSelect={handleSelect}
    placeholder={placeholder || 'Select'}
    options={options}
    filterOption={filterOption}
    notFoundContent='No data'
    className="w-full min-w-[150px]"
  />
)

export default SelectItem
