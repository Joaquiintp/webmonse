import TiendaProductSection from '@/components/TiendaProductSection';
import CartDrawer from '@/components/CartDrawer';
import Image from 'next/image';
import { getProducts } from '@/lib/strapi-products';

export default async function TiendaPage() {
  // Obtener productos desde Strapi
  const productsFromStrapi = await getProducts();
  
  return (
    <>
      {/* Banner */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/segundo-piso-monserrat.jpg"
            alt="Tienda del Duende"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6 inline-block">
            <span className="text-6xl md:text-8xl">🧙</span>
          </div>
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '3px 3px 12px rgba(0,0,0,0.8)',
              lineHeight: '1.2'
            }}
          >
            La Tienda del Duende
          </h1>
          <p 
            className="text-xl md:text-2xl text-white mb-4"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)'
            }}
          >
            Asociación Civil de Ex Alumnos del Colegio Monserrat
          </p>
          <p 
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'Lora, Georgia, serif',
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              lineHeight: '1.6'
            }}
          >
            Con tu apoyo, ayudas a sostener los proyectos que tenemos para la comunidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#vinos" 
              className="bg-white text-[#5e1415] px-8 py-4 rounded-full font-semibold hover:bg-[#faf8f3] transition-all transform hover:scale-105 shadow-xl"
            >
              Ver Colección de Vinos
            </a>
            <a 
              href="#productos" 
              className="bg-white text-[#5e1415] px-8 py-4 rounded-full font-semibold hover:bg-[#faf8f3] transition-all transform hover:scale-105 shadow-xl"
            >
              Explorar Productos
            </a>
          </div>
        </div>

        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)"/>
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <TiendaProductSection products={productsFromStrapi} />

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
