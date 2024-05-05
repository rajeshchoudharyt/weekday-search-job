/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "logo.clearbit.com",
            },
        ],
    },
};

module.exports = nextConfig;
