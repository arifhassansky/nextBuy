"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Icons
import { CiHeart, CiSearch } from "react-icons/ci";
import { FaPhone, FaRegUser, FaTasks } from "react-icons/fa";
import {
  IoCartOutline,
  IoCloseOutline,
  IoMenuOutline,
  IoSettingsOutline,
} from "react-icons/io5";

// Logo import - replace with your actual logo path
import { IoIosArrowUp, IoIosSearch } from "react-icons/io";
import nextbuy from "../../../public/assets/nextbuy-logo.png";

import { MdEmail, MdOutlineArrowRightAlt } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProductHover, setIsProductHover] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white pb-2">
      <div className="w-11/12 mx-auto px-4">
        {/* Top Information Bar */}
        <div className="hidden lg:flex justify-between items-center py-2 border-b border-gray-200">
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <FaPhone color="#43b02a" /> +1 (234) 567-890
            </span>
            <span className="flex items-center gap-1">
              <MdEmail color="#43b02a" /> XTEMOS@EMAIL.COM
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600 uppercase">
            <Link className="flex items-center gap-1" href="/newsletter">
              <MdEmail /> Newsletter |
            </Link>
            <Link href="/contact">Contact Us |</Link>
            <Link href="/faq">Faq |</Link>

            <Link href="/auth/login">Login |</Link>
            <Link
              href="/subscribe"
              className="flex items-center px-3 py-2 rounded-[35px] text-white bg-[#43B02A]"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between ">
          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="md:hidden text-3xl">
            {isMobileMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>

          {/* Logo */}
          <Link href="/" className="w-48">
            <Image
              src={nextbuy}
              alt="Logo"
              width={150}
              height={150}
              className="object-cover"
            />
          </Link>

          <div className="relative md:flex hidden">
            <input
              className="py-1 pr-4 border border-text pl-10 rounded-full outline-none focus:border-[#3B9DF8]"
              placeholder="Search..."
            />
            <IoIosSearch className="absolute top-[9px] left-3 text-[#424242] text-[1.3rem]" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex  space-x-6 uppercase font-medium relative">
            <Link
              href="/"
              className="hover:text-[#43b02a] transition flex items-center gap-1"
            >
              Home
            </Link>

            <Link
              onMouseEnter={() => setIsProductHover(true)}
              onMouseLeave={() => setIsProductHover(false)}
              href="/shop"
              className="hover:text-[#43b02a] transition flex items-center gap-1"
            >
              Shop
              <IoIosArrowUp
                className={`${
                  isProductHover ? "rotate-0" : "rotate-[-180deg]"
                } transition-all duration-300`}
              />
              {isProductHover && (
                <div
                  className={`${
                    isProductHover
                      ? "translate-y-0 opacity-100 z-30"
                      : "translate-y-[20px] opacity-0 z-[-1]"
                  } bg-white rounded-md w-full absolute top-[40px] left-0 p-[30px] transition-all duration-600 boxShadow flex flex-wrap gap-[30px]`}
                >
                  <div className="grid grid-cols-2 gap-[30px]">
                    <div className="flex flex-col gap-[20px]">
                      <h3 className="text-[1.2rem] text-gray-500 font-[500]">
                        More Products
                      </h3>

                      <div className="flex float-start gap-[10px] group">
                        <Image
                          src="https://i.ibb.co/LQBDJGD/icon-logo-container.png"
                          alt="image"
                          width={50}
                          height={50}
                          className="w-[30px] h-[30px]"
                        />

                        <div>
                          <h1 className="text-[1rem] text-gray-600 font-[500]">
                            Demo App
                          </h1>
                          <p className="text-[0.9rem] text-gray-400 font-[300]">
                            Lorem ipsum dolor sit amet, consect adipiscing elit
                          </p>

                          <button className="text-[#FF5E5E] mt-2 flex items-center gap-[4px] text-[0.9rem]">
                            Call to action
                            <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                          </button>
                        </div>
                      </div>
                      <div className="flex float-start gap-[10px] group">
                        <Image
                          src="https://i.ibb.co/Y8cRWRj/icon-logo-container-1.png"
                          alt="image"
                          width={50}
                          height={50}
                          className="w-[30px] h-[30px]"
                        />

                        <div>
                          <h1 className="text-[1rem] text-gray-600 font-[500]">
                            CRM
                          </h1>
                          <p className="text-[0.9rem] text-gray-400 font-[300]">
                            Lorem ipsum dolor sit amet, consect adipiscing elit
                          </p>

                          <button className="text-[#FE9239] mt-2 flex items-center gap-[4px] text-[0.9rem]">
                            Call to action
                            <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                          </button>
                        </div>
                      </div>
                      <div className="flex float-start gap-[10px] group">
                        <Image
                          src="https://i.ibb.co/6bGWgp6/icon-logo-container-2.png"
                          alt="image"
                          width={50}
                          height={50}
                          className="w-[30px] h-[30px]"
                        />

                        <div>
                          <h1 className="text-[1rem] text-gray-600 font-[500]">
                            CMS
                          </h1>
                          <p className="text-[0.9rem] text-gray-400 font-[300]">
                            Lorem ipsum dolor sit amet, consect adipiscing elit
                          </p>

                          <button className="text-[#8B5CF6] mt-2 flex items-center gap-[4px] text-[0.9rem]">
                            Call to action
                            <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[20px]">
                      <h3 className="text-[1.2rem] text-gray-500 font-[500]">
                        Ecosystem
                      </h3>

                      <div className="flex float-start gap-[10px]">
                        {/* <BsBuildings className="text-[1.4rem] text-gray-600" /> */}

                        <div>
                          <h1 className="text-[1rem] text-gray-600 font-[500]">
                            Directory
                          </h1>
                          <p className="text-[0.9rem] text-gray-400 font-[300]">
                            Lorem ipsum dolor sit amet, consect adipiscing elit
                          </p>
                        </div>
                      </div>
                      <div className="flex float-start gap-[10px]">
                        {/* <BsCalendar2Date className="text-[1.4rem] text-gray-600" /> */}

                        <div>
                          <h1 className="text-[1rem] text-gray-600 font-[500] ">
                            Bookings
                          </h1>
                          <p className="text-[0.9rem] text-gray-400 font-[300]">
                            Lorem ipsum dolor sit amet, consect adipiscing elit
                          </p>
                        </div>
                      </div>
                      <div className="flex float-start gap-[10px]">
                        {/* <TbUsersGroup className="text-[1.4rem] text-gray-600" /> */}

                        <div>
                          <h1 className="text-[1rem] text-gray-600 font-[500]">
                            User feedback
                          </h1>
                          <p className="text-[0.9rem] text-gray-400 font-[300]">
                            Lorem ipsum dolor sit amet, consect adipiscing elit
                          </p>
                        </div>
                      </div>
                      <div className="flex float-start gap-[10px]">
                        <FaTasks className="text-[1.4rem] text-gray-600" />

                        <div>
                          <h1 className="text-[1rem] text-gray-600 font-[500]">
                            Task Manager
                          </h1>
                          <p className="text-[0.9rem] text-gray-400 font-[300]">
                            Lorem ipsum dolor sit amet, consect adipiscing elit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Link>

            <Link
              href="/categories"
              className="hover:text-[#43b02a] transition flex items-center gap-1"
            >
              Categories
            </Link>
            <Link
              href="/blog"
              className="hover:text-[#43b02a] transition flex items-center gap-1"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#43b02a] transition flex items-center gap-1"
            >
              Contact
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-6">
            <Link className="flex items-center gap-1 relative" href="/wishlist">
              <CiHeart size={20} /> Wishlist
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>{" "}
            <Link href="/cart" className="text-2xl relative">
              <IoCartOutline />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>
            {/* user account */}
            <div className="flex items-center gap-[15px]">
              <div
                className="flex items-center gap-[10px] cursor-pointer relative"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              >
                <div className="relative">
                  <Image
                    src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1724605498~exp=1724609098~hmac=7f6fc106bae2c17b0c93af1b2e5483d9d8368f3e51284aaec7c7d50590d2bae5&w=740"
                    alt="avatar"
                    width={35}
                    height={35}
                    className="w-[35px] h-[35px] rounded-full object-cover"
                  />
                  <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
                </div>

                <h1 className="text-[1rem] font-[400] text-gray-600 sm:block hidden">
                  Dhon Deo
                </h1>

                <div
                  className={`${
                    accountMenuOpen
                      ? "translate-y-0 opacity-100 z-[1]"
                      : "translate-y-[10px] opacity-0 z-[-1]"
                  } bg-white w-max rounded-md absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
                >
                  <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                    <FiUser />
                    View Profile
                  </p>
                  <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                    <IoSettingsOutline />
                    Settings
                  </p>

                  <div className="mt-3 border-t border-gray-200 pt-[5px]">
                    <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50">
                      <TbLogout2 />
                      Logout
                    </p>
                  </div>
                </div>

                <IoIosArrowUp
                  className={`${
                    accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
                  } transition-all duration-300 text-gray-600 sm:block hidden`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
            <nav className="flex flex-col divide-y">
              <Link href="/" className="p-4 hover:bg-gray-100">
                Home
              </Link>
              <Link href="/shop" className="p-4 hover:bg-gray-100">
                Shop
              </Link>
              <Link href="/categories" className="p-4 hover:bg-gray-100">
                Categories
              </Link>
              <Link href="/blog" className="p-4 hover:bg-gray-100">
                Blog
              </Link>
              <Link href="/contact" className="p-4 hover:bg-gray-100">
                Contact
              </Link>
            </nav>
          </div>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Search</h2>
                <button onClick={toggleSearch} className="text-2xl">
                  <IoCloseOutline />
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full p-3 border rounded-lg pr-10"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CiSearch className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
