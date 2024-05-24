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

export default function SelectValueItem ({
  value,
  options,
  onChange,
  valueTitle,
  optionsTitle
}) {
  return (
    <div className="grid gap-2">
      <Label className='text-sm' htmlFor={value}>{valueTitle}</Label>
      <Select id={value} onValueChange={onChange} value={value}>
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
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
