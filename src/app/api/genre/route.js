import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const genres = await prisma.genre.findMany()
  await prisma.$disconnect()

  return NextResponse.json(genres)
}
