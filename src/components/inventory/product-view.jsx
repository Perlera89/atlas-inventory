import { useInventoryStore } from '@/store/inventory'

import GeneralTab from './tabs/general-tab'
import TagsTab from './tabs/tags-tab'
import ExtraTab from './tabs/extra-tab'
import { Checkbox } from '@/components/ui/checkbox'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ProductViewItem () {
  const name = useInventoryStore((state) => state.name)
  const thumbnail = useInventoryStore((state) => state.thumbnail)
  const code = useInventoryStore((state) => state.code)
  const stock = useInventoryStore((state) => state.stock)
  const onSale = useInventoryStore((state) => state.onSale)
  const handleInputChange = useInventoryStore(
    (state) => state.handleInputChange
  )
  const handleSelect = useInventoryStore((state) => state.handleSelect)

  const validation = useInventoryStore((state) => state.validation)

  console.log('validation', validation)

  return (
    <div>
      <div className="flex gap-4 mb-4 mt-8">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-4">
            <div className="grid gap-4">
              <img
                src={thumbnail || '/fallback.png'}
                className="rounded-md w-[380px] "
              />
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="onSale"
                  defaultChecked
                  checked={onSale}
                  onCheckedChange={(value) => handleSelect('onSale', value)}
                />
                <Label htmlFor="onSale ">On sale</Label>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full align-middle">
              <div className="grid gap-2">
                <Label htmlFor="name">Product name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => handleInputChange('name', e)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  type="number"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => handleInputChange('code', e)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  value={stock}
                  onChange={(e) => handleInputChange('stock', e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="extra">Extra</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralTab />
        </TabsContent>
        <TabsContent value="tags">
          <TagsTab />
        </TabsContent>
        <TabsContent value="extra">
          <ExtraTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
