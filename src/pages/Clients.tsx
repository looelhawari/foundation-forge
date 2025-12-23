import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { MinimalFooter } from "@/components/layout/MinimalFooter";
import { MegaCTA } from "@/components/sections/MegaCTA";
import { ScrollProgress, MorphingBlob, TiltCard, AnimatedCounter } from "@/components/animations/MotionGraphics";
import heroImage from "@/assets/hero-construction.jpg";

const clients = [
  {
    name: "Ministry of Transport",
    description: "Government infrastructure development partner since 2005",
    projects: 25,
    category: "Government",
  },
  {
    name: "Saudi Aramco",
    description: "Oil & gas facility road infrastructure",
    projects: 18,
    category: "Energy",
  },
  {
    name: "SABIC",
    description: "Industrial zone development projects",
    projects: 12,
    category: "Industrial",
  },
  {
    name: "Riyadh Municipality",
    description: "Urban street and public works",
    projects: 35,
    category: "Municipal",
  },
  {
    name: "Arriyadh Development Authority",
    description: "Capital city infrastructure expansion",
    projects: 22,
    category: "Development",
  },
  {
    name: "NEOM",
    description: "Future city infrastructure development",
    projects: 8,
    category: "Mega Projects",
  },
  {
    name: "Royal Commission for Jubail",
    description: "Industrial city infrastructure",
    projects: 15,
    category: "Industrial",
  },
  {
    name: "STC",
    description: "Telecommunications infrastructure support",
    projects: 6,
    category: "Technology",
  },
];

const testimonials = [
  {
    id: 1,
    quote: "Al-Rashid Construction delivered exceptional quality on our highway expansion project. Their attention to detail and commitment to deadlines made them an invaluable partner.",
    author: "Eng. Abdullah Al-Fahad",
    position: "Project Director",
    company: "Ministry of Transport",
  },
  {
    id: 2,
    quote: "Working with Al-Rashid has been a pleasure. Their team expertise in infrastructure development is unmatched, and they consistently exceed our expectations.",
    author: "Dr. Fatima Hassan",
    position: "Chief Engineer",
    company: "Riyadh Development Authority",
  },
  {
    id: 3,
    quote: "The professionalism and quality of work from Al-Rashid Construction is remarkable. They completed our street renovation project ahead of schedule.",
    author: "Mohammed Al-Otaibi",
    position: "Operations Manager",
    company: "Saudi Aramco",
  },
];

const Clients = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.3]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const textY = useTransform(heroScroll, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <MinimalHeader />
      <main>
        {/* Cinematic Hero */}
        <section ref={heroRef} className="relative h-[120vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            <motion.div style={{ scale: heroScale }} className="absolute inset-0">
              <img
                src={heroImage}
                alt="Construction partnership"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
            </motion.div>

            <motion.div
              style={{ opacity: heroOpacity, y: textY }}
              className="relative z-10 h-full flex flex-col justify-center container mx-auto px-6"
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-8"
              >
                Our Partners
              </motion.span>

              <div className="overflow-hidden mb-4">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  className="font-display text-[10vw] md:text-[8vw] leading-[0.9] tracking-[0.02em]"
                >
                  TRUSTED
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                  className="font-display text-[10vw] md:text-[8vw] leading-[0.9] tracking-[0.02em] text-gradient"
                >
                  PARTNERSHIPS
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 text-xl text-muted-foreground max-w-xl"
              >
                We are proud to work with leading government entities and major
                corporations across Saudi Arabia and the region.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Stats Banner */}
        <StatsBanner />

        {/* Clients Grid */}
        <ClientsGrid />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Logo Marquee */}
        <LogoMarquee />
        <MegaCTA />
      </main>
      <MinimalFooter />
    </div>
  );
};

const StatsBanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.section
      ref={ref}
      style={{ scale, opacity }}
      className="py-24 bg-secondary relative overflow-hidden"
    >
      <MorphingBlob className="w-[400px] h-[400px] -top-48 -right-48" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 8, suffix: "+", label: "MAJOR CLIENTS" },
            { value: 141, suffix: "+", label: "TOTAL PROJECTS" },
            { value: 25, suffix: "+", label: "YEARS TRUSTED" },
            { value: 100, suffix: "%", label: "SATISFACTION" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl text-foreground mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs tracking-[0.2em] text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const ClientsGrid = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="py-32 md:py-48 relative overflow-hidden">
      <MorphingBlob className="w-[500px] h-[500px] bottom-0 -left-48" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            Who We Work With
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
            >
              OUR <span className="text-gradient">CLIENTS</span>
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TiltCard className="h-full">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-gradient-card border border-border rounded-xl p-6 h-full group hover:border-primary/50 transition-all duration-500"
                >
                  {/* Category badge */}
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="text-[10px] tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-full"
                  >
                    {client.category}
                  </motion.span>

                  {/* Logo placeholder */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center my-6 group-hover:bg-primary/20 transition-colors"
                  >
                    <span className="font-display text-2xl text-primary">
                      {client.name.charAt(0)}
                    </span>
                  </motion.div>

                  <h3 className="font-display text-lg tracking-wide mb-2 group-hover:text-primary transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {client.description}
                  </p>

                  {/* Projects count */}
                  <div className="pt-4 border-t border-border">
                    <span className="font-display text-2xl text-primary">{client.projects}</span>
                    <span className="text-xs text-muted-foreground ml-2">projects completed</span>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section ref={ref} className="py-32 md:py-48 bg-secondary relative overflow-hidden">
      {/* Animated quote marks */}
      <motion.div
        style={{ y, rotate }}
        className="absolute top-20 left-10 font-display text-[40vw] text-foreground/5 leading-none select-none pointer-events-none"
      >
        "
      </motion.div>

      <MorphingBlob className="w-[600px] h-[600px] top-1/2 right-0 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            What They Say
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
            >
              CLIENT <span className="text-gradient">VOICES</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Testimonial cards */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[350px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  scale: index === activeIndex ? 1 : 0.9,
                  y: index === activeIndex ? 0 : 30,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 ${index === activeIndex ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                <TiltCard className="h-full">
                  <div className="bg-gradient-card border border-border rounded-2xl p-8 md:p-12 h-full flex flex-col items-center text-center">
                    {/* Quote */}
                    <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-12 flex-1">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"
                      >
                        <span className="font-display text-2xl text-primary">
                          {testimonial.author.charAt(0)}
                        </span>
                      </motion.div>
                      <div className="font-display text-xl tracking-wide">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.position} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-4 mt-12">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? "bg-primary w-12"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LogoMarquee = () => {
  const logos = [
    "MINISTRY OF TRANSPORT",
    "SAUDI ARAMCO",
    "SABIC",
    "NEOM",
    "STC",
    "RIYADH MUNICIPALITY",
    "JUBAIL",
    "ADA",
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="flex animate-marquee">
          {[...logos, ...logos].map((logo, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
              className="font-display text-3xl md:text-4xl text-foreground/10 whitespace-nowrap mx-12 cursor-default transition-colors"
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Clients;
