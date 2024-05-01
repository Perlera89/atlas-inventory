'use client'

import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Pyramid } from 'lucide-react'

export default function AuthLayout ({ children }) {
  return (
    <>
      <header className="flex justify-between items-center mt-4 mx-4">
        <Link
          href="/"
          className="group flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
        >
          <Pyramid className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Atlas Inv.</span>
        </Link>
        {usePathname() === '/auth/login'
          ? (
          <Button variant="ghost" className="font-bold text-md">
            <Link href="/auth/register">Register</Link>
          </Button>
            )
          : (
          <Button variant="ghost" className="font-bold text-md">
            <Link href="/auth/login">Login</Link>
          </Button>
            )}
      </header>
      <div className="min-h-[94vh] flex items-center justify-center bg-background">
        <div className="p-8 rounded-lg shadow-md max-w-md w-full">
          {children}
        </div>
      </div>
    </>
  )
}
