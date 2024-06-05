import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

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
              name: true
            }
          },
          area: {
            select: {
              id: true,
              name: true
            }
          },
          category: {
            select: {
              id: true,
              name: true,
              tags: {
                select: {
                  id: true,
                  name: true
                }
              }
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
              id: true,
              tag: {
                select: {
                  id: true,
                  name: true
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

export async function PUT (restProduct, { params }) {
  try {
    const productData = await restProduct.json()

    console.log('productData', productData)

    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(params.id)
      },
      data: {
        code: productData.code,
        salePrice: Number(productData.price),
        iva: Number(productData.iva),
        purchasePrice: Number(productData.cost),
        minimumPrice: Number(productData.minimumPrice),
        isOnSale: productData.onSale,
        isBlocked: productData.blocked,
        stock: Number(productData.stock),
        productInfo: {
          update: {
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

    let resultNewTags
    let resultExistingTags

    if (productData.newTags && productData.newTags.length > 0) {
      resultNewTags = await Promise.all(
        productData.newTags.map(async (tag) => {
          console.log('tag', tag)
          if (tag.id) {
            // Update existing tag
            return prisma.tag.update({
              where: {
                id: Number(tag.id)
              },
              data: {
                name: tag.label,
                categoryId: Number(productData.category)
              }
            })
          } else {
            // Create new tag
            return prisma.tag.create({
              data: {
                name: tag.label,
                categoryId: Number(productData.category)
              }
            })
          }
        })
      )
    }

    if (productData.existingTags && productData.existingTags.length > 0) {
      resultExistingTags = await Promise.all(
        productData.existingTags.map(async (tag) => {
          console.log('tag', tag)

          return prisma.tagDetail.update({
            where: {
              id: Number(tag.id)
            },
            data: {
              productId: Number(params.id),
              tagId: tag.value
            }
          })
        })
      )
    }

    await prisma.$disconnect()
    return NextResponse.json([
      updatedProduct,
      resultNewTags,
      resultExistingTags
    ])
  } catch (err) {
    return NextResponse.json(err)
  }
}
