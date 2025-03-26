'use client';
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
      <div className='w-80 max-w-sm mx-auto rounded-2xl overflow-hidden relative group'>
         <div className='relative cursor-pointer'>
            {/* Display product image dynamically */}
            <img src={product.image} alt={product.title} className='w-full h-auto' />
         </div>

         {/* BOX 1 with Animation from Left (2px) */}
         <div className='absolute inset-0 flex items-center justify-center mb-44 ml-64'>
            <div className='text-lg font-semibold text-gray-800 opacity-0 translate-x-[2px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-300'>
               <div className='bg-[#e1ebf5] p-1 rounded-sm shadow-md flex flex-col items-center justify-center space-y-4 h-auto'>
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
         <div className='absolute inset-0 flex items-center justify-center mt-36'>
            <button className='bg-[#2a61b4] text-white h-10 w-full rounded-b-lg shadow-lg opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200 cursor-pointer'>
               Add to Cart
            </button>
         </div>

         {/* Product Info */}
         <div className='p-5 shadow-md '>
            <p className='text-lg font-semibold text-gray-800'>
               {product.title} - <span className='text-blue-600'>{product.price}</span>
            </p>
            <p className='text-xl  font-bold text-green-600 mt-1'>
               ${product.price.toFixed(2)} {/* Format the price */}
            </p>
         </div>
      </div>
   );
};
