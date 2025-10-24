'use client'

import PageBanner from '@/components/PageBanner'

export default function ComisionDirectivaPage() {
  return (
    <>
      <PageBanner 
        title="Comisión Directiva"
        subtitle="Quiénes conducen la Asociación"
        backgroundImage="/images/fuente-patio-menor-monserrat.jpg"
        desktopPosition="center 90%"
        mobilePosition="center 70%"
        overlay={0.2}
      />

      {/* Content Section */}
      <section className="py-20 md:py-32 bg-[#faf8f3]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-8">
            {/* Adrián Guillermo Rodríguez */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Adrián Guillermo Rodríguez
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Presidente
              </p>
            </div>

            {/* Jorge Alberto López */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Jorge Alberto López
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Secretario
              </p>
            </div>

            {/* Carla López Micieli */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Carla López Micieli
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Tesorera
              </p>
            </div>

            {/* Jorge Martín Giménez */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Jorge Martín Giménez
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Vocal Titular
              </p>
            </div>

            {/* Antonio Luis Rodríguez */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Antonio Luis Rodríguez
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Vocal Suplente
              </p>
            </div>

            {/* Marcelo Rafael González */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Marcelo Rafael González
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Revisor de Cuentas Titular
              </p>
            </div>

            {/* Diego Blázquez */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#5e1415] mb-2"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                Diego Blázquez
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600 uppercase tracking-wider"
                style={{ fontFamily: 'Barlow, sans-serif', letterSpacing: '2px' }}
              >
                Revisor de Cuentas Suplente
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
