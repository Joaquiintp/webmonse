'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const backgroundStyle = isMobile ? {
    backgroundImage: 'url(/images/torre-monserrat.jpg)',
    backgroundSize: 'auto 100%',
    backgroundPosition: '18% center',
    backgroundRepeat: 'no-repeat',
  } : {
    backgroundImage: 'url(/images/torre-monserrat.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <section
      className="relative min-h-screen"
      style={backgroundStyle}
    >
        <div className="relative z-10 w-full min-h-screen flex items-start pt-12 md:pt-40">
        <div className="w-full px-6 md:px-8">
          <div className="max-w-xl ml-auto mr-6 md:mr-[5%]">
            <div style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight md:leading-normal" style={{ fontFamily: 'Lora, Georgia, serif', color: '#ffffff' }}>
                Vos también <br />podés ser parte
              </h1>
              <p className="text-lg md:text-2xl mb-6 md:mb-8 text-white" style={{ fontFamily: 'Lora, Georgia, serif', color: '#ffffff', lineHeight: '1.6' }}>
                Si en el pasado el Monse nos unió hoy la Asociación nos convoca para reencontrarnos y comenzar a construir juntos.
              </p>
              <a
                className="et_pb_button et_pb_button_0 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base tracking-wider md:tracking-[3px]"
                href="https://docs.google.com/forms/d/e/1FAIpQLScWcriNJQKvQON40YrnZlr3qpcoRb3WooJwWInKyDtM2ktGvA/viewform?usp=header"
                target="_blank"
                style={{
                  borderRadius: '100px',
                  fontFamily: 'Oswald, Helvetica, Arial, Lucida, sans-serif',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  WebkitFontSmoothing: 'antialiased',
                }}
              >
                Asociáte vos también
              </a>
            </div>
          </div>
        </div>
        </div>
      </section>
  );
}
