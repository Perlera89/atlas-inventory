import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET (_, { params }) {
  const clients = await prisma.client.findUnique({
    where: {
      id: Number(params.id)
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      dui: true,
      email: true,
      phone: true,
      address: {
        select: {
          department: {
            select: {
              id: true,
              name: true,
              districts: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          city: true,
          district: {
            select: {
              id: true,
              name: true,
              cities: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      },
      relevantInfo: true
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(clients)
}

export async function PUT (body, { params }) {
  try {
    const clientData = await body.json()
    console.log('clientData', clientData)

    const updatedClient = await prisma.client.update({
      where: {
        id: Number(params.id)
      },
      data: {
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        dui: clientData.dui,
        email: clientData.email,
        phone: clientData.phone,
        address: {
          update: {
            departmentId: Number(clientData.department),
            cityId: Number(clientData.city),
            districtId: Number(clientData.district)
          }
        },
        relevantInfo: clientData.relevantInfo
      }
    })

    return NextResponse.json({ updatedClient })
  } catch (err) {
    return NextResponse.json(err)
  }
}
