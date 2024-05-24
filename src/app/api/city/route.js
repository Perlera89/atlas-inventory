import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const cities = await prisma.city.findMany()
  await prisma.$disconnect()

  return NextResponse.json(cities)
}

export async function POST (resCity) {
  const cityData = await resCity.json()

  const city = await prisma.city.create({
    data: {
      name: cityData.name,
      district: Number(cityData.district)
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(city)
}
