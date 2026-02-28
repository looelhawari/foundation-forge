"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowRight, Award, Users, Building, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
const engineerImage = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312006/cpc-website/engineer-portrait.jpg";

// Import client logos
const moelogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312021/cpc-website/MOE-removebg-preview.png";
const fifaLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312010/cpc-website/FIFA-removebg-preview.png";
const museumLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312025/cpc-website/museum-removebg-preview.png";
const waqifLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312069/cpc-website/waqif-removebg-preview.png";
const dhlLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312005/cpc-website/DHL-removebg-preview.png";
const meeraLogo = "https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312018/cpc-website/meera-removebg-preview.png";

const featuredClients = [
  { name: "Ministry of Education", logo: moelogo },
  { name: "Qatar Museums", logo: museumLogo },
  { name: "FIFA World Cup Qatar 2022", logo: fifaLogo },
  { name: "Ministry of Waqif", logo: waqifLogo },
  { name: "DHL Qatar", logo: dhlLogo },
  { name: "Al Meera", logo: meeraLogo },
];

const stats = [
  { icon: Building, value: 57, suffix: "+", label: "Projects Completed" },
  { icon: Clock, value: 10, suffix: "+", label: "Years of Experience" },
  { icon: Users, value: 45, suffix: "+", label: "Satisfied Clients" },
  { icon: Award, value: 100, suffix: "%", label: "Quality Guaranteed" },
];

const CountUp = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const AboutPreview = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src={engineerImage}
                alt="Lead Engineer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 md:right-8 bg-gradient-card border border-border rounded-lg p-6 shadow-card"
            >
              <div className="font-display text-5xl text-primary mb-1">10+</div>
              <div className="text-sm text-muted-foreground">Years of<br />Excellence</div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              About Our Company
            </span>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-6">
              ENGINEERING <span className="text-gradient">EXCELLENCE</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Cosmo Projects & Construction (CPC Qatar) has been at the forefront of civil engineering in Qatar
              since 2017. Founded under the leadership of Chairman Mohammed Ahmed Mubarak Al-Nasr, our company has rapidly grown
              to become one of the most trusted names in educational facilities, cultural landmarks, and
              infrastructure construction.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We specialize in roads and infrastructure, parking facilities, and complex civil works for
              prestigious clients including Ministry of Education, Qatar Museums, and FIFA World Cup Qatar 2022.
              Our dedicated team brings expertise, precision, and innovation to every project we undertake.
            </p>

            {/* Featured Client Logos */}
            <div className="flex flex-wrap gap-4 mb-8">
              {featuredClients.slice(0, 4).map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-white/90 rounded-lg p-2 flex items-center justify-center shadow-sm border border-border/50"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-8 w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>

            <Button variant="hero" size="lg" asChild>
              <Link to="/about" className="group">
                Learn More About Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-card border border-border rounded-lg p-6 text-center group hover:border-primary/50 transition-colors duration-300"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-display text-4xl text-foreground mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
