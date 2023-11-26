/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "joshuaedo.sirv.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "sandraokpara.sirv.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media.graphassets.com",
        pathname: "**",
      },
    ],
  },
}

export default nextConfig
