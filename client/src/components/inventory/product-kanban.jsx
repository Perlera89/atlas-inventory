import { Card, Image, Typography } from 'antd'
import { useInventoryStore } from '@/store/inventory'

const { Text } = Typography

export default function ProductKanbanItem ({ products }) {
  const handleOpenProduct = useInventoryStore(
    (state) => state.handleOpenProduct
  )
  const setAction = useInventoryStore((state) => state.setAction)

  const handleClick = (record) => {
    handleOpenProduct(record)
    setAction('view')
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {products.map((product, key) => (
        <Card
          key={key}
          size="small"
          className="hover:bg-dark-gray transition-colors hover:cursor-pointer"
          onClick={() => handleClick(product)}
        >
          <div className="flex gap-4">
            <Image
              className="rounded-md"
              width={75}
              height={75}
              preview={false}
              fallback="/fallback.png"
              src={product.product_info?.thumbnail}
            />
            <div>
              <h3 className="text-lg font-bold">
                {product.product_info?.name}
              </h3>
              <div className="flex gap-2">
                <Text>Stock:</Text>
                <Text type="secondary">{product.stock}</Text>
              </div>
              <div className="flex gap-2">
                <Text>Price:</Text>
                <Text type="secondary">$ {product.sale_price}</Text>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}