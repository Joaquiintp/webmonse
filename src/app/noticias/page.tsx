'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PageBanner from '@/components/PageBanner'

interface Noticia {
  id: number
  documentId: string
  Titulo?: string
  titulo?: string
  Slug?: string | null
  slug?: string | null
  parrafo?: string
  Parrafo2?: string
  URL?: string
  foto?: {
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
  const [news, setNews] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch news from Strapi con fallback
    const fetchNews = async () => {
      try {
        // URLs a intentar en orden
        const urls = [
          process.env.NEXT_PUBLIC_STRAPI_URL, // Variable de entorno (prioritaria)
          'http://168.231.99.125:1337', // VPS en producción
        ].filter(Boolean)
        
        let data = null
        let lastError = null
        
        // Intentar cada URL hasta que una funcione
        for (const STRAPI_URL of urls) {
          try {
            const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
            
            // Agregar timestamp para evitar cache del navegador
            const timestamp = new Date().getTime()
            
            const response = await fetch(
              `${STRAPI_URL}/api/noticias?populate=*&sort=publishedAt:desc&_=${timestamp}`,
              {
                headers: {
                  'Authorization': `Bearer ${STRAPI_TOKEN}`
                },
                cache: 'no-store'
              }
            )
            
            if (response.ok) {
              data = await response.json()
              console.log(`✅ Noticias cargadas desde: ${STRAPI_URL}`)
              console.log(`📰 Total de noticias: ${data.data?.length || 0}`)
              console.log('🔍 Títulos:', data.data?.map((n: any) => n.Titulo || n.titulo).slice(0, 5))
              
              // Guardar la URL que funcionó para usarla en las imágenes
              if (typeof window !== 'undefined') {
                (window as any).__STRAPI_URL__ = STRAPI_URL
              }
              break
            } else {
              console.warn(`⚠️ Error ${response.status} desde ${STRAPI_URL}`)
            }
          } catch (error) {
            lastError = error
            continue
          }
        }
        
        if (data) {
          setNews(data.data || [])
        } else {
          console.error('No se pudieron cargar las noticias desde ninguna fuente:', lastError)
        }
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
      <PageBanner 
        title="Noticias"
        backgroundImage="/images/fuente-patio-menor-monserrat.jpg"
        desktopPosition="center 30%"
        mobilePosition="center 25%"
        overlay={0.2}
      />

      {/* Content Section - You can add news grid here */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {loading ? (
            <p className="text-center text-gray-600">Cargando noticias...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => {
                // Usar la URL que funcionó, o la del env como fallback
                const STRAPI_URL = (typeof window !== 'undefined' && (window as any).__STRAPI_URL__) 
                  || process.env.NEXT_PUBLIC_STRAPI_URL 
                  || 'https://strapi.monserratenses.org.ar'
                
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
