import { getNoticias } from '@/lib/strapi-news'
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

export default async function NoticiasPage() {
  const news = await getNoticias() // Obtener todas las noticias

  return (
    <>
      {/* Banner Section */}
      <section
        className="relative min-h-[45vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/fuente-patio-menor-monserrat.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        {/* Dark overlay for dramatic effect */}
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
        
        {/* Title */}
        <div className="relative z-10 text-center">
          <h1 
            className="text-5xl md:text-7xl font-bold text-white"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '3px 3px 10px rgba(0,0,0,0.8)'
            }}
          >
            Noticias
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {!news || news.length === 0 ? (
            <p className="text-center text-gray-600">No hay noticias disponibles</p>
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
                    href={`/noticias/${item.slug || item.documentId}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={item.titulo}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-[#5e1415] group-hover:text-[#7a1a1c] transition-colors">
                          {item.titulo}
                        </h3>
                        <p className="text-gray-600 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                          {getExcerpt((item as any).parrafo ?? (item as any).Parrafo2 ?? "")}
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
