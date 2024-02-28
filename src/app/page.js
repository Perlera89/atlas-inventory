<<<<<<< Updated upstream
'use client'
=======
>>>>>>> Stashed changes
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home () {
  const router = useRouter()
  useEffect(() => {
    router.push('/purchases')
  }, [])
  return null
}
