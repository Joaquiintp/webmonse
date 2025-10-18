import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SocialFloat from '@/components/SocialFloat'
import { CartProvider } from '@/contexts/CartContext'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MONSERRATENSES | Asociación Civil',
  description: 'Asociación Civil Monserratenses - Unidos por el Monse',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={openSans.className}>
        <CartProvider>
          <SocialFloat />
          <div id="page-container">
            <Header />
            <main id="et-main-area">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
