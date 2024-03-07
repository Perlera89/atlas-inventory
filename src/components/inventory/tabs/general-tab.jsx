import InputNumberItem from '@/components/ui/entry/input-number'
import { useInventoryStore } from '@/store/inventory'
import { Typography } from 'antd'

const { Text } = Typography

export default function GeneralTab () {
  const product = useInventoryStore((state) => state.product)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <div className="flex items-center">
          <Text className="w-28">Price</Text>
          <span>$</span>
          <InputNumberItem value={product.sale_price} />
        </div>
        <div className="flex items-center">
          <Text className="w-28">Min. price</Text>
          <span>$</span>
          <InputNumberItem value={product.minimun_price} />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex items-center">
          <Text className="w-28">Cost</Text>
          <span>$</span>
          <InputNumberItem value={product.purshes_price} />
        </div>
        <div className="flex items-center">
          <Text className="w-28">IVA</Text>
          <span>$</span>
          <InputNumberItem value={product.IVA} />
        </div>
      </div>
      <div className="flex items-center">
        <Text className="w-24">Min. stock</Text>
        <span>$</span>
        <InputNumberItem value={product.minimun_stock} />
      </div>
    </div>
  )
}
