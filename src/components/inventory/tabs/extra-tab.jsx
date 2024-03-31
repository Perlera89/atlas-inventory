import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useInventoryStore } from '@/store/inventory'

export default function ExtraTab () {
  const product = useInventoryStore((state) => state.product)
  const action = useInventoryStore((state) => state.action)
  const safetyInfo = useInventoryStore((state) => state.safetyInfo)
  const description = useInventoryStore((state) => state.description)
  const handleInputChange = useInventoryStore(
    (state) => state.handleInputChange
  )

  return (
    <div className="grid gap-2 mt-4">
      <div className="grid gap-2">
        <Label htmlFor="safetyInfo">Description</Label>
        <Textarea
          id="safetyInfo"
          placeholder="Emtpy"
          value={safetyInfo}
          onChange={(e) => handleInputChange('safetyInfo', e)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Safety info</Label>
        <Textarea
          id="description"
          placeholder="Empty"
          value={description}
          onChange={(e) => handleInputChange('description', e)}
        />
      </div>
    </div>
  )
}
