// Función para obtener noticias desde Strapi
export async function getNoticias(limit?: number) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const url = limit 
      ? `${strapiUrl}/api/noticias?populate=*&sort=publishedAt:desc&pagination[limit]=${limit}`
      : `${strapiUrl}/api/noticias?populate=*&sort=publishedAt:desc`;
      
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      next: { revalidate: 60 }, // Revalidar cada 60 segundos
    });

    if (!response.ok) {
      console.error('Error fetching noticias:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error loading noticias from Strapi:', error);
    return [];
  }
}

// Función para obtener una noticia por slug
export async function getNoticiaBySlug(slug: string) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const response = await fetch(
      `${strapiUrl}/api/noticias?filters[Slug][$eq]=${slug}&populate=*`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error('Error fetching noticia:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Error loading noticia from Strapi:', error);
    return null;
  }
}
