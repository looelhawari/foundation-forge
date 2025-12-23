import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "CPC Qatar delivered exceptional quality on our school bus parking project. Their attention to detail and commitment to deadlines made them an invaluable partner for our educational facilities.",
    author: "Eng. Ahmed Al-Kuwari",
    position: "Project Director",
    company: "Ministry of Education",
  },
  {
    id: 2,
    quote: "Working with CPC Qatar has been a pleasure. Their team's expertise in infrastructure development for cultural sites is unmatched, and they consistently exceed our expectations.",
    author: "Dr. Mariam Al-Ansari",
    position: "Chief Engineer",
    company: "Qatar Museums",
  },
  {
    id: 3,
    quote: "The professionalism and quality of work from CPC Qatar is remarkable. They completed our parking infrastructure for FIFA World Cup Qatar 2022 ahead of schedule.",
    author: "Mohammed Al-Thani",
    position: "Operations Manager",
    company: "FIFA World Cup Qatar 2022",
  },
];

const clientLogos = [
  "Ministry of Education",
  "Qatar Museums",
  "FIFA World Cup Qatar 2022",
  "Ministry of Waqif",
  "DHL Qatar",
  "Al Meera",
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Client Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide">
            TRUSTED BY <span className="text-gradient">LEADERS</span>
          </h2>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-card border border-border rounded-2xl p-8 md:p-12 relative"
          >
            <Quote className="w-12 h-12 text-primary/30 absolute top-8 right-8" />

            <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-light">
              "{testimonials[activeIndex].quote}"
            </p>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="font-display text-xl text-primary-foreground">
                  {testimonials[activeIndex].author.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  {testimonials[activeIndex].author}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-border bg-secondary hover:bg-muted hover:border-primary/50 transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex
                      ? "w-8 bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-border bg-secondary hover:bg-muted hover:border-primary/50 transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24"
        >
          <p className="text-center text-muted-foreground text-sm mb-8">
            Trusted by leading organizations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-muted/50 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
              >
                <span className="font-medium text-sm">{logo}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
