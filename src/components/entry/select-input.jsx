import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectLabel
} from '@/components/ui/select'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '../ui/input'

export default function SelectInputItem ({
  value,
  options,
  onChange,
  valueTitle,
  optionsTitle,
  inputValue,
  onInputChange,
  onKeyPress
}) {
  return (
    <div className="grid gap-2">
      <Label className='text-sm' htmlFor={valueTitle}>{valueTitle}</Label>
      <Select id={valueTitle} onValueChange={onChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${valueTitle.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{optionsTitle}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
            <Input
              placeholder={`Type new ${valueTitle.toLowerCase()}`}
              className="mt-2 bg-transparent"
              value={inputValue}
              onChange={onInputChange}
              onKeyPress={onKeyPress}
            />
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
