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
      placeholder={placeholder || 'Type a text here...'}
      title={placeholder}
      value={value}
      variant="filled"
      maxLength={maxLength || 500}
      style={{
        height: 75,
        resize: 'none',
        backgroundColor: 'transparent'
      }}
      onChange={handleChange}
    />
  )
}
