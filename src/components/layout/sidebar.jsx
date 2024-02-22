'use client'

// icons
import {
  ShoppingCart,
  Tag,
  Package,
  UserCog,
  User,
  X,
  AlignJustify
} from 'lucide-react'

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

const siderItems = [ShoppingCart, Tag, Package, UserCog, User].map(
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
            <AlignJustify className="w-full" />
              )
            : (
            <X className="w-full" />
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
            'w-full mx-auto px-4 py-2 border-r-[1px] border-[#2c2c2c] transition-all'
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
