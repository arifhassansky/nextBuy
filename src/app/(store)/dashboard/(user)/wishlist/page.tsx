"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FaCartPlus, FaTrash } from "react-icons/fa";

interface WishlistItem {
  productId: {
    image: string;
    title: string;
    price: number;
    status: string;
    slug: string;
  };
  addedAt: string;
}

interface WishlistData {
  _id: string;
  userEmail: string;
  items: WishlistItem[];
}

const Wishlist: FC = () => {
  const { data: session } = useSession();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/wishlist?userEmail=${session.user.email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const wishListData: { data?: WishlistData } = await response.json();
        setWishlistItems(wishListData.data?.items || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching your wishlist"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [session]);

  return (
    <div>
      <div className="text-center">
        <h3 className="text-4xl font-bold mb-2">
          Wishlist – Keep Track of What You Love
        </h3>
        <p>
          Easily store and manage your favorite items in one place. Revisit,
          organize, and shop whenever you&apos;re ready.
        </p>
      </div>

      {loading && (
        <div className="text-center my-12">
          <p className="text-lg">Loading your wishlist...</p>
        </div>
      )}

      {error && (
        <div className="text-center my-12">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      )}

      <div className="overflow-x-auto mt-12">
        <table className="table table-zebra w-full border-collapse">
          <thead>
            <tr className="bg-gray-300 text-black text-center">
              <th className="py-2">Product Image</th>
              <th className="py-2">Product Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Status</th>
              <th className="py-2">View Product</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="flex justify-center">
                  <Image
                    src={item.productId.image}
                    alt={item.productId.title}
                    width={50}
                    height={40}
                    className="rounded mt-1"
                  />
                </td>
                <td>{item.productId.title}</td>
                <td>$ {item.productId.price}</td>
                <td>{item.productId.status}</td>
                <td>
                  <Link href={`/products/${item.productId.slug}`}>Link</Link>
                </td>
                <td>
                  <button className="text-green-600 cursor-pointer">
                    <FaCartPlus size={20} />
                  </button>
                  <button className="text-red-600 ml-4 cursor-pointer">
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
