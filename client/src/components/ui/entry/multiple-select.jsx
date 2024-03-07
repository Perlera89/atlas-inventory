import { Select, Typography } from 'antd'

const { Text } = Typography

export default function MultipleSelectItem ({
  placeholder,
  options,
  bordered = 'bordered',
  handleSelect
}) {
  const filterOption = (input, option) => {
    const label = option?.label
    const labelValue = typeof label === 'object' ? label.props.children : label
    return labelValue.toLowerCase().includes(input.toLowerCase())
  }

  return (
    <Select
      allowClear
      variant={bordered}
      mode="multiple"
      style={{
        width: '100%'
      }}
      filterOption={filterOption}
      notFoundContent="No data"
      placeholder={placeholder || 'Select'}
      onChange={handleSelect}
      options={options}
    />
  )
}
