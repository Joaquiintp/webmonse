import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'
import SocialFloat from '@/components/SocialFloat'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MONSERRATENSES | Asociación Civil',
  description: 'Asociación Civil Monserratenses - Unidos por el Monse',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={openSans.className}>
        <MobileMenu />
        <SocialFloat />
        <div id="page-container">
          <Header />
          <main id="et-main-area">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
