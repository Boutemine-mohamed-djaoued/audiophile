/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/:path*`, // Proxy to backend server
      },
    ];
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
    dangerouslyAllowSVG: true, // Allow Firebase Storage images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
