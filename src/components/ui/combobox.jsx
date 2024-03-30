"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ItemCombobox } from "./item-combobox";
import { useInventoryStore } from "@/store/inventory";

export function ComboboxDropdownMenu({ ...props }) {
  const [value, setValue] = React.useState([]);
  const categories = useInventoryStore((state) => state.categories);
  const brands = useInventoryStore((state) => state.brands);
  const areas = useInventoryStore((state) => state.areas);
  const identifier = (item) => item.Categories || item.Brands || item.Areas;
  const handlevalue = (res) => {
    console.log("value", value);
    const existItem = value.findIndex(
      (item) => Object.keys(item)[0] === Object.keys(res)[0]
    );
    if (existItem !== -1) {
      const itms = [...value];

      itms[existItem][Object.keys(res)[0]].push(identifier(res));
      setValue(itms);
    } else {
      console.log("no existe");
      setValue([...value, { [Object.keys(res)[0]]: [identifier(res)] }]);
    }
    console.log({ [Object.keys(res)[0]]: [identifier(res)] });
  };
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
      <p className="text-sm font-medium leading-none">
        {value.map((item) =>
          item.forEach((element) => {
            <span
              key=""
              className="mr-2 rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground"
            >
              {identifier(element)}
            </span>;
          })
        )}
        <span className="text-muted-foreground">Select filters</span>
      </p>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Filter</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <ItemCombobox name={"Areas"} Items={areas} onSelect={handlevalue} />
            <DropdownMenuSeparator />
            <ItemCombobox
              name={"Categories"}
              Items={categories}
              onSelect={handlevalue}
            />
            <DropdownMenuSeparator />
            <ItemCombobox
              name={"Brands"}
              Items={brands}
              onSelect={handlevalue}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
