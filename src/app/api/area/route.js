import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
export async function GET () {
  const areas = await prisma.area.findMany()
  await prisma.$disconnect()

  return NextResponse.json(areas)
}

export async function POST (resArea) {
  const areaData = await resArea.json()

  const area = await prisma.area.create({
    data: {
      name: areaData.name
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(area)
}
