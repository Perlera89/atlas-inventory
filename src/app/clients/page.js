'use client'
// components
import { Toaster } from 'react-hot-toast'
import CardCountItem from '@/components/display/card-count'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

// icons
import { Users } from 'lucide-react'

// hooks & stores
import { usePathname, useRouter } from 'next/navigation'
import { useClientStore } from '@/store/client'
import ClientList from '@/components/clients/clients'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

const Clients = () => {
  const clients = useClientStore((state) => state.clients)
  const clientsCount = useClientStore((state) => state.clientsCount)

  return (
    <div className="flex flex-col gap-4 w-full">
      <CardCountItem
        title="Total clients"
        count={clientsCount}
        icon={Users}
        handleFilter={null}
      />
      <ClientList clients={clients} />
    </div>
  )
}

const NoClients = () => {
  const router = useRouter()
  const setAction = useClientStore((state) => state.setAction)

  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-[93vh]">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no clients
        </h3>
        <p className="text-sm text-muted-foreground">
          You can add a client to get started
        </p>
        <Button
          className="mt-4"
          onClick={() => {
            setAction('edit')
            router.push('/clients/add')
          }}
        >
          Add Client
        </Button>
      </div>
    </div>
  )
}

export default function ClientsPage () {
  const pathname = usePathname()

  const isLoading = useClientStore((state) => state.isLoading)
  const setIsLoading = useClientStore((state) => state.setIsLoading)
  const clientsCount = useClientStore((state) => state.clientsCount)

  const fetchClients = useClientStore((state) => state.fetchClients)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await fetchClients()
      setIsLoading(false)
    }

    fetchData()
  }, [])

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
          {!isLoading && clientsCount === 0 ? <NoClients /> : <Clients />}
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1d1d1d',
            color: 'white'
          }
        }}
      />
    </>
  )
}
