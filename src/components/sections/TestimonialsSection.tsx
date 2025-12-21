import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 md:py-48 bg-secondary overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6 text-center"
        >
          Testimonials
        </motion.span>

        <div className="overflow-hidden text-center mb-16">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
          >
            TRUSTED BY <span className="text-gradient">LEADERS</span>
          </motion.h2>
        </div>

        {/* Testimonial Display */}
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[300px] md:h-[250px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  y: index === activeIndex ? 0 : 20,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center ${
                  index === activeIndex ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.position}, {testimonial.company}
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
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === activeIndex
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
          className="mt-24 flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {["Ministry of Transport", "Saudi Aramco", "SABIC", "NEOM", "STC", "Riyadh Municipality"].map(
            (logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="px-6 py-3 rounded-full border border-border/50 text-muted-foreground text-sm hover:text-foreground hover:border-primary/30 transition-all"
              >
                {logo}
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};
