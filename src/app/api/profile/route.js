import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET () {
  const profile = await prisma.profile.findFirst({
    select: {
      id: true,
      thumbnail: true,
      name: true,
      phone: true,
      email: true,
      nrc: true,
      description: true,
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
      isDeleted: true
    }
  })

  await prisma.$disconnect()

  return NextResponse.json(profile)
}

export async function POST (body) {
  const profileData = await body.json()
  const {
    thumbnail,
    name,
    phone,
    email,
    nrc,
    description,
    department,
    district,
    city
  } = profileData

  const profile = await prisma.profile.create({
    data: {
      thumbnail,
      name,
      phone,
      email,
      nrc,
      description,
      address: {
        create: {
          departmentId: Number(department),
          districtId: Number(district),
          cityId: Number(city)
        }
      }
    }
  })

  await prisma.$disconnect()

  return NextResponse.json(profile)
}

export async function PUT (resProfile) {
  const profileData = await resProfile.json()
  const {
    id,
    thumbnail,
    name,
    nrc,
    email,
    phone,
    department,
    district,
    city,
    description
  } = profileData

  const profile = await prisma.profile.update({
    where: {
      id: Number(id)
    },
    data: {
      thumbnail,
      name,
      phone,
      email,
      nrc,
      description,
      address: {
        update: {
          departmentId: Number(department),
          districtId: Number(district),
          cityId: Number(city)
        }
      }
    }
  })

  await prisma.$disconnect()

  return NextResponse.json(profile)
}
