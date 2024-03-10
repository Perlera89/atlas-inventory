import React from 'react'
import { InputNumber } from 'antd'

export default function InputNumberItem ({
  placeholder,
  decimal = false,
  value,
  onChange
}) {
  return (
    <InputNumber
      placeholder={placeholder || 'Type a number'}
      variant="borderless"
      style={{ width: '100%' }}
      min={0}
      type="number"
      value={value}
      onChange={onChange}
      status="warning"
    />
  )
}
