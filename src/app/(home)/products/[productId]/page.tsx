'use client';

import { addToCart } from '@/redux/features/addToCardSlice/AddToCardSlice';
import { addToWishlist } from '@/redux/features/wishlist/wishlistSlice';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { CiDeliveryTruck, CiStar } from 'react-icons/ci';
import { FiCpu, FiLoader, FiSmartphone } from 'react-icons/fi';
import { GoVerified } from 'react-icons/go';
import { IoMdCamera } from 'react-icons/io';
import { IoStorefrontOutline } from 'react-icons/io5';
import { MdBatteryChargingFull } from 'react-icons/md';
import { TbLoader3 } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import s1 from '../../../../../public/assets/shipping1.jpg';
import s2 from '../../../../../public/assets/shipping2.jpg';

// Define Product interface
interface Product {
   _id: string;
   title: string;
   slug: string;
   description: string;
   price: number;
   image: string;
   category: string;
   quantity: number;
   createdAt: string;
   images: string[]; // Updated to string[] since images are URLs
}

// Define FormData interface
interface FormData {
   name: string;
   email: string;
   rating: number;
   reviewTitle: string;
   reviewText: string;
   recommended: boolean | null;
}

export default function ProductDetailsPage() {
   const params = useParams<{ productId: string }>(); // Type params with productId
   const [product, setProduct] = useState<Product | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [selectedImage, setSelectedImage] = useState(0);
   const [isFavorite, setIsFavorite] = useState(false);
   const [formData, setFormData] = useState<FormData>({
      name: '',
      email: '',
      rating: 0,
      reviewTitle: '',
      reviewText: '',
      recommended: null,
   });
   const [hover, setHover] = useState(0);

   // Type event for input/textarea changes
   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
         ...prevState,
         [name]: value,
      }));
   };

   // Type currentRating as number
   const handleRatingChange = (currentRating: number) => {
      setFormData(prevState => ({
         ...prevState,
         rating: currentRating,
      }));
   };

   // Type event for form submission
   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('Review Submitted:', formData);
      // Add your submit logic here
   };

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products/${params.productId}`);

            if (!response.ok) {
               throw new Error('Failed to fetch product');
            }

            const result = await response.json();

            if (result.success) {
               setProduct(result.data);
            } else {
               throw new Error(result.message || 'Unknown error occurred');
            }
         } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
         } finally {
            setIsLoading(false);
         }
      }

      if (params.productId) {
         fetchProductDetails();
      }
   }, [params.productId]);

   const dispatch = useDispatch();
   const handleAddToCart = (id: string) => {
      dispatch(addToCart(id));
   };
   const handleAddToWishlist = (id: string) => {
      dispatch(addToWishlist(id));
   };

   if (isLoading) {
      return (
         <>
            <div className='w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]'></div>
            <FiLoader className='text-[2.8rem] animate-spin text-[#3B9DF8]' />
            <TbLoader3 className='text-[2.8rem] animate-spin text-[#3B9DF8]' />
         </>
      );
   }

   if (error) {
      return <div className='flex justify-center items-center h-screen text-red-500'>{error}</div>;
   }

   if (!product) {
      return <div className='flex justify-center items-center h-screen'>Product not found</div>;
   }

   return (
      <div className='w-11/12 mx-auto md:px-8 md:py-12 mt-32'>
         <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Left side - Image gallery */}
            <div className='flex flex-col-reverse gap-[15px] md:gap-0 md:flex-row'>
               {/* Thumbnails */}
               <div className='w-full md:w-[20%] flex flex-row md:flex-col md:gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 md:pr-2'>
                  {product.images.map((image, index) => (
                     <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-36 md:w-20 h-[70px] md:h-20 border-2 p-1 md:p-2 rounded-lg overflow-hidden ${
                           selectedImage === index ? 'border-[#0FABCA]' : 'border-transparent'
                        }`}
                     >
                        <Image
                           src={image}
                           fill
                           alt={`Product ${index + 1}`}
                           className='object-cover'
                        />
                     </button>
                  ))}
               </div>

               {/* Main image */}
               <div className='w-full md:w-[80%] bg-gray-100 rounded-sm relative flex items-center justify-center'>
                  <Image
                     height={800}
                     width={400}
                     src={product.images[selectedImage]}
                     alt='Product main image'
                     className='object-cover w-full h-full rounded-lg'
                  />
               </div>
            </div>

            {/* Right side - Product details */}
            <div className='flex flex-col gap-6'>
               <div>
                  <h1 className='text-[1.6rem] md:text-[1.9rem] font-bold text-gray-800'>
                     {product.title}
                  </h1>
                  <div className='flex items-center gap-2 mt-2 md:mt-5'>
                     <span className='text-3xl font-medium'>${product.price}</span>
                  </div>
               </div>

               {/* Specifications */}
               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='flex items-center gap-2 bg-gray-50 p-3 rounded-lg'>
                     <FiSmartphone className='w-5 h-5 text-gray-700' />
                     <div>
                        <p className='text-sm text-gray-500'>Screen size</p>
                        <p className='font-medium text-gray-700 text-[0.9rem]'>6.7&quot;</p>
                     </div>
                  </div>
                  <div className='flex items-center gap-2 bg-gray-50 p-3 rounded-lg'>
                     <FiCpu className='w-5 h-5 text-gray-700' />
                     <div>
                        <p className='text-sm text-gray-500'>CPU</p>
                        <p className='font-medium text-gray-700 text-[0.9rem]'>Apple A16 Bionic</p>
                     </div>
                  </div>
                  <div className='flex items-center gap-2 bg-gray-50 p-3 rounded-lg'>
                     <IoMdCamera className='w-5 h-5 text-gray-700' />
                     <div>
                        <p className='text-sm text-gray-500'>Camera</p>
                        <p className='font-medium text-gray-700 text-[0.9rem]'>48-12-12 MP</p>
                     </div>
                  </div>
                  <div className='flex items-center gap-2 bg-gray-50 p-3 rounded-lg'>
                     <MdBatteryChargingFull className='w-5 h-5 text-gray-700' />
                     <div>
                        <p className='text-sm text-gray-500'>Battery</p>
                        <p className='font-medium text-gray-700 text-[0.9rem]'>4323 mAh</p>
                     </div>
                  </div>
               </div>

               <p className='text-[0.9rem] text-gray-600'>
                  {product.description}
                  <button className='text-[#3B9DF8] hover:underline'>more...</button>
               </p>

               {/* Action buttons */}
               <div className='flex flex-col md:flex-row gap-4'>
                  <button
                     onClick={() => {
                        setIsFavorite(!isFavorite); // Toggle favorite status
                        handleAddToWishlist(product._id); // Call the function to add to wishlist
                     }}
                     className='flex-1 py-3 px-4 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50'
                  >
                     <div className='flex items-center justify-center gap-2'>
                        {isFavorite ? (
                           <BsHeartFill className='w-5 h-5 text-red-500' />
                        ) : (
                           <BsHeart className='w-5 h-5' />
                        )}
                        Add to Wishlist
                     </div>
                  </button>
                  <button
                     onClick={() => handleAddToCart(params.productId)}
                     className='flex-1 py-3 px-4 rounded-lg bg-[#0FABCA] text-white hover:bg-[#0FABCA]/90'
                  >
                     Add to Cart
                  </button>
               </div>

               {/* Delivery info */}
               <div className='flex flex-col md:flex-row gap-4 md:gap-0 justify-between mt-2'>
                  <div className='flex items-center gap-3'>
                     <CiDeliveryTruck className='text-[3rem] text-gray-500 p-3 bg-gray-100 rounded-md' />
                     <div>
                        <p className='text-sm text-gray-500'>Free Delivery</p>
                        <p className='font-medium text-[0.9rem] text-gray-800'>1-2 day</p>
                     </div>
                  </div>
                  <div className='flex items-center gap-3'>
                     <IoStorefrontOutline className='text-[3rem] text-gray-500 p-3 bg-gray-100 rounded-md' />
                     <div>
                        <p className='text-sm text-gray-500'>In Stock</p>
                        <p className='font-medium text-[0.9rem] text-gray-800'>Today</p>
                     </div>
                  </div>
                  <div className='flex items-center gap-3'>
                     <GoVerified className='text-[3rem] text-gray-500 p-3 bg-gray-100 rounded-md' />
                     <div>
                        <p className='text-sm text-gray-500'>Guaranteed</p>
                        <p className='font-medium text-[0.9rem] text-gray-800'>1 year</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Description */}
         <div className='mt-32'>
            <h3 className='text-center font-bold text-3xl'>Description</h3>
            <p className='mt-4 text-center'>{product.description}</p>
         </div>

         {/* Review */}
         <div>
            <h3 className='text-center font-bold text-2xl mt-10'>Review</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 mt-32'>
               <div>
                  <h3>Reviews</h3>
               </div>

               <div>
                  <form onSubmit={handleSubmit} className='space-y-4'>
                     {/* Name Input */}
                     <div>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                           Name *
                        </label>
                        <input
                           type='text'
                           id='name'
                           name='name'
                           required
                           value={formData.name}
                           onChange={handleChange}
                           className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                     </div>

                     {/* Email Input */}
                     <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                           Email *
                        </label>
                        <input
                           type='email'
                           id='email'
                           name='email'
                           required
                           value={formData.email}
                           onChange={handleChange}
                           className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                     </div>

                     {/* Rating */}
                     <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                           Your Rating *
                        </label>
                        <div className='flex items-center'>
                           {[...Array(5)].map((_, index) => {
                              const currentRating = index + 1;
                              return (
                                 <label key={index} className='cursor-pointer'>
                                    <input
                                       type='radio'
                                       name='rating'
                                       className='hidden'
                                       value={currentRating}
                                       onClick={() => handleRatingChange(currentRating)}
                                    />
                                    <CiStar
                                       size={30}
                                       className={`
                            ${
                               currentRating <= (hover || formData.rating)
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                            }
                            mr-1
                          `}
                                       onMouseEnter={() => setHover(currentRating)}
                                       onMouseLeave={() => setHover(0)}
                                    />
                                 </label>
                              );
                           })}
                           <span className='ml-2 text-gray-600'>
                              {formData.rating ? `${formData.rating} out of 5` : 'Select a rating'}
                           </span>
                        </div>
                     </div>

                     {/* Review Text */}
                     <div>
                        <label
                           htmlFor='reviewText'
                           className='block text-sm font-medium text-gray-700'
                        >
                           Your Review *
                        </label>
                        <textarea
                           id='reviewText'
                           name='reviewText'
                           required
                           rows={4}
                           value={formData.reviewText}
                           onChange={handleChange}
                           className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                     </div>

                     {/* Submit Button */}
                     <div>
                        <button
                           type='submit'
                           className='bg-[#43b02a] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors'
                        >
                           Submit
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>

         {/* Shipping */}
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
            <div className='w-full h-full'>
               <Image src={s1} width={400} height={200} alt='image' className='h-full' />
            </div>

            <div className='w-full h-full'>
               <Image src={s2} width={400} height={200} alt='image' className='h-full' />
            </div>

            <div>
               <h3 className='font-bold'>MAECENAS IACULIS</h3>
               <p className='mt-4'>
                  Vestibulum curae torquent diam diam commodo parturient penatibus nunc dui
                  adipiscing convallis bulum parturient suspendisse parturient a.Parturient in
                  parturient scelerisque nibh lectus quam a natoque adipiscing a vestibulum
                  hendrerit et pharetra fames nunc natoque dui.
               </p>

               <h3 className='font-bold mt-4'>ADIPISCING CONVALLIS BULUM</h3>

               <p className='mt-4'>
                  Scelerisque adipiscing bibendum sem vestibulum et in a a a purus lectus faucibus
                  lobortis tincidunt purus lectus nisl class eros.Condimentum a et ullamcorper
                  dictumst mus et tristique elementum nam inceptos hac parturient scelerisque
                  vestibulum amet elit ut volutpat.
               </p>
            </div>
         </div>
      </div>
   );
}
