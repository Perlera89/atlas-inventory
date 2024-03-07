import { ColorPicker } from 'antd'

export default function ColorPickerItem ({
  selectedColor,
  handleColorChange,
  rootClassName
}) {
  return (
    <ColorPicker defaultValue="#1677ff" showText />
  )
}
