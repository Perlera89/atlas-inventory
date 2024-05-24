import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST (res) {
  try {
    const userData = await res.json()

    const userFound = await prisma.user
      .findUnique({
        where: {
          email: userData.email
        }
      })
      .then((user) => {
        if (user) {
          return NextResponse.json(user)
        }
      })

    if (userFound) {
      return NextResponse.json(
        {
          message: 'Email already exists'
        },
        { status: 400 }
      )
    }

    const usernameFound = await prisma.user
      .findUnique({
        where: {
          username: userData.username
        }
      })
      .then((user) => {
        if (user) {
          return NextResponse.json(user)
        }
      })

    if (usernameFound) {
      return NextResponse.json(
        {
          message: 'Username already exists'
        },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const newUser = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        type: {
          connect: {
            id: 1
          }
        }
      }
    })

    const { password: _, ...user } = newUser

    await prisma.$disconnect()
    return NextResponse.json(user)
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message
      },
      { status: 500 }
    )
  }
}
