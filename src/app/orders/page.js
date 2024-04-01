'use client'

import { Button } from '@/components/ui/button'
import { SearchItem } from '@/components/ui/search'

export default function SalePointsPage () {
  return <div>
    <div className="w-full flex gap-2">
        <Button>Add sale point</Button>
        <SearchItem placeholder='Search sale point' />
    </div>
    <div></div>
  </div>
}
