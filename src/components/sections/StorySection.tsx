import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import engineerImage from "@/assets/engineer-portrait.jpg";

export const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-dark" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-6"
            >
              The Story
            </motion.span>

            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em]"
              >
                SMALL BUT
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[0.05em] text-gradient"
              >
                MIGHTY
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6 text-muted-foreground"
            >
              <p className="text-lg leading-relaxed">
                A team of just 50 engineers proves that size does not limit them from 
                collaborating with the Kingdom's most prestigious infrastructure projects.
              </p>
              <p className="leading-relaxed">
                Founded in 1998 by Eng. Mohammed Al-Rashid, we have grown from a small 
                local contractor to one of the region's most trusted names in civil engineering, 
                completing over 150 projects across highways, streets, and complex infrastructure.
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border"
            >
              {[
                { value: "150+", label: "Completed" },
                { value: "25+", label: "Years" },
                { value: "100%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="font-display text-3xl md:text-4xl text-primary">{stat.value}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div style={{ y }} className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <motion.img
                style={{ scale: imageScale }}
                src={engineerImage}
                alt="Lead Engineer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-gradient-card border border-border rounded-lg p-6 shadow-card"
            >
              <div className="font-display text-4xl text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Years of<br />Excellence</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
