import React, { useState } from 'react'
import { Tags } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu'

export const ItemCombobox = ({ name, label, items, onSelect }) => {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Tags className="mr-2 h-4 w-4" />
        {label}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="p-0">
        <Command>
          <CommandInput
            className="placeholder:text-foreground/70 text-foreground/90"
            placeholder={`Filter ${label}...`}
            autoFocus={true}
          />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                className='text-white'
                  key={item.id}
                  value={item.name}
                  onSelect={(value) => onSelect({ name, key: item.id, value })}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
