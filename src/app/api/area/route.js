import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function GET () {
  const areas = await prisma.area.findMany()
  await prisma.$disconnect()

  return NextResponse.json(areas)
}
