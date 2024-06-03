'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { SearchItem } from '@/components/ui/search'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import SalepointItem from '@/components/orders/salepoint-item'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComboboxDropdownMenu } from '@/components/ui/combobox'
import { Menu, LayoutGrid } from 'lucide-react'

// hooks and stores
import { useOrderStore } from '@/store/order'

export default function SalePointsPage () {
  const router = useRouter()

  const ordersId = useOrderStore((state) => state.ordersId)

  const handleChangeView = (view) => {
    // Agrregar logcia para cambiar la vista
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-foreground/70" asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-primary" asChild>
              <Link href="/clients">Board</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full flex gap-2 items-center">
        <Button >Add sale point</Button>
        <SearchItem placeholder="Search sale point" />
        <ComboboxDropdownMenu />
        <Tabs defaultValue="list" size="small">
          <TabsList>
            <TabsTrigger value="list" onClick={() => handleChangeView('list')}>
              <Menu />
            </TabsTrigger>
            <TabsTrigger
              value="kanban"
              onClick={() => handleChangeView('kanban')}
            >
              <LayoutGrid />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        <SalepointItem
          title="Sucursal 1"
          status="To close"
          closing="07/05/2024"
          balance="100.00"
          onOpen={() => router.push(`/orders/${ordersId}`)}
        />
      </div>
    </div>
  )
}
