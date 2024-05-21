import { useOrderStore } from '@/store/order'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
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

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function OrdersList ({ children }) {
  const [open, setOpen] = useState(false)

  const setOrder = useOrderStore((state) => state.setOrder)
  const orders = useOrderStore((state) => state.orders)

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
                <TableCell>{order.code}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.client || 'No client'}</TableCell>
                <TableCell>{order.products.length}</TableCell>
                <TableCell>$ {order.total || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SheetContent>
    </Sheet>
  )
}
