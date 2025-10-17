export default function Hero() {
  return (
    <section
      className="relative min-h-screen"
      style={{
        backgroundImage: 'url(/images/torre-monserrat.jpg)',
        backgroundSize: '120%',
        backgroundPosition: '50% center',
      }}
    >
      <div className="relative z-10 w-full min-h-screen">
        <div className="absolute max-w-xl" style={{ right: '110px', top: '15%' }}>
          <div style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Lora, Georgia, serif', color: '#ffffff' }}>
              Vos también <br />podés ser parte
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white" style={{ fontFamily: 'Lora, Georgia, serif', color: '#ffffff', lineHeight: '1.8' }}>
              Si en el pasado el Monse nos unió hoy la Asociación nos convoca para reencontrarnos y comenzar a construir juntos.
            </p>
            <a
              className="et_pb_button et_pb_button_0"
              href="https://docs.google.com/forms/d/e/1FAIpQLScWcriNJQKvQON40YrnZlr3qpcoRb3WooJwWInKyDtM2ktGvA/viewform?usp=header"
              target="_blank"
              style={{
                borderRadius: '100px',
                fontFamily: 'Oswald, Helvetica, Arial, Lucida, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                display: 'inline-block',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              Asociáte vos también
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
