"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TiltCard } from "../animations/MotionGraphics";
import { testimonialsApi, Testimonial } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/client";
const moelogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312021/cpc-website/MOE-removebg-preview.png";
const fifaLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312010/cpc-website/FIFA-removebg-preview.png";
const museumLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312025/cpc-website/museum-removebg-preview.png";
const dhlLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312005/cpc-website/DHL-removebg-preview.png";
const meeraLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312018/cpc-website/meera-removebg-preview.png";
const arianeLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772311985/cpc-website/Ariane_real_state.png";
const ashghaalLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772311986/cpc-website/ashghaal.png";
const fbaLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312009/cpc-website/FBA_real_estate.png";
const imalcoLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312017/cpc-website/imalco.jpg";
const qnieLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312041/cpc-website/qnie.jpg";

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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(true); // mobile-first SSR default
  const { t } = useTranslation('home');

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Fetch approved testimonials from database
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialsApi.getApproved({ limit: 10 });
        if (response.data && response.data.length > 0) {
          setTestimonials(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Simplified parallax - only on desktop
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [50, -50]);

  // Auto-advance testimonials with correct dependency
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Animated quote marks - simplified */}
      {!isMobile && (
        <motion.div
          style={{ y }}
          className="absolute top-32 left-12 font-display text-[25vw] text-foreground/5 leading-none select-none pointer-events-none will-change-transform"
        >
          "
        </motion.div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6">
            {t('immersiveTestimonials.tag')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.05em]">
            {t('immersiveTestimonials.title.prefix')} <span className="text-gradient">{t('immersiveTestimonials.title.highlight')}</span>
          </h2>
        </motion.div>

        {/* Testimonials */}
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{t('immersiveTestimonials.emptyState')}</p>
            </div>
          ) : (
            <div className="relative min-h-[300px] sm:min-h-[400px]">
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
                    <div className="bg-gradient-card border border-border rounded-2xl p-5 sm:p-8 md:p-12 h-full flex flex-col">
                      {/* Rating */}
                      <div className="flex gap-1 mb-8">
                        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
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
                        "{testimonial.content}"
                      </p>

                      {/* Author */}
                      <div className="mt-8 pt-8 border-t border-border flex items-center gap-6">
                        {testimonial.company_logo && (
                          <div className="w-16 h-16 flex items-center justify-center">
                            <img
                              src={testimonial.company_logo}
                              alt={testimonial.company_name || 'Client company logo'}
                              className="w-full h-full object-contain"
                              width={64}
                              height={64}
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-display text-xl tracking-wide">{testimonial.client_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.position}{testimonial.company_name && ` • ${testimonial.company_name}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && testimonials.length > 0 && (
            <>
              {/* Navigation */}
              <div className="flex justify-center gap-2 sm:gap-4 mt-12">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`View testimonial ${index + 1} of ${testimonials.length}`}
                    className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500`}
                  >
                    <span className={`w-3 h-3 rounded-full transition-all duration-500 ${index === activeIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`} />
                    {index === activeIndex && (
                      <motion.div
                        layoutId="activeTestimonial"
                        className="absolute inset-0 rounded-full bg-primary/20"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Client logos marquee — CSS animation */}
        <div className="mt-16 md:mt-32">
          {/* Light background strip for better logo visibility */}
          <div className="relative overflow-hidden py-8 bg-gradient-to-r from-transparent via-white/10 to-transparent">
            <div className="flex">
              <div
                className="flex items-center shrink-0 will-change-transform"
                style={{ animation: 'marquee 50s linear infinite' }}
              >
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className="mx-6 md:mx-10 flex-shrink-0 bg-white/90 rounded-xl p-3 shadow-lg"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      width={100}
                      height={64}
                      className="h-12 md:h-16 w-auto object-contain min-w-[80px] md:min-w-[100px]"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div
                className="flex items-center shrink-0 will-change-transform"
                style={{ animation: 'marquee 50s linear infinite' }}
              >
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className="mx-6 md:mx-10 flex-shrink-0 bg-white/90 rounded-xl p-3 shadow-lg"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      width={100}
                      height={64}
                      className="h-12 md:h-16 w-auto object-contain min-w-[80px] md:min-w-[100px]"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};
