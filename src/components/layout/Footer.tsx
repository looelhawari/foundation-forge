import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-gold rounded-sm flex items-center justify-center">
                <span className="font-display text-xl text-primary-foreground">AR</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl tracking-wider text-foreground">
                  AL-RASHID
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Construction
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building the nation's infrastructure with excellence, precision, and over 25 years of trusted expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg tracking-wide text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Projects", "Clients", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg tracking-wide text-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {["Highway Construction", "Street Development", "Infrastructure", "Road Maintenance", "Bridge Construction"].map((item) => (
                <li key={item}>
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg tracking-wide text-foreground mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Industrial Area, Phase 3<br />Riyadh, Saudi Arabia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+966123456789" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +966 12 345 6789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@alrashid.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  info@alrashid.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Al-Rashid Construction. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
