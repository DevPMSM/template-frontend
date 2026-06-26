/** @type {import('next').NextConfig} */
const apiHostname = (() => {
  if (process.env.NEXT_PUBLIC_API_DOMAIN) {
    return process.env.NEXT_PUBLIC_API_DOMAIN;
  }

  if (process.env.NEXT_PUBLIC_API_URL) {
    try {
      return new URL(process.env.NEXT_PUBLIC_API_URL)
        .hostname;
    } catch {
      return undefined;
    }
  }

  return undefined;
})();

const nextConfig = {
  images: {
    domains: [
      apiHostname,
      "via.placeholder.com",
      "localhost",
      "127.0.0.1",
    ].filter(Boolean), // Permite imagens externas
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora erros de ESLint durante o build
  },
};

export default nextConfig;
