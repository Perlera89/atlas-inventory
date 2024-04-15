'use client'

import ProductPage from '@/components/inventory/product'
import { useParams } from 'next/navigation'

export default function AddProductPage () {
  const { productId } = useParams()
  return (
    <>
      <ProductPage productId={productId} />
    </>
  )
}
