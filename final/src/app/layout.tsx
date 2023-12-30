import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import HeadBar from '../components/HeadBar'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'makeNTU機台租借網站',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeadBar />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
