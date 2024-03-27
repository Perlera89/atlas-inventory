'use client'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '../button'
export default function NotFoundItem () {
  const currentPage = usePathname()
  return (
    <div className="m-auto flex flex-col gap-4 items-center h-screen justify-center pb-20">
      <div className="flex flex-col justify-center items-center gap-2">
        <h2 className="text-2xl font-extrabold text-foreground">
          <div className="flex gap-1 justify-center">
            <span className="text-8xl text-white font-semibold">4</span>
            <Image src="/icon.svg" width={75} height={75} alt="notFound.png" />
            <span className="text-8xl text-white font-semibold">4</span>
          </div>
          <span className="font-semibold flex justify-center text-3xl">
            Not found
          </span>
        </h2>
        <p className="text-ghost-white mt-2">
          Sorry, the page you visited does not exist:{' '}
          <span className="text-tomato font-semibold">{currentPage}</span>
        </p>
      </div>
      <Button
        variant="outline"
        className="mt-2"
        onClick={() => window.history.back()}
      >
        Home
      </Button>
    </div>
  )
}
