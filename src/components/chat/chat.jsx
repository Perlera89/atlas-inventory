'use client'
import { useChat } from 'ai/react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useEffect, useRef, useState } from 'react'
import { useProfileStore } from '@/store/profile'
import {
  Pyramid,
  SendHorizonal,
  User,
  Terminal,
  Users,
  LogIn,
  Package,
  Trash2,
  MapPin,
  Briefcase,
  ShoppingCart
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DropdownMenuPortal } from '@radix-ui/react-dropdown-menu'
import { Card, CardContent } from '../ui/card'

const greetings = [
  'Soy Atlas AI. ¿En qué puedo ayudarte hoy?',
  'Hola, soy Atlas AI. ¿Cómo puedo asistirte hoy?',
  'Bienvenido, soy Atlas AI. ¿Qué necesitas hoy?',
  'Buen día. Consulta lo que desees, soy Atlas AI.',
  'Hola, soy Atlas AI. ¿En qué puedo asistirte hoy?',
  'Soy Atlas AI. ¿Haz una consulta?'
]

const cards = [
  {
    title: 'Detalles para los usuarios',
    icon: <Users className="absolute bottom-4 right-4" />,
    value: 'Query: Detalles de usuarios'
  },
  {
    title: 'Pasos para realizar el registro',
    icon: <LogIn className="absolute bottom-4 right-4" />,
    value: 'Docs: Realizar Registro'
  },
  {
    title: 'Eliminar un producto',
    icon: <Trash2 className="absolute bottom-4 right-4" />,
    value: 'Docs: Eliminar un Producto'
  },
  {
    title: 'Actualizar un producto',
    icon: <Package className="absolute bottom-4 right-4" />,
    value: 'Docs: Actualizar un Producto'
  },
  {
    title: 'Agregar un nuevo Cliente',
    icon: <User className="absolute bottom-4 right-4" />,
    value: 'Docs: Agregar un Cliente'
  },
  {
    title: 'Agregar un nuevo empleado',
    icon: <Trash2 className="absolute bottom-4 right-4" />,
    value: 'Docs: Agregar un Empleado'
  },
  {
    title: 'Agregar una nueva orden',
    icon: <ShoppingCart className="absolute bottom-4 right-4" />,
    value: 'Docs: Agregar una Orden'
  },
  {
    title: 'Existencias del producto',
    icon: <Package className="absolute bottom-4 right-4" />,
    value: 'Query: Existencias en Producto'
  },
  {
    title: 'Precio minimo de producto',
    icon: <Package className="absolute bottom-4 right-4" />,
    value: 'Query: Precio minimo de Producto'
  },
  {
    title: 'Area para el producto',
    icon: <Package className="absolute bottom-4 right-4" />,
    value: 'Query: Area de Producto'
  },
  {
    title: 'Productos que están eliminados',
    icon: <Trash2 className="absolute bottom-4 right-4" />,
    value: 'Query: Productos eliminados'
  },
  {
    title: 'Distritos del departamento',
    icon: <MapPin className="absolute bottom-4 right-4" />,
    value: 'Query: Distritos del departamento'
  },
  {
    title: 'Información del cliente',
    icon: <User className="absolute bottom-4 right-4" />,
    value: 'Query: Información del cliente'
  },
  {
    title: 'Información del empleado',
    icon: <Briefcase className="absolute bottom-4 right-4" />,
    value: 'Query: Información del empleado'
  }
]

function getRandomElement (array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export default function Chat () {
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat()

  const [greeting, setGreeting] = useState(null)
  const [selectedCards, setSelectedCards] = useState(null)
  const thumbnail = useProfileStore((state) => state.thumbnail)
  const name = useProfileStore((state) => state.name)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    setGreeting(getRandomElement(greetings))
    setSelectedCards(cards.sort(() => 0.5 - Math.random()).slice(0, 6))
  }, [])

  return (
    <div className="flex flex-col min-w-4xl bg-background text-foreground h-[85vh]">
      <header className="py-4 px-6 flex items-center gap-4">
        <div className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
          <Pyramid className="h-5 w-5 transition-all group-hover:scale-110" />
        </div>
        <h1 className="text-2xl text-primary font-bold">Atlas AI</h1>
      </header>
      <div className="flex-1 grid overflow-y-auto p-6 space-y-4">
        {messages.length < 1 && (
          <div className="grid gap-4 mt-20">
            <div className="flex opacity-70 h-32 w-32 items-center justify-center mx-auto gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground place-content-center">
              <Pyramid className="h-16 w-16" />
              <span className="sr-only">Atlas Inv.</span>
            </div>
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
              {greeting}
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCards?.map((card) => (
                <Card
                  className="w-52 hover:bg-muted/50 transition-colors cursor-pointer"
                  key={card.title}
                  onClick={() => setInput(card.value)}
                >
                  <CardContent className="p-4 relative">
                    <div className="flex items-center gap-2">
                      {card.icon}
                      <p className="text-lg">{card.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start ${
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                <Pyramid className="h-5 w-5 transition-all group-hover:scale-110" />
              </div>
            )}
            <div
              className={`ml-2 max-w-[70%] ${
                message.role !== 'assistant' ? 'text-right' : ''
              }`}
            >
              <h5
                className={`text-sm font-semibold leading-snug pb-1 ${
                  message.role === 'assistant'
                    ? 'text-card-foreground'
                    : 'text-card-foreground'
                }`}
              >
                {message.role === 'assistant' ? 'Atlas AI' : name || 'User'}
              </h5>
              <div
                className={`px-3.5 py-2 rounded justify-start items-center gap-3 inline-flex ${
                  message.role === 'assistant'
                    ? 'bg-card text-primary'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                <h5 className="text-sm font-normal leading-snug">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </h5>
              </div>
              <h6 className="text-muted-foreground/70 text-xs font-normal leading-4 py-1 mt-1">
                {message.createdAt.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </h6>
            </div>
            {message.role !== 'assistant' &&
              (thumbnail
                ? (
                <img
                  className="group flex ml-2 h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  src={thumbnail}
                ></img>
                  )
                : (
                <div className="group flex ml-2 h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                  <User className="h-5 w-5 transition-all group-hover:scale-110" />
                </div>
                  ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="w-full py-1 items-center gap-2 inline-flex justify-between"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-2 w-full relative">
          <Input
            className="grow shrink basis-0 pl-14 text-foreground font-medium leading-4 w-full h-12"
            placeholder="Type here..."
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="ghost"
            className="items-center flex px-3 py-2 shadow absolute top-1.5 right-1"
          >
            <SendHorizonal />
          </Button>
          <DropdownMenu className="text-foreground">
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="items-center flex px-3 py-2 shadow absolute top-1.5 left-1"
              >
                <Terminal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Selecciona la entrada</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Consultas</DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {[
                      ['Detalles de usuario', 'Query: Detalles de usuarios'],
                      ['Detalles de producto', 'Query: Detalles de producto'],
                      [
                        'Existencias en producto',
                        'Query: Existencias en',
                        'Producto'
                      ],
                      [
                        'Precio minimo de producto',
                        'Query: Precio minimo de',
                        'Producto'
                      ],
                      ['Area de producto', 'Query: Area de', 'Producto'],
                      ['Productos eliminados', 'Query: Productos eliminados'],
                      ['Productos en venta', 'Query: Clientes eliminados'],
                      [
                        'Distritos del departamento',
                        'Query: Distritos del departamento',
                        'Depto'
                      ],
                      [
                        'Información del cliente',
                        'Query: Información del cliente',
                        'Cliente'
                      ],
                      [
                        'Información del empleado',
                        'Query: Información del empleado',
                        'Empleado'
                      ]
                    ].map(([label, value, shortcut]) => (
                      <DropdownMenuItem
                        className="flex gap-2 justify-between"
                        key={value}
                        onClick={() => setInput(value)}
                      >
                        {label}
                        <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Documentación</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {[
                      ['Pasos para iniciar sesión', 'Docs: Iniciar Sesión'],
                      ['Pasos para registrarse', 'Docs: Realizar Registro'],
                      [
                        'Pasos para agregar un producto',
                        'Docs: Agregar un Producto'
                      ],
                      [
                        'Pasos para actualizar un producto',
                        'Docs: Actualizar un Producto'
                      ],
                      [
                        'Pasos para eliminar un producto',
                        'Docs: Eliminar un Producto'
                      ],
                      [
                        'Pasos para agregar un cliente',
                        'Docs: Agregar un Cliente'
                      ],
                      [
                        'Pasos para agregar un empleado',
                        'Docs: Agregar un Empleado'
                      ],
                      [
                        'Pasos para agregar una orden',
                        'Docs: Agregar una Orden'
                      ]
                    ].map(([label, value]) => (
                      <DropdownMenuItem
                        key={value}
                        onClick={() => setInput(value)}
                      >
                        {label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </form>
    </div>
  )
}
