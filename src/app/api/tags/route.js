import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function GET () {
  const categories = await prisma.tag.findMany()
  await prisma.$disconnect()

  return NextResponse.json(categories)
}
