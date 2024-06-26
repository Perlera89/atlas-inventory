import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        'flex min-h-[80px] text-foreground w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-[.5px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props} />)
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
