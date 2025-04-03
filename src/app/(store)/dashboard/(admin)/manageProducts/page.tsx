import Image from 'next/image';
import React from 'react';


import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";

const ManageProducts = () => {
    return (
        <div>
                      <div className="text-center">
                        <h3 className="text-4xl font-bold mb-2">
                          Manage Products
                        </h3>
                        <p>
                          Easily store and manage your favorite products in one place. Revisit,
                          organize, and shop whenever you&apos;re ready.
                        </p>
                      </div>
                
            
                     
                
                      <div className="overflow-x-auto mt-12">
                        <table className="table  w-full border-collapse">
                          {/* head */}
                          <thead>
                            <tr className="bg-gray-300 text-black text-center">
                              <th className="py-2">Product Image</th>
                              <th className="py-2">Product Name</th>
                              <th className="py-2">Price</th>
                              <th className="py-2">Status</th>
                              <th className="py-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                              <tr  className="text-center">
                                <td className="flex justify-center">
                                  <Image
                                    src={'/assets/Apple.png'}
                                    alt={'product Image'}
                                    width={50}
                                    height={40}
                                    className="rounded mt-1"
                                  />
                                </td>
                                <td>Apple</td>
                                <td>$ 300</td>
                                <td>pending</td>
                                {/* <td>
                                  <Link href={`/products/${item.productId.slug}`}>Link</Link>
                                </td> */}
                                <td>
                                  <button 
                                    className="text-green-600 cursor-pointer"
                                  >
                                    <AiFillCheckCircle size={20} />
                                  </button>
                                  <button
                                    
                                    className=" text-red-600 ml-4 cursor-pointer"
                                  >
                                    <AiFillCloseCircle  size={18} />
                                  </button>
                                </td>
                              </tr>
                           
                          </tbody>
                        </table>
                      </div>
                    </div>
    );
};

export default ManageProducts;