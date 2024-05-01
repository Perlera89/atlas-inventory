'use client'
// components
import { Toaster } from 'react-hot-toast'
import { ProductsItem } from '../../components/inventory/products'
import CardCountItem from '@/components/display/card-count'
import ResultItem from '@/components/display/result'
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
import { usePathname } from 'next/navigation'
import { useClientStore } from '@/store/client'
import ClientList from '@/components/clients/clients'
import { useEffect } from 'react'

const Clients = () => {
  const clients = useClientStore((state) => state.clients)
  const clientsCount = useClientStore((state) => state.clientsCount)
  const fetchClients = useClientStore((state) => state.fetchClients)

  useEffect(() => {
    const fetchData = async () => {
      await fetchClients()
    }
    fetchData()
  }, [])

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

export default function ClientsPage () {
  const pathname = usePathname()
  const error = useClientStore((state) => state.error)
  const openResult = useClientStore((state) => state.openResult)
  const handleOpenResult = useClientStore((state) => state.handleOpenResult)
  const handleCloseResult = useClientStore(
    (state) => state.handleCloseResult
  )

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
          <Clients />
        </div>
      </div>
      <ResultItem
        title={error ? error?.request?.statusText : null}
        alert={error ? error?.message : null}
        open={openResult}
        handleOpen={handleOpenResult}
        handleClose={handleCloseResult}
      />
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
