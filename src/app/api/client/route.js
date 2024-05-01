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
      relevantInfo: true
    }
  })

  await prisma.$disconnect()

  return NextResponse.json(clients)
}
