import InputNumberItem from '@/components/ui/entry/input-number'
import { useInventoryStore } from '@/store/inventory'
import { Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Text } = Typography

export default function GeneralTab () {
  const product = useInventoryStore((state) => state.product)
  const action = useInventoryStore((state) => state.action)
  const price = useInventoryStore((state) => state.price)
  const cost = useInventoryStore((state) => state.cost)
  const minimumPrice = useInventoryStore((state) => state.minimumPrice)
  const minimumStock = useInventoryStore((state) => state.minimumStock)
  const iva = useInventoryStore((state) => state.iva)
  const handlePriceChange = useInventoryStore(
    (state) => state.handlePriceChange
  )
  const handleCostChange = useInventoryStore((state) => state.handleCostChange)
  const handleMinimumPriceChange = useInventoryStore(
    (state) => state.handleMinimumPriceChange
  )
  const handleMinimumStockChange = useInventoryStore(
    (state) => state.handleMinimumStockChange
  )
  const handleIvaChange = useInventoryStore((state) => state.handleIvaChange)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <div className="flex items-center">
          <Text className="w-28">Price</Text>
          <span>$</span>
          <InputNumberItem value={price} handleChange={handlePriceChange} />
        </div>
        <div className="flex items-center">
          <Text className="w-48">Minimun price</Text>
          <span>$</span>
          <InputNumberItem value={minimumPrice} handleChange={handleMinimumPriceChange} />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex items-center">
          <Text className="w-28">Cost</Text>
          <span>$</span>
          <InputNumberItem value={cost} handleChange={handleCostChange} />
        </div>
        <div className="flex items-center">
          <Text className="w-48">Minimum stock</Text>
          <InputNumberItem value={minimumStock} handleChange={handleMinimumStockChange} />
        </div>
      </div>
      <div className="flex items-center">
        <Text className="w-[84px]">IVA</Text>
        <span>%</span>
        <InputNumberItem value={iva} handleChange={handleIvaChange} />
      </div>
    </div>
  )
}
