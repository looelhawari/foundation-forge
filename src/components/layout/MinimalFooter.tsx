import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
              <div className="w-10 h-10 bg-gradient-gold rounded-sm flex items-center justify-center">
                <span className="font-display text-xl text-primary-foreground">AR</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg tracking-[0.2em]">AL-RASHID</span>
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground">CONSTRUCTION</span>
              </div>
            </Link>
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
            <a
              href="mailto:info@alrashid.com"
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              info@alrashid.com
            </a>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground tracking-widest">
            © {new Date().getFullYear()} AL-RASHID CONSTRUCTION. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
