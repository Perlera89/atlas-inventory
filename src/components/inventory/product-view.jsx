import { Image, Typography, Checkbox, Badge } from 'antd'
import { useInventoryStore } from '@/store/inventory'

// icons
import { ScanBarcode, Package2 } from 'lucide-react'

import InputNumberItem from '../ui/entry/input-number'
import TabsItem from '../ui/display/tabs'
import InputTextItem from '../ui/entry/input-text'
import GeneralTab from './tabs/general-tab'
import TagsTab from './tabs/tags-tab'
import ExtraTab from './tabs/extra-tab'

const { Text } = Typography

export default function ProductViewItem () {
  const name = useInventoryStore((state) => state.name)
  const thumbnail = useInventoryStore((state) => state.thumbnail)
  const code = useInventoryStore((state) => state.code)
  const stock = useInventoryStore((state) => state.stock)
  const onSale = useInventoryStore((state) => state.onSale)
  const handleNameChange = useInventoryStore((state) => state.handleNameChange)
  const handleCodeChange = useInventoryStore((state) => state.handleCodeChange)
  const handleStockChange = useInventoryStore(
    (state) => state.handleStockChange
  )
  const handleOnSaleChange = useInventoryStore(
    (state) => state.handleOnSaleChange
  )

  const validation = useInventoryStore((state) => state.validation)

  console.log('validation', validation)

  return (
    <div>
      <div className="flex gap-2 mb-4 mt-8">
        <div className="flex flex-col gap-4">
          <div className='flex gap-2'>
            <Image
              src={thumbnail}
              fallback="/fallback.png"
              width={165}
              className="rounded-md"
            />
            <div className="flex flex-col gap-2 w-full align-middle">
              <InputTextItem
                placeholder="Product name"
                maxLength={30}
                value={name}
                handleChange={handleNameChange}
                showCount={false}
                focus
              />
              <div className="flex gap-2 items-center">
                <InputTextItem
                  icon={ScanBarcode}
                  maxLength={30}
                  placeholder="Code"
                  value={code}
                  handleChange={handleCodeChange}
                />
              </div>
              <div className="flex gap-2 items-center">
                <InputNumberItem
                  icon={Package2}
                  placeholder="Stock"
                  value={stock}
                  handleChange={handleStockChange}
                />
              </div>
            </div>
          </div>

          <div>
            <Checkbox
              defaultChecked
              checked={onSale}
              onChange={handleOnSaleChange}
            />
            <Text className="ml-3">On sale</Text>
          </div>
        </div>
      </div>
      <TabsItem
        items={[
          {
            label: 'General',
            key: 1,
            children: <GeneralTab />
          },
          {
            label: 'Tags',
            key: 2,
            children: <TagsTab />
          },
          {
            label: 'Extra',
            key: 3,
            children: <ExtraTab />
          }
        ]}
      />
    </div>
  )
}
