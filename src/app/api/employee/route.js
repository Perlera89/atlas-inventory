import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const clients = await prisma.employee.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      dui: true,
      email: true,
      phone: true,
      genreId: true,
      salary: true,
      positionId: true,
      address: {
        select: {
          department: true,
          city: true,
          district: true
        }
      },
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
    genre,
    salary,
    position,
    department,
    district,
    city
  } = clientData

  const employee = await prisma.employee.create({
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
      genre: {
        connect: {
          id: Number(genre)
        }
      },
      position: {
        connect: {
          id: Number(position)
        }
      },
      salary
    }
  })

  await prisma.$disconnect()

  return NextResponse.json(employee)
}
