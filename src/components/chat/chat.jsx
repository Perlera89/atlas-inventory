'use client'
import { useChat } from 'ai/react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useEffect, useRef } from 'react'
import { Pyramid } from 'lucide-react'

export default function Chat () {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  return (
    <div className="flex flex-col min-w-4xl bg-background text-white h-[85vh]">
      <header className="py-4 px-6">
        <h1 className="text-2xl font-bold">Atlas AI</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.length < 1 && (
        <div className="flex opacity-70 h-24 w-24 items-center justify-center mx-auto gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground place-content-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Pyramid className="h-12 w-12" />
          <span className="sr-only">Atlas Inv.</span>
        </div>
      )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`bg-muted grid gap-2 text-white rounded-lg px-4 py-2 max-w-[70%] shadow-md overflow-y-auto ${
                message.role === 'assistant' && 'bg-muted/50'
              }`}
            >
              <p className="text-sm font-light">
                {message.role === 'assistant' ? 'Atlas' : 'You'}
              </p>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="bg-background mt-auto bottom-4 w-full flex gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Type your message..."
          type="text"
          value={input}
          onChange={handleInputChange}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}
