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
  const product = useInventoryStore((state) => state.product)
  const action = useInventoryStore((state) => state.action)

  // states
  const [name, setName] = useState('')
  const [isOnSale, setIsOnSale] = useState(true)
  const [thumbnail, setThumbnail] = useState('')
  const [code, setCode] = useState(null)
  const [stock, setStock] = useState(null)

  useEffect(() => {
    if (action !== 'add') {
      setName(product.productInfo.name)
      setIsOnSale(product.isOnSale)
      setThumbnail(product.productInfo.thumbnail)
      setCode(product.code)
      setStock(product.stock)
    }
  }, [action])

  return (
    <div>
      <div className="flex flex-col gap-4 mt-8">
        <InputTextItem
          placeholder="Product name"
          maxLength={30}
          value={name}
          showCount={false}
        />
        <div className="flex gap-4 align-middle justify-center">
          <UploadItem />
          <div className="flex flex-col gap-2 w-full align-middle">
            <div className="flex gap-2 items-center">
              <Checkbox defaultChecked checked={isOnSale} />
              <Text className="ml-3">On sale</Text>
            </div>
            <div className="flex gap-2 items-center">
              <FaBarcode className="text-xl" />
              <InputTextItem
                maxLength={30}
                placeholder="Code"
                value={code}
              />
            </div>
            <div className="flex gap-2 items-center">
              <FaBox className="text-xl" />
              <InputNumberItem placeholder="Stock" value={stock} />
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