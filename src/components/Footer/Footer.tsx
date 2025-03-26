"use client";

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
   return (
      <footer className='bg-white text-black border-t border-gray-300'>
         <div className='max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8'>
            {/* Brand & Contact */}
            <div>
               <h2 className='text-2xl font-bold text-black'>NextBuy</h2>
               <p className='mt-2 text-gray-600'>
                  Your one-stop destination for top-quality products and unbeatable deals.
               </p>
               <p className='mt-4 text-gray-600 flex items-center'>
                  📍 451 Wall Street, London, UK
               </p>
               <p className='text-gray-600'>📞 (064) 332-1233</p>
               <p className='text-gray-600'>📠 Fax: (099) 453-1357</p>
            </div>

            {/* Recent Posts */}
            <div>
               <h3 className='text-lg font-semibold text-black'>Recent Posts</h3>
               <div className='mt-4 space-y-4'>
                  <div className='flex items-center space-x-3'>
                     <Image
                        src='/post1.jpg'
                        alt='Post 1'
                        width={60}
                        height={60}
                        className='rounded-md'
                     />
                     <div>
                        <Link href='#' className='text-gray-700 hover:text-green-500'>
                           A companion for extra sleeping
                        </Link>
                        <p className='text-gray-500 text-sm'>July 23, 2016</p>
                     </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Image
                        src='/post2.jpg'
                        alt='Post 2'
                        width={60}
                        height={60}
                        className='rounded-md'
                     />
                     <div>
                        <Link href='#' className='text-gray-700 hover:text-green-500'>
                           Outdoor seating inspiration
                        </Link>
                        <p className='text-gray-500 text-sm'>July 23, 2016</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Our Stores */}
            <div>
               <h3 className='text-lg font-semibold text-black'>Our Stores</h3>
               <ul className='mt-4 space-y-2 text-gray-700'>
                  <li>
                     <Link href='#'>New York</Link>
                  </li>
                  <li>
                     <Link href='#'>London SF</Link>
                  </li>
                  <li>
                     <Link href='#'>Edinburgh</Link>
                  </li>
                  <li>
                     <Link href='#'>Los Angeles</Link>
                  </li>
                  <li>
                     <Link href='#'>Chicago</Link>
                  </li>
                  <li>
                     <Link href='#'>Las Vegas</Link>
                  </li>
               </ul>
            </div>

            {/* Useful Links */}
            <div>
               <h3 className='text-lg font-semibold text-black'>Useful Links</h3>
               <ul className='mt-4 space-y-2 text-gray-700'>
                  <li>
                     <Link href='#'>Privacy Policy</Link>
                  </li>
                  <li>
                     <Link href='#'>Returns</Link>
                  </li>
                  <li>
                     <Link href='#'>Terms & Conditions</Link>
                  </li>
                  <li>
                     <Link href='#'>Contact Us</Link>
                  </li>
                  <li>
                     <Link href='#'>Latest News</Link>
                  </li>
                  <li>
                     <Link href='#'>Our Sitemap</Link>
                  </li>
               </ul>
            </div>
         </div>

         {/* Bottom Section */}
         <div className='bg-gray-100 py-4 text-center text-gray-600 border-t border-gray-300'>
            <p>NextBuy © {new Date().getFullYear()} - All Rights Reserved.</p>
         </div>
      </footer>
   );
};

// All Rights Reserved.
export default Footer;
