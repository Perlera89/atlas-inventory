import { useInventoryStore } from '@/store/inventory'
import CardItem from '@/components/ui/card-item'

export default function ProductKanbanItem ({ products }) {
  const handleOpenProduct = useInventoryStore(
    (state) => state.handleOpenProduct
  )
  const setAction = useInventoryStore((state) => state.setAction)

  const handleClick = (id) => {
    handleOpenProduct(id)
    setAction('view')
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 w-full">
      {products.map((product, key) => (
        <CardItem
          key={key}
          image={product.productInfo.thumbnail}
          name={product.productInfo.name}
          price={product.salePrice}
          stock={product.stock}
          onClick={() => handleClick(product.id)}
        />
      ))}
    </div>
  )
}
