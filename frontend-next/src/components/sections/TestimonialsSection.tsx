"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const moelogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312021/cpc-website/MOE-removebg-preview.png";
const fifaLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312010/cpc-website/FIFA-removebg-preview.png";
const museumLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312025/cpc-website/museum-removebg-preview.png";
const dhlLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312005/cpc-website/DHL-removebg-preview.png";
const meeraLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312018/cpc-website/meera-removebg-preview.png";

const testimonials = [
  {
    id: 1,
    quote: "CPC Qatar delivered exceptional quality on our school bus parking project. Their attention to detail and commitment to deadlines made them an invaluable partner for our educational facilities.",
    author: "Eng. Ahmed Al-Kuwari",
    position: "Project Director",
    company: "Ministry of Education",
    logo: moelogo,
  },
  {
    id: 2,
    quote: "Working with CPC Qatar has been a pleasure. Their team's expertise in infrastructure development for cultural sites is unmatched, and they consistently exceed our expectations.",
    author: "Dr. Mariam Al-Ansari",
    position: "Chief Engineer",
    company: "Qatar Museums",
    logo: museumLogo,
  },
  {
    id: 3,
    quote: "The professionalism and quality of work from CPC Qatar is remarkable. They completed our parking infrastructure for FIFA World Cup Qatar 2022 ahead of schedule.",
    author: "Mohammed Al-Thani",
    position: "Operations Manager",
    company: "FIFA World Cup Qatar 2022",
    logo: fifaLogo,
  },
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-16 sm:py-24 md:py-32 lg:py-48 bg-secondary overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6 text-center"
        >
          Testimonials
        </motion.span>

        <div className="overflow-hidden text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.05em] px-4"
          >
            TRUSTED BY <span className="text-gradient">LEADERS</span>
          </motion.h2>
        </div>

        {/* Testimonial Display */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative h-[400px] sm:h-[350px] md:h-[300px] lg:h-[250px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  y: index === activeIndex ? 0 : 20,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center ${index === activeIndex ? "pointer-events-auto" : "pointer-events-none"
                  }`}
              >
                <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>

                {/* Company Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <img
                    src={testimonial.logo}
                    alt={testimonial.company}
                    className="h-16 md:h-20 w-auto object-contain mx-auto filter brightness-90"
                  />
                </motion.div>

                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.position}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${index === activeIndex
                  ? "w-12 bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 md:mt-24 flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16"
        >
          {[
            { name: "Ministry of Education", logo: moelogo },
            { name: "Qatar Museums", logo: museumLogo },
            { name: "FIFA World Cup Qatar 2022", logo: fifaLogo },
            { name: "DHL Qatar", logo: dhlLogo },
            { name: "Al Meera", logo: meeraLogo }
          ].map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-12 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
