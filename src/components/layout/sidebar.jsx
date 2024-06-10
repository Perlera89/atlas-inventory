'use client'
import { useHotkeys } from 'react-hotkeys-hook'
import { ModeToggle } from '@/components/ui/dark-toogle'
import NavBar from './nav'
import UserOptions from '../user/user-options'
import { BotMessageSquare } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '../ui/button'
import Chat from '../chat/chat'
import { useState } from 'react'

export default function SidebarLayout (isCollapsed) {
  const [openDialog, setOpenDialog] = useState(false)
  useHotkeys('alt+a', () => setOpenDialog(true))

  return (
    <aside className="inset-y-0 h-screen left-0 z-10 w-14 flex-col bg-background sm:flex">
      <NavBar />
      <nav className="fixed bottom-5 sm:static mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <ModeToggle />
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="rounded-full" size="icon">
              <BotMessageSquare />
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[40vw] min-h-[90vh]">
            <Chat />
          </DialogContent>
        </Dialog>
        <UserOptions />
      </nav>
    </aside>
  )
}
