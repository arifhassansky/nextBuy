'use client';

import Image from 'next/image';
import Link from 'next/link';
import Spark from '../../../public/assets/Spark-Pro.jpg';
import pexels from '../../../public/assets/pexels.jpg';

const Footer = () => {
   return (
      <footer className='bg-white text-black border-t border-gray-300'>
         <div className='w-11/12 mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8'>
            {/* Brand & Contact */}
            <div>
               <h2 className='text-2xl md:text-4xl font-bold text-black'>NextBuy</h2>
               <p className='mt-2 text-gray-600'>
                  Condimentum adipiscing vel neque dis nam parturient orci at scelerisque neque dis
                  nam parturient.
               </p>
               <p className='mt-4 text-gray-600 flex items-center'>
                  📍 <span className='font-bold'>451 Wall Street, London, UK</span>
               </p>
               <p className='text-gray-600'>
                  📞 <span className='font-bold'>(064) 332-1233</span>
               </p>
               <p className='text-gray-600'>
                  📠 <span className='font-bold'>Fax: (099) 453-1357</span>
               </p>
            </div>

            {/* Recent Posts */}
            <div>
               <h3 className='text-2x md:text-2xl font-bold text-black'>Recent Posts</h3>
               <div className='mt-4 space-y-4'>
                  <div className='flex items-center space-x-3'>
                     <Image
                        src={Spark}
                        alt='Post 1'
                        width={60}
                        height={60}
                        className='rounded-md'
                     />
                     <div>
                        <Link href='#' className='text-gray-700 hover:text-green-500'>
                           Your Phone, Your Ultimate Companion
                        </Link>
                        <p className='text-gray-500 text-sm'>July 23, 2016</p>
                     </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                     <Image
                        src={pexels}
                        alt='Post 2'
                        width={60}
                        height={60}
                        className='rounded-md'
                     />
                     <div>
                        <Link href='#' className='text-gray-700 hover:text-green-500'>
                           The Perfect Computer for Seamless Productivity
                        </Link>
                        <p className='text-gray-500 text-sm'>July 23, 2016</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Our Stores */}
            <div>
               <h3 className='text-2x md:text-2xl font-bold text-black'>Our Stores</h3>
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
               <h3 className='text-2x md:text-2xl font-bold text-black'>Useful Links</h3>
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
         <div className='bg-gray-100 py-4 px-6 text-gray-600 border-t font-medium border-gray-300'>
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center text-center'>
               <p className='text-sm md:text-base'>
                  <span className='font-bold text-black'>NEXTBUY</span> © {new Date().getFullYear()}
                  - CREATED BY <span className='font-bold'>NEXTBUY STUDIO</span>.{' '}
                  <span className='text-sm md:text-base font-bold'>
                     PREMIUM E-COMMERCE SOLUTIONS.
                  </span>
               </p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
