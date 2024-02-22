import { Card } from 'antd'
import { ShoppingCart } from 'lucide-react'
const CardItem = () => {
  return (
    <div className='flex gap-8 justify-start'>
      <Card
        title="Total productos"
        className='w-full'
        bordered
        size="small"
        style={{
          width: 300
        }}
      >
        <div className="flex gap-2">
          <ShoppingCart />
          <p className="text-xl ml-2">12</p>
        </div>
      </Card>
    </div>
  )
}

export default CardItem
