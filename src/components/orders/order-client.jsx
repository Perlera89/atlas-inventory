'use client'

import * as React from 'react'
import { useOrderStore } from '@/store/order'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default function OrderClient ({ children }) {
  const [open, setOpen] = React.useState(false)

  const clients = useOrderStore((state) => state.clients)
  const order = useOrderStore((state) => state.order)
  const setOrder = useOrderStore((state) => state.setOrder)
  const setSelectedClient = useOrderStore((state) => state.setSelectedClient)
  const fetchClients = useOrderStore((state) => state.fetchClients)

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchClients()
    }
    fetchData()
  }, [])

  const handleSelectClient = (client) => {
    if (!order) return
    setOpen(false)
    setSelectedClient(client)
    setOrder({ ...order, client })
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="right" side="right" className="w-[200px]">
        <Command>
          <CommandInput
            className="placeholder:text-foreground/70"
            placeholder="Search Client"
            autoFocus={true}
          />
          <CommandList>
            <CommandEmpty>No clients</CommandEmpty>
            <CommandGroup>
              {clients.map((client) => (
                <CommandItem
                  className="text-primary"
                  key={client.id}
                  value={client.name}
                  onSelect={() => handleSelectClient(client)}
                >
                  {client.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
