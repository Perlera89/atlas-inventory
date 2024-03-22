import React from 'react'
import { InputNumber } from 'antd'
import { Hash } from 'lucide-react'

export default function InputNumberItem ({
  placeholder,
  title,
  icon = Hash,
  decimal = false,
  value,
  handleChange
}) {
  return (
    <InputNumber
      placeholder={placeholder || 'Number'}
      title={title}
      prefix={React.createElement(icon, { size: 20 })}
      variant="filled"
      style={{ width: '100%', backgroundColor: 'transparent' }}
      min={0}
      type="number"
      value={value}
      onChange={handleChange}
    />
  )
}
