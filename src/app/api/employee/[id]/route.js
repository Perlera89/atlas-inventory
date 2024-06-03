import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET (_, { params }) {
  const employees = await prisma.employee.findUnique({
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
      genre: {
        select: {
          id: true,
          name: true
        }
      },
      salary: true,
      position: {
        select: {
          id: true,
          name: true
        }
      },
      user: {
        select: {
          username: true
        }
      },
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
      }
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(employees)
}

export async function PUT (body, { params }) {
  try {
    const employeeData = await body.json()
    console.log('employeeData', employeeData)

    const updatedEmployee = await prisma.employee.update({
      where: {
        id: Number(params.id)
      },
      data: {
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        dui: employeeData.dui,
        email: employeeData.email,
        phone: employeeData.phone,
        address: {
          update: {
            departmentId: Number(employeeData.department),
            cityId: Number(employeeData.city),
            districtId: Number(employeeData.district)
          }
        },
        genre: {
          connect: {
            id: Number(employeeData.genre)
          }
        },
        position: {
          connect: {
            id: Number(employeeData.position)
          }
        },
        salary: employeeData.salary,
        user: {
          update: {
            username: employeeData.username
          }
        }
      }
    })

    return NextResponse.json({ updatedEmployee })
  } catch (err) {
    return NextResponse.json(err)
  }
}
