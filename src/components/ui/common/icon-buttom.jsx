import { Button } from 'antd'
import React from 'react'

const IconButtonItem = ({ icon, size, handleClick }) => {
  return (
    <Button
      type="text"
      className="rounded-full"
      icon={icon}
      size={size}
      onClick={handleClick}
    />
  )
}

export default IconButtonItem
