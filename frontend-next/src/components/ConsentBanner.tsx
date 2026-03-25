"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield } from 'lucide-react';
import { Link } from '@/lib/router-compat';
import { useTranslation } from '@/lib/i18n/client';

const ConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation('legal');

    useEffect(() => {
        // Check if user has already accepted
        const hasAccepted = localStorage.getItem('termsAccepted');
        if (!hasAccepted) {
            // Show banner after a short delay
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('termsAccepted', 'true');
        setIsVisible(false);
    };

    const handleClose = () => {
        setIsVisible(false);
        // Set a temporary flag to not show again during this session
        sessionStorage.setItem('bannerDismissed', 'true');
    };

    // Don't show if dismissed this session
    useEffect(() => {
        const dismissed = sessionStorage.getItem('bannerDismissed');
        if (dismissed) {
            setIsVisible(false);
        }
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-background/95 backdrop-blur-lg border-2 border-primary/20 rounded-xl shadow-2xl overflow-hidden">
                            <div className="relative">
                                {/* Close button */}
                                <button
                                    onClick={handleClose}
                                    className="absolute top-3 right-3 p-2 rounded-lg hover:bg-primary/10 transition-colors"
                                    aria-label={t('consent.closeButton')}
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>

                                <div className="p-6 md:p-8 pr-12">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                                        {/* Icon */}
                                        <div className="shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Shield className="w-6 h-6 text-primary" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="font-display text-lg font-semibold mb-2">
                                                {t('consent.title')}
                                            </h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                {t('consent.message').split('{{terms}}')[0]}
                                                <Link to="/terms" className="text-primary hover:underline font-medium">
                                                    {t('terms.title')}
                                                </Link>
                                                {' '}{t('and', { ns: 'common', defaultValue: 'and' })}{' '}
                                                <Link to="/privacy" className="text-primary hover:underline font-medium">
                                                    {t('privacy.title')}
                                                </Link>
                                                .
                                            </p>
                                        </div>

                                        {/* Accept button */}
                                        <div className="w-full md:w-auto">
                                            <button
                                                onClick={handleAccept}
                                                className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                                            >
                                                {t('consent.button')}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Accent bar */}
                                <div className="h-1 bg-gradient-to-r from-primary via-primary/50 to-primary" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConsentBanner;
