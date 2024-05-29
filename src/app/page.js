'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useProfileStore } from '@/store/profile'

export const revalidat = 60

export default function Home () {
  const fetchProfile = useProfileStore((state) => state.fetchProfile)
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      await fetchProfile()
    }

    fetchData()
    router.push('/orders/1')
  }, [])
  return <></>
}
