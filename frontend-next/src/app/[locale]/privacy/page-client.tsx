"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTranslations, useLocale } from "next-intl";

const Privacy = () => {
    const { settings } = useSiteSettings();
    const t = useTranslations('privacyPage');
    const locale = useLocale();
    const isRTL = locale === 'ar';
    
    return (
        <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
            <SEOHead
                title={t('meta.title')}
                description={t('meta.description')}
                canonical="/privacy"
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
                                <Shield className="w-8 h-8 text-primary" />
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

                {/* Privacy Content */}
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
                                    <Database className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.collect.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>{t('sections.collect.intro')}</p>
                                        <ul className={`list-disc space-y-2 ${isRTL ? 'mr-4 list-inside' : 'ml-4 list-inside'}`}>
                                            <li>{t('sections.collect.items.name')}</li>
                                            <li>{t('sections.collect.items.email')}</li>
                                            <li>{t('sections.collect.items.phone')}</li>
                                            <li>{t('sections.collect.items.company')}</li>
                                            <li>{t('sections.collect.items.message')}</li>
                                        </ul>
                                        <p className="mt-3">{t('sections.collect.noCookies')}</p>
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
                                    <Eye className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.use.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>{t('sections.use.intro')}</p>
                                        <ul className={`list-disc space-y-2 ${isRTL ? 'mr-4 list-inside' : 'ml-4 list-inside'}`}>
                                            <li>{t('sections.use.items.respond')}</li>
                                            <li>{t('sections.use.items.provide')}</li>
                                            <li>{t('sections.use.items.quotes')}</li>
                                        </ul>
                                        <p className="mt-3">
                                            <strong>{t('sections.use.thatsIt')}</strong> {t('sections.use.noSell')}
                                        </p>
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
                                    <Lock className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.protect.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>{t('sections.protect.content')}</p>
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
                                    <UserCheck className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.rights.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-3">
                                        <p>{t('sections.rights.intro')}</p>
                                        <ul className={`list-disc space-y-2 ${isRTL ? 'mr-4 list-inside' : 'ml-4 list-inside'}`}>
                                            <li>{t('sections.rights.items.see')}</li>
                                            <li>{t('sections.rights.items.correct')}</li>
                                            <li>{t('sections.rights.items.delete')}</li>
                                        </ul>
                                        <p>
                                            {t('sections.rights.contact')} {settings.contact_email} {t('sections.rights.orCall')} {settings.contact_phone}{settings.contact_phone_2 ? ` / ${settings.contact_phone_2}` : ''} {t('sections.rights.forRequests')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 6 - Health & Safety Policy */}
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
                                        {t('sections.safety.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-4">
                                        <p>{t('sections.safety.intro')}</p>

                                        <div className="bg-gradient-card border border-border rounded-lg p-6 space-y-4">
                                            <div>
                                                <h4 className={`font-semibold text-foreground mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <CheckCircle className="w-5 h-5 text-primary" />
                                                    {t('sections.safety.operational.title')}
                                                </h4>
                                                <p className={`text-sm ${isRTL ? 'mr-7' : 'ml-7'}`}>
                                                    {t('sections.safety.operational.content')}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className={`font-semibold text-foreground mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <CheckCircle className="w-5 h-5 text-primary" />
                                                    {t('sections.safety.compliance.title')}
                                                </h4>
                                                <p className={`text-sm ${isRTL ? 'mr-7' : 'ml-7'}`}>
                                                    {t('sections.safety.compliance.content')}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className={`font-semibold text-foreground mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <CheckCircle className="w-5 h-5 text-primary" />
                                                    {t('sections.safety.measures.title')}
                                                </h4>
                                                <p className={`text-sm ${isRTL ? 'mr-7' : 'ml-7'}`}>
                                                    {t('sections.safety.measures.content')}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className={`font-semibold text-foreground mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <CheckCircle className="w-5 h-5 text-primary" />
                                                    {t('sections.safety.emergency.title')}
                                                </h4>
                                                <p className={`text-sm ${isRTL ? 'mr-7' : 'ml-7'}`}>
                                                    {t('sections.safety.emergency.content')}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className={`font-semibold text-foreground mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <CheckCircle className="w-5 h-5 text-primary" />
                                                    {t('sections.safety.community.title')}
                                                </h4>
                                                <p className={`text-sm ${isRTL ? 'mr-7' : 'ml-7'}`}>
                                                    {t('sections.safety.community.content')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={`p-4 bg-primary/5 ${isRTL ? 'border-r-4' : 'border-l-4'} border-primary ${isRTL ? 'rounded-l-lg' : 'rounded-r-lg'} mt-4`}>
                                            <p className="text-sm">{t('sections.safety.commitment')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 7 - Quality Policy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className={`flex items-start gap-4 mb-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <AlertTriangle className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-2xl tracking-wide mb-4">
                                        {t('sections.quality.title')}
                                    </h2>
                                    <div className="text-muted-foreground leading-relaxed space-y-4">
                                        <p>{t('sections.quality.intro')}</p>
                                        <p>{t('sections.quality.dedicated')}</p>

                                        <div className="bg-gradient-card border border-border rounded-lg p-6 space-y-3">
                                            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <p className="text-sm">{t('sections.quality.items.development')}</p>
                                            </div>

                                            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <p className="text-sm">{t('sections.quality.items.system')}</p>
                                            </div>

                                            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <p className="text-sm">{t('sections.quality.items.training')}</p>
                                            </div>

                                            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <p className="text-sm">{t('sections.quality.items.culture')}</p>
                                            </div>

                                            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <p className="text-sm">{t('sections.quality.items.objectives')}</p>
                                            </div>
                                        </div>

                                        <div className={`p-4 bg-primary/5 ${isRTL ? 'border-r-4' : 'border-l-4'} border-primary ${isRTL ? 'rounded-l-lg' : 'rounded-r-lg'} mt-4`}>
                                            <p className="text-sm">{t('sections.quality.management')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 8 - Contact */}
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
                                                {settings.contact_fax && <li><span className="text-primary font-medium">{t('contact.fax')}:</span> {settings.contact_fax}</li>}
                                                <li><span className="text-primary font-medium">{t('contact.email')}:</span> {settings.contact_email}</li>
                                                <li><span className="text-primary font-medium">{t('contact.cr')}:</span> 108122</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Acknowledgment Notice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`mt-16 p-8 bg-primary/5 ${isRTL ? 'border-r-4' : 'border-l-4'} border-primary ${isRTL ? 'rounded-l-lg' : 'rounded-r-lg'}`}
                        >
                            <p className="text-foreground font-medium mb-2">
                                {t('consent.title')}
                            </p>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {t('consent.content')}
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;
