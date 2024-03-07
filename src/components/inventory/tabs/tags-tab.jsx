import MultipleSelectItem from '@/components/ui/entry/multiple-select'
import SelectItem from '@/components/ui/entry/select'
import CustomSelectItem from '@/components/ui/entry/custom-select'
import { useInventoryStore } from '@/store/inventory'
import { Tag, Typography } from 'antd'

const { Text } = Typography

export default function TagsTab () {
  const product = useInventoryStore((state) => state.product)
  const action = useInventoryStore((state) => state.action)

  const info = product.product_info

  return (
    <div>
      <div className="flex flex-col gap-2">
        {action === 'view'
          ? <>
            <div className="flex items-center gap-2">
              <Text className='w-24'>Type</Text>
              {info.type
                ? (
                <Tag color={info?.category?.color}>{info?.type?.name}</Tag>
                  )
                : (
                <Text type="secondary">No type</Text>
                  )}
            </div>
            <div className="flex items-center gap-2">
              <Text className='w-24'>Category</Text>
              <Tag color={info?.category?.color}>{info?.category?.name}</Tag>
            </div>
            <div className="flex items-center gap-2">
              <Text className='w-24'>Brand</Text>
              <Tag color={info?.brand?.color}>{info?.brand?.name}</Tag>
            </div>
            <div className="flex items-center gap-2">
              <Text className='w-24'>Area</Text>
              {info.area ? <Tag color={info.area.color}>{info?.area?.name}</Tag> : <Text type="secondary">No area</Text>}
            </div>
            <div className="flex items-center gap-2">
              <Text className='w-24'>Tags</Text>
              {info.tags
                ? <Tag color={info.area.color}>
                {info?.area?.name}
              </Tag>
                : <Text type="secondary">No tags</Text>}
            </div>
            {/* <div className='flex items-center gap-2'>
            <Text>Tags</Text>
            <Tag color={info.category.color}>{info.category.name}</Tag>
          </div> */}
          </>
          : <>
            <SelectItem
              placeholder="Select type"
              options={[
                { value: 'storable', label: 'Storable' },
                { value: 'service', label: 'Service' },
                { value: 'consumable', label: 'Consumable' }
              ]}
            />
            <CustomSelectItem
              placeholder="Select category"
              value={product.product_info.category.name}
            />
            <CustomSelectItem
              placeholder="Select brand"
              value={product.product_info.brand.name}
            />
            <CustomSelectItem
              placeholder="Select area"
              value={product.product_info?.area?.name}
            />
            <MultipleSelectItem placeholder="Select tags" />
          </>
        }
      </div>
    </div>
  )
}
