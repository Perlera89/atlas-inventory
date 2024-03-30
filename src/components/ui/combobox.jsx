'use client'

import * as React from 'react'
import { MoreHorizontal, ChevronDown, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ItemCombobox } from './item-combobox'
import { useInventoryStore } from '@/store/inventory'
import { Badge } from './badge'

export function ComboboxDropdownMenu ({ ...props }) {
  const [filters, setFilters] = React.useState([])
  const categories = useInventoryStore((state) => state.categories)
  const handleFilterByFilters = useInventoryStore(
    (state) => state.handleFilterByFilters
  )
  const brands = useInventoryStore((state) => state.brands)
  const areas = useInventoryStore((state) => state.areas)
  const handlevalue = (item) => {
    const newItem = {
      name: item.name,
      value: Array.isArray(item.value) ? item.value : [item.value]
    }

    setFilters((prev) => {
      const index = prev.findIndex((i) => i.name === item.name)
      let newFilters
      if (index !== -1) {
        const updatedItem = { ...prev[index] }
        // Verificar si el valor ya existe en el arreglo
        if (!updatedItem.value.includes(item.value)) {
          updatedItem.value = Array.isArray(updatedItem.value) ? [...updatedItem.value, item.value] : [updatedItem.value, item.value]
        }
        newFilters = [...prev.slice(0, index), updatedItem, ...prev.slice(index + 1)]
      } else {
        // Asegurarse de que value siempre sea un arreglo
        const newItemWithArrayValue = { ...item, value: [item.value] }
        newFilters = [...prev, newItemWithArrayValue]
      }
      // Llamar a handleFilterByFilters con el estado actualizado
      handleFilterByFilters(newFilters)
      return newFilters
    })

    // Estos logs no reflejarán inmediatamente los cambios debido a la naturaleza asíncrona de setState
    console.log('item', newItem)
    console.log('filters', filters)
  }

  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 rounded-md border px-4 sm:flex-row sm:items-center">
      {filters.map((item, index) =>
        item.value.map((value, key) => (
          <Badge key={key} name={item.name}>
            {value}
          </Badge>
        ))
      )}
      <p className="w-full">Select filters</p>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuLabel>Filter</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            {[
              [categories, 'categories', 'Categories'],
              [brands, 'brands', 'Brands'],
              [areas, 'areas', 'Areas']
            ].map(([items, name, label], key) => (
              <ItemCombobox
                key={key}
                name={name}
                label={label}
                items={items}
                onSelect={handlevalue}
              />
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuShortcut className="text-red-500 hover:bg-muted">
              <div className="flex justify-between items-center px-2 py-2">
                <p>Delete</p> <Trash size={12} />
              </div>
            </DropdownMenuShortcut>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
