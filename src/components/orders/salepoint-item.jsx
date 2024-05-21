import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export default function SalepointItem ({ title, status, closing, balance, onOpen }) {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex gap-2 justify-between">
          <div className="grid gap-1">
            <div>
              <Badge>{status}</Badge>
            </div>
            <div className="mt-4">
              <Button onClick={onOpen}>Open</Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-end text-sm">
            <div className="flex gap-2">
              <p>Closing: </p>
              <p className="text-foreground/70">{closing}</p>
            </div>
            <div className="flex gap-2">
              <p>Balance: </p>
              <p className="text-foreground/70">$ {balance}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
