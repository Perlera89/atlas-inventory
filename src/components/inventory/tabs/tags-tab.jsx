import MultipleSelectItem from '@/components/ui/entry/multiple-select'
import SelectItem from '@/components/ui/entry/select'
import CustomSelectItem from '@/components/ui/entry/custom-select'
import { useInventoryStore } from '@/store/inventory'
import { Typography } from 'antd'

const options = [
  { value: 1, label: 'Consumable' },
  { value: 2, label: 'Storable' },
  { value: 3, label: 'Service' }
]

export default function TagsTab () {
  const product = useInventoryStore((state) => state.product)
  const action = useInventoryStore((state) => state.action)

  const type = useInventoryStore((state) => state.type)
  const category = useInventoryStore((state) => state.category)
  const brand = useInventoryStore((state) => state.brand)
  const area = useInventoryStore((state) => state.area)
  const selectedTags = useInventoryStore((state) => state.selectedTags)

  const categories = useInventoryStore((state) => state.categories)
  const brands = useInventoryStore((state) => state.brands)
  const areas = useInventoryStore((state) => state.areas)
  const tags = useInventoryStore((state) => state.tags)

  const handleTypeChange = useInventoryStore((state) => state.handleTypeChange)
  const handleCategoryChange = useInventoryStore((state) => state.handleCategoryChange)
  const handleBrandChange = useInventoryStore((state) => state.handleBrandChange)
  const handleAreaChange = useInventoryStore((state) => state.handleAreaChange)
  const handleTagsChange = useInventoryStore((state) => state.handleTagsChange)

  return (
    <div>
      <div className="flex flex-col gap-2">
        <SelectItem
          placeholder="Select type"
          value={type}
          defaultValue={1}
          handleSelect={handleTypeChange}
          options={options}
        />
        <CustomSelectItem placeholder="Select category" value={category} items={categories} handleSelect={handleCategoryChange} />
        <CustomSelectItem placeholder="Select brand" value={brand} items={brands} handleSelect={handleBrandChange} />
        <CustomSelectItem placeholder="Select area" value={area} items={areas} handleSelect={handleAreaChange} />
        <MultipleSelectItem
          handleSelect={handleTagsChange}
          options={tags}
          value={selectedTags}
          placeholder="Select tags"
        />
      </div>
    </div>
  )
}
