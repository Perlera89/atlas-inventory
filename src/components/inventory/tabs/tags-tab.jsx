import MultipleSelectItem from '@/components/ui/entry/multiple-select'
import SelectItem from '@/components/ui/entry/select'
import CustomSelectItem from '@/components/ui/entry/custom-select'
import { useInventoryStore } from '@/store/inventory'
import { Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Text } = Typography

export default function TagsTab () {
  const product = useInventoryStore((state) => state.product)
  const action = useInventoryStore((state) => state.action)

  const [type, setType] = useState(null)
  const [category, setCategory] = useState(null)
  const [brand, setBrand] = useState(null)
  const [area, setArea] = useState(null)
  const [tags, setTags] = useState([])

  const info = product && product.productInfo

  const options =
    product &&
    info.tagDetails.map((details) => ({
      value: details.tag.id,
      label: details.tag.name
    }))

  useEffect(() => {
    if (action !== 'add') {
      setType(info.type.id)
      setCategory(info.category.name)
      setBrand(info.brand.name)
      setArea(info?.area?.name)
      setTags(info.tagDetails.map((details) => details.tag.id))
    }
  }, [action])

  return (
    <div>
      <div className="flex flex-col gap-2">
        <SelectItem
          placeholder="Select type"
          value={type}
          options={[
            { value: 1, label: 'Consumable' },
            { value: 2, label: 'Storable' },
            { value: 3, label: 'Service' }
          ]}
        />
        <CustomSelectItem placeholder="Select category" value={category} />
        <CustomSelectItem placeholder="Select brand" value={brand} />
        <CustomSelectItem placeholder="Select area" value={area} />
        <MultipleSelectItem
          options={options}
          value={tags}
          placeholder="Select tags"
        />
      </div>
    </div>
  )
}
