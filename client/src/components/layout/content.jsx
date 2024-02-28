'use client'

import React from 'react'
import { Layout, theme } from 'antd'
import HeaderLayout from './header'
import SiderLayout from './sidebar'
const { Content } = Layout

const ContentLayout = ({ children }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <Layout className="flex flex-col overflow-hidden">
      <SiderLayout />
      <Layout className="flex flex-col h-min-screen">
        <HeaderLayout />
        <Content
          className="text-font-color h-screen"
          style={{
            padding: 16,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default ContentLayout
