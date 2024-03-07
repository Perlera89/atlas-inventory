import React, { useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Divider, Input, Select, Space, Button, Typography, ColorPicker } from 'antd'

import { MdClose } from 'react-icons/md'
import ColorPickerItem from './color-picker'

const { Text } = Typography

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
  const [showCloseButton, setShowCloseButton] = useState(false)
  const [open, setOpen] = useState(false) // Estado para controlar la apertura y cierre del Select

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <Select
      showSearch
      variant="borderless"
      className="w-full"
      value={value}
      filterOption={filterOption}
      onFocus={() => {
        setOpen(true)
        setShowCloseButton(true)
      }}
      onSelect={(value) => {
        handleSelect(value)
        setOpen(false)
      }}
      placeholder={placeholder}
      getPopupContainer={() =>
        document.getElementById('color-picker-container')
      }
      notFoundContent={
        <Text className="flex justify-center my-2" type="secondary">
          No data
        </Text>
      }
      dropdownRender={(menu) => (
        <>
          {showCloseButton && (
            <div className="flex justify-end">
              <Button
                type="text"
                className="mb-2 flex justify-center items-center"
                icon={<MdClose />}
                onClick={() => {
                  setOpen(false)
                  setShowCloseButton(false)
                }}
              />
            </div>
          )}
          {menu}
          <Divider className="my-2" />
          <Space className="py-2 px-1 flex justify-between">
            <div className="flex gap-2">
              <Input
                allowClear
                variant='borderless'
                showCount
                maxLength={50}
                placeholder={placeholderInput || 'Type new item'}
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <ColorPicker defaultValue="#1677ff" className='w-36' showText />
            </div>
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
      open={open}
    />
  )
}
