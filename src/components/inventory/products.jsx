import { useInventoryStore } from '@/store/inventory'
import ProductListItem from './producst-list'
import ProductKanbanItem from './product-kanban'
import { useEffect } from 'react'

export function ProductsItem () {
  const products = useInventoryStore((state) => state.products)
  const fetchProducts = useInventoryStore((state) => state.fetchProducts)
  const view = useInventoryStore((state) => state.view)

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      {view === 'list'
        ? (
        <ProductListItem products={products} />
          )
        : (
        <ProductKanbanItem products={products} />
          )}
    </div>
  )
}
