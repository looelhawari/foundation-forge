"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollText, Shield, FileText, Scale, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SEOHead from "@/components/SEOHead";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTranslations, useLocale } from "next-intl";

const Terms = () => {
    const { settings } = useSiteSettings();
    const t = useTranslations('termsPage');
    const locale = useLocale();
    const isRTL = locale === 'ar';
    
    return (
        <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
            <SEOHead
                title={t('meta.title')}
                description={t('meta.description')}
                canonical="/terms"
                noindex={true}
            />
            <Header />
            <main>
                {/* Hero Section */}
                <section className="pt-32 pb-16 bg-gradient-dark">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                                <Scale className="w-8 h-8 text-primary" />
                                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-center">
                                    {t('hero.title1')} <span className="text-gradient">{t('hero.title2')}</span>
                                </h1>
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {t('hero.description')}
                            </p>
                            <p className="text-muted-foreground text-sm mt-4">
                                {t('hero.lastUpdated')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Terms Content */}
                <section className="py-20">
                    <div className="container mx-auto px-6 max-w-5xl">
                        {/* Section 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className={`flex items-start gap-4 mb-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.about.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>{t('sections.about.content')}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className={`flex items-start gap-4 mb-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <ScrollText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.company.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>{t('sections.company.content')}</p>
                                        <p className="font-medium text-foreground">{t('sections.company.detailsLabel')}</p>
                                        <ul className={`list-disc space-y-2 ${isRTL ? 'mr-4 list-inside' : 'ml-4 list-inside'}`}>
                                            <li>{t('sections.company.legalName')}: {settings.site_name}</li>
                                            <li>{t('sections.company.crNumber')}: 108122</li>
                                            <li>{t('sections.company.location')}: {settings.head_office_address}</li>
                                            <li>{t('sections.company.poBox')}: {settings.po_box}, {settings.public_location}</li>
                                            <li>{t('sections.company.phone')}: {settings.contact_phone}</li>
                                            {settings.contact_phone_2 && <li>{t('sections.company.phone2')}: {settings.contact_phone_2}</li>}
                                            {settings.contact_telephone && <li>{t('sections.company.telephone')}: {settings.contact_telephone}</li>}
                                            <li>{t('sections.company.fax')}: {settings.contact_fax}</li>
                                            <li>{t('sections.company.email')}: {settings.contact_email}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className={`flex items-start gap-4 mb-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.content.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>{t('sections.content.content1')}</p>
                                        <p>{t('sections.content.content2')}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 4 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className={`flex items-start gap-4 mb-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.projects.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>{t('sections.projects.content1')}</p>
                                        <p>{t('sections.projects.content2')}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 5 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className={`flex items-start gap-4 mb-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <AlertCircle className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.quotes.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>{t('sections.quotes.content')}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 6 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className={`flex items-start gap-4 mb-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.privacy.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>
                                            {t('sections.privacy.content')}{' '}
                                            <Link href="/privacy" className="text-primary hover:underline">{t('sections.privacy.link')}</Link>
                                            {' '}{t('sections.privacy.contentAfterLink')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 7 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className={`flex items-start gap-4 mb-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <AlertCircle className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.updates.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>{t('sections.updates.content')}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 8 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className={`flex items-start gap-4 mb-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.contact.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>{t('sections.contact.content')}</p>
                                        <div className="bg-gradient-card border border-border rounded-lg p-6 mt-4">
                                            <p className="font-semibold text-foreground mb-3">{settings.site_name.toUpperCase()}</p>
                                            <ul className="space-y-2 text-sm">
                                                <li><span className="text-primary font-medium">{t('contact.address')}:</span> {settings.head_office_address}, {t('contact.poBox')}: {settings.po_box}, {settings.public_location}</li>
                                                <li><span className="text-primary font-medium">{t('contact.phone')}:</span> {settings.contact_phone}</li>
                                                {settings.contact_phone_2 && <li><span className="text-primary font-medium">{t('contact.phone2')}:</span> {settings.contact_phone_2}</li>}
                                                {settings.contact_telephone && <li><span className="text-primary font-medium">{t('contact.telephone')}:</span> {settings.contact_telephone}</li>}
                                                <li><span className="text-primary font-medium">{t('contact.fax')}:</span> {settings.contact_fax}</li>
                                                <li><span className="text-primary font-medium">{t('contact.email')}:</span> {settings.contact_email}</li>
                                                <li><span className="text-primary font-medium">{t('contact.cr')}:</span> 108122</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Simple Notice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`mt-16 p-8 bg-primary/5 ${isRTL ? 'border-r-4' : 'border-l-4'} border-primary ${isRTL ? 'rounded-l-lg' : 'rounded-r-lg'}`}
                        >
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {t('notice')}
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
