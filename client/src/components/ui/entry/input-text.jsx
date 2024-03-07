import React, { useRef, useEffect } from 'react'
import { Input } from 'antd'

import { useInventoryStore } from '@/store/inventory'

export default function InputTextItem ({
  placeholder,
  showCount = false,
  value,
  handleChange = null,
  maxLength,
  focus = false
}) {
  const action = useInventoryStore((state) => state.action)
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
      readOnly={action === 'view'}
      variant="borderless"
      allowClear={showCount}
      showCount={showCount}
      maxLength={maxLength}
      className="w-full"
      placeholder={placeholder}
      onChange={handleInputChange}
      value={value}
    />
  )
}
