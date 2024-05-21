import OrderProducts from './order-products'
import OrderHeader from './order-header'
import Order from './order'

export default function OrdersItem ({ ordersId }) {
  return (
    <div className="grid gap-4">
      <OrderHeader ordersId={ordersId} />
      <div className="flex gap-4 w-full h-full">
        <Order />
        <OrderProducts />
      </div>
    </div>
  )
}
