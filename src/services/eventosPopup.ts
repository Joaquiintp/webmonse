const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export interface EventoPopup {
  id: number
  documentId: string
  titulo: string
  descripcion: string
  fecha: string
  link?: string
  activo: boolean
  imagen?: {
    url: string
    alternativeText?: string
  }
}

export async function getActiveEvent(): Promise<EventoPopup | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/eventos-popup?filters[activo][$eq]=true&populate=imagen&sort=fecha:desc`,
      {
        cache: 'no-store', // Siempre traer el evento más reciente
      }
    )

    if (!response.ok) {
      console.error('Error fetching active event:', response.statusText)
      return null
    }

    const data = await response.json()
    
    if (!data.data || data.data.length === 0) {
      return null
    }

    // Tomar el primer evento activo (más reciente por fecha)
    const eventoData = data.data[0]
    
    return {
      id: eventoData.id,
      documentId: eventoData.documentId,
      titulo: eventoData.titulo || eventoData.Titulo || '',
      descripcion: eventoData.descripcion || eventoData.Descripcion || '',
      fecha: eventoData.fecha || eventoData.Fecha || new Date().toISOString(),
      link: eventoData.link || eventoData.Link || undefined,
      activo: eventoData.activo !== undefined ? eventoData.activo : true,
      imagen: eventoData.imagen ? {
        url: eventoData.imagen.url,
        alternativeText: eventoData.imagen.alternativeText || eventoData.imagen.name
      } : undefined
    }
  } catch (error) {
    console.error('Error in getActiveEvent:', error)
    return null
  }
}
