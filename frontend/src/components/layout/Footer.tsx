import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, FileText } from "lucide-react";
import cpcLogo from "@/assets/cpc_logo-removebg-preview.png";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <img src={cpcLogo} alt="CPC Logo" className="h-28 w-auto object-contain" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.about.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg tracking-wide text-foreground mb-6">{t("footer.quickLinks.title")}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm">
                  {t("footer.quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm">
                  {t("footer.quickLinks.about")}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm">
                  {t("footer.quickLinks.projects")}
                </Link>
              </li>
              <li>
                <Link to="/clients" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm">
                  {t("footer.quickLinks.clients")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm">
                  {t("footer.quickLinks.contact")}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm">
                  {t("footer.legal.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg tracking-wide text-foreground mb-6">{t("footer.services.title", "Services")}</h4>
            <ul className="space-y-3">
              {[
                t("footer.services.earthworks", "Earthworks & Grading"),
                t("footer.services.asphalt", "Asphalt Paving"),
                t("footer.services.roadMarking", "Road Marking & Traffic Signs"),
                t("footer.services.interlock", "Interlock & Kerbstone"),
                t("footer.services.subGrade", "Sub-Grade & Sub-Base"),
                t("footer.services.steelWorks", "Steel Works"),
              ].map((item) => (
                <li key={item}>
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Documents */}
          <div>
            <h4 className="font-display text-lg tracking-wide text-foreground mb-6">{t("footer.legalDocs.title", "Legal Documents")}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/certificates"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  {t("footer.legalDocs.certificates", "Company Certificates")}
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm">
                  {t("footer.legalDocs.commercialReg", "Commercial Registration")}
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm">
                  {t("footer.legalDocs.taxCard", "Tax Card")}
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm">
                  {t("footer.legalDocs.commercialPermit", "Commercial Permit")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg tracking-wide text-foreground mb-6">{t("footer.contact.title")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  {t("footer.contact.address")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+97444322743" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +974 4432-2743
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:Info@ctgroups.net" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Info@ctgroups.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {t("footer.copyright")}
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t("footer.legal.privacy")}
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t("footer.legal.terms")}
              </Link>
            </div>
          </div>

          {/* Designer Credit */}
          <div className="mt-6 pt-6 border-t border-border/50 flex justify-center">
            <a
              href="https://eliteera.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/70 hover:text-primary transition-colors text-xs flex items-center gap-2 group"
            >
              <span>{t("footer.designedBy", "Designed by")}</span>
              <span className="font-semibold tracking-wide group-hover:tracking-wider transition-all">
                ELITEERA
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
