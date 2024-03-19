import React, { useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Divider, Input, Select, Space, Button } from 'antd'

export default function CustomSelectItem ({
  placeholder,
  placeholderInput,
  value,
  handleSelect,
  inputValue,
  handleInputChange,
  items,
  handleAdd,
  seletedColor,
  handleColorChange
}) {
  const inputRef = useRef(null)
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <Select
      showSearch
      variant="borderless"
      suffixIcon
      className="w-full"
      value={value}
      filterOption={filterOption}
      onSelect={handleSelect}
      placeholder={placeholder}
      notFoundContent="No data"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider className="my-2" />
          <Space className="py-2 px-1 flex justify-between w-full">
            <Input
              allowClear
              variant="borderless"
              className="max-w-96"
              showCount
              maxLength={50}
              placeholder={placeholderInput || 'Type new item'}
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={() => handleAdd(inputValue)}
              disabled={!inputValue}
            >
              Add
            </Button>
          </Space>
        </>
      )}
      options={items}
    />
  )
}
