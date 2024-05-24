import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT (_, { params }) {
  try {
    const query = await prisma.product.update({
      where: { id: Number(params.id) },
      data: {
        isDeleted: true
      }
    })
    return NextResponse.json(query)
  } catch (error) {
    console.log('error', error)
    return NextResponse.json(error)
  }
}
