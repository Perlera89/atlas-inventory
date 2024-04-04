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
import { Label } from '@/components/ui/label'

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
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="col-span-1 grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="type">
              Type
            </Label>
            <Select
              id="type"
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
                  <SelectItem value={1}>Consumable</SelectItem>
                  <SelectItem value={2}>Storable</SelectItem>
                  <SelectItem value={3}>Service</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">
              Category
            </Label>
            <Select
              id="category"
              onValueChange={(value) => handleSelect('category', value)}
              value={category}
              required
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
          </div>
        </div>
        <div className="col-span-1 grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="brand">
              Brand
            </Label>
            <Select
              id="brand"
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
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="area">
              Area
            </Label>
            <Select
              id="area"
              onValueChange={(value) => handleSelect('area', value)}
              value={area}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2 col-span-2">
          <Label htmlFor="tags">
            Tags
          </Label>
          <Select
            id="tags"
            onValueChange={(value) => handleSelect('tags', value)}
            value={selectedTags}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {tags > 0
                  ? tags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                  ))
                  : <p className='text-foreground/70 text-sm text-center py-2'>No tags</p>}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
