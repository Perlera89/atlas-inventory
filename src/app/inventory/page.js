'use client'
// components
import { Toaster } from 'react-hot-toast'

// icons
import { LuBoxes, LuShoppingCart } from 'react-icons/lu'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

import { usePathname } from 'next/navigation'

// hooks
import { useInventoryStore } from '@/store/inventory'
import { ProductsItem } from '../../components/inventory/products'
import CardCountItem from '@/components/display/card-count'
import ResultItem from '@/components/display/result'

export default function InventoryPage () {
  const pathname = usePathname()

  const productCount = useInventoryStore((state) => state.productCount)
  const productOnSaleCount = useInventoryStore(
    (state) => state.productOnSaleCount
  )
  const handleFilterByType = useInventoryStore(
    (state) => state.handleFilterByType
  )
  const error = useInventoryStore((state) => state.error)
  const openResult = useInventoryStore((state) => state.openResult)
  const handleOpenResult = useInventoryStore((state) => state.handleOpenResult)
  const handleCloseResult = useInventoryStore(
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
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <CardCountItem
            title="Total products"
            count={productCount}
            icon={LuBoxes}
            handleFilter={() => handleFilterByType('all')}
          />
          <CardCountItem
            title="Total on sale"
            count={productOnSaleCount}
            icon={LuShoppingCart}
            handleFilter={() => handleFilterByType('onSale')}
          />
        </div>
        <ProductsItem />
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
