import { ConfigProvider as AntdProvider } from 'antd'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import theme from '@/themes/themeConfig'

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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <AntdProvider theme={theme}>
          <AntdRegistry>
            <ContentLayout>{children}</ContentLayout>
          </AntdRegistry>
        </AntdProvider>
      </body>
    </html>
  )
}
