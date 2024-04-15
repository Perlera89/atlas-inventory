'use client'
import { UserRound } from 'lucide-react'

import { ModeToggle } from '@/components/ui/dark-toogle'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import NavBar from './nav'

export default function SidebarLayout (isCollapsed) {
  return (
    <aside className="inset-y-0 h-screen left-0 z-10 w-14 flex-col bg-background sm:flex">
      <NavBar />
      <nav className="fixed bottom-5 sm:static mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="overflow-hidden rounded-full w-8 h-8"
            >
              <UserRound size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  )
}
