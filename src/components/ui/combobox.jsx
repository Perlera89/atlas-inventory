"use client";

import * as React from "react";
import { MoreHorizontal, ChevronDown, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ItemCombobox } from "./item-combobox";
import { useInventoryStore } from "@/store/inventory";
import { Badge } from "./badge";

export function ComboboxDropdownMenu({ ...props }) {
  const [filters, setFilters] = React.useState({});
  const categories = useInventoryStore((state) => state.categories);
  const handleFilterByFilters = useInventoryStore(
    (state) => state.handleFilterByFilters
  );
  // {categoru : {value:{}}, brand:{value:{}}}

  const brands = useInventoryStore((state) => state.brands);
  const areas = useInventoryStore((state) => state.areas);
  const handlevalue = (item) => {
    // Crear un objeto con la estructura deseada para el nuevo valor
    const newItem = { id: item.key, name: item.value };

    setFilters((prev) => {
      // Verificar si el filtro ya existe y tiene un arreglo, si no, inicializarlo como un arreglo vacío
      const existingItems = prev[item.name] ? prev[item.name] : [];

      // Determinar si el item ya existe en el arreglo
      const existingItemIndex = existingItems.findIndex(
        (v) => v.id === item.key
      );

      let updatedItems;
      if (existingItemIndex !== -1) {
        // Si el item ya existe, actualizarlo
        updatedItems = existingItems.map((v, index) =>
          index === existingItemIndex ? newItem : v
        );
      } else {
        // Si el item no existe, agregarlo al arreglo
        updatedItems = [...existingItems, newItem];
      }

      // Crear o actualizar el objeto de filtros
      const newFilters = {
        ...prev,
        [item.name]: updatedItems,
      };

      // Llamar a handleFilterByFilters con el estado actualizado
      handleFilterByFilters(newFilters);
      return newFilters;
    });
  };
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 rounded-md border px-4 sm:flex-row sm:items-center">
      {Object.entries(filters).map(([filterName, filterValues]) =>
        filterValues.map((filter) => (
          <Badge key={filter.id} name={filter.name}>
            {filter.name}
          </Badge>
        ))
      )}
      {Object.keys(filters).length === 0 && (
        <p className="w-full">Select filters</p>
      )}
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
              [categories, "categories", "Categories"],
              [brands, "brands", "Brands"],
              [areas, "areas", "Areas"],
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
              <div
                className="flex justify-between items-center px-2 py-2"
                onClick={() => {
                  setFilters({});
                }}
              >
                <p>Delete</p> <Trash size={12} />
              </div>
            </DropdownMenuShortcut>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
