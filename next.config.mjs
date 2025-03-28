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
        protocol: "https",
        hostname: "woodmart.xtemos.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
<<<<<<< HEAD
        hostname: "img.freepik.com",
=======
        hostname: "img.daisyui.com",
>>>>>>> 59c08ad92e7162b2eb1ce8dd85870529c7322635
      },
    ],
  },
};

export default nextConfig;
