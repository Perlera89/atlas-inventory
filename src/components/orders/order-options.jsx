import { useHotkeys } from 'react-hotkeys-hook'
import { useOrderStore } from '@/store/order'
import { ChevronRight, User, Delete, Trash } from 'lucide-react'
import OrderClient from './order-client'

// components
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import OrderValidation from './order-validation'
import { useState } from 'react'
import { Button } from '../ui/button'

const OptionItem = ({ onClick, variant = 'outline', children }) => (
  <Button variant={variant} onClick={onClick} className="h-full w-full m-1">
    {children}
  </Button>
)

export default function OrderOptions () {
  const [selectedButton, setSelectedButton] = useState('Qty')

  const quantity = useOrderStore((state) => state.quantity)
  const openOrder = useOrderStore((state) => state.openOrder)
  const order = useOrderStore((state) => state.order)
  const total = useOrderStore((state) => state.total)
  const selectedProduct = useOrderStore((state) => state.selectedProduct)
  const selectedClient = useOrderStore((state) => state.selectedClient)

  const price = useOrderStore((state) => state.price)
  const discount = useOrderStore((state) => state.discount)

  const setPrice = useOrderStore((state) => state.setPrice)
  const setQuantity = useOrderStore((state) => state.setQuantity)
  const setDiscount = useOrderStore((state) => state.setDiscount)
  const setOrder = useOrderStore((state) => state.setOrder)
  const setOpenOrder = useOrderStore((state) => state.setOpenOrder)

  const handleDeleteProductToOrder = useOrderStore(
    (state) => state.handleDeleteProductToOrder
  )

  const updateProduct = useOrderStore((state) => state.updateProduct)

  const handleNumberClick = (number) => {
    switch (selectedButton) {
      case 'Qty':
        setQuantity(quantity + number)
        break
      case 'Dsc':
        setDiscount(discount + number)
        break
      case 'Price':
        setPrice(price + number)
        break
    }
    updateProduct()
  }

  const handleDeleteClick = () => {
    switch (selectedButton) {
      case 'Qty': {
        const newQuantity = String(quantity).slice(0, -1)
        setQuantity(newQuantity === '' ? '' : parseInt(newQuantity))
        break
      }
      case 'Dsc': {
        const newDiscount = String(discount).slice(0, -1)
        setDiscount(newDiscount === '' ? '' : parseFloat(newDiscount))
        break
      }
      case 'Price': {
        const newPrice = String(price).slice(0, -1)
        setPrice(newPrice === '' ? '' : parseFloat(newPrice))
        break
      }
    }
    if (quantity === '' || price === '') {
      handleDeleteProductToOrder(selectedProduct.id)
    }
    updateProduct()
  }

  const handlePayOrder = () => {
    if (!order) return
    setOpenOrder(true)
    setOrder({ ...order, total })
  }

  useHotkeys('Enter', handlePayOrder)
  useHotkeys('Backspace', handleDeleteClick)
  useHotkeys('alt+s', () => setSelectedButton('Dsc'))
  useHotkeys('alt+p', () => setSelectedButton('Price'))
  useHotkeys('alt+q', () => setSelectedButton('Qty'))

  for (let i = 0; i < 10; i++) {
    useHotkeys(`${i}`, () => handleNumberClick(i.toString()))
  }
  useHotkeys('.', () => handleNumberClick('.'))

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '\u200B', 0, '.']
  const chunks = []
  for (let i = 0; i < numbers.length; i += 3) {
    chunks.push(numbers.slice(i, i + 3))
  }

  return (
    <div className="grid grid-cols-7 h-96 items-stretch w-[90vw] lg:w-full">
      <div className="col-span-3 grid gap-2 grid-rows-3 w-full">
        <OrderClient>
          <Button variant="outline" className="gap-2 row-span-1 h-full">
            <User />
            <p className="text-xl">
              {selectedClient ? selectedClient.name : 'Client'}
            </p>
          </Button>
        </OrderClient>
        <Dialog open={openOrder} onOpenChange={setOpenOrder}>
          <DialogTrigger asChild>
            <Button
              disabled={
                !order || order.products.length === 0 || !selectedClient
              }
              onClick={handlePayOrder}
              className="row-span-5 h-full flex flex-col gap-2 items-center justify-center"
            >
              <ChevronRight size={32} />
              <p className="text-xl">Pay</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[70vw] min-h-[70vh]">
            <OrderValidation />
          </DialogContent>
        </Dialog>
      </div>
      <div className="col-span-3 grid h-full gap-2 ml-1">
        {chunks.map((chunk, index) => (
          <div key={index} className="flex">
            {chunk.map((number) => (
              <OptionItem
                key={number}
                onClick={() => handleNumberClick(number)}
              >
                {number}
              </OptionItem>
            ))}
          </div>
        ))}
      </div>
      <div className="col-span-1 h-full grid gap-2">
        {['Qty', 'Dsc', 'Price'].map((option) => (
          <OptionItem
            key={option}
            onClick={() => setSelectedButton(option)}
            className={
              selectedButton === option &&
              'bg-primary text-secondary hover:text-secondary hover:bg-primary'
            }
            variant={selectedButton === option ? '' : 'outline'}
          >
            {option}
          </OptionItem>
        ))}
        <OptionItem onClick={handleDeleteClick}>
          <Delete size={20} />
        </OptionItem>
      </div>
    </div>
  )
}
