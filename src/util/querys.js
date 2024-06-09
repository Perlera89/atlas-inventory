import prisma from '@/lib/prisma'

export default async function querySelector (query) {
  console.log('query', query)
  switch (query) {
    case 'Detalles de usuario': {
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

    case 'Detalles de producto': {
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

    case `Stock en ${getLastWord(query)}`: {
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

    case `Precio minimo de ${getLastWord(query)}`: {
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

    case `Area de ${getLastWord(query)}`: {
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

    case 'Productos eliminados': {
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

    case 'Productos en venta': {
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

    case `Distritos del departamento ${getLastWord(query)}` : {
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

    case `informacion de cliente ${getLastWord(query)}`: {
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

    case `Informacion de empleado ${getLastWord(query)}`: {
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
              department: true,
              city: true,
              district: true
            }
          }
        }
      })
      console.log('Employee', employee)
      return JSON.stringify(employee)
    }

    default:{
      return 'SELECT * FROM user'
    }
  }
}

function getLastWord (sentence) {
  const words = sentence.split(' ')
  return words[words.length - 1]
}
