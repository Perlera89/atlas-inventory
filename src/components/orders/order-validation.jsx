import { Button } from '@/components/ui/button'
import { Delete } from 'lucide-react'

export default function Component () {
  return (
    <div className="flex h-full bg-background">
      <aside className="w-1/2 border-r bg-background p-8">
        <div className="mb-8">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Order Validation
          </h3>
          <h3 className="text-lg mt-4 font-semibold">Payment Method</h3>
          <div className="mt-4 space-y-4">
            <Button className="flex items-center" variant="ghost">
              <CurrencyIcon className="h-5 w-5 mr-2" />
              Cash
            </Button>
            <Button className="flex items-center" variant="ghost">
              <BanknoteIcon className="h-5 w-5 mr-2" />
              Bank
            </Button>
            <h3 className="text-lg mt-4 font-semibold">Client</h3>
            <Button className="flex items-center" variant="ghost">
              <UserIcon className="h-5 w-5 mr-2" />
              Client name
            </Button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="mt-4 flex items-center justify-between">
            <span>Cash</span>
            <div className="flex items-center">
              <span className="font-semibold">$ 45.00</span>
              <Button className="ml-2" variant="ghost">
                <XIcon className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
        <Button className="mt-8 w-full h-16 py-4">Validate</Button>
      </aside>
      <div className="w-1/2 bg-background p-8">
        <div className="flex justify-between mb-20">
          <div className="grid gap-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                Remaining
              </h3>
              <p className="font-semibold text-foreground/70">$ 0.00</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Pass</h3>
              <p className="font-semibold text-foreground/70">$ 0.00</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">Change</h3>
            <p className="font-semibold text-foreground/70">$ 0.00</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number) => (
            <div
              key={number}
              className="p-2 m-0.5 rounded-md bg-muted/50 flex items-center justify-center h-16 text-center text-foreground hover:text-foreground/70 cursor-pointer transition-colors text-2xl"
            >
              {number}
            </div>
          ))}
          <div className="p-2 m-0.5 rounded-md bg-muted/50 flex items-center justify-center h-16 text-center text-foreground hover:text-foreground/70 cursor-pointer transition-colors text-2xl col-span-2">
            0
          </div>
          <Button className="py-8 text-3xl" variant="destructive">
            <Delete />
          </Button>
        </div>
      </div>
    </div>
  )
}

function BanknoteIcon (props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  )
}

function CurrencyIcon (props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <line x1="3" x2="6" y1="3" y2="6" />
      <line x1="21" x2="18" y1="3" y2="6" />
      <line x1="3" x2="6" y1="21" y2="18" />
      <line x1="21" x2="18" y1="21" y2="18" />
    </svg>
  )
}

function UserIcon (props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function XIcon (props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
