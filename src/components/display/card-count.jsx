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
    <Card className="w-full sm:w-1/2 cursor-pointer hover:bg-muted/50 transition-colors" onClick={handleFilter}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        {React.createElement(icon)}
      </CardHeader>
      <CardContent>
        <CardDescription className="text-xl font-semibold pl-6 pb-4">
          {count}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
