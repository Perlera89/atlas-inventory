import React from 'react'
import { InputNumber } from 'antd'
import { useInventoryStore } from '@/store/inventory'

export default function InputNumberItem ({
  placeholder,
  decimal = false,
  value,
  onChange
}) {
  const action = useInventoryStore((state) => state.action)
  return (
    <InputNumber
      placeholder={placeholder || 'Type a number'}
      variant="borderless"
      style={{ width: '100%' }}
      type="number"
      value={value}
      readOnly={action === 'view'}
      onChange={onChange}
    />
  )
}
