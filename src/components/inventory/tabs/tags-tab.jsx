import MultipleSelectItem from '@/components/ui/entry/multiple-select'
import { useInventoryStore } from '@/store/inventory'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'

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

  const handleSelect = useInventoryStore((state) => state.handleSelect)

  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        <Select
          defaultValue={1}
          onValueChange={(value) => handleSelect('type', value)}
          value={type}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>
              <SelectItem value={1}>Consumable</SelectItem>
              <SelectItem value={2}>Storable</SelectItem>
              <SelectItem value={3}>Service</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          required
          onValueChange={(value) => handleSelect('category', value)}
          value={category}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleSelect('brand', value)}
          value={brand}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.name}
                </SelectItem>
              ))}
              <hr className='my-4' />
              <div className="flex items-center gap-2">
                <Input placeholder="Add brand" className="bg-transparent" />
                <Button>
                  <Plus />
                </Button>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleSelect('area', value)}
          value={area}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select area" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Areas</SelectLabel>
              {areas.map((area) => (
                <SelectItem key={area.id} value={area.id}>
                  {area.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleSelect('tags', value)}
          value={selectedTags}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select tags" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tags</SelectLabel>
              {tags.map((tag) => (
                <SelectItem key={tag.id} value={tag.id}>
                  {tag.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <MultipleSelectItem placeholder="Hola" options={brands} value={brand} />
      </div>
    </div>
  )
}
