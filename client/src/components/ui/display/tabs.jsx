import React from 'react'
import { Tabs } from 'antd'
const TabsItem = ({ items }) => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        size="small"
        style={{
          marginBottom: 32
        }}
        items={items}
      />
    </div>
  )
}
export default TabsItem
