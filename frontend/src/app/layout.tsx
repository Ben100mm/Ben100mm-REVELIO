import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NeoNavigation from '@/components/layout/NeoNavigation'
import NeoFooter from '@/components/layout/NeoFooter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Revelio - Creator Marketplace',
  description: 'A creator-powered marketplace where writers, artists, and storytellers get paid for impact',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <NeoNavigation />
          <main className="flex-1">
            {children}
          </main>
          <NeoFooter />
        </div>
      </body>
    </html>
  )
}
