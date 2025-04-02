"use client";
import Image from "next/image";

const teamMembers = [
  {
    name: "Ayesha Ferdous",
    role: "Frontend Developer",
    image: "https://i.ibb.co.com/27vRg9JC/surela.jpg",
    description:
      "Specialist in React, Next.js, and Tailwind CSS. Passionate about crafting intuitive UI/UX.",
  },
  {
    name: "Md.Ranju",
    role: "Backend Developer",
    image: "https://i.ibb.co.com/J2WJqCX/john-smith.jpg",
    description:
      "Expert in Node.js, Express, MongoDB and Mongoose Focused on building scalable backend solutions.",
  },
  {
    name: "Salekin Imran",
    role: "UI/UX Designer",
    image: "https://i.ibb.co.com/J2WJqCX/john-smith.jpg",
    description:
      "Creates seamless and visually appealing designs with Figma and Adobe XD.",
  },
  {
    name: "Arif Hassan",
    role: "Frontend & Backend Developer",
    image: "https://i.ibb.co.com/HDJ9twR8/Arif-s.jpg",
    description:
      "Bridges frontend and backend, ensuring smooth integration and best practices.",
  },
  {
    name: "Himel Mia",
    role: "Frontend Developer (Cards Design, Data Fetching, Redux)",
    image: "https://i.ibb.co.com/J2WJqCX/john-smith.jpg",
    description:
      "Works on cards design, data fetching, and managing application state with Redux.",
  },
];

const AboutUs = () => {
  return (
    <div className="w-11/12 mx-auto py-20 px-4 mt-28">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">About NextBuy</h1>
        <p className="text-lg text-gray-600 mt-4 mx-auto">
          NextBuy is a cutting-edge online marketplace designed to provide users
          with a seamless shopping experience. Built by a dedicated team of
          passionate developers, we focus on delivering high-quality products
          from trusted sellers in a secure and intuitive platform. Our mission
          is to make online shopping effortless by combining advanced
          technology, user-friendly design, and exceptional customer service.
          Whether you&apos;re searching for the latest trends or unique items,
          NextBuy offers a reliable, streamlined, and enjoyable shopping journey
          from start to finish.
        </p>
      </div>

      {/* Team Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-xl p-6 text-center"
            >
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
              <p className="text-gray-600 mt-2">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
        <p className="text-lg text-gray-600 mt-4 mx-auto">
          In the future, NextBuy plans to implement several advanced features to
          enhance the e-commerce experience. We aim to integrate AI-powered
          voice search and chatbots to allow customers to interact with the
          platform hands-free and engage in more intuitive conversations.
          Blockchain technology could be leveraged to offer secure,
          decentralized transactions, providing an extra layer of trust and
          transparency. Additionally, real-time shipping tracking and predictive
          delivery times will keep customers informed, enhancing satisfaction
          and transparency. We also plan to introduce subscription services for
          specific product categories, offering convenience and savings for
          regular purchases. As part of our global expansion, NextBuy will
          introduce multi-currency and multi-language support to cater to
          international customers. Finally, integrating social commerce will
          allow customers to shop directly through social media platforms,
          combining engagement with seamless transactions. These innovations
          will position NextBuy at the forefront of e-commerce, offering a
          smarter, more efficient, and personalized shopping experience.
        </p>
      </div>
      {/* Tech Stack Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Our Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {[
            "Next.js",
            "React",
            "Tailwind CSS",
            "Node.js",
            "MongoDB",
            "Vercel",
            "Mongoose",
            "Typescript",
            "Redux",
          ].map((tech, i) => (
            <span
              key={i}
              className="bg-black px-4 py-2 rounded-lg shadow text-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
