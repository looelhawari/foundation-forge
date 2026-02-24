/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode
    reactStrictMode: true,

    // Disable Suspense requirement for useSearchParams (needed for router-compat layer)
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },

    // Configure image domains for external images (Cloudinary, etc.)
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
        // Disable default image optimization to preserve existing <img> behavior
        unoptimized: true,
    },

    // Configure asset handling for PDFs
    webpack: (config) => {
        config.module.rules.push({
            test: /\.pdf$/,
            type: 'asset/resource',
        });
        return config;
    },

    // Environment variables
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    },

    // Trailing slash configuration (match current SPA behavior)
    trailingSlash: false,

    // Compress output
    compress: true,

    // Power headers for SEO
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
