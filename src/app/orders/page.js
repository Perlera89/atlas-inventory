'use client'

import { Button } from '@/components/ui/button'
import { SearchItem } from '@/components/ui/search'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

export default function SalePointsPage () {
  return (
    <div className="flex gap-4 flex-col">
      <div className="w-full flex gap-2">
        <Button>Add sale point</Button>
        <SearchItem placeholder="Search sale point" />
      </div>
      <div>
        <Card className="w-96 p-6">
          <CardContent>
            <div className="flex gap-2 justify-between">
              <div className="grid gap-2">
                <p className="font-bold">Sucursal 1</p>
                <div>
                  <Button>Open sale point</Button>
                </div>
              </div>
              <div className="flex gap-2">
                <p>Total: </p>
                <p className="text-foreground/70">$ 10.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
