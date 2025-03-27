"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import logo2 from "../../../public/assets/logo-2.png";

// react icons
import {
  MdAddAPhoto,
  MdAddToPhotos,
  MdDashboard,
  MdManageAccounts,
  MdOutlineAssignmentReturned,
} from "react-icons/md";
import { GoSidebarCollapse } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import { FaAddressBook, FaHandshakeAngle, FaUsers } from "react-icons/fa6";
import { FaHistory, FaHome, FaUserEdit, FaUsersCog } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import useLoadUser from "@/hooks/UseloadUser";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const pathname = usePathname();

  // const { user } = useLoadUser();
  // console.log(user);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  console.log(userEmail);

  const user = "";
  // Helper function to check active link
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <aside
      className={`bg-[#061A3A] transition-all duration-300 ease min-h-screen ${
        isCollapse && "w-56 md:w-64 lg:w-72"
      }`}
    >
      {/* logo and collapse */}
      <div
        className={` ${
          isCollapse ? "px-[20px]" : "px-[10px]"
        } transition-all duration-300 ease-in-out`}
      >
        {isCollapse ? (
          <div className="flex items-center justify-between gap-2 pt-6">
            {/* logo */}
            <div className="grid place-items-center">
              <Image
                className="w-20 flex justify-center items-center"
                src="/public/assets/logo-2.png"
                alt="Elite Travels Logo"
                width={8}
                height={8}
              />
              <span className="text-2xl font-semibold transition-all duration-300 text-gray-200">
                Elite Explore
              </span>
            </div>

            {/* collapse icon */}
            <div className="relative group mb-8">
              <GoSidebarCollapse
                className="text-2xl cursor-pointer text-gray-400"
                onClick={() => setIsCollapse(false)}
              />

              {/*colapse icon tooltip */}
              <div
                className={`absolute -top-1 right-[-115px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Collapse
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Image
            src={logo2}
            alt="logo"
            width={120}
            height={120}
            className={`${
              isCollapse ? "w-16" : "w-12"
            } mx-auto cursor-pointer pt-8`}
            onClick={() => setIsCollapse(!isCollapse)}
          />
        )}
      </div>

      {/* profile section */}
      <div
        className={`${
          isCollapse ? "justify-between" : "justify-center"
        }  py-3 px-[20px] flex items-center mt-10`}
      >
        <div className="flex items-center justify-center gap-2">
          <Image
            src={user?.image}
            width={50}
            height={50}
            alt="avatar"
            className={`${
              isCollapse ? "w-14 h-14" : "w-8"
            } cursor-pointer rounded-full object-cover`}
          />

          <h3
            className={`${
              isCollapse ? "inline" : "hidden"
            }  text-gray-300 font-[500]`}
          >
            {user?.name}
          </h3>
          <h3
            className={`${
              isCollapse ? "inline" : "hidden"
            }  text-gray-300 bg-primary text-center px-2 text-sm rounded-3xl font-meduim`}
          >
            {user?.role}
          </h3>
        </div>
      </div>

      {/* general section */}
      <div
        className={`mt-6 ${
          isCollapse ? "px-[20px]" : "px-[10px]"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Gerneral user routes */}
        {user?.role === "user" && (
          <div className="mt-3 flex flex-col gap-[5px]">
            {/* manage profile */}
            <Link
              href="/dashboard/profile"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/profile")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaUserEdit className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Manage Profile
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Profile
                </p>
              </div>
            </Link>

            {/* my bookings */}
            <Link
              href="/dashboard/my-bookings"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/my-bookings")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaAddressBook className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  My Bookings
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  My Bookings
                </p>
              </div>
            </Link>

            {/* add stories */}
            <Link
              href="/dashboard/add-stories"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/add-stories")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <MdAddAPhoto className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Add Stories
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Add Stories
                </p>
              </div>
            </Link>

            {/* manage stories */}
            <Link
              href="/dashboard/manage-stories"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/manage-stories")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <MdManageAccounts className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Manage Stories
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Stories
                </p>
              </div>
            </Link>

            {/* Join as Tour Guide */}
            <Link
              href="/dashboard/join-guide"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/join-guide")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaHandshakeAngle className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Join as Tour Guide
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Join as Tour Guide
                </p>
              </div>
            </Link>

            {/* payment history */}
            <Link
              href="/dashboard/payment-history"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/payment-history")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaHistory className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Payment History
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Payment History
                </p>
              </div>
            </Link>
          </div>
        )}

        {/* guide routes */}
        {user?.role === "guide" && (
          <div className="mt-3 flex flex-col gap-[5px]">
            {/* manage profile */}
            <Link
              href="/dashboard/profile"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/profile")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaUserEdit className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Manage Profile
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Profile
                </p>
              </div>
            </Link>

            {/* My assigned tours */}
            <Link
              href="/dashboard/my-assigned-tours"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/my-assigned-tours")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <MdOutlineAssignmentReturned className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  My Assigned Tours
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  My Assigned Tours
                </p>
              </div>
            </Link>

            {/* add stories */}
            <Link
              href="/dashboard/add-stories"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/add-stories")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <MdAddAPhoto className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Add Stories
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Add Stories
                </p>
              </div>
            </Link>

            {/* manage stories */}
            <Link
              href="/dashboard/manage-stories"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/manage-stories")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <MdManageAccounts className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Manage Stories
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Stories
                </p>
              </div>
            </Link>
          </div>
        )}

        {/* admin routes */}
        {user?.role === "admin" && (
          <div className="mt-3 flex flex-col gap-[5px]">
            {/* Admin Dashboard */}
            <Link
              href="/dashboard/admin"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/admin")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <MdDashboard className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Dashboard
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Dashboard
                </p>
              </div>
            </Link>

            {/* Manage Profile */}
            <Link
              href="/dashboard/profile"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/profile")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaUserEdit className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Manage Profile
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Profile
                </p>
              </div>
            </Link>

            {/* Add Package */}
            <Link
              href="/dashboard/add-package"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/add-package")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <MdAddToPhotos className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Add Package
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-130px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Add Package
                </p>
              </div>
            </Link>

            {/* Manage Users */}
            <Link
              href="/dashboard/manage-users"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/manage-users")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaUsers className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Manage Users
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-135px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Users
                </p>
              </div>
            </Link>

            {/* Manage Candidates */}
            <Link
              href="/dashboard/manage-candidates"
              className={`
                ${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                isActive("/dashboard/manage-candidates")
                  ? "bg-primary text-white"
                  : "hover:bg-white text-gray-300 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaUsersCog className="text-[1.3rem]" />
                <p
                  className={`${isCollapse ? "inline" : "hidden"} text-[1rem]`}
                >
                  Manage Candidates
                </p>
              </div>

              {/* Tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-170px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                  Manage Candidates
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* setting section */}
      <div
        className={`${
          isCollapse ? "px-[20px]" : "px-[10px]"
        } mt-6 border-t border-gray-200  transition-all duration-300 ease-in-out`}
      >
        <div className="mt-3 flex flex-col gap-[5px]">
          {/* Home */}
          <Link
            href="/"
            className={`${
              isCollapse ? "justify-between" : "justify-center"
            } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
          >
            <div className="flex items-center gap-2">
              <FaHome className="text-[1.3rem" />
              <p className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}>
                Home
              </p>
            </div>

            {/* tooltip */}
            <div
              className={`${
                isCollapse ? "hidden" : "inline"
              } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
            >
              <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                Home
              </p>
            </div>
          </Link>
        </div>

        {/* logot button */}
        <div className="mt-3 flex flex-col gap-[5px]">
          <button
            className={`${
              isCollapse ? "justify-between" : "justify-center"
            } flex items-center w-full hover:bg-white text-gray-300 hover:text-black p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
          >
            <div className="flex items-center gap-2">
              <CiLogout className="text-[1.3rem" />
              <p className={`${isCollapse ? "inline" : "hidden"} text-[1rem] `}>
                Logout
              </p>
            </div>

            {/* tooltip */}
            <div
              className={`${
                isCollapse ? "hidden" : "inline"
              } absolute top-0 right-[-85px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
            >
              <p className="text-[0.9rem] w-max bg-primary text-white rounded px-3 py-[5px]">
                <CiLogout /> Logout
              </p>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
