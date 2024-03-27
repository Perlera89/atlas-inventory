'use client'

import { Button } from '@/components/ui/button'

import SidebarLayout from './sidebar'
import HeaderLayout from './header'

export default function ContentLayout ({ children }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SidebarLayout />
      <div className="flex flex-col">
        <HeaderLayout />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
