import { motion } from "framer-motion";
import { useState } from "react";
import earthworks from "@/assets/services/earthworks.jpeg";
import subgrade from "@/assets/services/subgrade.jpeg";
import asphalt from "@/assets/services/asphalt.jpeg";
import traffic from "@/assets/services/traffic.jpeg";
import interlock from "@/assets/services/interlock.jpeg";
import steel from "@/assets/services/steel.jpeg";

const services = [
  {
    title: "Earth Works",
    description: "Comprehensive earthmoving, excavation, and land preparation services for all construction needs.",
    features: ["Site Clearing", "Excavation", "Grading", "Compaction"],
    image: earthworks,
  },
  {
    title: "Sub-Grade & Sub-Base",
    description: "Professional sub-grade and sub-base preparation ensuring solid foundation for all road projects.",
    features: ["Layer Preparation", "Material Testing", "Compaction Control", "Quality Assurance"],
    image: subgrade,
  },
  {
    title: "Asphalt Works",
    description: "Expert asphalt paving and road surfacing using latest technology and quality materials.",
    features: ["Hot Mix Asphalt", "Cold Mix Asphalt", "Surface Treatment", "Maintenance"],
    image: asphalt,
  },
  {
    title: "Traffic Signs & Road Marking",
    description: "Complete traffic management solutions including signage installation and road marking services.",
    features: ["Thermoplastic Marking", "Sign Installation", "Safety Measures", "Line Marking"],
    image: traffic,
  },
  {
    title: "Interlock & Kerbstone",
    description: "Precision installation of interlocking pavers and kerbstones for aesthetic and functional excellence.",
    features: ["Paver Installation", "Kerbstone Laying", "Pattern Design", "Finishing Works"],
    image: interlock,
  },
  {
    title: "Rod & Steel Works",
    description: "Structural steel reinforcement and rod work for concrete structures and foundations.",
    features: ["Rebar Installation", "Steel Fabrication", "Structural Support", "Quality Control"],
    image: steel,
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isHovered ? 0.7 : 0.3 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Title - Always Visible */}
      <div className="absolute inset-0 flex items-end p-6 z-10">
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-white"
          animate={{
            y: isHovered ? -20 : 0,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>
      </div>

      {/* Hover Content */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center items-center p-6 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 20,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-white mb-4 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {service.title}
        </motion.h3>

        <motion.p
          className="text-white/90 text-center mb-6 text-sm md:text-base"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          {service.description}
        </motion.p>

        <motion.div
          className="grid grid-cols-2 gap-3 w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {service.features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isHovered ? 1 : 0.8,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ delay: 0.25 + idx * 0.05, duration: 0.2 }}
            >
              <span className="text-white text-xs md:text-sm font-medium">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 border-2 border-primary rounded-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.95,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export const ServicesImageGrid = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            WHAT WE DO
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Our Services
          </motion.p>
          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Comprehensive construction solutions tailored to your project needs
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
