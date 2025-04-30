import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Autovuln',
  description: 'Security Testing and Vulnerability Analysis Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

          <html lang="en" className="h-full dark" suppressHydrationWarning>
            <body className={`${inter.className} h-full`}>
              <div className="h-full">
                {children}
              </div>
              
            </body>
            </html>
  )
}