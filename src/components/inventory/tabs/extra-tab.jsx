import TextareaItem from '@/components/ui/entry/textarea'
import { useInventoryStore } from '@/store/inventory'
import { Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Text } = Typography

export default function ExtraTab () {
  const product = useInventoryStore((state) => state.product)
  const action = useInventoryStore((state) => state.action)
  const safetyInfo = useInventoryStore((state) => state.safetyInfo)
  const description = useInventoryStore((state) => state.description)
  const handleSafetyInfoChange = useInventoryStore(
    (state) => state.handleSafetyInfoChange
  )
  const handleDescriptionChange = useInventoryStore(
    (state) => state.handleDescriptionChange
  )

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <TextareaItem
            placeholder="Safety information"
            value={safetyInfo}
            handleChange={handleSafetyInfoChange}
          />
        </div>
        <div className="flex gap-2">
          <TextareaItem
            placeholder="Description"
            value={description}
            handleChange={handleDescriptionChange}
          />
        </div>
      </div>
    </div>
  )
}
