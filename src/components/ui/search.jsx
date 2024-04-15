import { Search } from 'lucide-react'
import React from 'react'
import { Input } from './input'
import Fuse from 'fuse.js'
import { useDebouncedCallback } from 'use-debounce'

export const SearchItem = ({ placeholder, onSearch, options }) => {
  const handleSearch = useDebouncedCallback((e) => {
    if (e.target.value) {
      const fuseOptions = {
        keys: ['productInfo.name'],
        threshold: 0.3
      }

      const fuse = new Fuse(options, fuseOptions)
      const results = fuse.search(e.target.value)
      onSearch(results.map((result) => result.item))
    } else {
      onSearch(options)
    }
  }, 500)

  return (
    <div className="relative w-full">
      <Search className="absolute left-2.5 top-[12px] h-4 w-4 text-muted-foreground" />
      <Input
        type="Search"
        placeholder={placeholder}
        className="w-full appearance-none bg-background pl-8 shadow-none"
        onChange={handleSearch}
      />
    </div>
  )
}
