import OrderFooter from './order-footer'
import OrderItem from './order-item'
import { ShoppingCart } from 'lucide-react'
import { useOrderStore } from '@/store/order'
import { useState } from 'react'

export default function OrderList () {
  const [clickedItem, setClickedItem] = useState(null)

  const order = useOrderStore((state) => state.order)
  const total = useOrderStore((state) => state.total)
  const iva = useOrderStore((state) => state.iva)
  const setSelectedProduct = useOrderStore((state) => state.setSelectedProduct)
  const selectedProduct = useOrderStore((state) => state.selectedProduct)

  const setPrice = useOrderStore((state) => state.setPrice)
  const setQuantity = useOrderStore((state) => state.setQuantity)
  const setDiscount = useOrderStore((state) => state.setDiscount)

  console.log('selectedProduct', selectedProduct)
  console.log('order', order)

  return (
    <div className="flex h-full flex-col overflow-y-auto border rounded-md">
      {(!order?.products || order?.products.length === 0) && (
        <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
          <div className="flex flex-col items-center gap-2">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Your order is empty
            </h2>
            <p className="text-gray-500">Add some products to get started</p>
          </div>
        </div>
      )}
      {order?.products?.map((product, index) => (
        <OrderItem
          key={index}
          name={product.name}
          quantity={product.quantity}
          price={product.price}
          discount={product.discount}
          isClicked={clickedItem === product.id}
          onClick={() => {
            setClickedItem(product.id)
            setSelectedProduct(product)
            setPrice(product.price)
            setQuantity(product.quantity)
            setDiscount('')
          }}
        />
      ))}
      {order?.products?.length > 0 && <OrderFooter total={total} iva={iva} />}
    </div>
  )
}
