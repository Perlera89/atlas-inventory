import { Card, CardContent } from '@/components/ui/card'
import { Image } from 'antd'

export default function CardProduct ({ thumbnail, name, stock, price, onClick }) {
  return (
    <Card
      className="hover:cursor-pointer hover:bg-muted/50 transition-colors w-full"
      onClick={onClick}
    >
      <CardContent className="flex gap-2 items-center">
        <Image
          className="rounded-s-md h-20 object-cover"
          height={80}
          width={75}
          preview={false}
          fallback="/placeholder.svg"
          src={thumbnail}
        />
        <div>
          <h5 className="text-sm font-bold">{name}</h5>
          <div className="flex gap-2">
            <p className='text-sm'>Stock:</p>
            <p className="text-sm text-foreground/70">{stock}</p>
          </div>
          <div className="flex gap-2">
            <p className='text-sm'>Price:</p>
            <p className="text-sm text-foreground/70">$ {price}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
