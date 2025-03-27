"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FiCpu, FiLoader, FiSmartphone } from "react-icons/fi";
import { TbBasketHeart, TbLoader3 } from "react-icons/tb";
import { GoVerified } from "react-icons/go";
import { IoStorefrontOutline } from "react-icons/io5";
import { CiDeliveryTruck, CiStar } from "react-icons/ci";
import { MdBatteryChargingFull } from "react-icons/md";
import { IoMdCamera } from "react-icons/io";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import s1 from "../../../../../public/assets/shipping1.jpg";
import s2 from "../../../../../public/assets/shipping2.jpg";

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

  images: [];
}

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  // const [selectedColor, setSelectedColor] = useState("black");
  // const [selectedStorage, setSelectedStorage] = useState("1TB");
  const [isFavorite, setIsFavorite] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    reviewTitle: "",
    reviewText: "",
    recommended: null,
  });

  const [hover, setHover] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingChange = (currentRating) => {
    setFormData((prevState) => ({
      ...prevState,
      rating: currentRating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    console.log("Review Submitted:", formData);
  };

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/products/${params.productId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const result = await response.json();

        if (result.success) {
          setProduct(result.data);
        } else {
          throw new Error(result.message || "Unknown error occurred");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (params.productId) {
      fetchProductDetails();
    }
  }, [params.productId]);

  if (isLoading) {
    return (
      <>
        <div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>

        <FiLoader className="text-[2.8rem] animate-spin text-[#3B9DF8]" />

        <TbLoader3 className="text-[2.8rem] animate-spin text-[#3B9DF8]" />
      </>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found
      </div>
    );
  }

  return (
    // <div className="container mx-auto px-4 py-8 mt-32">
    //   <div className="grid md:grid-cols-2 gap-8">
    //     {/* Product Image */}
    //     <div className="relative aspect-square">
    //       {product && (
    //         <Image
    //           src={product.image}
    //           alt={product.title}
    //           fill
    //           className="object-cover rounded-lg"
    //           priority
    //         />
    //       )}
    //     </div>

    //     {/* Product Details */}
    //     <div>
    //       <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

    //       <div className="flex items-center mb-4">
    //         <span className="text-2xl font-semibold text-primary mr-4">
    //           ${product.price.toFixed(2)}
    //         </span>
    //       </div>

    //       <p className="text-gray-700 mb-6">{product.description}</p>

    //       <div className="flex gap-4">
    //         {/* <Button className="w-full" variant="default">
    //           Add to Cart
    //         </Button>
    //         <Button className="w-full" variant="outline">
    //           Buy Now
    //         </Button> */}
    //       </div>

    //       {/* Additional Product Details */}
    //       <div className="mt-8 border-t pt-6">
    //         <h2 className="text-xl font-semibold mb-4">Product Information</h2>
    //         <ul className="space-y-2">
    //           <li>
    //             <strong>Stock:</strong> {product.quantity} available
    //           </li>
    //           <li>
    //             <strong>Added:</strong>{" "}
    //             {new Date(product.createdAt).toLocaleDateString()}
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="w-11/12 mx-auto md:px-8 md:py-12 mt-32">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Image gallery */}
        <div className="flex flex-col-reverse gap-[15px] md:gap-0 md:flex-row">
          {/* Thumbnails */}
          <div className="w-full md:w-[20%] flex flex-row md:flex-col md:gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 md:pr-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-36 md:w-20 h-[70px] md:h-20 border-2 p-1 md:p-2 rounded-lg overflow-hidden ${
                  selectedImage === index
                    ? "border-[#0FABCA]"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  fill
                  alt={`Product ${index + 1}`}
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="w-full md:w-[80%] bg-gray-100 rounded-sm  relative flex items-center justify-center">
            <Image
              height={800}
              width={400}
              src={product.images[selectedImage]}
              alt="Product main image"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>

        {/* Right side - Product details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-[1.6rem] md:text-[1.9rem] font-bold text-gray-800">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 mt-2 md:mt-5">
              <span className="text-3xl font-medium">${product.price}</span>
              {/* <span className="text-xl text-gray-500 line-through">$1499</span> */}
            </div>
          </div>

          {/* Color selection */}
          {/* <div className="flex float-start md:items-center flex-col md:flex-row gap-[10px]">
                        <label className="text-sm font-medium">Select color:</label>
                        <div className="flex gap-3">
                            {colors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color.name)}
                                    className={`w-8 h-8 rounded-full ${color.class} ${
                                        selectedColor === color.name ? "ring-2 ring-offset-2 ring-[#0FABCA]" : ""
                                    }`}
                                    aria-label={color.name}
                                />
                            ))}
                        </div>
                    </div> */}

          {/* Storage selection */}
          {/* <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {storage.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedStorage(size)}
                                    className={`py-2 px-4 rounded-lg border ${
                                        selectedStorage === size
                                            ? "border-[#0FABCA] bg-[#0FABCA]/10 text-[#0FABCA]"
                                            : "border-gray-200"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div> */}

          {/* Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <FiSmartphone className="w-5 h-5 text-gray-700" />
              <div>
                <p className="text-sm text-gray-500">Screen size</p>
                <p className="font-medium text-gray-700 text-[0.9rem]">6.7"</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <FiCpu className="w-5 h-5 text-gray-700" />
              <div>
                <p className="text-sm text-gray-500">CPU</p>
                <p className="font-medium text-gray-700 text-[0.9rem]">
                  Apple A16 Bionic
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <IoMdCamera className="w-5 h-5 text-gray-700" />
              <div>
                <p className="text-sm text-gray-500">Camera</p>
                <p className="font-medium text-gray-700 text-[0.9rem]">
                  48-12-12 MP
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <MdBatteryChargingFull className="w-5 h-5 text-gray-700" />
              <div>
                <p className="text-sm text-gray-500">Battery</p>
                <p className="font-medium text-gray-700 text-[0.9rem]">
                  4323 mAh
                </p>
              </div>
            </div>
          </div>

          <p className="text-[0.9rem] text-gray-600">
            {product.description}
            <button className="text-[#3B9DF8] hover:underline">more...</button>
          </p>

          {/* Action buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex-1 py-3 px-4 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50"
            >
              <div className="flex items-center justify-center gap-2">
                {isFavorite ? (
                  <BsHeartFill className="w-5 h-5 text-red-500" />
                ) : (
                  <BsHeart className="w-5 h-5" />
                )}
                Add to Wishlist
              </div>
            </button>
            <button className="flex-1 py-3 px-4 rounded-lg bg-[#0FABCA] text-white hover:bg-[#0FABCA]/90">
              Add to Card
            </button>
          </div>

          {/* Delivery info */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between mt-2">
            <div className="flex items-center gap-3">
              <CiDeliveryTruck className="text-[3rem] text-gray-500 p-3 bg-gray-100 rounded-md" />
              <div>
                <p className="text-sm text-gray-500">Free Delivery</p>
                <p className="font-medium text-[0.9rem] text-gray-800">
                  1-2 day
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IoStorefrontOutline className="text-[3rem] text-gray-500 p-3 bg-gray-100 rounded-md" />
              <div>
                <p className="text-sm text-gray-500">In Stock</p>
                <p className="font-medium text-[0.9rem] text-gray-800">Today</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GoVerified className="text-[3rem] text-gray-500 p-3 bg-gray-100 rounded-md" />
              <div>
                <p className="text-sm text-gray-500">Guaranteed</p>
                <p className="font-medium text-[0.9rem] text-gray-800">
                  1 year
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* description */}
      <div className="mt-32">
        <h3 className="text-center font-bold text-3xl">Description</h3>
        <p className="mt-4 text-center">{product.description}</p>
      </div>

      {/* review */}

      <div>
        <h3 className="text-center font-bold text-2xl mt-10">Review</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-32">
          <div>
            <h3>Reviews</h3>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating *
                </label>
                <div className="flex items-center">
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index} className="cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          className="hidden"
                          value={currentRating}
                          onClick={() => handleRatingChange(currentRating)}
                        />
                        <CiStar
                          size={30}
                          className={`
                      ${
                        currentRating <= (hover || formData.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                      mr-1
                    `}
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(0)}
                        />
                      </label>
                    );
                  })}
                  <span className="ml-2 text-gray-600">
                    {formData.rating
                      ? `${formData.rating} out of 5`
                      : "Select a rating"}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label
                  htmlFor="reviewText"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Review *
                </label>
                <textarea
                  id="reviewText"
                  name="reviewText"
                  required
                  rows={4}
                  value={formData.reviewText}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className=" bg-[#43b02a] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* shipping */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        <div className="w-full h-full">
          <Image
            src={s1}
            width={400}
            height={200}
            alt="image"
            className="h-full"
          />
        </div>

        <div className="w-full h-full">
          <Image
            src={s2}
            width={400}
            height={200}
            alt="image"
            className="h-full"
          />
        </div>

        <div>
          <h3 className="font-bold">MAECENAS IACULIS</h3>
          <p className="mt-4">
            Vestibulum curae torquent diam diam commodo parturient penatibus
            nunc dui adipiscing convallis bulum parturient suspendisse
            parturient a.Parturient in parturient scelerisque nibh lectus quam a
            natoque adipiscing a vestibulum hendrerit et pharetra fames nunc
            natoque dui.
          </p>

          <h3 className="font-bold mt-4">ADIPISCING CONVALLIS BULUM</h3>

          <p className="mt-4">
            Scelerisque adipiscing bibendum sem vestibulum et in a a a purus
            lectus faucibus lobortis tincidunt purus lectus nisl class
            eros.Condimentum a et ullamcorper dictumst mus et tristique
            elementum nam inceptos hac parturient scelerisque vestibulum amet
            elit ut volutpat.
          </p>
        </div>
      </div>
    </div>
  );
}
