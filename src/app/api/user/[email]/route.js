import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET (_, { params }) {
  const email = params.email
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      email: true,
      username: true,
      role: true
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(user)
}
