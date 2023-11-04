/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = {
    experimental: {
      serverComponents: true, // 启用 Server Components
      serverComponentsMode: 'concurrent', // 或 'blocking'，取决于你的需求
    },
  };  
module.exports = nextConfig
