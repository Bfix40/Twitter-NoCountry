/** @type {import('next').NextConfig} */

module.exports = {
    cookieDomain: 'twitter-nocountry-production.up.railway.app'
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
