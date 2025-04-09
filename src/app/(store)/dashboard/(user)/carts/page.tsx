"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

interface Product {
  productId: {
    _id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
    slug: string;
  };
}

const Carts: React.FC = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[] | null>(null);
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cart?userEmail=${session?.user?.email}`
        );
        const data = await res.json();
        console.log(data);
        setProducts(data?.data?.items || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchProducts();
  }, [session?.user?.email]);

  console.log(products);

  const handleDelete = async (id: string) => {
    const deleteData = { id, action: "remove" };
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
        deleteData
      );
      console.log(data);
      setProducts(
        (prev) => prev?.filter((item) => item.productId._id !== id) || []
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  console.log(products);

  return (
    <div>
      <div className="text-center">
        <h3 className="text-4xl font-bold mb-2">
          Add to Cart – Save, Review & Checkout
        </h3>
        <p>
          Keep your selected items in one place for a smooth shopping journey.
          Add, manage, and purchase with ease.
        </p>
      </div>

      {/* Table */}
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
            {products && products.length > 0 ? (
              products?.map((item) => (
                <tr key={item.productId?._id} className="text-center">
                  <td className="flex justify-center">
                    <Image
                      src={item?.productId?.image}
                      alt={item?.productId?.title}
                      width={50}
                      height={40}
                      className="rounded mt-1"
                    />
                  </td>
                  <td>{item.productId?.title}</td>
                  <td>${item.productId?.price}</td>
                  <td>
                    {item.productId?.quantity <= 0
                      ? "Out Of Stock"
                      : "In Stock"}
                  </td>
                  <td className="text-green-700 font-semibold hover:underline cursor-pointer">
                    <Link href={`/products/${item.productId?.slug}`}>Link</Link>
                  </td>
                  <td>
                    <Link
                      href={`carts/payment/${item.productId?.slug}`}
                      className="btn btn-sm btn-success text-black cursor-pointer"
                    >
                      Pay
                    </Link>
                    <button
                      onClick={() => handleDelete(item.productId?._id)}
                      className="btn btn-sm text-red-600 ml-4 cursor-pointer"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No items in your cart.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Carts;
