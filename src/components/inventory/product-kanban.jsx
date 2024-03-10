import { Card, Image, Typography } from 'antd'
import { useInventoryStore } from '@/store/inventory'

const { Text } = Typography

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
    <div className="grid grid-cols-5 gap-2">
      {products.map((product, key) => (
        <Card
          key={key}
          size="small"
          className="hover:bg-dark-gray transition-colors hover:cursor-pointer"
          onClick={() => handleClick(product.id)}
        >
          <div className="flex gap-4">
            <Image
              className="rounded-md"
              width={75}
              height={75}
              preview={false}
              fallback="/fallback.png"
              src={product.productInfo?.thumbnail}
            />
            <div>
              <h3 className="text-lg font-bold">
                {product.productInfo?.name}
              </h3>
              <div className="flex gap-2">
                <Text>Stock:</Text>
                <Text type="secondary">{product.stock}</Text>
              </div>
              <div className="flex gap-2">
                <Text>Price:</Text>
                <Text type="secondary">$ {product.salePrice}</Text>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
