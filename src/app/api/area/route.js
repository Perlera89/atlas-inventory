import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
export async function GET () {
  const areas = await prisma.area.findMany()
  await prisma.$disconnect()

  return NextResponse.json(areas)
}
