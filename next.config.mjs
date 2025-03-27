/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "img.drz.lazcdn.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
<<<<<<< HEAD
        protocol: "https",
        hostname: "woodmart.xtemos.com",
=======
        protocol: 'https',
        hostname: 'woodmart.xtemos.com',
        port: '',
        pathname: '/wp-content/uploads/**',
>>>>>>> 402591c1acbc6451a09638a6ed8fe162fa091adb
      },
    ],
  },
};

export default nextConfig;
