// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "api/compile": ["./codegen"],
    },
  },
};

module.exports = nextConfig;
