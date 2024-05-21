'use client'

import OrdersItem from '@/components/orders/orders'
import { useParams } from 'next/navigation'

export default function OrdersPage () {
  const { ordersId } = useParams()
  return <OrdersItem ordersId={ordersId} />
}
