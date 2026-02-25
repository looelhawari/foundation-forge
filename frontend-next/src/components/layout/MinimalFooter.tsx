"use client";

import { Link } from "@/lib/router-compat";
import { motion } from "framer-motion";
import Image from "next/image";
const cpcLogo = "/assets/cpc_logo-removebg-preview.png";

export const MinimalFooter = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="flex items-center gap-3">
              <Image src={cpcLogo} alt="CPC Qatar - Cosmo Projects & Construction logo" width={224} height={112} className="h-28 w-auto object-contain" />
            </Link>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>P.O. Box: 15776, Doha, Qatar</p>
              <p className="mt-1">C.R: 108122</p>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-8"
          >
            {["Home", "About", "Projects", "Clients", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-right"
          >
            <div className="space-y-2">
              <a
                href="tel:+97444322743"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Tel: +974 4432-2743
              </a>
              <a
                href="mailto:Info@ctgroups.net"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Info@ctgroups.net
              </a>
              <p className="text-xs text-muted-foreground mt-3">
                Mirqab Mall, Area 39<br />
                Block D - Office 307-308
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground tracking-widest">
            © {new Date().getFullYear()} COSMO PROJECTS & CONSTRUCTION AND TRADING CO. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Chairman: Mohammed Ahmed Mubarak Al-Nasr
          </p>
        </div>
      </div>
    </footer>
  );
};
