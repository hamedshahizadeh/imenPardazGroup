const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/uploads/:path*", // ✅ از / استفاده کن، نه \
      },
    ];
  },
};

export default nextConfig;