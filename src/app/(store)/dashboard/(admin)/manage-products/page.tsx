"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDone, MdKeyboardArrowDown } from "react-icons/md";
import { BiCopy, BiEdit } from "react-icons/bi";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStatus, setUpdateStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Track which dropdown is active using product ID
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  // Track selected action for each product
  const [productActions, setProductActions] = useState({});

  //drop down buttons
  // const [actionButtonActive, setActionButtonActive] = useState(false);
  // const [actionButtonText, setActionButtonText] = useState("Mark as read");

  const actionContents = [
    {
      label: "active",
      icon: <MdDone />,
    },
    {
      label: "pending",
      icon: <BiCopy />,
    },
    {
      label: "rejected",
      icon: <BiEdit />,
    },
    {
      label: "out of stock",
      icon: <BiEdit />,
    },
  ];

  const toggleDropdown = (productId) => {
    setActiveDropdownId(activeDropdownId === productId ? null : productId);
  };

  //update status

  const updateProductStatus = async (productId, status) => {
    try {
      setUpdateStatus({ loading: true, error: null, success: false });

      const response = await fetch(
        "http://localhost:3000/api/admin/manage-products",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status, productId }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update product status: ${response.statusText}`
        );
      }

      const data = await response.json();

      // Update the local products state with the new status
      setProducts(
        products.map((product) =>
          product._id === productId ? { ...product, status } : product
        )
      );

      setUpdateStatus({ loading: false, error: null, success: true });

      // Display success message (optional)
      console.log(`Product ${productId} status updated to ${status}`);

      // Clear success status after a delay
      setTimeout(() => {
        setUpdateStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (err) {
      console.error("Error updating product status:", err);
      setUpdateStatus({ loading: false, error: err.message, success: false });
    }
  };

  const handleActionButtonClick = async (productId, actionLabel) => {
    setProductActions({
      ...productActions,
      [productId]: actionLabel,
    });
    setActiveDropdownId(null);

    // Make API call to update the status
    await updateProductStatus(productId, actionLabel);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productResponse = await fetch(
          "http://localhost:3000/api/admin/manage-products"
        );

        if (!productResponse.ok) {
          throw new Error("Failed to fetch product stats");
        }

        const data = await productResponse.json();
        // console.log(data.data);
        setProducts(data.data);

        const initialActions = {};
        data.data.forEach((product) => {
          initialActions[product._id] = "Actions";
        });
        setProductActions(initialActions);

        setTotalPages(Math.ceil(data.data.length / productsPerPage));
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productsPerPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".publishButtonOptions") &&
        !event.target.closest(".publishButton")
      ) {
        setActiveDropdownId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //go to prev page

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // const {status, productId}=body

  console.log(products);
  if (loading) return <div>Loading stats...</div>;
  if (error) return <div>Error loading stats: {error}</div>;

  return (
    <div>
      <div className="text-center">
        <h3 className="text-4xl font-bold mb-2">Manage Products</h3>
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
            {currentProducts.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="flex justify-center">
                  <Image
                    src={item.image}
                    alt={"product Image"}
                    width={100}
                    height={100}
                    className="rounded mt-1"
                  />
                </td>
                <td>{item.title}</td>
                <td>$ {item.price}</td>
                <td>{item.status}</td>
                <td className="">
                  <div className="flex items-center w-[200px] mx-auto  rounded bg-[#43b02a] border-none outline-none text-[#fff] justify-between relative">
                    <button className="text-[1rem] px-6 py-1.5 transition-all duration-500 cursor-auto">
                      {productActions[item._id] || "Mark as read"}
                    </button>

                    <div
                      onClick={() => toggleDropdown(item._id)}
                      className="bg-[#43b02a]  py-1.5 flex items-center justify-center cursor-pointer rounded-r publishButton"
                    >
                      <MdKeyboardArrowDown className="text-[2rem]" />
                    </div>

                    <ul
                      className={`${
                        activeDropdownId === item._id
                          ? "opacity-100 z-20 translate-y-0"
                          : "opacity-0 z-[-1] translate-y-[-5px]"
                      } publishButtonOptions transition-all duration-500 flex flex-col bg-white py-1 w-full absolute top-[46px] rounded right-0 text-black text-[0.9rem]`}
                    >
                      {actionContents?.map((action, index) => (
                        <li
                          className="py-2 px-3 flex items-center gap-[5px] hover:bg-gray-50 rounded cursor-pointer"
                          key={index}
                          onClick={() =>
                            handleActionButtonClick(item._id, action.label)
                          }
                        >
                          {action.icon}
                          {action.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <button className="text-green-600 cursor-pointer">
                    <AiFillCheckCircle size={40} />
                  </button> */}
                  {/* <button className=" text-red-600 ml-4 cursor-pointer">
                    <AiFillCloseCircle size={40} />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}

        <div className="flex justify-center mt-6">
          <nav className="flex items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-l border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            <div className="flex">
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`px-3 py-1 border-t border-b ${
                    currentPage === number + 1
                      ? "bg-[#43b02a] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {number + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-r border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
