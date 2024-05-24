import { useOrderStore } from '@/store/order'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu'

import { X } from 'lucide-react'

export default function OrdersList ({ open, setOpen, children }) {
  const setOrder = useOrderStore((state) => state.setOrder)
  const orders = useOrderStore((state) => state.orders)

  const handleDeleteOrder = useOrderStore((state) => state.handleDeleteOrder)

  const handleClick = (newOrder) => {
    setOpen(false)
    setOrder(newOrder)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="min-w-[35vw]">
        <SheetHeader>
          <SheetTitle>Orders list</SheetTitle>
          <SheetClose />
        </SheetHeader>
        <Table className="w-[600px] overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index} onClick={() => handleClick(order)}>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <TableCell>{order.code}</TableCell>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete Order
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order?.client?.name || 'No client'}</TableCell>
                <TableCell>{order?.products?.length}</TableCell>
                <TableCell>$ {order.total || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.length === 0 && (
          <div className="flex flex-col gap-4 justify-center items-center h-[80vh]">
            <X className="h-12 w-12 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              No orders found
            </h2>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
