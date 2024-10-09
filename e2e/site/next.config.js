/** @type {import('next').NextConfig} */
const { configCSSModule } = require('typedcssx-next-plugin');
const nextConfig = {
  webpack: config => {
    return configCSSModule(config);
  },
};

module.exports = nextConfig;
