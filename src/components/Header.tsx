'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { href: '/', label: 'Inicio' },
    { href: '/comision-directiva', label: 'Comisión Directiva' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/mision-vision-valores', label: 'Misión, visión, valores' },
    { href: '/monserratenses-por-el-mundo', label: 'Monserratenses por el mundo' },
    { href: '/noticias', label: 'Noticias' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/tienda', label: '🧙 Tienda del Duende' },
  ]

  return (
    <header className="et-l et-l--header bg-white shadow-md relative z-50">
      <div className="flex items-center justify-between px-4" style={{ width: '90%', maxWidth: '1920px', margin: '0 auto', minHeight: '120px', padding: '15px 0' }}>
            {/* Logo - 1/4 width */}
            <div className="et_pb_column et_pb_column_1_4" style={{ width: '20.875%', marginRight: '5.5%' }}>
              <div className="et_pb_module et_pb_image">
                <Link href="/">
                  <span className="et_pb_image_wrap block">
                    <Image 
                      src="/images/logo-asociacion-civil-duarte-y-quiros-1.svg"
                      alt="Asociación Civil Duarte y Quirós"
                      width={355}
                      height={164}
                      className="w-full h-auto"
                      style={{ maxWidth: '70%', maxHeight: '150px' }}
                      priority
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* Desktop Menu - 3/4 width */}
            <div className="et_pb_column et_pb_column_3_4 hidden lg:block" style={{ width: '74.25%' }}>
              <nav className="et_pb_menu text-right">
                <ul className="et-menu nav inline-flex justify-end items-center gap-x-6" style={{ maxWidth: '100%', flexWrap: 'wrap', maxHeight: '60px', overflow: 'hidden' }}>
                  {menuItems.map((item) => (
                    <li key={item.href} className="inline-block">
                      <Link 
                        href={item.href}
                        className="block text-sm text-gray-600 hover:opacity-70 transition-all duration-400 whitespace-nowrap"
                        style={{ 
                          fontFamily: 'Barlow, Helvetica, Arial, sans-serif',
                          fontSize: '15px',
                          textTransform: 'uppercase',
                          color: 'rgba(0,0,0,0.6)',
                          lineHeight: '1.8'
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#5e1415]"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
      </div>
    </header>
  )
}
