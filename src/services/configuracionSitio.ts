const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export interface ConfiguracionSitio {
  id: number
  documentId: string
  favicon?: {
    url: string
    name: string
    alternativeText?: string
  }
  titulo?: string
  descripcion?: string
}

export async function getConfiguracionSitio(): Promise<ConfiguracionSitio | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/configuracion-sitio?populate=favicon`,
      {
        cache: 'no-store', // Siempre traer la configuración más reciente
      }
    )

    if (!response.ok) {
      console.error('Error fetching site config:', response.statusText)
      return null
    }

    const data = await response.json()
    
    if (!data.data) {
      return null
    }

    const configData = data.data
    
    return {
      id: configData.id,
      documentId: configData.documentId,
      favicon: configData.favicon ? {
        url: configData.favicon.url,
        name: configData.favicon.name,
        alternativeText: configData.favicon.alternativeText || 'Favicon'
      } : undefined,
      titulo: configData.titulo || configData.Titulo,
      descripcion: configData.descripcion || configData.Descripcion
    }
  } catch (error) {
    console.error('Error in getConfiguracionSitio:', error)
    return null
  }
}
