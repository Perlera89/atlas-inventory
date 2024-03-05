'use client'
// components
import { Button, Radio, Typography } from 'antd'
import CardItem from '@/components/ui/display/card'
import ModalItem from '@/components/ui/display/modal'
import SearchItem from '@/components/ui/entry/search'
import IconButtonItem from '@/components/ui/common/icon-buttom'
import SelectItem from '@/components/ui/entry/select'

// icons
import {
  LuBoxes,
  LuAlignJustify,
  LuLayoutGrid,
  LuChevronLeft,
  LuChevronRight
} from 'react-icons/lu'

// hooks
import { useInventoryStore } from '@/store/inventory'
import { ProductsItem } from '../../components/inventory/products'
import ProductViewItem from '@/components/inventory/modal-view'

const { Text } = Typography

export default function InventoryPage () {
  const product = useInventoryStore((state) => state.product)
  const openModal = useInventoryStore((state) => state.openModal)
  const handleOpenModal = useInventoryStore((state) => state.handleOpenModal)
  const handleCloseModal = useInventoryStore((state) => state.handleCloseModal)
  const view = useInventoryStore((state) => state.view)
  const handleChangeView = useInventoryStore((state) => state.handleChangeView)
  const productCount = useInventoryStore((state) => state.productCount)
  const openProduct = useInventoryStore((state) => state.openProduct)
  const handleCancelProduct = useInventoryStore(
    (state) => state.handleCancelProduct
  )

  return (
    <>
      <div className="flex flex-col gap-4">
        <CardItem title="Total products">
          <div className="flex items-center gap-2">
            <LuBoxes size="24px" />
            <h3 className="text-2xl font-semibold">{productCount}</h3>
          </div>
        </CardItem>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button onClick={handleOpenModal}>Add product</Button>
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
        <ModalItem
          title="Modal"
          width={500}
          isModalOpen={openModal}
          handleCancel={handleCloseModal}
        />
        <ProductsItem />
        <ProductViewItem
          title={product.name || product.product_info?.name || 'Product'}
          width={500}
          isModalOpen={openProduct}
          handleCancel={handleCancelProduct}
        >
          Contenido
        </ProductViewItem>
      </div>
    </>
  )
}
