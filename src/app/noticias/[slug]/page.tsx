import { notFound } from 'next/navigation'
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

// Pre-generar páginas estáticas para todas las noticias
export async function generateStaticParams() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/noticias?populate=*`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`
        },
        next: { revalidate: 3600 }
      }
    )
    
    if (!response.ok) return []
    
    const data = await response.json()
    
    return data.data.map((noticia: Noticia) => ({
      slug: noticia.documentId,
    }))
  } catch (error) {
    console.error('Error fetching noticias for static generation:', error)
    return []
  }
}

// Función para obtener noticia por slug
async function getNoticia(slug: string): Promise<Noticia | null> {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/noticias?populate=*`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`
        },
        next: { revalidate: 3600 }
      }
    )
    
    if (!response.ok) return null
    
    const data = await response.json()
    const noticia = data.data.find((n: Noticia) => n.documentId === slug || n.Slug === slug)
    
    return noticia || null
  } catch (error) {
    console.error('Error fetching noticia:', error)
    return null
  }
}

export default async function NoticiaDetailPage({ params }: { params: { slug: string } }) {
  const noticia = await getNoticia(params.slug)
  
  if (!noticia) {
    notFound()
  }
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
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
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`
    }
    
    return null
  }

  const videoEmbedUrl = noticia.URL ? getYouTubeEmbedUrl(noticia.URL) : null

  return (
    <article className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={noticia.foto?.alternativeText || noticia.Titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
        
        {/* Título superpuesto */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              {noticia.Titulo}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <time className="text-sm md:text-base">
                {formatDate(noticia.publishedAt)}
              </time>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        {/* Botón volver */}
        <Link 
          href="/noticias" 
          className="inline-flex items-center gap-2 text-[#5e1415] hover:text-[#7a1a1c] mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a Noticias
        </Link>

        {/* Párrafo principal */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl leading-relaxed text-gray-700 whitespace-pre-line">
            {noticia.parrafo}
          </p>
        </div>

        {/* Video de YouTube si existe */}
        {videoEmbedUrl && (
          <div className="my-12">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={videoEmbedUrl}
                title={noticia.Titulo}
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Galería de fotos adicionales */}
        {noticia.fotos && noticia.fotos.length > 0 && (
          <div className="my-12">
            <h2 className="text-3xl font-bold text-[#5e1415] mb-6">Galería</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {noticia.fotos.map((foto, index) => (
                <div key={index} className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={`${STRAPI_URL}${foto.url}`}
                    alt={foto.alternativeText || `Imagen ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Párrafo 2 si existe */}
        {noticia.Parrafo2 && (
          <div className="prose prose-lg max-w-none mt-12">
            <p className="text-xl leading-relaxed text-gray-700 whitespace-pre-line">
              {noticia.Parrafo2}
            </p>
          </div>
        )}

        {/* Navegación */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link 
            href="/noticias"
            className="inline-block bg-[#5e1415] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#7a1a1c] transition-all shadow-lg"
          >
            Ver todas las noticias
          </Link>
        </div>
      </div>
    </article>
  )
}
