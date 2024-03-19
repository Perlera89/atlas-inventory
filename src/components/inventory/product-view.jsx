import { Image, Typography, Checkbox } from 'antd'
import { useInventoryStore } from '@/store/inventory'

// icons
import { FaBox, FaBarcode } from 'react-icons/fa6'
import InputNumberItem from '../ui/entry/input-number'
import TabsItem from '../ui/display/tabs'
import InputTextItem from '../ui/entry/input-text'
import GeneralTab from './tabs/general-tab'
import TagsTab from './tabs/tags-tab'
import ExtraTab from './tabs/extra-tab'
import { useEffect, useState } from 'react'
import UploadItem from '../ui/entry/upload'
const { Text } = Typography

export default function ProductViewItem () {
  const setAction = useInventoryStore((state) => state.setAction)
  const action = useInventoryStore((state) => state.action)
  const name = useInventoryStore((state) => state.name)
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

  return (
    <div>
      <div className="flex flex-col gap-4 mt-8">
        <InputTextItem
          placeholder="Product name"
          maxLength={30}
          value={name}
          handleChange={handleNameChange}
          showCount={false}
          focus
        />
        <div className="flex gap-8 align-middle justify-center">
          <Image src="/fallback.png" width={150} className="rounded-md" />
          <div className="flex flex-col gap-2 w-full align-middle">
            <div className="flex gap-2 items-center">
              <Checkbox
                defaultChecked
                checked={onSale}
                onChange={handleOnSaleChange}
              />
              <Text className="ml-3">On sale</Text>
            </div>
            <div className="flex gap-2 items-center">
              <FaBarcode className="text-xl" />
              <InputTextItem
                maxLength={30}
                placeholder="Code"
                value={code}
                handleChange={handleCodeChange}
              />
            </div>
            <div className="flex gap-2 items-center">
              <FaBox className="text-xl" title="Stock" />
              <InputNumberItem
                placeholder="Stock"
                value={stock}
                handleChange={handleStockChange}
              />
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
    </div>
  )
}
