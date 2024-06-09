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
    default:
      return 'SELECT * FROM user'
  }
}

function getLastWord (sentence) {
  const words = sentence.split(' ')
  return words[words.length - 1]
}
