import React, { useRef, useEffect } from 'react'
import { Input } from 'antd'

export default function InputTextItem ({
  placeholder,
  value,
  handleChange = null,
  maxLength,
  focus = false
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (focus) {
      inputRef.current.focus()
    }
  }, [])

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    const regex = /^[a-zA-Z\s]+$/

    if (regex.test(inputValue) || inputValue === '') {
      handleChange(inputValue)
    }
  }

  return (
    <Input
      ref={inputRef}
      variant="borderless"
      maxLength={maxLength}
      className="w-full"
      placeholder={placeholder}
      onChange={handleInputChange}
      value={value}
    />
  )
}
