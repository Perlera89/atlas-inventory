const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main () {
  // Insertar datos de género
  await prisma.genre.createMany({
    data: [
      { name: 'Male' },
      { name: 'Female' },
      { name: 'Non-binary' },
      { name: 'Other' }
    ]
  })

  await prisma.type.createMany({
    data: [{ name: 'Consumable' }, { name: 'Storable' }, { name: 'Service' }]
  })

  await prisma.status.createMany({
    data: [{ name: 'Pending' }, { name: 'Completed' }, { name: 'Cancelled' }]
  })

  await prisma.paymentMethod.createMany({
    data: [{ name: 'Cash' }, { name: 'Credit Card' }, { name: 'Debit Card' }]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
