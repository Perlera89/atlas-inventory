import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const brands = await prisma.brand.findMany()
  await prisma.$disconnect()

  return NextResponse.json(brands)
}
