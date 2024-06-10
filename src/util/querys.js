import prisma from '@/lib/prisma'

export default async function querySelector (query) {
  console.log('query', query)
  switch (true) {
    case query.includes('Detalles de usuarios'): {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true
        }
      })
      console.log('Users', users)
      return JSON.stringify(users)
    }

    case query.includes('Detalles de producto'): {
      const products = await prisma.product.findMany({
        select: {
          id: true,
          productInfo: {
            select: {
              name: true
            }
          },
          stock: true,
          salePrice: true
        }
      })
      console.log('Products', products)
      return JSON.stringify(products)
    }

    case query.includes(`Stock en ${getLastWord(query)}`): {
      const producto = await prisma.product.findMany({
        where: {
          productInfo: {
            name: {
              contains: getLastWord(query)
            }
          }
        },
        select: {
          stock: true
        }
      })
      console.log('Products', producto)
      return JSON.stringify(producto)
    }

    case query.includes(`Precio minimo de ${getLastWord(query)}`): {
      const producto = await prisma.product.findMany({
        where: {
          productInfo: {
            name: {
              contains: getLastWord(query)
            }
          },
          isDeleted: false
        },
        select: {
          minimumPrice: true
        }
      })
      console.log('Products', producto)
      return JSON.stringify(producto)
    }
    case query.includes(`Area de ${getLastWord(query)}`): {
      const area = await prisma.Product.findMany({
        where: {
          productInfo: {
            name: {
              contains: getLastWord(query)
            }
          },
          isDeleted: false
        },
        select: {
          productInfo: {
            select: {
              area: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      })
      return JSON.stringify(area)
    }

    case query.includes('Productos eliminados'): {
      const producto = await prisma.product.findMany({
        where: {
          isDeleted: true
        },
        select: {
          productInfo: {
            select: {
              name: true
            }
          }
        }
      })
      return JSON.stringify(producto)
    }

    case query.includes('Productos en venta'): {
      const producto = await prisma.product.findMany({
        where: {
          isDeleted: false,
          isOnSale: true
        },
        select: {
          id: true,
          productInfo: {
            select: {
              name: true
            }
          }
        }
      })
      console.log('Products', producto)
      return JSON.stringify(producto)
    }
    case query.includes(`Distritos del departamento ${getLastWord(query)}`) : {
      const district = await prisma.district.findMany({
        where: {
          department: {
            name: getLastWord(query)
          }
        },
        select: {
          name: true
        }
      })
      return JSON.stringify(district)
    }

    case query.includes(`Informacion de cliente ${getLastWord(query)}`): {
      const client = await prisma.client.findMany({
        where: {
          firstName: getLastWord(query)
        },
        select: {
          firstName: true,
          lastName: true,
          dui: true,
          email: true,
          phone: true,
          address: {
            select: {
              department: true,
              city: true,
              district: true
            }
          }
        }
      })
      console.log('Client', client)
      return JSON.stringify(client)
    }

    case query.includes(`Informacion de empleado ${getLastWord(query)}`): {
      const employee = await prisma.employee.findMany({
        where: {
          firstName: getLastWord(query)
        },
        select: {
          firstName: true,
          lastName: true,
          dui: true,
          email: true,
          phone: true,
          address: {
            select: {
              department: {
                select: { name: true }
              },
              city: {
                select: { name: true }
              },
              district: {
                select: { name: true }
              }
            }
          }
        }
      })
      console.log('Employee', employee)
      return JSON.stringify(employee)
    }
    default:
      return 'No encontrado'
  }
}
function getLastWord (sentence) {
  const words = sentence.split(' ')
  return words[words.length - 1]
}
