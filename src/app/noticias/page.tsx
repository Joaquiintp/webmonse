'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Noticia {
  id: number
  documentId: string
  Titulo: string
  Slug: string | null
  parrafo: string
  Parrafo2?: string
  URL?: string
  foto: {
    url: string
    alternativeText?: string
  }
  fotos?: Array<{
    url: string
    alternativeText?: string
  }>
  publishedAt: string
}

export default function NoticiasPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [news, setNews] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Trigger animation when component mounts
    setTimeout(() => setIsVisible(true), 100)
    
    // Fetch news from Strapi
    const fetchNews = async () => {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
        const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
        
        const response = await fetch(
          `${STRAPI_URL}/api/noticias?populate=*&sort=publishedAt:desc`,
          {
            headers: {
              'Authorization': `Bearer ${STRAPI_TOKEN}`
            }
          }
        )
        
        const data = await response.json()
        
        // Now it's a Collection Type, so data.data is already an array
        setNews(data.data || [])
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchNews()
  }, [])

  return (
    <>
      {/* Banner Section */}
      <section
        className="relative min-h-[45vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/fuente-patio-menor-monserrat.jpg)',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 30%',
        }}
      >
        {/* Dark overlay for dramatic effect */}
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
        
        {/* Title with animation */}
        <div 
          className={`relative z-10 text-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 
            className="text-6xl md:text-7xl font-bold text-white"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '3px 3px 10px rgba(0,0,0,0.8)'
            }}
          >
            Noticias
          </h1>
        </div>
      </section>

      {/* Content Section - You can add news grid here */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {loading ? (
            <p className="text-center text-gray-600">Cargando noticias...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => {
                const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
                
                // Determinar qué imagen mostrar: primera de fotos o foto principal
                const getPreviewImage = () => {
                  if (item.fotos && item.fotos.length > 0) {
                    return `${STRAPI_URL}${item.fotos[0].url}`
                  }
                  if (item.foto?.url) {
                    return `${STRAPI_URL}${item.foto.url}`
                  }
                  return '/images/aniversario-335.jpg'
                }
                
                const imageUrl = getPreviewImage()
                
                // Get excerpt from parrafo
                const getExcerpt = (text: string) => {
                  if (!text) return ''
                  const cleanText = text.replace(/[#*_~`]/g, '').substring(0, 150)
                  return cleanText + (text.length > 150 ? '...' : '')
                }
                
                return (
                  <Link 
                    key={item.id} 
                    href={`/noticias/${item.Slug || item.documentId}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={item.Titulo}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-[#5e1415] group-hover:text-[#7a1a1c] transition-colors">
                          {item.Titulo}
                        </h3>
                        <p className="text-gray-600 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                          {getExcerpt(item.parrafo)}
                        </p>
                        <span className="text-[#5e1415] font-semibold uppercase text-sm tracking-wider">
                          Leer más →
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
