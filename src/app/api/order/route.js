import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST (restOrder) {
  const saleData = await restOrder.json()

  // Inicia una transacción
  const result = await prisma.$transaction([
    prisma.sale.create({
      data: {
        code: saleData.code,
        note: saleData.note || 'Empty',
        status: {
          connect: { id: Number(saleData.status) }
        },
        user: {
          connect: { id: Number(saleData.user) }
        },
        client: {
          connect: { id: Number(saleData.client) }
        },
        paymentMethod: {
          connect: { id: Number(saleData.paymentMethod) }
        },
        productSales: {
          create: saleData.products.map((productSale) => ({
            product: {
              connect: { id: Number(productSale.product) }
            },
            amount: Number(productSale.quantity),
            price: Number(productSale.price),
            discount: Number(productSale.discount)
          }))
        }
      }
    }),
    ...saleData.products.map((productSale) =>
      prisma.product.update({
        where: { id: Number(productSale.product) },
        data: {
          stock: {
            decrement: Number(productSale.quantity)
          }
        }
      })
    )
  ])

  await prisma.$disconnect()
  return NextResponse.json(result)
}
