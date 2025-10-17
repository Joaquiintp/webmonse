'use client'

import { useEffect, useState } from 'react'

export default function MonserratensesPorElMundoPage() {
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
          backgroundImage: 'url(/images/monserratenses-por-el-mundo-2.jpg)',
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
            Monserratenses por el mundo
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#faf8f3' }}>
        <div className="max-w-5xl mx-auto">
          
          {/* Contenido placeholder - aquí irá el contenido específico */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <p 
              className="text-lg md:text-xl leading-relaxed text-center"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                color: '#625352',
                lineHeight: '1.8'
              }}
            >
              Contenido en desarrollo...
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
