"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Icons
import { CiHeart, CiSearch } from "react-icons/ci";
import { IoCartOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { FaPhone, FaRegUser, FaTasks } from "react-icons/fa";

// Logo import - replace with your actual logo path
import logo2 from "../../public/assets/logo-2.png";
import logo from "../../public/assets/logo.jpg";
import nextbuy from "../../public/assets/nextbuy-logo.png";

import { MdEmail, MdOutlineArrowRightAlt } from "react-icons/md";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProductHover, setIsProductHover] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white pb-5">
      <div className="container mx-auto px-4">
        {/* Top Information Bar */}
        <div className="hidden md:flex justify-between items-center py-2 border-b border-gray-200">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
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
            <Link className="flex items-center gap-1" href="/wishlist">
              <CiHeart size={20} /> Wishlist |
            </Link>{" "}
            <Link href="/login">Login |</Link>
            <Link
              href="/subscribe"
              className="flex items-center px-3 py-2 rounded-[35px] text-white bg-[#43B02A]"
            >
              Subscribe Us
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
            <Image src={nextbuy} alt="Logo" className="object-cover" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 uppercase font-medium">
            <Link
              href="/"
              className="hover:text-[#43b02a] transition"
              onMouseEnter={() => setIsProductHover(true)}
              onMouseLeave={() => setIsProductHover(false)}
            >
              Home
            </Link>

            <div
              className={`${
                isProductHover
                  ? "translate-y-0 opacity-100 z-30"
                  : "translate-y-[20px] opacity-0 z-[-1]"
              } bg-white rounded-md w-full absolute top-[40px] left-0 p-[30px] transition-all duration-300 boxShadow flex flex-wrap gap-[30px]`}
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
            <Link
              onMouseEnter={() => setIsProductHover(true)}
              onMouseLeave={() => setIsProductHover(false)}
              href="/shop"
              className="hover:text-[#43b02a] transition"
            >
              Shop
            </Link>
            <Link
              onMouseEnter={() => setIsProductHover(true)}
              onMouseLeave={() => setIsProductHover(false)}
              href="/categories"
              className="hover:text-[#43b02a] transition"
            >
              Categories
            </Link>
            <Link
              onMouseEnter={() => setIsProductHover(true)}
              onMouseLeave={() => setIsProductHover(false)}
              href="/blog"
              className="hover:text-[#43b02a] transition"
            >
              Blog
            </Link>
            <Link
              onMouseEnter={() => setIsProductHover(true)}
              onMouseLeave={() => setIsProductHover(false)}
              href="/contact"
              className="hover:text-[#43b02a] transition"
            >
              Contact
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleSearch} className="text-2xl">
              <CiSearch />
            </button>
            <Link href="/account" className="text-2xl md:hidden">
              <FaRegUser />
            </Link>
            <Link href="/cart" className="text-2xl relative">
              <IoCartOutline />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>
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
