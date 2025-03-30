"use client";
import Image from "next/image";
import coverPic from "../../../../public/assets/profileCover.jpg";
import { useSession } from "next-auth/react";

const UserProfile = () => {
  const { data: session } = useSession();

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-20">
      {/* Cover Image */}
      <div className="relative h-48">
        <Image src={coverPic} alt="Cover" layout="fill" objectFit="cover" />
      </div>

      {/* Profile Image */}
      <div className="relative flex flex-col items-center -mt-12">
        <Image
          src={session?.user?.image || ""}
          alt="Profile"
          width={120}
          height={120}
          className="rounded-full border-4 border-white shadow-lg object-cover"
        />
        <span className="mt-2 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
          {session?.user?.role}
        </span>
      </div>

      {/* User Info */}
      <div className="text-center p-4">
        <p className="text-gray-700 text-lg font-medium">
          User ID:
          <span className="font-mono"> {session?.user?.id}</span>
        </p>
      </div>

      {/* Name & Email Section */}
      <div className="grid grid-cols-2 bg-gray-100 p-4 text-center">
        <div>
          <p className="text-gray-500">Name</p>
          <p className="font-semibold">ARIF HASSAN</p>
        </div>
        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-semibold">arifskypro@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
