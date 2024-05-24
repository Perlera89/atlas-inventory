import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const deparments = await prisma.department.findMany({
    select: {
      id: true,
      name: true,
      districts: {
        select: {
          id: true,
          name: true,
          cities: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(deparments)
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
