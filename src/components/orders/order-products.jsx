import CardItem from '@/components/ui/card-item'
import { useCallback, useEffect } from 'react'
import { useOrderStore } from '@/store/order'
import { Package } from 'lucide-react'
import Link from 'next/link'

export default function OrderProducts () {
  const fetchProductsToOrder = useOrderStore((state) => state.fetchProductsToOrder)
  const filteredProducts = useOrderStore((state) => state.filteredProducts)

  const orders = useOrderStore((state) => state.orders)
  const order = useOrderStore((state) => state.order)

  const handleAddProductToOrder = useOrderStore((state) => state.handleAddProductToOrder)
  const getProducts = useCallback(async () => {
    await fetchProductsToOrder()
  }, [fetchProductsToOrder])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <div className="w-2/3 h-full">
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
          <Package className="w-16 h-16 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            No products
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
          Sorry, we have no products to sell.
          </p>
          <Link
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 dark:focus-visible:ring-gray-300"
            href="/inventory/add"
          >
            Add Product
          </Link>
        </div>
      )}
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-2">
        {filteredProducts.slice(0, 10).map((product, index) => (
          <CardItem
            key={index}
            thumbnail={product.productInfo.thumbnail}
            name={product.productInfo.name}
            price={product.salePrice}
            stock={product.stock}
            onClick={
              () => handleAddProductToOrder({
                id: product.id,
                name: product.productInfo.name,
                price: product.salePrice,
                iva: product.iva,
                quantity: 1,
                discount: 0
              })
            }
          />
        ))}
      </div>
    </div>
  )
}
