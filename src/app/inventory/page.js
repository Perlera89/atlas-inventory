'use client'
import { Triangle } from 'react-loader-spinner'
// components
import { Toaster } from 'react-hot-toast'
import { ProductsItem } from '../../components/inventory/products'
import CardCountItem from '@/components/display/card-count'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

// icons
import { LuBoxes, LuShoppingCart } from 'react-icons/lu'

// hooks & stores
import { usePathname, useRouter } from 'next/navigation'
import { useInventoryStore } from '@/store/inventory'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const Products = () => {
  const productCount = useInventoryStore((state) => state.productCount)
  const productOnSaleCount = useInventoryStore(
    (state) => state.productOnSaleCount
  )
  const handleFilterByType = useInventoryStore(
    (state) => state.handleFilterByType
  )

  return (
    <div className="col-span-full xl:col-span-4 flex flex-col gap-4">
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
  )
}

const NoProducts = () => {
  const setAction = useInventoryStore((state) => state.setAction)

  const router = useRouter()
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-[93vh]">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no products
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start selling as soon as you add a product.
        </p>
        <Button
          className="mt-4"
          onClick={() => {
            setAction('edit')
            router.push('/inventory/add')
          }}
        >
          Add Product
        </Button>
      </div>
    </div>
  )
}

export default function InventoryPage () {
  const productCount = useInventoryStore((state) => state.productCount)
  const isLoading = useInventoryStore((state) => state.isLoading)
  const setIsLoading = useInventoryStore((state) => state.setIsLoading)
  const pathname = usePathname()

  const fetchProducts = useInventoryStore((state) => state.fetchProducts)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await fetchProducts()
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
                {pathname?.split('/')[1]}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="gap-4">
          {!isLoading && productCount === 0 ? <NoProducts /> : <Products />}
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
