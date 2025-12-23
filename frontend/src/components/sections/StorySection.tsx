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
    <section ref={containerRef} className="relative py-16 sm:py-24 md:py-32 lg:py-48 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-dark" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
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
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.05em]"
              >
                SMALL BUT
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-6 md:mb-8">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.05em] text-gradient"
              >
                MIGHTY
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 md:space-y-6 text-muted-foreground"
            >
              <p className="text-base sm:text-lg leading-relaxed">
                A team of dedicated engineers proves that excellence knows no limits when it comes to
                delivering Qatar's most prestigious infrastructure projects.
              </p>
              <p className="leading-relaxed">
                Established in 2017 under the leadership of Chairman Mohammed Ahmed Mubarak Al-Nasr,
                CPC Qatar has rapidly grown to become one of the region's most trusted names in civil engineering,
                completing 57 projects across educational facilities, cultural landmarks, and complex infrastructure.
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
                { value: "57", label: "Completed" },
                { value: "8+", label: "Years" },
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
              <div className="font-display text-4xl text-primary">8+</div>
              <div className="text-sm text-muted-foreground">Years of<br />Excellence</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
