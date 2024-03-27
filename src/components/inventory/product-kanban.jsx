import { Image, Typography } from 'antd'
import { useInventoryStore } from '@/store/inventory'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

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
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
      {products.map((product, key) => (
        <Card
          key={key}
          className="hover:cursor-pointer hover:bg-muted/50 transition-colors w-full"
          onClick={() => handleClick(product.id)}
        >
          <CardContent className="flex gap-4 items-center">
            <Image
              className="rounded-s-md"
              width={100}
              height={100}
              preview={false}
              fallback="/fallback.png"
              src={product.productInfo?.thumbnail}
            />
            <div>
              <h3 className="text-lg font-bold">{product.productInfo?.name}</h3>
              <div className="flex gap-2">
                <Text>Stock:</Text>
                <Text type="secondary">{product.stock}</Text>
              </div>
              <div className="flex gap-2">
                <Text>Price:</Text>
                <Text type="secondary">$ {product.salePrice}</Text>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
