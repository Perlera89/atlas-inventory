import React from 'react'
import { Input } from 'antd'
const { TextArea } = Input

export default function TextareaItem ({
  placeholder,
  value,
  handleChange,
  maxLength
}) {
  return (
    <TextArea
      value={value}
      variant="borderless"
      maxLength={maxLength || 500}
      style={{
        height: 75,
        resize: 'none'
      }}
      onChange={handleChange}
      placeholder={placeholder || 'Type a text here...'}
    />
  )
}
