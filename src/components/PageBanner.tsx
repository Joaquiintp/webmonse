'use client';

import { useEffect, useState } from 'react';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  desktopPosition?: string;
  mobilePosition?: string;
  overlay?: number; // opacity from 0 to 1
}

export default function PageBanner({ 
  title, 
  subtitle,
  backgroundImage, 
  desktopPosition = 'center center',
  mobilePosition = 'center 30%',
  overlay = 0.25
}: PageBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Trigger animation when component mounts
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: isMobile ? mobilePosition : desktopPosition,
  };

  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      style={backgroundStyle}
    >
      {/* Dark overlay for dramatic effect */}
      <div className="absolute inset-0 bg-black" style={{ opacity: overlay }}></div>
      
      {/* Content with animation */}
      <div 
        className={`relative z-10 text-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {subtitle && (
          <p 
            className="text-sm md:text-base font-semibold text-white mb-4 uppercase tracking-wider"
            style={{ 
              fontFamily: 'Barlow, sans-serif',
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
              letterSpacing: '3px'
            }}
          >
            {subtitle}
          </p>
        )}
        
        {/* Título principal */}
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white px-6"
          style={{ 
            fontFamily: 'Lora, Georgia, serif',
            textShadow: '3px 3px 12px rgba(0,0,0,0.8)',
            lineHeight: '1.2'
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
