'use client'
import { ModeToggle } from '@/components/ui/dark-toogle'
import NavBar from './nav'
import UserOptions from '../user/user-options'

export default function SidebarLayout (isCollapsed) {
  return (
    <aside className="inset-y-0 h-screen left-0 z-10 w-14 flex-col bg-background sm:flex">
      <NavBar />
      <nav className="fixed bottom-5 sm:static mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <ModeToggle />
        <UserOptions />
      </nav>
    </aside>
  )
}
