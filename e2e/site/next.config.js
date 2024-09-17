/** @type {import('next').NextConfig} */
const { TypedCSSXNextPlugin, configCSSModule } = require('typedcssx-next-plugin');
const nextConfig = {
  webpack: config => {
    config.plugins.push(new TypedCSSXNextPlugin());
    return configCSSModule(config);
  },
};

module.exports = nextConfig;
