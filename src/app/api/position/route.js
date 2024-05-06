import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const positions = await prisma.position.findMany()
  await prisma.$disconnect()

  return NextResponse.json(positions)
}

export async function POST (body) {
  const positionData = await body.json()

  const position = await prisma.position.create({
    data: {
      name: positionData.name
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(position)
}
