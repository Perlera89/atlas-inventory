'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const revalidat = 60

export default function Home () {
  const router = useRouter()
  useEffect(() => {
    router.push('/inventory')
  }, [])
  return (
    <>
    </>
  )
}
