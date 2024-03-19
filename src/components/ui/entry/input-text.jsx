import React, { useRef, useEffect } from 'react'
import { Input } from 'antd'

export default function InputTextItem ({
  placeholder,
  value,
  handleChange,
  maxLength,
  focus = false
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (focus) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <Input
      ref={inputRef}
      variant="borderless"
      maxLength={maxLength}
      className="w-full"
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  )
}
