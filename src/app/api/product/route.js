import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      code: true,
      isOnSale: true,
      salePrice: true,
      purchasePrice: true,
      stock: true,
      productInfo: {
        select: {
          name: true,
          thumbnail: true,
          typeId: true
        }
      },
      isDeleted: true
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(products)
}

export async function POST (restProduct) {
  const productData = await restProduct.json()

  // Inicia una transacción
  const result = await prisma.product.create({
    data: {
      code: Number(productData.code),
      stock: Number(productData.stock),
      salePrice: Number(productData.salePrice),
      iva: Number(productData.iva),
      isOnSale: productData.onSale,
      purchasePrice: Number(productData.purchasePrice),
      minimumPrice: Number(productData.minimumPrice),
      productInfo: {
        create: {
          name: productData.name,
          thumbnail: productData.thumbnail,
          minimumStock: Number(productData.minimumStock),
          safetyInfo: productData.safetyInfo,
          description: productData.description,
          brand: {
            connect: {
              id: Number(productData.brand)
            }
          },
          area: {
            connect: {
              id: Number(productData.area)
            }
          },
          category: {
            connect: {
              id: Number(productData.category)
            }
          },
          type: {
            connect: {
              id: Number(productData.type)
            }
          }
        }
      }
    }
  })

  await prisma.$disconnect()
  return NextResponse.json(result)
}
