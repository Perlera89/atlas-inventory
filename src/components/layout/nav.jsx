'use client'
import {
  Pyramid,
  ShoppingCart,
  Home,
  Package,
  Briefcase
  , Users
} from 'lucide-react'

import TooltipItem from '../display/tooltip'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

export default function NavBar () {
  const router = usePathname()

  return (
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <Link
        href="#"
        className="group flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
      >
        <Pyramid className="h-4 w-4 transition-all group-hover:scale-110" />
        <span className="sr-only">Atlas Inv.</span>
      </Link>
      {[
        ['/', 'Home', Home],
        ['/orders', 'Orders', ShoppingCart],
        ['/inventory', 'Products', Package],
        ['/clients', 'Clients', Users],
        ['/employees', 'Employees', Briefcase]
      ].map(([href, label, Icon]) => (
        <TooltipItem content={label} key={label}>
          <Link
            href={href}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:text-foreground ${
              router === href
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipItem>
      ))}
    </nav>
  )
}
