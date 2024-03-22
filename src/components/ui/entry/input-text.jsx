import React, { useRef, useEffect } from 'react'
import { Input } from 'antd'
import { Baseline } from 'lucide-react'

export default function InputTextItem ({
  placeholder,
  title,
  icon = Baseline,
  value,
  handleChange,
  maxLength,
  focus = false
}) {
  return (
    <Input
      title={title}
      placeholder={placeholder}
      prefix={React.createElement(icon, { size: 20 })}
      variant="filled"
      maxLength={maxLength}
      style={{ width: '100%', backgroundColor: 'transparent' }}
      value={value}
      onChange={handleChange}
    />
  )
}
