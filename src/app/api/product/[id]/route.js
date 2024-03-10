import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function GET (_, { params }) {
  const products = await prisma.product.findUnique({
    where: {
      id: Number(params.id)
    },
    select: {
      id: true,
      code: true,
      salePrice: true,
      iva: true,
      purchasePrice: true,
      minimumPrice: true,
      isOnSale: true,
      stock: true,
      productInfo: {
        select: {
          name: true,
          thumbnail: true,
          minimumStock: true,
          safetyInfo: true,
          description: true,
          brand: {
            select: {
              id: true,
              name: true,
              color: true
            }
          },
          area: {
            select: {
              id: true,
              name: true,
              color: true
            }
          },
          category: {
            select: {
              id: true,
              name: true,
              color: true
            }
          },
          type: {
            select: {
              id: true,
              name: true
            }
          },
          tagDetails: {
            select: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  color: true
                }
              }
            }
          }
        }
      }
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(products)
}
