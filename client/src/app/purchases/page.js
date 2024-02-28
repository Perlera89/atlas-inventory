'use client'
import { useFetchProduct } from '@/hooks/useFetchProduct'

export default function PurchasesPage () {
  const { products } = useFetchProduct()
  return <div>Purchase page</div>
}
