import OrderList from './order-list'
import OrderOptions from './order-options'

export default function Order () {
  return (
    <div className="w-1/3 h-[87vh] flex flex-col justify-between gap-4">
      <OrderList />
      <OrderOptions />
    </div>
  )
}
