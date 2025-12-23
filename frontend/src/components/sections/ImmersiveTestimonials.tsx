import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MorphingBlob, TiltCard } from "../animations/MotionGraphics";
import moelogo from "@/assets/MOE-removebg-preview.png";
import fifaLogo from "@/assets/FIFA-removebg-preview.png";
import museumLogo from "@/assets/museum-removebg-preview.png";
import dhlLogo from "@/assets/DHL-removebg-preview.png";
import meeraLogo from "@/assets/meera-removebg-preview.png";
import arianeLogo from "@/assets/Ariane real state.png";
import ashghaalLogo from "@/assets/ashghaal.png";
import fbaLogo from "@/assets/FBA real estate.png";
import imalcoLogo from "@/assets/imalco.png";
import qnieLogo from "@/assets/qnie.png";

const testimonials = [
  {
    id: 1,
    quote: "CPC Qatar delivered exceptional quality on our school parking infrastructure project. Their attention to detail and commitment to timely completion made them an invaluable partner for our educational facilities development.",
    author: "Project Management Team",
    position: "Infrastructure Division",
    company: "Ministry of Education",
    logo: moelogo,
    rating: 5,
  },
  {
    id: 2,
    quote: "Working with Cosmo Projects has been outstanding. Their expertise in road construction and asphalt works is unmatched. They successfully completed our museum access roads project with excellent workmanship and professionalism.",
    author: "Development Department",
    position: "Project Coordinators",
    company: "Qatar Museums",
    logo: museumLogo,
    rating: 5,
  },
  {
    id: 3,
    quote: "The professionalism and quality of work from CPC Qatar is remarkable. They completed our FIFA World Cup parking infrastructure ahead of schedule, demonstrating their capability to handle large-scale projects.",
    author: "Infrastructure Team",
    position: "Operations Division",
    company: "FIFA World Cup Qatar 2022",
    logo: fifaLogo,
    rating: 5,
  },
];

const clients = [
  { name: "MINISTRY OF EDUCATION", logo: moelogo },
  { name: "QATAR MUSEUMS", logo: museumLogo },
  { name: "FIFA WORLD CUP QATAR 2022", logo: fifaLogo },
  { name: "DHL QATAR", logo: dhlLogo },
  { name: "AL MEERA", logo: meeraLogo },
  { name: "ARIANE REAL ESTATE", logo: arianeLogo },
  { name: "ASHGHAAL", logo: ashghaalLogo },
  { name: "FBA REAL ESTATE", logo: fbaLogo },
  { name: "IMALCO", logo: imalcoLogo },
  { name: "QNIE", logo: qnieLogo },
];

export const ImmersiveTestimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* Background elements */}
      <MorphingBlob className="w-[600px] h-[600px] -top-48 -right-48" />
      <MorphingBlob className="w-[400px] h-[400px] bottom-0 -left-48" />

      {/* Animated quote marks */}
      <motion.div
        style={{ y, rotate }}
        className="absolute top-32 left-12 font-display text-[30vw] text-foreground/5 leading-none select-none pointer-events-none"
      >
        "
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
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
              CLIENT <span className="text-gradient">TESTIMONIALS</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="max-w-5xl mx-auto">
          <div className="relative min-h-[400px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  scale: index === activeIndex ? 1 : 0.9,
                  rotateX: index === activeIndex ? 0 : 10,
                  y: index === activeIndex ? 0 : 30,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 ${index === activeIndex ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                <TiltCard className="h-full">
                  <div className="bg-gradient-card border border-border rounded-2xl p-8 md:p-12 h-full flex flex-col">
                    {/* Rating */}
                    <div className="flex gap-1 mb-8">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <motion.svg
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="w-5 h-5 text-primary fill-primary"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed flex-1">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="mt-8 pt-8 border-t border-border flex items-center gap-6">
                      <div className="w-16 h-16 flex items-center justify-center">
                        <img
                          src={testimonial.logo}
                          alt={testimonial.company}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-display text-xl tracking-wide">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.position} • {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`relative w-3 h-3 rounded-full transition-all duration-500 ${index === activeIndex
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
              >
                {index === activeIndex && (
                  <motion.div
                    layoutId="activeTestimonial"
                    className="absolute inset-0 rounded-full bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Client logos marquee */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="relative overflow-hidden py-8">
            <div className="flex animate-marquee items-center">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="mx-8 md:mx-12 flex-shrink-0"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-12 md:h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
