import BadgeItem from '@/components/ui/display/badge'
import InputNumberItem from '@/components/ui/entry/input-number'
import { useInventoryStore } from '@/store/inventory'
import { Typography } from 'antd'
import { DollarSign, Percent, Box } from 'lucide-react'

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
        <InputNumberItem
          icon={DollarSign}
          placeholder="Price"
          title="Price"
          value={price}
          handleChange={handlePriceChange}
        />
        <InputNumberItem
          icon={DollarSign}
          placeholder="Minimum price"
          title="Minimum price"
          value={minimumPrice}
          handleChange={handleMinimumPriceChange}
        />
      </div>
      <div className="flex justify-between gap-2">
        <InputNumberItem
          icon={DollarSign}
          placeholder="Cost"
          title="Cost"
          value={cost}
          handleChange={handleCostChange}
        />
        <InputNumberItem
          icon={Percent}
          placeholder="Iva"
          title="Iva"
          value={iva}
          handleChange={handleIvaChange}
        />
      </div>
      <InputNumberItem
        placeholder="Minimum stock"
        icon={Box}
        title="Minimum stock"
        value={minimumStock}
        handleChange={handleMinimumStockChange}
      />
    </div>
  )
}
