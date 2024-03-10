import InputNumberItem from '@/components/ui/entry/input-number'
import { useInventoryStore } from '@/store/inventory'
import { Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Text } = Typography

export default function GeneralTab () {
  const product = useInventoryStore((state) => state.product)
  const action = useInventoryStore((state) => state.action)

  const [salePrice, setSalePrice] = useState(null)
  const [minimumPrice, setMinimumPrice] = useState(null)
  const [purchasePrice, setPurchasePrice] = useState(null)
  const [minimumStock, setMinimumStock] = useState(null)
  const [iva, setIva] = useState(null)

  useEffect(() => {
    if (action !== 'add') {
      setSalePrice(product.salePrice)
      setMinimumPrice(product.minimumPrice)
      setPurchasePrice(product.purchasePrice)
      setMinimumStock(product.productInfo.minimumStock)
      setIva(product.iva * 100)
    }
  }, [action])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <div className="flex items-center">
          <Text className="w-28">Price</Text>
          <span>$</span>
          <InputNumberItem value={salePrice} />
        </div>
        <div className="flex items-center">
          <Text className="w-48">Minimun price</Text>
          <span>$</span>
          <InputNumberItem value={minimumPrice} />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex items-center">
          <Text className="w-28">Cost</Text>
          <span>$</span>
          <InputNumberItem value={purchasePrice} />
        </div>
        <div className="flex items-center">
          <Text className="w-48">Minimum stock</Text>
          <InputNumberItem value={minimumStock} />
        </div>
      </div>
      <div className="flex items-center">
        <Text className="w-[84px]">IVA</Text>
        <span>%</span>
        <InputNumberItem value={iva} />
      </div>
    </div>
  )
}
