'use client'
import {
  Settings,
  UserRound
} from 'lucide-react'

import { ModeToggle } from '@/components/ui/dark-toogle'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import TooltipItem from '../display/tooltip'

import Link from 'next/link'

import { Button } from '../ui/button'
import NavBar from './nav'

export default function SidebarLayout () {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <NavBar />
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <ModeToggle />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant='secondary'
                className="overflow-hidden rounded-full w-8 h-8"
              >
                <UserRound size={16} className='text-primary/70' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side='right' >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        <TooltipItem>
          <Link
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Link>
        </TooltipItem>
      </nav>
    </aside>
  )
}
