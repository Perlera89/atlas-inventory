import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      code: true,
      salePrice: true,
      purchasePrice: true,
      stock: true,
      productInfo: {
        select: {
          name: true,
          thumbnail: true
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
  const result = await prisma.$transaction(async (prisma) => {
    const newProductInfo = await prisma.productInfo.create({
      data: {
        name: productData.name,
        thumbnail: productData.thumbnail,
        minimumStock: productData.minimumStock,
        safetyInfo: productData.safetyInfo,
        description: productData.description,
        brand: {
          connect: { id: Number(productData.brand) }
        },
        area: {
          connect: { id: Number(productData.area) }
        },
        category: {
          connect: { id: Number(productData.category) }
        },
        type: {
          connect: { id: Number(productData.type) }
        }
      }
    })

    const newProduct = await prisma.product.create({
      data: {
        code: Number(productData.code),
        stock: productData.stock,
        salePrice: productData.salePrice,
        iva: productData.iva,
        isOnSale: productData.onSale,
        purchasePrice: productData.purchasePrice,
        minimumPrice: productData.minimumPrice,
        productInfo: {
          connect: { id: Number(newProductInfo.id) }
        }
      }
    })

    console.log('newProductInfo', newProductInfo)

    return { newProductInfo, newProduct }
  })

  await prisma.$disconnect()
  return NextResponse.json(result)
}
