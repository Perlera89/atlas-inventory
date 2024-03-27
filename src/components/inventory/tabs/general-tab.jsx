import { useInventoryStore } from '@/store/inventory'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function GeneralTab () {
  const product = useInventoryStore((state) => state.product)
  const action = useInventoryStore((state) => state.action)
  const price = useInventoryStore((state) => state.price)
  const cost = useInventoryStore((state) => state.cost)
  const minimumPrice = useInventoryStore((state) => state.minimumPrice)
  const minimumStock = useInventoryStore((state) => state.minimumStock)
  const iva = useInventoryStore((state) => state.iva)
  const handleInputChange = useInventoryStore(
    (state) => state.handleInputChange
  )

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex justify-between gap-2">
        <div className="grid gap-2">
          <Label htmlFor="price">Sale price</Label>
          <Input
            id="price"
            type="number"
            placeholder="0.00"
            value={price}
            onChange={(e) => handleInputChange('price', e)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cost">Purchase price</Label>
          <Input
            id="cost"
            type="number"
            placeholder="0.00"
            value={cost}
            onChange={(e) => handleInputChange('cost', e)}
          />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="grid gap-2">
          <Label htmlFor="temperature">Minimum price</Label>
          <Input
            id="temperature"
            type="number"
            placeholder="0.00"
            value={minimumPrice}
            onChange={(e) => handleInputChange('minimumPrice', e)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="temperature">IVA</Label>
          <Input
            id="temperature"
            type="number"
            placeholder="0%"
            value={iva}
            onChange={(e) => handleInputChange('iva', e)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="temperature">Minimum stock</Label>
        <Input
          id="temperature"
          type="number"
          placeholder="0"
          value={minimumStock}
          onChange={(e) => handleInputChange('minimumStock', e)}
        />
      </div>
    </div>
  )
}
