import TextareaItem from '@/components/ui/entry/textarea'
import { useInventoryStore } from '@/store/inventory'
import { Typography } from 'antd'

const { Text } = Typography

export default function ExtraTab () {
  const product = useInventoryStore((state) => state.product)

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Text className='w-28'>Safety information</Text>
          <TextareaItem value={product.product_info?.safety_info} />
        </div>
        <div className="flex gap-2">
          <Text className='w-28'>Note</Text>
          <TextareaItem value={product?.product_info?.note} />
        </div>
      </div>
    </div>
  )
}
