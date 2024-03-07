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
const { Text } = Typography

export default function ProductViewItem ({ product }) {
  return (
    <div>
      <div className="flex flex-col gap-4 mt-4">
        <InputTextItem
          placeholder="Product name"
          maxLength={30}
          value={product.name}
          showCount={false}
        />
        <div className="flex gap-4 align-middle justify-center">
          <Image
            width={125}
            fallback="/fallback.png"
            className="rounded-md cursor-pointer"
            preview={{ mask: null }}
          />
          <div className="flex flex-col gap-2 w-full align-middle">
            <div className="flex gap-2 items-center">
              <Checkbox defaultChecked />
              <Text className="ml-3">On sale</Text>
            </div>
            <div className="flex gap-2 items-center">
              <FaBarcode className="text-xl" />
              <InputTextItem maxLength={30} placeholder="Code" />
            </div>
            <div className="flex gap-2 items-center">
              <FaBox className="text-xl" />
              <InputNumberItem placeholder="Stock" />
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
