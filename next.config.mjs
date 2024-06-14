/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;

// async redirects() {
//   return [
//     {
//       source: "/about",
//       destination: "https://www.npmjs.com/package/next-translate-routes",
//       permanent: false,
//     },
//   ];
// },
// logging: {
//   fetches: {
//     fullUrl: true,
//   },
// },
