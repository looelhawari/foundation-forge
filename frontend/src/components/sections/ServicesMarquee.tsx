import { motion } from "framer-motion";
import heroImage from "@/assets/hero-construction.jpg";

export const ServicesMarquee = () => {
  const services = [
    "HIGHWAY CONSTRUCTION",
    "STREET DEVELOPMENT", 
    "INFRASTRUCTURE",
    "BRIDGE CONSTRUCTION",
    "ROAD MAINTENANCE",
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-secondary">
      {/* Marquee Container */}
      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex shrink-0 gap-16"
        >
          {[...services, ...services].map((service, index) => (
            <span
              key={index}
              className="font-display text-4xl md:text-6xl lg:text-8xl tracking-[0.1em] text-foreground/10 whitespace-nowrap"
            >
              {service}
            </span>
          ))}
        </motion.div>
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex shrink-0 gap-16"
        >
          {[...services, ...services].map((service, index) => (
            <span
              key={index}
              className="font-display text-4xl md:text-6xl lg:text-8xl tracking-[0.1em] text-foreground/10 whitespace-nowrap"
            >
              {service}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-xs font-medium tracking-[0.5em] uppercase block mb-4"
          >
            What We Do
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl tracking-[0.2em]"
          >
            OUR <span className="text-gradient">EXPERTISE</span>
          </motion.h3>
        </div>
      </div>
    </section>
  );
};
