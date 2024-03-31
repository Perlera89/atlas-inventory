import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Info } from 'lucide-react'
import { useState } from 'react'

export function PopConfirmItem ({ title, children, confirm }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          <div className="flex gap-2 items-center">
            <Info className="text-red-500" size={16} />
            <Label className="text-sm text-white" htmlFor="name">
              {title}
            </Label>
          </div>
          <p className="my-4 text-sm">Are you sure to delete?</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              No
            </Button>
            <Button onClick={confirm}>Yes</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
