'use client'

// icons
import {
  LuShoppingCart,
  LuTag,
  LuPackage,
  LuUserCog,
  LuUser,
  LuX,
  LuAlignJustify
} from 'react-icons/lu'

import React, { useState } from 'react'
import { FloatButton, Layout, Menu } from 'antd'
import Link from 'next/link'
const { Sider } = Layout

const items = [
  <Link href="/purchases" key="purchases">
    Purchases
  </Link>,
  <Link href="/sales" key="sales">
    Sales
  </Link>,
  <Link href="/inventory" key="inventory">
    Inventory
  </Link>,
  <Link href="/clients" key="clients">
    Clients
  </Link>,
  <Link href="/employees" key="employees">
    Employees
  </Link>
].map((label, key) => ({
  key,
  label
}))

const siderItems = [LuShoppingCart, LuTag, LuPackage, LuUserCog, LuUser].map(
  (icon, index) => {
    return {
      key: index + 1,
      icon: React.createElement(icon),
      label: items[index].label
    }
  }
)

export default function SiderLayout () {
  const [isCollapsed, setIsCollapsed] = useState(false)
  return (
    <>
      <FloatButton
        className="right-4"
        shape="circle"
        icon={
          isCollapsed
            ? (
            <LuAlignJustify targetX='Hola' className="w-full" />
              )
            : (
            <LuX className="w-full" />
              )
        }
        onClick={() => {
          setIsCollapsed(!isCollapsed)
        }}
      />
      <Sider
        width={200}
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        className={`${isCollapsed && 'hidden'}`}
      >
        <img
          src='logo.svg'
          className={
            'w-full mx-auto px-6 py-3 border-r-[1px] border-[#2c2c2c] transition-all'
          }
        />
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['1']}
          items={siderItems}
          className="h-screen mt-4 bg-[#141414]"
        />
      </Sider>
    </>
  )
}
