'use client'
// components
import { Button, Radio, Typography } from 'antd'
import CardItem from '@/components/ui/display/card'
import SearchItem from '@/components/ui/entry/search'
import IconButtonItem from '@/components/ui/common/icon-buttom'
import SelectItem from '@/components/ui/entry/select'
import { Toaster } from 'react-hot-toast'

// icons
import {
  LuBoxes,
  LuShapes,
  LuHelpingHand,
  LuShoppingCart
} from 'react-icons/lu'

// hooks
import { useInventoryStore } from '@/store/inventory'
import { ProductsItem } from '../../components/inventory/products'
import ProductViewItem from '@/components/inventory/product-view'
import ProductModalItem from '@/components/inventory/product-modal'
import Result from '@/util/result'

export default function InventoryPage () {
  const productCount = useInventoryStore((state) => state.productCount)
  const productOnSaleCount = useInventoryStore((state) => state.productOnSaleCount)
  const openProduct = useInventoryStore((state) => state.openProduct)
  const handleFilterByType = useInventoryStore((state) => state.handleFilterByType)

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 w-full">
          <CardItem title="Total products" filterItems={() => handleFilterByType('all')}>
            <div className="flex items-center gap-2">
              <LuBoxes size="24px" />
              <h3 className="text-2xl font-semibold">{productCount}</h3>
            </div>
          </CardItem>
          <CardItem title="Total on sale" filterItems={() => handleFilterByType('onSale')}>
            <div className="flex items-center gap-2">
              <LuShoppingCart size="24px" />
              <h3 className="text-2xl font-semibold">{productOnSaleCount}</h3>
            </div>
          </CardItem>
        </div>
        <ProductsItem />
        <ProductModalItem width={600} isModalOpen={openProduct}>
          <ProductViewItem />
        </ProductModalItem>
      </div>
      <Result />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1d1d1d',
            color: 'white'
          }
        }}
      />
    </>
  )
}
