'use client';
import { GiSelfLove } from 'react-icons/gi';
import { IoSearch } from 'react-icons/io5';
import { MdCompareArrows } from 'react-icons/md';

const Card = () => {
   return (
      <div className='max-w-sm mx-auto rounded-2xl overflow-hidden relative group'>
         <div className='relative cursor-pointer'>
            <img src='https://iili.io/3T4pY0v.md.webp' alt='' className='w-full h-auto' />
         </div>

         {/* BOX 1 with Animation from Left (2px) */}

         <div className='absolute inset-0 flex items-center justify-center mb-44 ml-80'>
            <div className='text-lg font-semibold text-gray-800 opacity-0 translate-x-[2px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-300'>
               <div className='bg-[#e1ebf5] p-2 rounded-sm shadow-md flex flex-col items-center justify-center space-y-4 h-auto'>
                  <h1 className='cursor-pointer'>
                     <MdCompareArrows size={30} />
                  </h1>
                  <h1 className='cursor-pointer'>
                     <IoSearch size={25} />
                  </h1>
                  <h1 className='cursor-pointer'>
                     <GiSelfLove size={25} />
                  </h1>
               </div>
            </div>
         </div>

         {/* BOX 2 (Add to Cart Button) with Animation from Right */}

         <div className='absolute inset-0 flex items-center justify-center mt-32'>
            <button className='bg-[#2a61b4] text-white h-10 w-full rounded-b-lg shadow-lg opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200 cursor-pointer'>
               Add to Cart
            </button>
         </div>
         {/* Product Info */}
         <div className='p-5'>
            <p className='text-lg text-center font-semibold text-gray-800'>
               iPhone 16 Pro Max - <span className='text-blue-600'>Blue Color</span>
            </p>
            <p className='text-xl  text-center font-bold text-green-600 mt-1'>$1,199.00</p>
         </div>
      </div>
   );
};

export default Card;
