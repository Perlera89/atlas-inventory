'use client'

import { Button } from '@/components/ui/button'

import SidebarLayout from './sidebar'
import HeaderLayout from './header'

export default function ContentLayout ({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarLayout />
      <main className="flex flex-1 flex-col gap-4 p-4 ml-14">
          {children}
        </main>
    </div>
  )
}
