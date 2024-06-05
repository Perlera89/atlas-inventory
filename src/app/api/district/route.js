import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST (resDistrict) {
  const districtData = await resDistrict.json()

  const district = await prisma.district.create({
    data: {
      name: districtData.name,
      department: {
        connect: {
          id: Number(districtData.department)
        }
      }
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(district)
}
