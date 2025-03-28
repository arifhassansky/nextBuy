import Image from "next/image";

const OrderHistory = () => {
  return (
    <div>
      <div className="text-center">
        <h3 className="text-4xl font-bold mb-2">
          Order History – Review Your Past Purchases
        </h3>
        <p>
          Keep track of all your previous orders in one place. View details,
          reorder favorites, and manage your shopping history effortlessly.
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
