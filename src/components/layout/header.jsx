'use client'

import React from 'react'
import { Layout, theme, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Header } = Layout

export default function HeaderLayout () {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <Header
      className="border-b-[1px] border-[#2c2c2c] justify-between"
      style={{
        backgroundColor: colorBgContainer,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px'
      }}
    >
      <p>Header</p>
      <Avatar size={32} rootClassName="bg-white" icon={<UserOutlined />} />
    </Header>
  )
}
