'use client'
import { usePathname } from 'next/navigation'

import { PanelRight } from 'lucide-react'
import { Button } from '../ui/button'
import SidebarLayout from './sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function ContentLayout ({ children }) {
  const path = usePathname()
  if (path === '/auth/login' || path === '/auth/register') {
    return children
  }
  console.log('path', path)

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed flex sm:hidden z-20 bottom-10 right-10 rounded-full shadow-lg w-12 h-12">
            <PanelRight size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-24">
          <SidebarLayout isCollapsed />
        </SheetContent>
      </Sheet>
      <div className="hidden sm:flex">
        <SidebarLayout />
      </div>
      <main className="flex flex-1 flex-col gap-4 p-4 sm:border-l overflow-y-auto h-screen">{children}</main>
    </div>
  )
}
