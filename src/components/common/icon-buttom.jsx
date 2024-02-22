import { Button } from 'antd'

const IconButton = ({ icon, size, handleClick }) => {
  return (
    <Button
      type="text"
      className="flex justify-center items-center transition-colors rounded-full"
      icon={icon}
      size={size}
      onClick={handleClick}
    />
  )
}

export default IconButton
