'use client'

import { useEffect, useState } from 'react'

interface Noticia {
  id: number
  documentId: string
  Titulo: string
  Slug: string
  parrafo: string
  Parrafo2?: string
  URL?: string
  foto?: {
    url: string
  }
  fotos?: Array<{
    url: string
    alternativeText?: string
  }>
  publishedAt: string
}

export default function NewsSection() {
  const [news, setNews] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
        const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
        
        if (!STRAPI_URL || !STRAPI_TOKEN) {
          throw new Error('Strapi URL o Token no configurados')
        }
        
        const response = await fetch(
          `${STRAPI_URL}/api/noticias?populate=*&sort=publishedAt:desc&pagination[limit]=6`,
          {
            headers: {
              Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
          }
        )
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log('Noticias recibidas:', data)
        // Now it's a Collection Type, so data.data is already an array
        setNews(data.data || [])
      } catch (error) {
        console.error('Error fetching news:', error)
        setError(error instanceof Error ? error.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Función para obtener el excerpt del contenido
  const getExcerpt = (content: string, maxLength: number = 150) => {
    const text = content.replace(/[#*_~`]/g, '').trim()
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  if (loading) {
    return (
      <section id="noticias" className="py-20 md:py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5e1415]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Noticias y novedades
            </h2>
          </div>
          <div className="text-center text-gray-600">Cargando noticias...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="noticias" className="py-20 md:py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5e1415]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Noticias y novedades
            </h2>
          </div>
          <div className="text-center text-red-600">Error al cargar noticias: {error}</div>
        </div>
      </section>
    )
  }

  return (
    <section id="noticias" className="py-20 md:py-32 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5e1415]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            Noticias y novedades
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => {
            // Determinar qué imagen mostrar: primera de fotos o foto principal
            const getPreviewImage = () => {
              if (item.fotos && item.fotos.length > 0) {
                return `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.fotos[0].url}`
              }
              if (item.foto?.url) {
                return `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.foto.url}`
              }
              return '/images/aniversario-335.jpg'
            }
            
            return (
              <article key={item.id} className="group">
                <a href={`/noticias/${item.Slug || item.documentId}`} className="block">
                  <div className="mb-4 overflow-hidden rounded-2xl">
                    <img
                      src={getPreviewImage()}
                      alt={item.Titulo}
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-[#5e1415] transition-colors" style={{ fontFamily: 'Barlow, sans-serif' }}>
                    {item.Titulo}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base line-clamp-3">
                    {getExcerpt(item.parrafo)}
                  </p>
                </a>
              </article>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="/noticias"
            className="inline-block bg-[#ebe4d3] text-[#625352] px-8 py-3 rounded-full font-semibold uppercase tracking-wider hover:bg-[#625352] hover:text-[#ebe4d3] transition-all duration-300"
            style={{ fontFamily: 'Oswald, sans-serif', fontSize: '16px', letterSpacing: '3px' }}
          >
            Ver más
          </a>
        </div>
      </div>
      
      {/* Divisor de ola */}
      <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          style={{ 
            width: '100%', 
            height: '100px',
            display: 'block'
          }}
        >
          <path 
            d="M0,10 C200,10 300,70 600,85 C900,100 1000,120 1200,120 L1200,120 L0,120 Z" 
            fill="#5e1415"
          />
        </svg>
      </div>
    </section>
  );
}
