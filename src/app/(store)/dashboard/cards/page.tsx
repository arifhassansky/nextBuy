import Image from "next/image";
import { FaTrash } from "react-icons/fa";

const Cards = () => {
  return (
    <div>
      <div className="text-center">
        <h3 className="text-[#3C9E26] text-4xl font-bold mb-2">
          Add to Cart – Save, Review & Checkout
        </h3>
        <p>
          Keep your selected items in one place for a smooth shopping journey.
          Add, manage, and purchase with ease.
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
              <td className="text-green-700 font-semibold hover:underline cursor-pointer">
                Link
              </td>
              <td>
                <button className="btn btn-sm btn-success text-black cursor-pointer">
                  pay
                </button>
                <button className="btn btn-sm text-red-600 ml-4 cursor-pointer">
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

export default Cards;
