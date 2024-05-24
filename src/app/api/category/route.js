import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const categories = await prisma.category.findMany({
    include: {
      tags: true
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(categories)
}

export async function POST (resCategories) {
  const categoryData = await resCategories.json()

  const category = await prisma.category.create({
    data: {
      name: categoryData.name
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(category)
}
