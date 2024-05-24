import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const brands = await prisma.brand.findMany()
  await prisma.$disconnect()

  return NextResponse.json(brands)
}

export async function POST (resBrand) {
  const brandData = await resBrand.json()

  const brand = await prisma.brand.create({
    data: {
      name: brandData.name
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(brand)
}
