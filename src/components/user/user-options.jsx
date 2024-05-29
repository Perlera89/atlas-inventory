// import { getServerSession } from 'next-auth/next'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route.js'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/store/profile'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { UserRound } from 'lucide-react'
import { useEffect } from 'react'

export default function UserOptions () {
  const router = useRouter()
  const thumbnail = useProfileStore((state) => state.thumbnail)

  const fetchProfile = useProfileStore((state) => state.fetchProfile)

  useEffect(() => {
    const fetchData = async () => {
      await fetchProfile()
    }

    fetchData()
    router.push('/orders/1')
  }, [])

  // const session = await getServerSession(authOptions)
  // console.log('session', session)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="overflow-hidden rounded-full w-8 h-8">
          {thumbnail
            ? (
            <img alt="User profile" className="rounded-full" src={thumbnail} />
              )
            : (
            <UserRound className="w-4 h-4 text-muted" />
              )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
