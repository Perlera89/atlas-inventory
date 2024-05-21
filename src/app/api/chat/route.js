import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { INITIAL_PROMPT } from '@/util/config'

export const runtime = 'edge' // 'cloud' or 'edge

// cliente de openAI
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export async function POST (req) {
  const { messages } = await req.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      { role: 'user', content: INITIAL_PROMPT },
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
