import Image from 'next/image'
import Link from 'next/link'
import { getNoticias, getNoticiaImageUrl, getNoticiaExcerpt } from '@/lib/strapi-news'

export default async function NewsSection() {
  const news = await getNoticias(6)

  // Filtrar noticias que tengan los datos mínimos necesarios
  const validNews = news.filter(noticia => 
    noticia.titulo && 
    noticia.parrafo1 && 
    (noticia.slug || noticia.documentId)
  )

  if (!validNews || validNews.length === 0) {
    return (
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Noticias</h2>
          <p className="text-center text-gray-600">No hay noticias disponibles.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Noticias</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {validNews.map((noticia) => {
            const slug = noticia.slug || noticia.documentId
            const imageUrl = getNoticiaImageUrl(noticia)
            const excerpt = getNoticiaExcerpt(noticia.parrafo1)
            
            return (
              <Link 
                key={noticia.documentId}
                href={`/noticias/${slug}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={noticia.titulo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {noticia.titulo}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {excerpt}
                  </p>
                  <time className="text-sm text-gray-500">
                    {new Date(noticia.publishedAt).toLocaleDateString('es-AR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/noticias"
            className="inline-block bg-[#ebe4d3] text-[#625352] px-8 py-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-[#625352] hover:text-[#ebe4d3] transition-all duration-300"
            style={{ fontFamily: 'Oswald, sans-serif', fontSize: '14px', letterSpacing: '2px' }}
          >
            Ver todas las noticias
          </Link>
        </div>
      </div>
    </section>
  )
}
