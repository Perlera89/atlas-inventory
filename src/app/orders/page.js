'use client'

import { Delete, User, ChevronRight, ShoppingCart, Tag } from 'lucide-react'
import CardItem from '@/components/ui/card-item'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { SearchItem } from '@/components/ui/search'
import OrderList from '@/components/orders/order-list'
import { Button } from '@/components/ui/button'

const OptionItem = ({ children }) => (
  <div className="border p-2 flex items-center justify-center hover:bg-muted/50 transition-colors hover:cursor-pointer">
    {children}
  </div>
)

export default function PurchasesPage () {
  const [empty, isEmpty] = useState(false)

  return (
    <div className="grid gap-4">
      <div className="flex">
        <div className="flex justify-between w-1/3 items-center">
          <div className="relative">
            <ShoppingCart />
            <Badge className="absolute bottom-4 left-4">3</Badge>
          </div>
          <div className="flex gap-2">
            <Button>Income / Expense</Button>
            <Button>Orders</Button>
          </div>
        </div>
        <div className="w-2/3 ml-4 flex justify-between items-center">
          <SearchItem placeholder="Search products" />
          <Button>Exit</Button>
        </div>
      </div>
      <div className="flex w-full h-[82vh]">
        <div className="w-1/3 border-[1px]">
          <div className="h-2/3 border-b overflow-y-auto">
            {empty
              ? (
              <div className="flex flex-col gap-2 text-foreground/70 items-center justify-center h-full">
                <ShoppingCart size={64} />
                <p className="text-xl">No products</p>
              </div>
                )
              : (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <OrderList />
                  <OrderList />
                  <OrderList />
                  <OrderList />
                  <OrderList />
                  <OrderList />
                  <OrderList />
                  <OrderList />
                  <OrderList />
                  <OrderList />
                  <OrderList />
                </div>
                <div className="text-right mr-2 mb-2">
                  <p className="font-bold">Total: $ 10.00 </p>
                  <p>Impuesto: $ 10.00 </p>
                </div>
              </div>
                )}
          </div>
          <div className="grid grid-cols-7 h-1/3">
            <div className="col-span-3 grid grid-rows-3">
              <div className="border p-2 gap-2 row-span-1 flex items-center justify-center hover:bg-muted/50 transition-colors hover:cursor-pointer">
                <User />
                <p className="text-xl">Client</p>
              </div>
              <div className="border row-span-2 p-2 flex flex-col gap-2 items-center justify-center transition-colors hover:cursor-pointer bg-primary text-primary-foreground">
                <ChevronRight size={32} />
                <p className="text-xl">Pay</p>
              </div>
            </div>
            <div className="col-span-1 grid">
              <OptionItem>1</OptionItem>
              <OptionItem>4</OptionItem>
              <OptionItem>7</OptionItem>
              <OptionItem>+/-</OptionItem>
            </div>
            <div className="col-span-1 grid">
              <OptionItem>2</OptionItem>
              <OptionItem>5</OptionItem>
              <OptionItem>8</OptionItem>
              <OptionItem>0</OptionItem>
            </div>
            <div className="col-span-1 grid">
              <OptionItem>3</OptionItem>
              <OptionItem>6</OptionItem>
              <OptionItem>9</OptionItem>
              <OptionItem>.</OptionItem>
            </div>
            <div className="col-span-1 grid">
              <OptionItem>Qty</OptionItem>
              <OptionItem>% Disc</OptionItem>
              <OptionItem>Price</OptionItem>
              <OptionItem>
                <Delete />
              </OptionItem>
            </div>
          </div>
        </div>
        <div className="w-2/3 h-full ml-4">
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-2">
            <CardItem name="Product" price={12} stock={16} />
            <CardItem name="Product" price={12} stock={16} />
            <CardItem name="Product" price={12} stock={16} />
            <CardItem name="Product" price={12} stock={16} />
            <CardItem name="Product" price={12} stock={16} />
            <CardItem name="Product" price={12} stock={16} />
            <CardItem name="Product" price={12} stock={16} />
            <CardItem name="Product" price={12} stock={16} />
            <CardItem name="Product" price={12} stock={16} />
            <CardItem name="Product" price={12} stock={16} />
            <CardItem name="Product" price={12} stock={16} />
          </div>
        </div>
      </div>
    </div>
  )
}
