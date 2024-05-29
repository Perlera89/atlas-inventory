// hooks and store
import { useOrderStore } from '@/store/order'
import { useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useHotkeys } from 'react-hotkeys-hook'

// icons
import { X, User, Delete } from 'lucide-react'

// components
import { Button } from '@/components/ui/button'
import SelectValueItem from '../entry/select-item'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import Invoice from '../invoice/invoice'

export default function OrderValidation () {
  // states
  const [cash, setCash] = useState('0')
  const [change, setChange] = useState('0')
  const [note, setNote] = useState('')
  const [remaining, setRemaining] = useState('0')

  // state
  const order = useOrderStore((state) => state.order)
  const isInvoiceVisible = useOrderStore((state) => state.isInvoiceVisible)
  const iva = useOrderStore((state) => state.iva)
  const paymentMethods = useOrderStore((state) => state.paymentMethods)
  const paymentMethod = useOrderStore((state) => state.paymentMethod)
  const fetchPaymentMethods = useOrderStore(
    (state) => state.fetchPaymentMethods
  )

  // actions
  const setOrder = useOrderStore((state) => state.setOrder)
  const setOpenOrder = useOrderStore((state) => state.setOpenOrder)
  const setIsInvoiceVisible = useOrderStore(
    (state) => state.setIsInvoiceVisible
  )

  // handlers
  const handleSelectPaymentMethod = useOrderStore(
    (state) => state.handleSelectPaymentMethod
  )
  const handleSaveOrder = useOrderStore((state) => state.handleSaveOrder)

  const handleNumberClick = (number) => {
    const newCash = cash === '0' ? number : cash + number
    setCash(newCash)

    const totalOrder = parseFloat(order.total)
    const newChange = parseFloat(newCash) - totalOrder
    setChange(newChange < 0 ? '0.00' : newChange.toFixed(2))

    const newRemaining = totalOrder - parseFloat(newCash)
    setRemaining(newRemaining < 0 ? '0.00' : newRemaining.toFixed(2))
  }

  const handleDeleteClick = () => {
    if (cash === '') {
      setCash('0')
      return
    }
    setCash(cash.slice(0, -1))
  }

  const handleClearCash = () => {
    setCash('0')
  }

  const handleNoteChange = (value) => {
    setNote(value)
  }

  const handleValidateClick = () => {
    setOrder({ ...order, note })
    handleSaveOrder()
    setNote('')
    setCash('0')
    setIsInvoiceVisible(true)
  }

  useEffect(() => {
    const data = async () => {
      await fetchPaymentMethods()
    }
    data()
  }, [])

  for (let i = 0; i < 10; i++) {
    useHotkeys(`${i}`, () => handleNumberClick(i.toString()))
  }
  useHotkeys('.', () => handleNumberClick('.'))
  useHotkeys('Backspace', handleDeleteClick)

  return (
    <div className="flex h-full bg-background">
      <aside className="w-1/2 border-r bg-background p-8">
        <div className="mb-8">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Order Validation
          </h3>
          <div className="mt-4 space-y-4">
            <SelectValueItem
              optionsTitle="Payment Methods"
              options={paymentMethods}
              value={paymentMethod}
              valueTitle="Payment method"
              onChange={(value) => handleSelectPaymentMethod(value)}
            />
            <h3 className="text-sm mt-4 font-semibold">Client</h3>
            <div className="flex text-sm items-center">
              <User className="h-5 w-5 mr-2" />
              {order.client ? order.client.name : 'No client selected'}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm">Cash</span>
            <div className="flex items-center">
              <span className="font-semibold">$ {cash}</span>
              <Button
                className="ml-2"
                variant="ghost"
                onClick={handleClearCash}
              >
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid gap-2 mt-2">
          <Label className="text-sm font-semibold" htmlFor="description">
            Note
          </Label>
          <Textarea
            id="description"
            placeholder="Empty"
            value={note}
            onChange={(e) => handleNoteChange(e.target.value)}
          />
        </div>
        {isInvoiceVisible
          ? (
          <PDFDownloadLink
            document={<Invoice order={order} iva={iva} />}
            fileName={`invoice-${order.code}.pdf`}
          >
            <Button>Download invoice</Button>
          </PDFDownloadLink>
            )
          : (
          <Button
            className="mt-8 w-full h-16 py-4"
            disabled={cash === '0' || parseFloat(remaining) < 0}
            onClick={() => {
              handleValidateClick()
            }}
          >
            Validate
          </Button>
            )}
      </aside>
      <div className="w-1/2 flex flex-col gap-4 bg-background p-8">
        <div className="h-[35%] border rounded-lg">
          {cash === '0'
            ? (
            <h3 className="text-3xl font-semibold tracking-tight text-center flex justify-center items-center h-full">
              $ {order.total}
            </h3>
              )
            : (
            <div className="flex h-full justify-between p-4">
              <div className="grid justify-between items-center gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Remaining
                  </h3>
                  <p className="font-semibold text-foreground/70">
                    $ {remaining}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Pass
                  </h3>
                  <p className="font-semibold text-foreground/70">
                    $ {order.total}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Change
                </h3>
                <p className="font-semibold text-foreground/70">$ {change}</p>
              </div>
            </div>
              )}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number) => (
            <Button
              variant="outline"
              key={number}
              className="m-0.5 h-16 text-xl"
              onClick={() => handleNumberClick(number)}
            >
              {number}
            </Button>
          ))}
          {['0', '.'].map((number) => (
            <Button
              variant="outline"
              key={number}
              className="m-0.5 h-16 text-xl"
              onClick={() => handleNumberClick(number)}
            >
              {number}
            </Button>
          ))}
          <Button
            className="py-8 text-2xl"
            variant="destructive"
            onClick={handleDeleteClick}
          >
            <Delete />
          </Button>
        </div>
      </div>
    </div>
  )
}
