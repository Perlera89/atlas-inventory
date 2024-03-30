import React, { useState } from "react";
import { Tags } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export const ItemCombobox = ({ name, Items, onSelect }) => {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Tags className="mr-2 h-4 w-4" />
        {name}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="p-0">
        <Command>
          <CommandInput placeholder={`Filter ${name}...`} autoFocus={true} />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {Items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(value) => {
                    onSelect({ [name]: value });
                  }}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};
