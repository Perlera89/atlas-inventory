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

export async function POST (resDepartment) {
  const deparmentData = await resDepartment.json()

  const deparment = await prisma.department.create({
    data: {
      name: deparmentData.name
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(deparment)
}
