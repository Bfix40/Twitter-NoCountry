/** @type {import('next').NextConfig} */

module.exports = {
    cookieDomain: 'https://twitter-nocountry-production.up.railway.app/home'
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};
