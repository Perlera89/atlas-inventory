import React from 'react'
import { FloatButton } from 'antd'
import { MdAdd } from 'react-icons/md'

const App = () => (
  <FloatButton
    shape="square"
    type="primary"
    icon={<MdAdd />}
    style={{
      position: 'relative',
      left: 8,
      top: 49
    }}
  />
)
export default App
