import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { INITIAL_PROMPT } from '@/util/config'
import querySelector from '@/util/querys'

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST (req) {
  const { messages } = await req.json()

  const query = await querySelector(messages[messages.length - 1]?.content)

  console.log('query', query)

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      { role: 'user', content: `${INITIAL_PROMPT}\n\n${query}` },
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
