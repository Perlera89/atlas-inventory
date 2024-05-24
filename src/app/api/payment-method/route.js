import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const paymentMethods = await prisma.paymentMethod.findMany()
  await prisma.$disconnect()

  return NextResponse.json(paymentMethods)
}
