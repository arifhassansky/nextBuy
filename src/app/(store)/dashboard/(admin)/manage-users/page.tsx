"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillInteraction } from "react-icons/ai";
import { AiOutlineDelete, AiOutlineSchedule } from "react-icons/ai";
import { LuSaveAll } from "react-icons/lu";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Dropdown state
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userActions, setUserActions] = useState<{ [userId: string]: string }>({});

  const sendButtonContent = [
    {
      label: "Admin",
      icon: <AiOutlineSchedule />,
    },
    {
      label: "Seller",
      icon: <LuSaveAll />,
    },
    {
      label: "Suspend",
      icon: <AiOutlineDelete />,
    },
  ];

  // Fetch users from the backend
  const fetchUsers = async (role: string, page: number, limit: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/manage-user?page=${page}&limit=${limit}`);
      const data = await res.json();
      const filteredUsers = data.data.filter((user: any) => user.role === role);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(selectedRole, currentPage, usersPerPage);
  }, [selectedRole, currentPage]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        !(event.target as HTMLElement).closest(".publishButtonOptions") &&
        !(event.target as HTMLElement).closest(".publishButton")
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleSendButtonClick = async (userId: string, label: string) => {
    // Show the selected action in the button
    setUserActions((prev) => ({ ...prev, [userId]: label }));
    setActiveDropdown(null);

    //  update the role in the frontend 
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, role: label.toLowerCase() } : user
    );
    setUsers(updatedUsers);

    // Get the user details
    const user = users.find((u) => u._id === userId);
    if (!user) return;

    try {
      // Update the role in the backend
      const res = await fetch("/api/admin/manage-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          role: label.toLowerCase(), 
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("User role updated successfully!");
        console.log("User role updated successfully", data)
      } else {
        toast.error("Failed to update user role:", data.message);
        console.log("Failed to update user role:", data.message)
        setUsers(users);  
      }
    } catch (error) {
      console.error("Error updating user role:", error);
     
      setUsers(users); 
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-4xl font-bold mb-2">Manage Users</h3>
        <p>
          Easily store and manage your favorite products in one place. Revisit,
          organize, and shop whenever you're ready.
        </p>
      </div>

      {/* Role Filter */}
      <div className="text-right mt-4">
        {["admin", "seller", "user"].map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-3 py-1 rounded-md text-white ml-4 first:ml-0 ${
              selectedRole === role ? "bg-black" : "bg-green-600"
            } hover:bg-black`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      {/* User Table */}
      <div className="overflow-x-auto mt-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No {selectedRole}s found.</p>
        ) : (
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-gray-300 text-black text-center">
                <th className="py-2">User Image</th>
                <th className="py-2">User Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user._id} className="text-center">
                  <td className="flex justify-center">
                    <Image
                      src={user.image || "/assets/Apple.png"}
                      alt="User"
                      width={50}
                      height={40}
                      className="rounded mt-1"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="flex items-center rounded bg-green-600 border-none outline-none text-white justify-center relative">
                      <button className="text-[1rem] py-1.5 transition-all duration-500 cursor-auto">
                        {userActions[user._id] || "Actions"}
                      </button>

                      <div
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === user._id ? null : user._id
                          )
                        }
                        className="bg-green-600 w-[22px] py-1.5 flex items-center justify-center cursor-pointer rounded-r publishButton"
                        role="button"
                        tabIndex={0}
                        aria-expanded={activeDropdown === user._id}
                      >
                        <AiFillInteraction className="text-[1rem]" />
                      </div>

                      <ul
                        className={`${
                          activeDropdown === user._id
                            ? "opacity-100 pointer-events-auto z-20 translate-y-4"
                            : "opacity-0 pointer-events-none z-[-1] translate-y-[-20px]"
                        } publishButtonOptions transition-all duration-300 flex flex-col shadow-md bg-white py-1 w-max absolute top-[46px] rounded border border-[#e6e6e6] right-0 text-text text-[0.9rem] text-black`}
                      >
                        <div className="absolute -top-[8px] right-3 border-l border-b border-[#e6e6e6] bg-white w-[15px] h-[15px] rotate-[135deg]"></div>
                        {sendButtonContent.map((item, index) => (
                          <li
                            key={index}
                            className="z-20 py-2 px-3 flex items-center gap-[8px] hover:bg-gray-50 rounded cursor-pointer"
                            onClick={() => handleSendButtonClick(user._id, item.label)}
                          >
                            <span className="text-green-500">{item.icon}</span>
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Prev
        </button>
        <span className="px-4 py-2">{currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
