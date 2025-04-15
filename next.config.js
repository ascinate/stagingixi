/**@type {import('next').NextConfig}  */ 
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/icons",
        destination: "https://iconsguru.com/admin/api/icons",
      },
      {
        source: "/api/icons/search", 
        destination: "https://iconsguru.com/admin/icons/search",
      },
    ];
  },
};

module.exports = nextConfig;
