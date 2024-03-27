import {
  Bell,
  Pyramid
} from 'lucide-react'

import Link from 'next/link'
import { Button } from '../ui/button'
import NavBar from './nav'

export default function SidebarLayout () {
  return (
    <div className="bg-background hidden md:block h-full max-h-screen flex-col gap-2 border-r-[1px]">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-4 font-semibold">
          <Pyramid size={24} />
          <span className="">Atlas Inventory</span>
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1">
        <NavBar />
      </div>
    </div>
  )
}
