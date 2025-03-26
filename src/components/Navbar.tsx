"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Icons
import { CiSearch } from "react-icons/ci";
import { IoCartOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { FaPhone, FaRegUser } from "react-icons/fa";

// Logo import - replace with your actual logo path
import logo2 from "../../public/assets/logo-2.png";
import { MdEmail } from "react-icons/md";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (

    <header className="fixed top-0 left-0 w-full z-50 bg-white ">
      <div className="container mx-auto px-4">
        {/* Top Information Bar */}
        <div className="hidden md:flex justify-between items-center py-2 border-b border-gray-200">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <FaPhone /> +1 (234) 567-890
            </span>
            <span className="flex items-center gap-2">
              <MdEmail /> XTEMOS@EMAIL.COM
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600 uppercase">
            <Link href="/newsletter">Newsletter</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/faq">Faq</Link>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/login">Login</Link>
            <Link
              href="/subscribe"
              className="flex items-center px-2 py-4 rounded-3xl text-white bg-[#43B02A]"
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
          <Link href="/" className="mx-auto md:mx-0">
            <Image
              src={logo2}
              alt="Logo"
              width={200}
              height={50}
              className="bg-transparent"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 uppercase font-medium">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/shop" className="hover:text-blue-600 transition">
              Shop
            </Link>
            <Link href="/categories" className="hover:text-blue-600 transition">
              Categories
            </Link>
            <Link href="/blog" className="hover:text-blue-600 transition">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition">
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
