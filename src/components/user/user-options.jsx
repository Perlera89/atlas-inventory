// import { getServerSession } from 'next-auth/next'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route.js'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/store/profile'
import { useUserStore } from '@/store/user'

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
  const fetchUser = useUserStore((state) => state.fetchUser)

  const { data } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const email = data?.user?.email
        if (email) {
          await fetchUser(email)
        }
      }
    }
    fetchData()
  }, [data])

  useEffect(() => {
    const fetchData = async () => {
      await fetchProfile()
    }

    fetchData()
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
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut()
            router.push('/auth/login')
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
