/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_ALBUM_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_BUCKET_REGION}.amazonaws.com`,
    ],
    loader: "akamai",
    path: "",
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
