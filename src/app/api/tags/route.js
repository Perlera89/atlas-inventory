import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const categories = await prisma.tag.findMany()
  await prisma.$disconnect()

  return NextResponse.json(categories)
}

export async function POST (restCategory) {
  console.log('restCategory', restCategory)
  try {
    const categoryData = await restCategory.json()

    const category = await prisma.tag.create({
      data: {
        name: categoryData.name,
        category: {
          connect: {
            id: Number(categoryData.category)
          }
        }
      }
    })
    await prisma.$disconnect()

    return NextResponse.json(category)
  } catch (error) {
    console.error(error)
  }
}
