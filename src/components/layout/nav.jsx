'use client'
import {
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
  Triangle
} from 'lucide-react'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

export default function NavBar () {
  const router = usePathname()

  return (
    <nav className="grid items-start px-2 text-sm gap-1 mt-2 font-medium lg:px-4">
      <Link
        href="#"
        className="flex items-center gap-2 sm:block md:hidden pb-4 ml-2 text-lg font-semibold"
      >
        <Triangle className="h-6 w-6" />
        <span className="sr-only">Atlas inventory</span>
      </Link>
      {[
        [Home, 'Dashboard', '/'],
        [ShoppingCart, 'Orders', '/orders'],
        [Package, 'Inventory', '/inventory'],
        [Users, 'Customers', '/customers'],
        [LineChart, 'Analytics', '/analytics']
      ].map(([Icon, label, href]) => (
        <Link
          key={label}
          href={href}
          className={`flex hover:text-muted-foreground items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            router === href && 'bg-muted text-muted-foreground'
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  )
}
