import Image from "next/image";
import React from "react";



const ManageUsers = () => {
    return (
        <div>
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-2">Manage Users</h3>
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
                      <th className="py-2">Users Image</th>
                      <th className="py-2">Users Name</th>
                      <th className="py-2">Email</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="flex justify-center">
                        <Image
                          src={"/assets/Apple.png"}
                          alt={"product Image"}
                          width={50}
                          height={40}
                          className="rounded mt-1"
                        />
                      </td>
                      <td>Jhankar</td>
                      <td>jhankar@gmail.com</td>
                      <td>pending</td>
                      <td>
                        <button className="bg-green-600 cursor-pointer text-white px-2 py-1 rounded-md">
                          Admin
                        </button>
                        <button className="bg-yellow-600 ml-4 cursor-pointer text-white px-2 py-1 rounded-md">
                          Seller
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
    );
};

export default ManageUsers;