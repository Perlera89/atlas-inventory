import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import querySelector from '@/util/querys'
import docReader from '@/util/docs'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST (req) {
  const { messages } = await req.json()

  const userMessage = messages[messages.length - 1]?.content
  console.log('userMessage', userMessage)

  let message = ''
  let jsonContent = ''
  let mdContent = ''

  // Obteniendo el comando del mensaje del usuario
  const command = messages[messages.length - 1]?.content.split(' ')[0]

  // Verificando el comando y ejecutando la acción correspondiente
  if (command === 'Query:') {
    jsonContent = await querySelector(userMessage)
    console.log('message a enviar', message)
  } else if (command === 'Docs:') {
    console.log('entro a revisar los documentos')
    mdContent = docReader(userMessage)
  } else {
    message = 'No encontrado'
  }

  console.log('message', message)
  console.log('jsonContent', jsonContent)
  console.log('mdContent', mdContent)

  // Creando la respuesta de la API
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'Eres Atlas AI, un chatbot asistente para un producto software de gestión de inventario llamado Atlas - Inventory. Respondes a las preguntas sobre el sistema (Si la pregunta esta fuera del contexto del sistema limitar al usuario e indicar que solo contestara a preguntas sobre este). Primero define el titulo de la pregunta si está relacionada al sistema, luego responde con el contenido solicitado.'
      },
      {
        role: mdContent ? 'system' : 'assistant',
        content: mdContent
          ? `{Responde la información solicitada sobre la documentación. Analiza el formato en Markdown y responde con un formato de texto natural. Archivo Markdown:}${mdContent}. 
          
          Si no hay archivo contesta tomando como contexto el documento anterior.`
          : `{Responde la información solicitada sobre la consulta a la base de datos. Analiza el formato en JSON y responde con un formato de texto natural. Asegurate de leer el archivo. Archivo JSON:}${jsonContent}. 
          
          Si no hay archivo contesta tomando como contexto el documento anterior.`
      },
      {
        role: 'user',
        content: userMessage
      },
      ...messages
    ],
    max_tokens: 800,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
