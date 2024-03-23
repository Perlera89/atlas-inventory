import { useInventoryStore } from '@/store/inventory'
import ProductListItem from './producst-list'
import ProductKanbanItem from './product-kanban'
import { useEffect } from 'react'
import { Button, Radio, Typography } from 'antd'
import SearchItem from '../ui/entry/search'
import SelectItem from '../ui/entry/select'
import { LuAlignJustify, LuChevronLeft, LuChevronRight, LuLayoutGrid } from 'react-icons/lu'
import IconButtonItem from '../ui/common/icon-buttom'

const { Text } = Typography

export function ProductsItem () {
  const products = useInventoryStore((state) => state.products)
  const fetchProducts = useInventoryStore((state) => state.fetchProducts)
  const view = useInventoryStore((state) => state.view)

  const setAction = useInventoryStore((state) => state.setAction)
  const handleOpenProduct = useInventoryStore(
    (state) => state.handleOpenProduct
  )
  const handleChangeView = useInventoryStore((state) => state.handleChangeView)

  const handleClick = () => {
    setAction('edit')
    handleOpenProduct()
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className='flex flex-col gap-4'>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2">
            <Button onClick={handleClick}>Add product</Button>
            <SearchItem />
            <SelectItem placeholder="Select filter" />
          </div>
          <div className="flex gap-2 items-center">
            {view === 'kanban' && (
              <div className="flex items-center gap-1">
                <Text>1-50</Text>
                <Text>/</Text>
                <Text type="secondary">300</Text>
                <div>
                  <IconButtonItem
                    icon={
                      <LuChevronLeft
                        title="Previous products"
                        className="text-2xl"
                      />
                    }
                    size={48}
                  />
                  <IconButtonItem
                    icon={
                      <LuChevronRight
                        title="Next products"
                        className="text-2xl"
                      />
                    }
                    size={48}
                  />
                </div>
              </div>
            )}
            <Radio.Group value={view} onChange={handleChangeView}>
              <Radio.Button value="list">
                <LuAlignJustify title="List" className="h-full" />
              </Radio.Button>
              <Radio.Button value="kanban">
                <LuLayoutGrid title="Kanban" className="h-full" />
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      {view === 'list'
        ? (
        <ProductListItem products={products} />
          )
        : (
        <ProductKanbanItem products={products} />
          )}
    </div>
  )
}
