import InputNumberItem from '@/components/ui/entry/input-number'
import { Typography } from 'antd'

const { Text } = Typography

export default function GeneralTab () {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <div className="flex items-center">
          <Text className="w-28">Price</Text>
          <InputNumberItem />
        </div>
        <div className="flex items-center">
          <Text className="w-28">Min. price</Text>
          <InputNumberItem />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex items-center">
          <Text className="w-28">Cost</Text>
          <InputNumberItem />
        </div>
        <div className="flex items-center">
          <Text className="w-28">IVA</Text>
          <InputNumberItem />
        </div>
      </div>
      <div className="flex items-center">
        <Text className="w-24">Min. stock</Text>
        <InputNumberItem />
      </div>
    </div>
  )
}
