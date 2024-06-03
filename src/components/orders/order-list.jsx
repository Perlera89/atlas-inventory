// hooks and store
import { useState } from 'react'
import { useOrderStore } from '@/store/order'
import { useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'

// icons
import { ShoppingCart, ChevronLeft, Trash2 } from 'lucide-react'

// components
import OrderFooter from './order-footer'
import OrdersList from './orders-list'
import OrderItem from './order-item'
import { Button } from '../ui/button'
import { Badge } from '@/components/ui/badge'

export default function OrderList () {
  const router = useRouter()

  const [clickedItem, setClickedItem] = useState(null)
  const [openOrders, setOpenOrders] = useState(false)

  const order = useOrderStore((state) => state.order)
  const ordersCount = useOrderStore((state) => state.ordersCount)
  const total = useOrderStore((state) => state.total)
  const iva = useOrderStore((state) => state.iva)
  const setSelectedProduct = useOrderStore((state) => state.setSelectedProduct)

  const setPrice = useOrderStore((state) => state.setPrice)
  const setQuantity = useOrderStore((state) => state.setQuantity)
  const setDiscount = useOrderStore((state) => state.setDiscount)

  const handleNewOrder = useOrderStore((state) => state.handleNewOrder)
  const handleDeleteOrder = useOrderStore((state) => state.handleDeleteOrder)

  const handleClickDelete = () => {
    handleDeleteOrder(order.id)
    handleNewOrder()
  }

  useHotkeys('alt+n', () => handleNewOrder())
  useHotkeys('alt+o', () => setOpenOrders(true))

  return (
    <div className="grid w-full h-full gap-4">
      <div className="flex justify-between items-center">
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
          <OrdersList open={openOrders} setOpen={setOpenOrders}>
            <div className="relative cursor-pointer">
              <ShoppingCart />
              <Badge className="absolute bottom-4 left-4">{ordersCount}</Badge>
            </div>
          </OrdersList>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="ghost" onClick={handleClickDelete}>
            <Trash2 />
          </Button>
          <Button size="sm" onClick={handleNewOrder}>New Order</Button>
        </div>
      </div>
      <div className="flex flex-col h-[63.5vh] overflow-y-auto border rounded-md w-[93vw] lg:w-full">
        {(!order?.products || order?.products.length === 0) && (
          <div className="flex flex-col h-full items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-4">
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
            isSelected={clickedItem === product.product}
            onClick={() => {
              setClickedItem(product.product)
              setSelectedProduct(product)
              setPrice(product.price)
              setQuantity(product.quantity)
              setDiscount(product.discount)
            }}
          />
        ))}
        {order?.products?.length > 0 && <OrderFooter total={total} iva={iva} />}
      </div>
    </div>
  )
}
