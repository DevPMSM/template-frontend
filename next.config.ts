/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      process.env.NEXT_PUBLIC_API_DOMAIN,
      "via.placeholder.com",
    ], // Permite imagens externas
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora erros de ESLint durante o build
  },
};

export default nextConfig;
