'use client'
import {
  Pyramid,
  ShoppingCart,
  Home,
  Package,
  LineChart,
  Settings,
  User
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

import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

export default function NavBar () {
  const router = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Pyramid className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Atlas Inv.</span>
        </Link>
        {[
          ['/', 'Dashboard', Home],
          ['/orders', 'Orders', ShoppingCart],
          ['/inventory', 'Products', Package],
          ['/analytics', 'Analytics', LineChart]
        ].map(([href, label, Icon]) => (
          <TooltipItem content={label} key={label}>
            <Link
              href={href}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${router === href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{label}</span>
            </Link>
          </TooltipItem>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <User className="h-5 w-5 text-foreground/70" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
