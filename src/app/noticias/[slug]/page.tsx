'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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

export default function NoticiaDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [noticia, setNoticia] = useState<Noticia | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
        const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
        
        // Fetch all noticias and find the one matching the slug
        const response = await fetch(
          `${STRAPI_URL}/api/noticias?populate=*`,
          {
            headers: {
              'Authorization': `Bearer ${STRAPI_TOKEN}`
            }
          }
        )
        
        const data = await response.json()
        
        // Find the noticia that matches the slug or documentId
        const foundNoticia = data.data?.find((item: Noticia) => 
          item.Slug === slug || item.documentId === slug
        )
        
        if (foundNoticia) {
          setNoticia(foundNoticia)
        } else {
          setError(true)
        }
      } catch (error) {
        console.error('Error fetching noticia:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    
    fetchNoticia()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Cargando noticia...</p>
      </div>
    )
  }

  if (error || !noticia) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-[#5e1415] mb-4">Noticia no encontrada</h1>
        <Link href="/noticias" className="text-[#5e1415] hover:underline">
          ← Volver a Noticias
        </Link>
      </div>
    )
  }

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
  const imageUrl = noticia.foto?.url 
    ? `${STRAPI_URL}${noticia.foto.url}`
    : '/images/aniversario-335.jpg'
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-AR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Convertir URL de YouTube a embed
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null
    
    // Diferentes formatos de URL de YouTube
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`
    }
    
    return null
  }

  return (
    <>
      {/* Banner with image */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl}
          alt={noticia.Titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '3px 3px 10px rgba(0,0,0,0.8)'
            }}
          >
            {noticia.Titulo}
          </h1>
          <p className="text-white text-lg" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
            {formatDate(noticia.publishedAt)}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-[#faf8f3]">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <Link 
            href="/noticias" 
            className="inline-flex items-center text-[#5e1415] hover:text-[#7a1a1c] mb-8 transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Volver a Noticias
          </Link>

          {/* Article content */}
          <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Si NO hay Parrafo2: Video arriba (si hay URL) o Imagen arriba (si NO hay fotos galería ni URL) */}
            {!noticia.Parrafo2 && (
              <div className="mb-8">
                {noticia.URL && getYouTubeEmbedUrl(noticia.URL) ? (
                  // Video de YouTube (la foto será solo para portada)
                  <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={getYouTubeEmbedUrl(noticia.URL)!}
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  // Imagen principal solo si NO hay fotos en galería
                  (!noticia.fotos || noticia.fotos.length === 0) && noticia.foto && (
                    <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={noticia.Titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            )}

            {/* Primer párrafo */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              style={{ 
                fontFamily: 'Lora, Georgia, serif',
                lineHeight: '1.8',
                color: '#333'
              }}
            >
              {noticia.parrafo.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                )
              ))}
            </div>

            {/* Si hay Parrafo2: Video en el medio (si hay URL) o Imagen en el medio (si NO hay fotos galería ni URL) */}
            {noticia.Parrafo2 && (
              <>
                <div className="my-10">
                  {noticia.URL && getYouTubeEmbedUrl(noticia.URL) ? (
                    // Video de YouTube (la foto será solo para portada)
                    <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={getYouTubeEmbedUrl(noticia.URL)!}
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    // Imagen principal solo si NO hay fotos en galería
                    (!noticia.fotos || noticia.fotos.length === 0) && noticia.foto && (
                      <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={noticia.Titulo}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )
                  )}
                </div>

                {/* Segundo párrafo */}
                <div 
                  className="prose prose-lg max-w-none"
                  style={{ 
                    fontFamily: 'Lora, Georgia, serif',
                    lineHeight: '1.8',
                    color: '#333'
                  }}
                >
                  {noticia.Parrafo2.split('\n').map((paragraph: string, index: number) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-6">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              </>
            )}

            {/* Galería de fotos adicionales (fotos) */}
            {noticia.fotos && noticia.fotos.length > 0 && (
              <div className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {noticia.fotos.map((image: any, index: number) => (
                    <div key={index} className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                      <Image
                        src={`${STRAPI_URL}${image.url}`}
                        alt={image.alternativeText || `Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Back button bottom */}
          <div className="mt-12 text-center">
            <Link 
              href="/noticias" 
              className="inline-block bg-[#5e1415] text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wider hover:bg-[#7a1a1c] transition-colors"
            >
              ← Volver a Noticias
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
