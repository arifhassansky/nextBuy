import Image from "next/image";
import { FaCartPlus, FaTrash } from "react-icons/fa";

const Wishlist = () => {
  return (
    <div>
      <div className="text-center">
        <h3 className="text-[#3C9E26] text-4xl font-bold mb-2">
          Wishlist – Keep Track of What You Love
        </h3>
        <p>
          Easily store and manage your favorite items in one place. Revisit,
          organize, and shop whenever you&apos;re ready.
        </p>
      </div>

      {/* table */}
      <div className="overflow-x-auto mt-12">
        <table className="table table-zebra w-full border-collapse">
          {/* head */}
          <thead>
            <tr className="bg-green-300 text-black text-center">
              <th className="py-2">Product Image</th>
              <th className="py-2">Product Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Status</th>
              <th className="py-2">View Product</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="flex justify-center">
                <Image
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component"
                  width={50}
                  height={40}
                  className="rounded mt-1"
                />
              </td>
              <td>Arif Hassan</td>
              <td>$ 200</td>
              <td>In Stock</td>
              <td>Link</td>
              <td>
                <button className="text-green-600 cursor-pointer">
                  <FaCartPlus size={20} />
                </button>
                <button className=" text-red-600 ml-4 cursor-pointer">
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
