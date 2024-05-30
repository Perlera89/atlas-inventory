import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function GET () {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      code: true,
      isOnSale: true,
      salePrice: true,
      purchasePrice: true,
      stock: true,
      iva: true,
      productInfo: {
        select: {
          name: true,
          categoryId: true,
          brandId: true,
          areaId: true,
          thumbnail: true,
          typeId: true
        }
      },
      isDeleted: true,
      updatedAt: true
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(products)
}

export async function POST (restProduct) {
  const productData = await restProduct.json()

  // Crea primero el productInfo
  const productInfo = await prisma.productInfo.create({
    data: {
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
  })

  // Luego usa el id de productInfo para crear el producto y los detalles de la etiqueta
  const result = await prisma.$transaction([
    prisma.product.create({
      data: {
        code: productData.code,
        stock: Number(productData.stock),
        salePrice: Number(productData.salePrice),
        iva: Number(productData.iva),
        isOnSale: productData.onSale,
        purchasePrice: Number(productData.purchasePrice),
        minimumPrice: Number(productData.minimumPrice),
        productInfo: {
          connect: {
            id: productInfo.id
          }
        },
        tagDetails: {
          create: {
            tag: {
              connect:
                productData.existingTags && productData.existingTags.length > 0
                  ? productData.existingTags.map((tag) => {
                    return {
                      id: Number(tag.value)
                    }
                  })
                  : [],
              create:
                productData.newTags && productData.newTags.length > 0
                  ? productData.newTags.map((tag) => {
                    return {
                      name: tag.label
                    }
                  })
                  : []
            },
            productInfo: {
              connect: {
                id: productInfo.id
              }
            }
          }
        }
      }
    })
  ])

  await prisma.$disconnect()
  return NextResponse.json(result)
}
