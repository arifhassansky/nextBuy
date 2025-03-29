"use client";
import Image from "next/image";

const Recommendation = () => {
  return (
    <div className="p-6 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
        <div className="p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Sale products</h2>
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Smartwatch"
            width={600}
            height={400}
            className="w-full rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2"
          />
          <div>
            <h3 className="mt-2 text-gray-700">Facilisi nullam consect</h3>
            <h3 className="mt-2 text-gray-700">Electronics</h3>
            <p className="text-green-600 font-semibold">$279.00</p>
          </div>
          <div className="mt-2 flex justify-center space-x-2 text-gray-500 text-lg font-bold">
            <span>277 Days</span>
            <span>05 Hr</span>
            <span>28 Min</span>
            <span>39 Sc</span>
          </div>
        </div>

        <div className="flex justify-center items-center p-5 rounded-lg">
          <div className="w-full">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">Special Offers</h3>
              <div className="flex items-center gap-3">
                <p>NEW</p>
                <p>FEATURED</p>
                <p>TOP SELLERS</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-2 bg-[#f7f7f7]">
                  <Image
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                    alt={`Product ${i}`}
                    width={500}
                    height={300}
                    className="w-full rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2"
                  />
                  <div className="text-center">
                    <h3 className="mt-2 text-gray-700">Product Name</h3>
                    <h3 className="mt-2 text-gray-700">Electronics</h3>
                    <p className="text-green-600 font-semibold">$299.00</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
