import OrderList from './order-list'
import OrderOptions from './order-options'

export default function Order () {
  return (
    <div className="w-1/3 h-full grid gap-4">
      <OrderList />
      <OrderOptions />
    </div>
  )
}
