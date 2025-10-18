// Función para obtener vinos desde Strapi
async function getVinos() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const token = process.env.STRAPI_PRODUCTS_API_TOKEN;

  try {
    const response = await fetch(`${strapiUrl}/api/vinos?populate=*`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      next: { revalidate: 60 }, // Revalidar cada 60 segundos
    });

    if (!response.ok) {
      console.error('Error fetching vinos:', response.statusText);
      return [];
    }

    const data = await response.json();
    
    return data.data.map((item: any) => {
      // Usar imágenes directamente de Strapi
      const images = item.fotoproducto?.map((img: any) => 
        `${strapiUrl}${img.url}`
      ) || [];

      return {
        id: `vino-${item.id}`,
        name: item.titulo,
        category: 'wine' as const,
        price: item.precio || null,
        description: item.descripcion,
        edition: undefined,
        images: images.length > 0 ? images : ['/images/placeholder-product.jpg'],
      };
    });
  } catch (error) {
    console.error('Error loading vinos from Strapi:', error);
    return [];
  }
}

// Función para obtener productos (maquetas y otros) desde Strapi
async function getOtrosProductos() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const token = process.env.STRAPI_OTROS_PRODUCTOS_API_TOKEN;

  try {
    const response = await fetch(`${strapiUrl}/api/productos?populate=*`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      next: { revalidate: 60 }, // Revalidar cada 60 segundos
    });

    if (!response.ok) {
      console.error('Error fetching productos:', response.statusText);
      return [];
    }

    const data = await response.json();
    
    return data.data.map((item: any) => {
      // Usar imágenes directamente de Strapi
      const images = item.fotoproduct?.map((img: any) => 
        `${strapiUrl}${img.url}`
      ) || [];

      return {
        id: `producto-${item.id}`,
        name: item.titulo,
        category: 'model' as const, // Por defecto maquetas, luego se puede agregar campo en Strapi
        price: item.precio || null,
        description: item.descripcion,
        edition: undefined,
        images: images.length > 0 ? images : ['/images/placeholder-product.jpg'],
      };
    });
  } catch (error) {
    console.error('Error loading productos from Strapi:', error);
    return [];
  }
}

// Función para obtener todos los productos (vinos + productos)
export async function getProducts() {
  const [vinos, otrosProductos] = await Promise.all([
    getVinos(),
    getOtrosProductos()
  ]);

  return [...vinos, ...otrosProductos];
}
