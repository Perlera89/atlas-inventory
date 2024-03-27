import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Suponiendo que cn es una función para manejar classNames

const MultiSelectItem = ({ options, onValueChange, selectedValues }) => {
  const handleValueChange = (value) => {
    if (selectedValues.includes(value)) {
      onValueChange(selectedValues.filter((v) => v !== value))
    } else {
      onValueChange([...selectedValues, value])
    }
  }

  return (
    <SelectPrimitive.Root onValueChange={handleValueChange} value={selectedValues}>
      <SelectPrimitive.Trigger className={cn('tu-clase-trigger')}>
        {selectedValues.length > 0 ? selectedValues.join(', ') : 'Selecciona opciones'}
        <SelectPrimitive.Icon>
          <ChevronDown />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className={cn('tu-clase-content')}>
          <SelectPrimitive.Viewport>
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className={cn('tu-clase-item', {
                  'tu-clase-item-seleccionado': selectedValues.includes(option.value)
                })}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

export default MultiSelectItem
