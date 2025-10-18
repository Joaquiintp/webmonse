'use client';

import { Wine, Building2, ShoppingCart, Eye, ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  name: string;
  category: 'wine' | 'model' | 'other';
  price: number | null; // Permitir null para productos sin precio
  description: string;
  edition?: string;
  images: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Vino Monserrat - Blend',
    category: 'wine',
    price: 7500,
    description: 'Primera edición de nuestra colección exclusiva. Blend de tintas seleccionadas con carácter único.',
    edition: 'Primera Edición',
    images: ['/products/Blend.jpeg', '/products/Blend2.jpeg']
  },
  {
    id: 2,
    name: 'Vino Monserrat - Malbec',
    category: 'wine',
    price: 8500,
    description: 'Malbec premium de nuestra segunda edición, cosecha 2024. Crianza en barrica de roble francés.',
    edition: 'Segunda Edición',
    images: ['/products/Malbec.jpeg', '/products/Malbec2.jpeg']
  },
  {
    id: 3,
    name: 'Maqueta del Colegio Monserrat',
    category: 'model',
    price: 45000,
    description: 'Réplica detallada del histórico edificio del Colegio Monserrat. Pieza de colección única.',
    images: ['/products/Maqueta.png', '/products/Maqueta2.png']
  },
  {
    id: 4,
    name: 'LibeRed - Suscripción Mensual',
    category: 'other',
    price: 10000,
    description: 'Tarjeta de beneficios y descuentos exclusivos por 1 mes. Acceso a más de 50 comercios adheridos en Córdoba.',
    edition: '1 Mes',
    images: ['/products/LibeRed.svg', '/products/LibeRed2.svg']
  },
  {
    id: 5,
    name: 'LibeRed - Suscripción Anual',
    category: 'other',
    price: 100000,
    description: 'Tarjeta de beneficios y descuentos exclusivos por 1 año. ¡2 meses gratis! Acceso ilimitado a todos los beneficios de la Asociación.',
    edition: '1 Año - 2 Meses Gratis',
    images: ['/products/LibeRed.svg', '/products/LibeRed2.svg']
  },
];

function ProductCard({ product }: { product: Product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { addItem, setIsCartOpen } = useCart();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    // Solo permitir agregar al carrito si tiene precio
    if (product.price === null) {
      // Si no tiene precio, redirigir a WhatsApp
      const message = encodeURIComponent(`Hola! Me interesa consultar sobre: ${product.name}`);
      window.open(`https://wa.me/5493516367773?text=${message}`, '_blank');
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
    // Mostrar el carrito brevemente para confirmar
    setIsCartOpen(true);
  };

  const handleViewImage = () => {
    setIsGalleryOpen(true);
  };

  const isWine = product.category === 'wine';
  const isLibeRed = product.name.includes('LibeRed');
  const isAnnual = product.name.includes('Anual');

  return (
    <>
      <div className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${isAnnual ? 'ring-2 ring-red-500' : ''}`}>
        {isAnnual && (
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-center py-2 px-4 font-bold text-sm">
            🎉 ¡MEJOR OFERTA! 2 MESES GRATIS
          </div>
        )}
        <div 
          className={`relative h-80 ${isWine ? 'bg-gradient-to-br from-[#faf8f3] to-[#f5f2eb]' : isLibeRed ? 'bg-gradient-to-br from-red-50 to-red-100' : 'bg-gradient-to-br from-slate-100 to-slate-200'} flex items-center justify-center overflow-hidden cursor-pointer`}
          onClick={handleViewImage}
        >
          <Image
            src={product.images[currentImageIndex]}
            alt={`${product.name} - Vista ${currentImageIndex + 1}`}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        
          {product.edition && (
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-10">
              <span className="text-[#5e1415] font-semibold text-sm">{product.edition}</span>
            </div>
          )}

          {product.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={20} className="text-slate-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={20} className="text-slate-700" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Ver imagen ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h3>
          <p className="text-slate-600 mb-4 leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between">
            {product.price !== null ? (
              <span className="text-3xl font-bold text-[#5e1415]">
                ${product.price.toLocaleString('es-AR')}
              </span>
            ) : (
              <span className="text-xl font-bold text-[#5e1415] bg-[#faf8f3] px-4 py-2 rounded-lg">
                {product.category === 'wine' ? '¡Pedí el tuyo!' : 'Más información'}
              </span>
            )}
            <div className="flex gap-2">
              <button 
                onClick={handleViewImage}
                className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                title="Ver imágenes en grande"
              >
                <Eye size={20} className="text-slate-700" />
              </button>
              <button 
                onClick={handleAddToCart}
                className={`flex items-center gap-2 ${isLibeRed ? 'bg-red-600 hover:bg-red-700' : 'bg-[#5e1415] hover:bg-[#4a1011]'} text-white px-6 py-3 rounded-full transition-colors font-semibold`}
              >
                {product.price !== null ? (
                  <>
                    <ShoppingCart size={20} />
                    <span>{isLibeRed ? 'Suscribirme' : 'Agregar'}</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    <span>Consultar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ImageGalleryModal
        images={product.images}
        productName={product.name}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={currentImageIndex}
      />
    </>
  );
}

export default function ProductSection({ products: externalProducts }: { products?: Product[] }) {
  // Usar productos externos si se proveen, sino usar los hardcoded
  const productsToUse = externalProducts && externalProducts.length > 0 ? externalProducts : products;
  
  const wineProducts = productsToUse.filter(p => p.category === 'wine');
  const otherProducts = productsToUse.filter(p => p.category !== 'wine');

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Wine Collection Section */}
        <section id="vinos" className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-[#faf8f3] rounded-full mb-4">
              <Wine className="text-[#5e1415]" size={40} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Colección de Vinos
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Descubre nuestra colección exclusiva de vinos y productos que celebran nuestra tradición y hermandad
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {wineProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Other Products Section */}
        <section id="productos" className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-slate-200 rounded-full mb-4">
              <Building2 className="text-slate-700" size={40} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Otros Productos
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Artículos especiales que celebran la historia y tradición del Colegio Monserrat
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {otherProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Coming Soon Card */}
          <div className="mt-8 bg-gradient-to-r from-[#faf8f3] to-[#f5f2eb] rounded-2xl p-8 text-center border-2 border-dashed border-[#5e1415]/30">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Más productos próximamente</h3>
            <p className="text-slate-600">
              Estamos trabajando en nuevos artículos exclusivos para nuestra comunidad
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

