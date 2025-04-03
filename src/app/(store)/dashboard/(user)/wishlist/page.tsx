"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

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
  //   " product._id": string;
}

const Wishlist = () => {
  // console.log(user.email);
  const { data: session } = useSession();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmails = session?.user?.email;

  const handleAddToCart = async (cart: Product) => {
    const response = await fetch(`/api/cart?userEmail=${userEmails}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmails,
        items: {
          productId: cart?._id,
          quantity: 1,
        },
      }),
    });

    await fetch(`http://localhost:3000/api/wishlist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmails,
        productId: cart?.productId._id,
      }),
    });
    setWishlistItems(
      wishlistItems.filter((item) => item.productId._id !== cart.productId._id)
    );

    const data = await response.json();
    // console.log(data);
  };

  const handleDelete = async (cart: Product) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Remove ${cart?.productId?.title} from your wishlist?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/api/wishlist`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: userEmails,
            productId: cart?.productId._id,
          }),
        });
        const data = response.json();
        console.log(data);
        // if (data.status === 200) {
        Swal.fire(
          "Deleted!",
          "Item has been removed from your wishlist.",
          "success"
        );

        // Update the UI by removing the deleted item
        setWishlistItems(
          wishlistItems.filter(
            (item) => item.productId._id !== cart.productId._id
          )
        );
        // }
      } catch (error) {
        // Show error message if deletion fails
        Swal.fire("Error!", "Failed to remove item from wishlist.", "error");
        console.error("Error deleting item:", error);
      }
    }

    // const response = await fetch(`http://localhost:3000/api/wishlist`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userEmail: userEmails,
    //     productId: cart?.productId._id,
    //   }),
    // });
  };

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

        const wishListData = await response.json();
        const items = wishListData?.data?.items || [];

        setWishlistItems(items);
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

  console.log(wishlistItems);

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
        <table className="table  w-full border-collapse">
          {/* head */}
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
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="text-green-600 cursor-pointer"
                  >
                    <FaCartPlus size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className=" text-red-600 ml-4 cursor-pointer"
                  >
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
