"use client";
import { useChat } from "ai/react";
import { useHotkeys } from "react-hotkeys-hook";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { useProfileStore } from "@/store/profile";
import { Pyramid, SendHorizonal, User, Terminal } from "lucide-react";
import ReactMarkdown from "react-markdown";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Chat() {
  const [active, setActive] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat();
  const thumbnail = useProfileStore((state) => state.thumbnail);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex flex-col min-w-4xl bg-background text-foreground h-[85vh]">
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
            className={`flex items-start ${
              message.role === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            {message.role === "assistant" ? (
              <div className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                <Pyramid className="h-5 w-5 transition-all group-hover:scale-110" />
              </div>
            ) : null}
            <div
              className={`ml-2 max-w-[70%] ${
                message.role !== "assistant" ? "text-right" : ""
              }`}
            >
              <h5
                className={`text-sm font-semibold leading-snug pb-1 ${
                  message.role === "assistant"
                    ? "text-card-foreground"
                    : "text-card-foreground"
                }`}
              >
                {message.role === "assistant" ? "Atlas" : "You"}
              </h5>
              <div
                className={`px-3.5 py-2 rounded justify-start items-center gap-3 inline-flex ${
                  message.role === "assistant"
                    ? "bg-card text-primary"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <h5 className="text-sm font-normal leading-snug">
                  {message.content}
                </h5>
              </div>
              <h6 className="text-muted-foreground/70 text-xs font-normal leading-4 py-1 mt-1">
                {message.createdAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h6>
            </div>
            {message.role !== "assistant" &&
              (thumbnail ? (
                <img
                  className="group flex ml-2 h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  src={thumbnail}
                ></img>
              ) : (
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
            <DropdownMenuContent className="w-auto">
              <DropdownMenuLabel>Selecciona la consulta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setInput("Query: Detalles de usuarios ")}
                >
                  Detalles de usuarios
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setInput("Query: Detalles de producto ")}
                >
                  Detalles de producto
                  <DropdownMenuShortcut>Nombre</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setInput("Query: Stock en producto ")}
                >
                  Stock en producto
                  <DropdownMenuShortcut>Nombre</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setInput("Docs: Pasos para Iniciar Sesión")}
                >
                  Pasos para iniciar sesión
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setInput("Docs: Pasos para Agregar un Producto")
                  }
                >
                  Pasos para agregar un producto
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setInput("Docs: Pasos para Actualizar un Producto")
                  }
                >
                  Pasos para actualizar un producto
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </form>
    </div>
  );
}
