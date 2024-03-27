/**
 * v0 by Vercel.
 * @see https://v0.dev/t/r9KsgR529DF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button'
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/popover'
import { CommandInput, CommandEmpty, CommandItem, CommandGroup, Command } from '@/components/ui/command'

export default function Combobox () {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-[200px] justify-between" role="combobox" variant="outline">
          Select framework...
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput className="h-9" placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>Next.js</CommandItem>
            <CommandItem>Sveltekit</CommandItem>
            <CommandItem>Astro</CommandItem>
            <CommandItem>Nuxt.js</CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function ChevronsUpDownIcon (props) {
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
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  )
}
