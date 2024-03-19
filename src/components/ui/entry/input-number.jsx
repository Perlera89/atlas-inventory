import React from 'react'
import { InputNumber } from 'antd'

export default function InputNumberItem ({
  placeholder,
  decimal = false,
  value,
  handleChange
}) {
  return (
    <InputNumber
      placeholder={placeholder || 'Number'}
      variant="borderless"
      style={{ width: '100%' }}
      min={0}
      type="number"
      value={value}
      onChange={handleChange}
      status="warning"
    />
  )
}
