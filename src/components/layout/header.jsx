'use client'

import React from 'react'
import { Layout, theme, Avatar, Breadcrumb } from 'antd'
import { usePathname } from 'next/navigation'

import { HomeOutlined, UserOutlined } from '@ant-design/icons'

const { Header } = Layout

export default function HeaderLayout () {
  const pathname = usePathname()
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
      <Breadcrumb
        items={[
          {
            href: '/',
            title: <HomeOutlined />
          },
          {
            title: <span className='ml-2 text-[#adadad]'>{pathname}</span>
          }
        ]}
      />
      <Avatar size={32} rootClassName="bg-white" icon={<UserOutlined />} />
    </Header>
  )
}
