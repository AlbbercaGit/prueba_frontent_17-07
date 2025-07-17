/** @type {import('next').NextConfig} */
const repoName = 'prueba_frontent_17-07';
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '',
  basePath: process.env.NODE_ENV === 'production' ? `/${repoName}` : '',
}

export default nextConfig
