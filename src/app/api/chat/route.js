import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { INITIAL_PROMPT } from '@/util/config'
import prisma from '@/lib/prisma'

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST (req) {
  const { messages } = await req.json()

  let dbResponse = ''

  // Comprueba si el usuario ha solicitado los detalles de usuario
  if (messages?.content?.includes('Detalles de usuario')) {
    const users = await prisma.user.findMany()
    dbResponse = `Detalles de usuario: ${JSON.stringify(users)}`
  }

  // Añade una nueva consulta aquí
  if (messages?.content?.includes('Consulta nueva')) {
    const result = await prisma.someModel.findMany() // Cambia 'someModel' por el modelo que quieres consultar
    dbResponse = `Resultado de la consulta: ${JSON.stringify(result)}`
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      { role: 'user', content: `${INITIAL_PROMPT}\n\n${dbResponse}` },
      ...messages
    ],
    max_tokens: 500,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
