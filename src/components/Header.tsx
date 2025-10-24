'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Menu items para MOBILE (Red LibeR al final)
  const mobileMenuItems = [
    { href: '/', label: 'Inicio' },
    { href: '/comision-directiva', label: 'Comisión Directiva' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/mision-vision-valores', label: 'Misión, visión, valores' },
    { href: '/monserratenses-por-el-mundo', label: 'Monserratenses por el mundo' },
    { href: '/noticias', label: 'Noticias' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/tienda', label: 'Tienda del Duende' },
    { href: '/libered#tarjeta', label: 'Red LibeR Beneficios' },
  ]

  // Menu items para DESKTOP (Servicios y Comisión intercambiados, sin emoji)
  const desktopMenuItems = [
    { href: '/', label: 'Inicio' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/mision-vision-valores', label: 'Misión, visión, valores' },
    { href: '/monserratenses-por-el-mundo', label: 'Monserratenses por el mundo' },
    { href: '/noticias', label: 'Noticias' },
    { href: '/comision-directiva', label: 'Comisión Directiva' },
    { href: '/carta-abierta-a-los-egresados', label: 'Carta Abierta a los Egresados' },
    { href: '/tienda', label: 'Tienda del Duende' },
  ]

  return (
    <header className="et-l et-l--header bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4" style={{ width: '90%', maxWidth: '1920px', margin: '0 auto', minHeight: '90px', padding: '10px 0' }}>
            {/* Logo Asociación */}
            <div className="et_pb_column flex items-start justify-start" style={{ width: '30%', marginRight: '2%' }}>
              <div className="et_pb_module et_pb_image flex-shrink-0">
                <Link href="/">
                  <span className="et_pb_image_wrap block">
                    <Image 
                      src="/images/logo-asociacion-civil-duarte-y-quiros-1.svg"
                      alt="Asociación Civil Duarte y Quirós"
                      width={355}
                      height={164}
                      className="h-auto"
                      style={{ height: '70px', width: 'auto' }}
                      priority
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* Logo LibeRed en el medio */}
            <div className="hidden lg:flex items-center justify-start" style={{ width: '18%', paddingLeft: '0', marginLeft: '-300px', marginTop: '6px' }}>
              <Link href="/libered#tarjeta" className="group">
                <Image
                  src="/images/redliber.svg"
                  alt="LibeRed"
                  width={250}
                  height={88}
                  className="w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  style={{ maxHeight: '80px' }}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="et_pb_column hidden lg:block" style={{ width: '53%' }}>
              <nav className="et_pb_menu text-right">
                <ul className="et-menu nav inline-flex justify-end items-center gap-x-3" style={{ maxWidth: '100%', flexWrap: 'wrap' }}>
                  {desktopMenuItems.map((item) => (
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
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg absolute w-full left-0 top-full">
          <nav className="px-4 py-4">
            <ul className="space-y-2">
              {mobileMenuItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    style={{ 
                      fontFamily: 'Barlow, Helvetica, Arial, sans-serif',
                      fontSize: '15px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.href === '/libered#tarjeta' ? (
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/redliber.svg"
                          alt="Red LibeR"
                          width={100}
                          height={35}
                          className="w-auto h-auto object-contain"
                          style={{ maxHeight: '35px' }}
                        />
                        <span>Tarjeta de beneficios</span>
                      </div>
                    ) : (
                      item.label
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
