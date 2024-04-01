'use client'

import { Button } from '@/components/ui/button'
import { useInventoryStore } from '@/store/inventory'
import { useParams } from 'next/navigation'

export default function ProductPage () {
  const handleOpenProduct = useInventoryStore(
    (state) => state.handleOpenProduct
  )
  const setAction = useInventoryStore((state) => state.setAction)
  const handleClick = () => {
    handleOpenProduct(1)
    setAction('view')
  }
  const params = useParams()
  return <Button onClick={handleClick}>Product</Button>
}
