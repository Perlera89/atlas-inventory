import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const categories = await prisma.tag.findMany()
  await prisma.$disconnect()

  return NextResponse.json(categories)
}
