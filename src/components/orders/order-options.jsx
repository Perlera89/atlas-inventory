import { useOrderStore } from '@/store/order'
import { ChevronRight, User, Delete, Trash } from 'lucide-react'
import OrderClient from './order-client'

// components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import OrderValidation from './order-validation'
import { useState } from 'react'

const OptionItem = ({ onClick, className, children }) => (
  <div
    onClick={onClick}
    className={`p-2 flex items-center justify-center text-center text-foreground hover:text-foreground/70 hover:bg-muted/50 cursor-pointer transition-colors border-b ${className}`}
  >
    {children}
  </div>
)

export default function OrderOptions () {
  const [selectedButton, setSelectedButton] = useState('Qty')

  const quantity = useOrderStore((state) => state.quantity)
  const selectedProduct = useOrderStore((state) => state.selectedProduct)
  const selectedClient = useOrderStore((state) => state.selectedClient)

  const price = useOrderStore((state) => state.price)
  const discount = useOrderStore((state) => state.discount)

  const setPrice = useOrderStore((state) => state.setPrice)
  const setQuantity = useOrderStore((state) => state.setQuantity)
  const setDiscount = useOrderStore((state) => state.setDiscount)

  const handleDeleteProductToOrder = useOrderStore(
    (state) => state.handleDeleteProductToOrder
  )

  const updateProduct = useOrderStore((state) => state.updateProduct)

  const handleNumberClickQty = (number) => {
    setQuantity(quantity + number)
    updateProduct()
  }

  const handleNumberClickDsc = (number) => {
    setDiscount(discount + number)
    updateProduct()
  }

  const handleNumberClickPrice = (number) => {
    setPrice(price + number)
    updateProduct()
  }

  const handleDeleteClickQty = () => {
    const newQuantity = String(quantity).slice(0, -1)
    setQuantity(newQuantity === '' ? '' : parseInt(newQuantity))
    if (quantity === '' || price === '') {
      handleDeleteProductToOrder(selectedProduct.id)
    }
    updateProduct()
  }

  const handleDeleteClickDsc = () => {
    const newDiscount = String(discount).slice(0, -1)
    setDiscount(newDiscount === '' ? '' : parseFloat(newDiscount))
    if (quantity === '' || price === '') {
      handleDeleteProductToOrder(selectedProduct.id)
    }
    updateProduct()
  }

  const handleDeleteClickPrice = () => {
    const newPrice = String(price).slice(0, -1)
    setPrice(newPrice === '' ? '' : parseFloat(newPrice))
    if (quantity === '' || price === '') {
      handleDeleteProductToOrder(selectedProduct.id)
    }
    updateProduct()
  }

  const handleNumberClick = (number) => {
    switch (selectedButton) {
      case 'Qty':
        handleNumberClickQty(number)
        break
      case 'Dsc':
        handleNumberClickDsc(number)
        break
      case 'Price':
        handleNumberClickPrice(number)
        break
    }
  }

  const handleDeleteClick = () => {
    switch (selectedButton) {
      case 'Qty':
        handleDeleteClickQty()
        break
      case 'Dsc':
        handleDeleteClickDsc()
        break
      case 'Price':
        handleDeleteClickPrice()
        break
    }
  }

  return (
    <div className="grid grid-cols-7 h-96 items-stretch border-t border-x rounded-lg">
      <div className="col-span-3 grid grid-rows-3 border-r">
        <OrderClient>
          <div className="rounded-t-md p-2 gap-2 row-span-1 flex items-center justify-center hover:bg-muted/50 transition-colors hover:cursor-pointer">
            <User />
            <p className="text-xl">
              {selectedClient ? selectedClient.name : 'Client'}
            </p>
          </div>
        </OrderClient>
        <Dialog>
          <DialogTrigger asChild>
            <div className="row-span-5 rounded-bl-md my-0 flex flex-col gap-2 items-center justify-center transition-colors hover:cursor-pointer bg-primary text-primary-foreground">
              <ChevronRight size={32} />
              <p className="text-xl">Pay</p>
            </div>
          </DialogTrigger>
          <DialogContent className="min-w-[70vw] min-h-[70vh]">
            <DialogHeader></DialogHeader>
            <OrderValidation />
          </DialogContent>
        </Dialog>
      </div>
      <div className="col-span-1 grid border-r">
        {['1', '4', '7'].map((number) => (
          <OptionItem key={number} onClick={() => handleNumberClick(number)}>
            {number}
          </OptionItem>
        ))}
        <OptionItem onClick={handleDeleteClick}>
          <Trash />
        </OptionItem>
      </div>
      <div className="col-span-1 grid border-r">
        {['2', '5', '8', '0'].map((number) => (
          <OptionItem key={number} onClick={() => handleNumberClick(number)}>
            {number}
          </OptionItem>
        ))}
      </div>
      <div className="col-span-1 grid border-r">
        {['3', '6', '9', '.'].map((number) => (
          <OptionItem key={number} onClick={() => handleNumberClick(number)}>
            {number}
          </OptionItem>
        ))}
      </div>
      <div className="col-span-1 grid">
        {['Qty', 'Dsc', 'Price'].map((option) => (
          <OptionItem
            key={option}
            onClick={() => setSelectedButton(option)}
            className={
              selectedButton === option &&
              'bg-primary text-secondary rounded-tr-lg hover:text-secondary hover:bg-primary'
            }
          >
            {option}
          </OptionItem>
        ))}
        <OptionItem className="rounded-br-lg" onClick={handleDeleteClick}>
          <Delete />
        </OptionItem>
      </div>
    </div>
  )
}
