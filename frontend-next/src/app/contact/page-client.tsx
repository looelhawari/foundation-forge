"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactApi } from "@/lib/api";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "@/lib/i18n/client";

/** Strip non-digit characters except leading + for tel: links */
const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

const Contact = () => {
  const { t } = useTranslation('contact');
  const { toast } = useToast();
  const { settings } = useSiteSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactApi.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        subject: formData.subject || undefined,
        message: formData.message,
      });

      toast({
        title: "Message Sent!",
        description:
          "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact CPC Qatar | Get a Free Quote | Road Construction Doha"
        description={`Contact CPC Qatar for road construction & infrastructure projects. Office: ${settings.head_office_address}. Phone: ${settings.contact_phone}. Email: ${settings.contact_email}. Free consultation & quote.`}
        canonical="/contact"
        arDescription="تواصل مع شركة كوزمو للمشاريع والإنشاءات للحصول على عرض أسعار مجاني لمشاريع الطرق والبنية التحتية في قطر"
        keywords="contact CPC Qatar, road construction quote Doha, contractor contact Qatar, اتصل بنا شركة مقاولات قطر"
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-dark">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                {t('hero.subtitle')}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6">
                {t('hero.title').split(' ')[0]} <span className="text-gradient">{t('hero.title').split(' ').slice(1).join(' ') || 'US'}</span>
                <span className="sr-only"> — CPC Qatar | Free Quote for Road Construction &amp; Infrastructure Projects in Doha, Qatar</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {t('hero.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-display text-3xl tracking-wide mb-8">
                  {t('form.title').split(' ').slice(0, -1).join(' ')} <span className="text-gradient">{t('form.title').split(' ').slice(-1)}</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        {t('form.fields.fullName.label')}
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-secondary border-border focus:border-primary"
                        placeholder={t('form.fields.fullName.placeholder')}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        {t('form.fields.email.label')}
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-secondary border-border focus:border-primary"
                        placeholder={t('form.fields.email.placeholder')}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        {t('form.fields.phone.label')}
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-secondary border-border focus:border-primary"
                        placeholder={t('form.fields.phone.placeholder')}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        {t('form.fields.company.label')}
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-secondary border-border focus:border-primary"
                        placeholder={t('form.fields.company.placeholder')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      {t('form.fields.subject.label')}
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-secondary border-border focus:border-primary"
                      placeholder={t('form.fields.subject.placeholder')}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      {t('form.fields.message.label')}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-secondary border-border focus:border-primary min-h-[150px]"
                      placeholder={t('form.fields.message.placeholder')}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('form.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t('form.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-display text-3xl tracking-wide mb-8">
                  {t('info.title').split(' ')[0]} <span className="text-gradient">{t('info.title').split(' ').slice(1).join(' ')}</span>
                </h2>

                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4 p-4 bg-gradient-card border border-border rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {t('info.headOffice')}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {settings.head_office_address}
                        {settings.po_box && (
                          <>
                            <br />
                            P.O. Box: {settings.po_box}, {settings.public_location}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gradient-card border border-border rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {t('info.phone')}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        <a
                          href={toTelHref(settings.contact_phone)}
                          className="hover:text-primary transition-colors"
                        >
                          {settings.contact_phone}
                        </a>
                        {settings.contact_phone_2 && (
                          <>
                            <br />
                            <a
                              href={toTelHref(settings.contact_phone_2)}
                              className="hover:text-primary transition-colors"
                            >
                              {settings.contact_phone_2}
                            </a>
                          </>
                        )}
                        {settings.contact_telephone && (
                          <>
                            <br />
                            <a
                              href={toTelHref(settings.contact_telephone)}
                              className="hover:text-primary transition-colors"
                            >
                              {settings.contact_telephone} {t('info.tel')}
                            </a>
                          </>
                        )}
                        {settings.contact_fax && (
                          <>
                            <br />
                            <a
                              href={toTelHref(settings.contact_fax)}
                              className="hover:text-primary transition-colors"
                            >
                              {settings.contact_fax} {t('info.fax')}
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gradient-card border border-border rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {t('info.email')}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        <a
                          href={`mailto:${settings.contact_email}`}
                          className="hover:text-primary transition-colors"
                        >
                          {settings.contact_email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-24"
            >
              <div className="aspect-video sm:aspect-[21/9] rounded-lg overflow-hidden border border-border">
                {settings.google_maps_url ? (
                  <iframe
                    src={settings.google_maps_url}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${settings.site_name} Location - ${settings.public_location}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground">
                    {t('info.mapNotConfigured')}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
