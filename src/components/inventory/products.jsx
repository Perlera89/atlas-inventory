import { useInventoryStore } from '@/store/inventory'
import ProductListItem from './producst-list'
import ProductKanbanItem from './product-kanban'
import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Button } from '@/components/ui/button'
import { Search, Menu, LayoutGrid, Trash } from 'lucide-react'
import { Input } from '../ui/input'
import Combobox from '@/components/ui/combobox'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter
} from '../ui/dialog'

import ProductViewItem from './product-view'
import { PopConfirmItem } from '../ui/display/popconfirm'

export function ProductsItem () {
  const action = useInventoryStore((state) => state.action)
  const name = useInventoryStore((state) => state.name)
  const products = useInventoryStore((state) => state.products)
  const openProduct = useInventoryStore((state) => state.openProduct)
  const fetchProducts = useInventoryStore((state) => state.fetchProducts)
  const view = useInventoryStore((state) => state.view)

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
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full">
        <div className="flex gap-2 justify-start w-full items-center">
          <Button className="w-auto" size="sm" onClick={handleClick}>
            Add product
          </Button>

          <form className="w-full">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-[12px] h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
          <Combobox />
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
                <Button onClick={handleSaveProduct}>Save</Button>
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
