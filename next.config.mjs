/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  env: {
    API_SERVER: "https://smwa.vkpublications.com",
    CDN_SERVER: "https://uploads.vkgil.in/temp",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploads.vkgil.in",
        port: "",
        pathname: "/temp/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
