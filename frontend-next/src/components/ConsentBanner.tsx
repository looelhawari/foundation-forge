"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield } from 'lucide-react';
import { Link } from '@/lib/router-compat';

const ConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasAccepted = localStorage.getItem('termsAccepted');
        if (!hasAccepted) {
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('termsAccepted', 'true');
        setIsVisible(false);
    };

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('bannerDismissed', 'true');
    };

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
                                <button
                                    onClick={handleClose}
                                    className="absolute top-3 right-3 p-2 rounded-lg hover:bg-primary/10 transition-colors"
                                    aria-label="Close banner"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>

                                <div className="p-6 md:p-8 pr-12">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                                        <div className="shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Shield className="w-6 h-6 text-primary" />
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-display text-lg font-semibold mb-2">
                                                Your Privacy Matters
                                            </h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                We use your contact information only to respond to your inquiries. By using this website,
                                                you agree to our{' '}
                                                <Link to="/terms" className="text-primary hover:underline font-medium">
                                                    Terms of Use
                                                </Link>
                                                {' '}and{' '}
                                                <Link to="/privacy" className="text-primary hover:underline font-medium">
                                                    Privacy Policy
                                                </Link>
                                                .
                                            </p>
                                        </div>

                                        <div className="w-full md:w-auto">
                                            <button
                                                onClick={handleAccept}
                                                className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                                            >
                                                I Understand
                                            </button>
                                        </div>
                                    </div>
                                </div>

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
