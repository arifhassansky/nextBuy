'use client';
import Image from 'next/image';
import { GiSelfLove } from 'react-icons/gi';
import { IoSearch } from 'react-icons/io5';
import { MdCompareArrows } from 'react-icons/md';

interface Product {
   _id: string;
   title: string;
   price: number;
   image: string;
}

export const Card = ({ product }: { product: Product }) => {
   return (
      <div className='w-44 md:w-80 max-w-sm mx-auto rounded-2xl overflow-hidden relative group'>
         <div className='relative cursor-pointer'>
            {/* Display product image dynamically */}

            <Image
               src={product.image}
               alt={product.title}
               width={380}
               height={380}
               className='h-12 w-32 md:w-full md:h-64 object-cover'
            />
            {/* <img
               src={product.image}
               alt={product.title}
               className='h-12 w-32 md:w-full md:h-64 h-auto object-cover'
            /> */}
         </div>

         {/* BOX 1 with Animation from Left (2px) */}
         <div className='absolute inset-0 flex items-center justify-center  mb-96 md:pb-44 md:ml-64 ml-24 h-20 md:h-96'>
            <div className='text-lg font-semibold text-gray-800 opacity-0 translate-x-[2px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-300'>
               <div className='bg-[#e1ebf5] p-1 rounded-sm shadow-md flex flex-col items-center justify-center md:space-y-4 space-y-2 h-auto'>
                  <h1 className='cursor-pointer'>
                     <MdCompareArrows size={30} />
                  </h1>
                  <h1 className='cursor-pointer'>
                     <IoSearch size={20} />
                  </h1>
                  <h1 className='cursor-pointer'>
                     <GiSelfLove size={20} />
                  </h1>
               </div>
            </div>
         </div>

         {/* BOX 2 (Add to Cart Button) with Animation from Right */}
         <div className='absolute inset-0 flex items-center justify-center md:pt-40 mb-10 w-[80%] md:w-full'>
            <button className='bg-[#2a61b4] text-white md:h-10 h-8 w-full rounded-b-lg shadow-lg opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200 cursor-pointer'>
               Add to Cart
            </button>
         </div>

         {/* Product Info */}
         <div className='p-5  '>
            <p className='text-lg font-semibold text-gray-800'>
               {window.innerWidth < 768
                  ? product.title.split(' ').slice(0, 4).join(' ') +
                    (product.title.split(' ').length > 10 ? '...' : '')
                  : product.title}{' '}
               - <span className='text-blue-600'>{product.price}</span>
            </p>

            <p className='text-xl  font-bold text-green-600 mt-1'>
               ${product.price.toFixed(2)} {/* Format the price */}
            </p>
         </div>
      </div>
   );
};
