"use client";
import React, { useState } from "react";

// react icons
import { IoIosClose, IoIosSearch } from "react-icons/io";
import { CiMenuFries, CiSearch } from "react-icons/ci";

import { Button } from "./ui/button";
import Image from "next/image";
import logo from "../../public/assets/logo.jpg";
import { FiMenu } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <div>
      <nav className="flex items-center justify-between w-full relative bg-white rounded-full px-[10px] py-0">
        {/* logo */}
        <Image
          src={logo}
          alt="logo"
          // className="w-[55px]"
          className="bg-cover"
          width={200}
          height={150}
        />

        {/* nav links */}
        <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            home
          </li>

          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            shop
          </li>

          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            blog
          </li>

          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            pages
          </li>
          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            elements
          </li>
          <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
            buy
          </li>
        </ul>

        {/* action buttons */}
        <div className="gap-[10px] flex ">
          {/* <button className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize hover:text-[#3B9DF8] transition-all duration-300 sm:flex hidden">
            Sign in
          </button>
          <button className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize bg-[#3B9DF8] text-white hover:bg-blue-400 transition-all duration-300 sm:flex hidden">
            Sign up
          </button> */}

          {/* <CiMenuFries
            className="text-[1.8rem] mr-1 text-[#424242]c cursor-pointer md:hidden flex"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          /> */}
          <FiMenu
            // className="w-[150px]"
            className="text-[40px] -mr-0 mb-4 text-[#424242]c cursor-pointer md:hidden flex"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />
        </div>

        <div className="hidden md:flex  items-center gap-5">
          <CiSearch size={30} />
          <IoCartOutline size={30} />
        </div>

        {/* mobile sidebar */}
        <aside
          className={` ${
            mobileSidebarOpen
              ? "translate-x-0 opacity-100 z-20"
              : "translate-x-[200px] opacity-0 z-[-1]"
          } md:hidden bg-white p-4 text-center absolute top-[65px] right-0 w-full sm:w-[50%] rounded-md transition-all duration-300`}
        >
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="text-gray-600 hover:text-[#3B9DF8] transition-all duration-300"
            >
              <IoIosClose className="text-[40px]" />
            </button>
          </div>

          <div className="relative mb-5">
            <input
              className="py-1.5 pr-4 w-full pl-10 rounded-full border border-gray-200 outline-none focus:border-[#3B9DF8]"
              placeholder="Search..."
            />
            {/* <IoIosSearch className="absolute top-[8px] left-3 text-gray-500 text-[1.3rem]" /> */}
          </div>
          <ul className="items-center gap-[20px] text-[1rem] text-gray-600 flex flex-col">
            <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
              home
            </li>

            <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
              features
            </li>

            <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
              blogs
            </li>

            <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
              shop
            </li>
          </ul>
          <div className="flex flex-col mt-5 justify-center items-center mx-auto">
            <CiSearch size={30} />
            <IoCartOutline size={30} />
          </div>
        </aside>
      </nav>
    </div>
  );
};

export default Navbar;
