"use client";

export const ServicesMarquee = () => {
  const services = [
    "HIGHWAY CONSTRUCTION",
    "STREET DEVELOPMENT",
    "INFRASTRUCTURE",
    "BRIDGE CONSTRUCTION",
    "ROAD MAINTENANCE",
  ];

  const serviceItems = [...services, ...services].map((service, index) => (
    <span
      key={index}
      className="font-display text-4xl md:text-6xl lg:text-8xl tracking-[0.1em] text-foreground/10 whitespace-nowrap"
    >
      {service}
    </span>
  ));

  return (
    <section className="relative py-24 overflow-hidden bg-secondary">
      {/* Marquee Container — pure CSS, zero main-thread cost */}
      <div className="relative flex overflow-hidden">
        <div
          className="flex shrink-0 gap-16 will-change-transform"
          style={{ animation: 'marquee 20s linear infinite' }}
        >
          {serviceItems}
        </div>
        <div
          className="flex shrink-0 gap-16 will-change-transform"
          style={{ animation: 'marquee 20s linear infinite' }}
        >
          {serviceItems}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span
            className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-4"
          >
            What We Do
          </span>
          <p
            className="font-display text-3xl md:text-4xl tracking-[0.2em]"
          >
            OUR <span className="text-gradient">EXPERTISE</span>
          </p>
        </div>
      </div>
    </section>
  );
};
