import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function CardCountItem ({ title, icon, count, handleFilter }) {
  return (
    <Card className="w-full cursor-pointer hover:bg-muted/50 bg-transparent transition-colors" onClick={handleFilter}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg text-primary font-medium">{title}</CardTitle>
        {React.createElement(icon, { size: 20 })}
      </CardHeader>
      <CardContent>
        <CardDescription className="text-xl text-foreground font-semibold pl-6 pb-4">
          {count}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
