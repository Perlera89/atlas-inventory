import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler (req, res) {
  if (req.method === 'POST') {
    console.log('entro aqui')
    const { role, content } = req.body
    try {
      const message = await prisma.message.create({
        data: {
          role,
          content
        }
      })
      res.status(200).json(message)
    } catch (error) {
      console.error('Error saving message:', error)
      res.status(500).json({ error: 'Error saving message' })
    }
  } else if (req.method === 'GET') {
    try {
      const messages = await prisma.message.findMany()
      res.status(200).json(messages)
    } catch (error) {
      console.error('Error fetching messages:', error)
      res.status(500).json({ error: 'Error fetching messages' })
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
