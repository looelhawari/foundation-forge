"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslations, useLocale } from "next-intl";

export default function SubgradeSubbasePageClient() {
    const t = useTranslations('services.subgradeSubbase');
    const locale = useLocale();
    const isRTL = locale === 'ar';

    const layers = [
        { key: 'layer1' },
        { key: 'layer2' },
        { key: 'layer3' },
        { key: 'layer4' },
    ];

    const tests = [
        { key: 'test1' },
        { key: 'test2' },
        { key: 'test3' },
        { key: 'test4' },
        { key: 'test5' },
        { key: 'test6' },
    ];

    return (
        <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
            <Header />
            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-16">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="https://res.cloudinary.com/dhxlvvzih/image/upload/f_auto,q_auto/v1772312062/cpc-website/services/subgrade_and_subbase.jpg"
                            alt="Subgrade and subbase construction for road projects in Qatar by CPC Qatar"
                            fill
                            sizes="100vw"
                            className="object-cover opacity-20"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
                    </div>
                    <div className="relative z-10 container mx-auto px-6 max-w-5xl">
                        <nav className="text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
                            <ol className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <li><Link href="/" className="hover:text-primary transition-colors">{t('breadcrumb.home')}</Link></li>
                                <li>/</li>
                                <li><Link href="/services" className="hover:text-primary transition-colors">{t('breadcrumb.services')}</Link></li>
                                <li>/</li>
                                <li className="text-foreground">{t('breadcrumb.current')}</li>
                            </ol>
                        </nav>
                        <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                            {t('hero.subtitle')}
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide mb-6">
                            {t('hero.title1')} <span className="text-gradient">{t('hero.title2')}</span>
                            <span className="sr-only"> {t('hero.srOnly')}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                            {t('hero.description')}
                        </p>
                    </div>
                </section>

                {/* Road Layers Explained */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-12">
                            {t('layersSection.title')}
                        </h2>
                        <div className="space-y-6">
                            {layers.map((item) => (
                                <div key={item.key} className="bg-card p-6 rounded-xl border border-border flex flex-col sm:flex-row gap-4">
                                    <div className="sm:w-48 shrink-0">
                                        <h3 className="font-display text-xl text-primary">{t(`layersSection.${item.key}.title`)}</h3>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{t(`layersSection.${item.key}.desc`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testing & QC */}
                <section className="py-16 bg-card">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-center">
                            {t('testingSection.title')}
                        </h2>
                        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                            {t('testingSection.description')}
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {tests.map((item) => (
                                <div key={item.key} className="p-5 rounded-lg border border-border bg-background">
                                    <h3 className="font-display text-lg mb-2 text-primary">{t(`testingSection.${item.key}.title`)}</h3>
                                    <p className="text-sm text-muted-foreground">{t(`testingSection.${item.key}.desc`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SEO Content */}
                <section className="py-16">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8">
                            {t('seoSection.title')}
                        </h2>
                        <div className="prose prose-lg prose-invert text-muted-foreground leading-relaxed space-y-4">
                            <p dangerouslySetInnerHTML={{ __html: t.raw('seoSection.p1') }} />
                            <p dangerouslySetInnerHTML={{ __html: t.raw('seoSection.p2') }} />
                            <p dangerouslySetInnerHTML={{ __html: t.raw('seoSection.p3') }} />
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-card">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-6">
                            {t('cta.title')}
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            {t('cta.description')}
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center bg-gradient-gold text-primary-foreground font-semibold h-14 rounded-md px-10 text-lg hover:shadow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                            >
                                {t('cta.quoteButton')}
                            </Link>
                            <Link
                                href="/projects"
                                className="inline-flex items-center justify-center border border-border font-semibold h-14 rounded-md px-10 text-lg hover:bg-card transition-all duration-300"
                            >
                                {t('cta.projectsButton')}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
