import { useInventoryStore } from '@/store/inventory'
import ProductListItem from './producst-list'
import ProductKanbanItem from './product-kanban'
import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Button } from '@/components/ui/button'
import { Menu, LayoutGrid, Trash } from 'lucide-react'
import { ComboboxDropdownMenu } from '@/components/ui/combobox'
import {
  Dialog,
  DialogContent,
  DialogFooter
} from '../ui/dialog'

import ProductViewItem from './product-view'
import { PopConfirmItem } from '../display/popconfirm'
import { SearchItem } from '../ui/search'

export function ProductsItem () {
  const action = useInventoryStore((state) => state.action)
  const name = useInventoryStore((state) => state.name)
  const products = useInventoryStore((state) => state.products)
  const allProducts = useInventoryStore((state) => state.allProducts)
  const openProduct = useInventoryStore((state) => state.openProduct)
  const fetchProducts = useInventoryStore((state) => state.fetchProducts)
  const view = useInventoryStore((state) => state.view)
  const fetchSelects = useInventoryStore((state) => state.fetchSelects)

  const setAction = useInventoryStore((state) => state.setAction)
  const handleSaveProduct = useInventoryStore(
    (state) => state.handleSaveProduct
  )
  const handleOpenProduct = useInventoryStore(
    (state) => state.handleOpenProduct
  )
  const handleCloseProduct = useInventoryStore(
    (state) => state.handleCloseProduct
  )
  const handleChangeView = useInventoryStore((state) => state.handleChangeView)
  const handleDeleteProduct = useInventoryStore(
    (state) => state.handleDeleteProduct
  )
  const handleSearchProduct = useInventoryStore(
    (state) => state.handleSearchProduct
  )

  const validationValues = useInventoryStore((state) => state.validationValues)

  const [openDialog, setOpenDialog] = useState(false)

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleClick = () => {
    setOpenDialog(true)
    handleOpenProduct()
    setAction('edit')
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts()
      await fetchSelects()
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full">
        <div className="flex gap-2 justify-start w-full items-center">
          <Button className="w-auto" size="sm" onClick={handleClick}>
            Add product
          </Button>

          <form className="w-full">
            <SearchItem
              placeholder="Buscar producto..."
              options={allProducts}
              onSearch={handleSearchProduct}
            />
          </form>
          <ComboboxDropdownMenu />
          <Tabs defaultValue="list" size="small">
            <TabsList>
              <TabsTrigger
                value="list"
                onClick={() => handleChangeView('list')}
              >
                <Menu />
              </TabsTrigger>
              <TabsTrigger
                value="kanban"
                onClick={() => handleChangeView('kanban')}
              >
                <LayoutGrid />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      {view === 'list'
        ? (
        <ProductListItem products={products} />
          )
        : (
        <ProductKanbanItem products={products} />
          )}
      <Dialog
        className="relative"
        open={openDialog || openProduct}
        onOpenChange={setOpenDialog || handleOpenProduct}
      >
        <DialogContent>
          <ProductViewItem />
          <DialogFooter>
            {action === 'view' && (
              <PopConfirmItem
                title={`Delete product ${name}`}
                confirm={handleDeleteProduct}
              >
                <Trash
                  className="absolute top-4 right-10 text-foreground/70 hover:text-foreground cursor-pointer"
                  size={14}
                />
              </PopConfirmItem>
            )}
            {action === 'edit'
              ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCloseDialog || handleCloseProduct}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveProduct}
                  disabled={!validationValues}
                >
                  Save
                </Button>
              </div>
                )
              : (
              <Button variant="outline" onClick={handleCloseProduct}>
                Close
              </Button>
                )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
