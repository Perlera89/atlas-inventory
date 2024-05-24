import { ThemeProvider } from './provider'

import { Inter } from 'next/font/google'
import './globals.css'
import ContentLayout from '@/components/layout/content'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Atlas - Inventory',
  description: ''
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ContentLayout>{children}</ContentLayout>
          </ThemeProvider>
      </body>
    </html>
  )
}
