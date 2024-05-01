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
import { LuBoxes, LuShoppingCart } from 'react-icons/lu'

// hooks & stores
import { usePathname, useRouter } from 'next/navigation'
import { useInventoryStore } from '@/store/inventory'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

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

// const Lastproducts = () => {
//   const lastProducts = useInventoryStore((state) => state.lastProducts)

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Recent Products</CardTitle>
//       </CardHeader>
//       <CardContent className="grid gap-8 px-6 pb-6">
//         {lastProducts.map((product) => (
//           <div className="flex items-center gap-4" key={product.id}>
//             <img
//               src={product.productInfo.thumbnail}
//               className="h-9 w-9 sm:flex rounded-full"
//             />
//             <div className="grid gap-1">
//               <p className="text-sm text-foreground font-medium leading-none">
//                 {product.productInfo.name}
//               </p>
//               <p className="text-sm text-foreground/70">
//                 Stock: {product.stock}
//               </p>
//             </div>
//             <div className="ml-auto font-medium">$ {product.salePrice}</div>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   )
// }

export default function InventoryPage () {
  const productCount = useInventoryStore((state) => state.productCount)
  const pathname = usePathname()
  const error = useInventoryStore((state) => state.error)
  const openResult = useInventoryStore((state) => state.openResult)
  const handleOpenResult = useInventoryStore((state) => state.handleOpenResult)
  const handleCloseResult = useInventoryStore(
    (state) => state.handleCloseResult
  )
  const setAction = useInventoryStore((state) => state.setAction)
  const fetchProducts = useInventoryStore((state) => state.fetchProducts)

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts()
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
          {productCount > 0
            ? (
            <Products />
              )
            : (
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
              )}
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
