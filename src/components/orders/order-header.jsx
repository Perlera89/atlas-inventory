import { useOrderStore } from '@/store/order'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { ShoppingCart, ChevronLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SearchItem } from '@/components/ui/search'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

import OrdersList from './orders-list'

export default function OrderHeader ({ ordersId }) {
  const router = useRouter()

  const productsToOrder = useOrderStore((state) => state.productsToOrder)
  const ordersCount = useOrderStore((state) => state.ordersCount)

  const handleSearch = useOrderStore((state) => state.handleSearch)
  const handleNewOrder = useOrderStore((state) => state.handleNewOrder)

  return (
    <div className="flex w-full flex-col bg-background gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-foreground/70" asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-foreground/70" asChild>
              <Link href="/orders">Board</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary">Sucursal 1</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex">
        <div className="flex justify-between w-1/3 items-center">
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => router.push('/orders')}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <OrdersList>
              <div className="relative cursor-pointer">
                <ShoppingCart />
                <Badge className="absolute bottom-4 left-4">
                  {ordersCount}
                </Badge>
              </div>
            </OrdersList>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleNewOrder}>New Order</Button>
          </div>
        </div>
        <div className="w-2/3 ml-4 flex justify-between items-center">
          <SearchItem
            keys={['productInfo.name', 'code']}
            placeholder="Search product..."
            options={productsToOrder}
            onSearch={(value) => handleSearch(value, 'filteredProducts')}
          />
        </div>
      </div>
    </div>
  )
}
