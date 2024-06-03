import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bycript from 'bcryptjs'

export async function GET () {
  const employees = await prisma.employee.findMany({
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
      user: {
        select: {
          username: true
        }
      },
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

  return NextResponse.json(employees)
}

export async function POST (body) {
  const employeeData = await body.json()
  const {
    id,
    firstName,
    lastName,
    username,
    password,
    dui,
    email,
    phone,
    genre,
    salary,
    position,
    department,
    district,
    city
  } = employeeData

  console.log('employeeData', employeeData)

  const hashedPassword = await bycript.hash(password, 10)

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
      salary,
      user: {
        create: {
          email,
          username,
          password: hashedPassword,
          type: {
            connect: {
              id: 2
            }
          }
        }
      }
    }
  })

  await prisma.$disconnect()

  return NextResponse.json(employee)
}
