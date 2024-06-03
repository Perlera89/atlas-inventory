'use client'
// components
import { Toaster } from 'react-hot-toast'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

// hooks & stores
import { usePathname, useRouter } from 'next/navigation'
import { useProfileStore } from '@/store/profile'
import { Button } from '@/components/ui/button'
import Profile from '@/components/profile/profile'

const NoProfile = () => {
  const router = useRouter()
  const setAction = useProfileStore((state) => state.setAction)

  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-[93vh]">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no profile
        </h3>
        <p className="text-sm text-muted-foreground">
          You can add a profile to get started
        </p>
        <Button
          className="mt-4"
          onClick={() => {
            setAction('edit')
            router.push('/profile/edit')
          }}
        >
          Add Profile
        </Button>
      </div>
    </div>
  )
}

export default function ProfilePage () {
  const pathname = usePathname()

  const isDeleted = useProfileStore((state) => state.isDeleted)

  return (
    <>
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-foreground/70" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="capitalize" href={pathname}>
                {pathname.split('/')[1]}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="gap-4">
          {isDeleted ? <NoProfile /> : <Profile />}
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1d1d1d',
            color: 'white'
          }
        }}
      />
    </>
  )
}
