'use client'

import { useEffect, useState } from 'react'

export default function TiendaPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation when component mounts
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <>
      {/* Banner Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/techo-monserrat.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        {/* Dark overlay for dramatic effect */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Content with animation */}
        <div 
          className={`relative z-10 text-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Título principal */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white px-6"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '3px 3px 12px rgba(0,0,0,0.8)',
              lineHeight: '1.2'
            }}
          >
            🧙 Tienda del Duende
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#faf8f3' }}>
        <div className="max-w-6xl mx-auto">
          
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-center"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                color: '#5e1415'
              }}
            >
              🧙 Tienda del Duende
            </h2>
            <p 
              className="text-lg md:text-xl leading-relaxed text-center"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                color: '#625352',
                lineHeight: '1.8'
              }}
            >
              Próximamente podrás adquirir productos oficiales y merchandising del Colegio Nacional de Monserrat.
            </p>
          </div>

          {/* Productos Preview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Producto 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#5e1415] to-[#7a1a1c] h-48 flex items-center justify-center">
                <svg className="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'Lora, Georgia, serif', color: '#5e1415' }}
                >
                  Indumentaria
                </h3>
                <p 
                  className="text-sm mb-4"
                  style={{ fontFamily: 'Lora, Georgia, serif', color: '#625352' }}
                >
                  Remeras, buzos y más con el emblema del colegio.
                </p>
                <span 
                  className="inline-block bg-[#faf8f3] text-[#5e1415] px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                >
                  PRÓXIMAMENTE
                </span>
              </div>
            </div>

            {/* Producto 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#5e1415] to-[#7a1a1c] h-48 flex items-center justify-center">
                <svg className="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'Lora, Georgia, serif', color: '#5e1415' }}
                >
                  Publicaciones
                </h3>
                <p 
                  className="text-sm mb-4"
                  style={{ fontFamily: 'Lora, Georgia, serif', color: '#625352' }}
                >
                  Libros y revistas sobre la historia del Monserrat.
                </p>
                <span 
                  className="inline-block bg-[#faf8f3] text-[#5e1415] px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                >
                  PRÓXIMAMENTE
                </span>
              </div>
            </div>

            {/* Producto 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#5e1415] to-[#7a1a1c] h-48 flex items-center justify-center">
                <svg className="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'Lora, Georgia, serif', color: '#5e1415' }}
                >
                  Recuerdos
                </h3>
                <p 
                  className="text-sm mb-4"
                  style={{ fontFamily: 'Lora, Georgia, serif', color: '#625352' }}
                >
                  Tazas, llaveros y artículos conmemorativos.
                </p>
                <span 
                  className="inline-block bg-[#faf8f3] text-[#5e1415] px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                >
                  PRÓXIMAMENTE
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 inline-block">
              <p 
                className="text-lg md:text-xl mb-4"
                style={{ 
                  fontFamily: 'Lora, Georgia, serif',
                  color: '#625352',
                  lineHeight: '1.8'
                }}
              >
                ¿Interesado en algún producto? Contáctanos para más información.
              </p>
              <a
                href="/contacto"
                className="inline-block bg-[#5e1415] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#7a1a1c] transition-all duration-300"
                style={{ fontFamily: 'Barlow, sans-serif' }}
              >
                Contactar
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
