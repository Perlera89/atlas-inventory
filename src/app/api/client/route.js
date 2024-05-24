import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const clients = await prisma.client.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      dui: true,
      email: true,
      phone: true,
      address: {
        select: {
          department: true,
          city: true,
          district: true
        }
      },
      relevantInfo: true,
      isDeleted: true
    }
  })

  await prisma.$disconnect()

  return NextResponse.json(clients)
}

export async function POST (body) {
  const clientData = await body.json()
  const {
    id,
    firstName,
    lastName,
    dui,
    email,
    phone,
    department,
    district,
    city,
    relevantInfo
  } = clientData

  const client = await prisma.client.create({
    data: {
      firstName,
      lastName,
      dui,
      email,
      phone,
      address: {
        create: {
          departmentId: Number(department),
          districtId: Number(district),
          cityId: Number(city)
        }
      },
      relevantInfo
    }
  })

  await prisma.$disconnect()

  return NextResponse.json(client)
}
