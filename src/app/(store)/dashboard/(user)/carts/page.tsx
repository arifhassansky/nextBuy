import Image from "next/image";
import { FaTrash } from "react-icons/fa";

const Carts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cart?userEmail=arifskypro@gmail.com`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch cart items");
  const data = await res.json();
  console.log(data.data);

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

      {/* table */}
      <div className="overflow-x-auto mt-12">
        <table className="table table-zebra w-full border-collapse">
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
            {data?.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="flex justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={40}
                      className="rounded mt-1"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.status}</td>
                  <td className="text-green-700 font-semibold hover:underline cursor-pointer">
                    Link
                  </td>
                  <td>
                    <button className="btn btn-sm btn-success text-black cursor-pointer">
                      Pay
                    </button>
                    <button className="btn btn-sm text-red-600 ml-4 cursor-pointer">
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
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
