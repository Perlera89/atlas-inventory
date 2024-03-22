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
import { usePathname } from 'next/navigation'

const { Sider } = Layout

export default function SiderLayout () {
  const pathname = usePathname()
  const [selectedKey, setSelectedKey] = useState(pathname.split('/')[1])
  const [isCollapsed, setIsCollapsed] = useState(false)

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
      onClick: () => setSelectedKey(key)
    }
  }

  const items = [
    getItem(
      <Link href="/purchases" key="purchases">
        Purchases
      </Link>,
      'purchases',
      <LuShoppingCart />
    ),
    getItem(
      <Link href="/sales" key="sales">
        Sales
      </Link>,
      'sales',
      <LuTag />
    ),
    getItem(
      <Link href="/inventory" key="inventory">
        Inventory
      </Link>,
      'inventory',
      <LuPackage />
    ),
    getItem(
      <Link href="/clients" key="clients">
        Clients
      </Link>,
      'clients',
      <LuUser />
    ),
    getItem(
      <Link href="/employees" key="employees">
        Employees
      </Link>,
      'employees',
      <LuUserCog />
    )
  ]
  return (
    <>
      <FloatButton
        className="right-4"
        shape="circle"
        icon={
          isCollapsed
            ? (
            <LuAlignJustify targetX="Hola" className="w-full" />
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
          src="logo.svg"
          className={
            'w-full px-6 py-2 mx-auto border-r-[1px] border-[#2c2c2c] transition-all'
          }
        />
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedKey]}
          defaultOpenKeys={['1']}
          items={items}
          className="h-screen mt-4 bg-[#141414]"
        />
      </Sider>
    </>
  )
}
