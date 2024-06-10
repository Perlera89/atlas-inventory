import fs from 'fs'
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { INITIAL_PROMPT } from '@/util/config'
import querySelector from '@/util/querys'
import docReader from '@/util/docs'

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST (req) {
  const { messages } = await req.json()

  console.log('messages', messages)

  const userMessage = messages.find(
    (message) => message.role === 'user'
  )?.content

  let message
  let mdContent

  const command = messages[messages.length - 1]?.content.split(' ')[0]
  console.log('command', command)

  if (command === 'Query:') {
    message = await querySelector(userMessage)
    console.log('message a enviar', message)
  } else if (command === 'Docs:') {
    mdContent = docReader(userMessage)
  } else {
    message = 'Not found'
  }

  console.log('ultimo pa enviar', message)

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: mdContent
      },
      {
        role: 'user',
        content: message
          ? `Eres un experto en redacción de consultas. Lee el JSON que proporciono y lista en un formato de texto natural para que sea fácil de leer (separa, lista y remarca lo que sea necesario). JSON: ${message}`
          : `Eres un experto en redacción de consultas. Lee el archivo Markdown que proporciono y lista en un formato de texto natural para que sea fácil de leer. Archivo: ${mdContent}`
      },
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
