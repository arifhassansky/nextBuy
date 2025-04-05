"use client";

import { useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdStore } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Reusable Card Component
const StatCard = ({ icon: Icon, label, count }: { icon: any; label: string; count: number }) => (
  <div className="flex items-center gap-4 bg-white text-gray-800 p-5 shadow-lg rounded-2xl transition-transform transform hover:scale-105 border border-gray-200">
    <div className="text-green-600">
      <Icon size={40} />
    </div>
    <div>
      <h4 className="text-xl font-semibold">{count}</h4>
      <span className="text-sm capitalize text-gray-500">{label}</span>
    </div>
  </div>
);

const Stats = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [storesCount, setStoresCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const [productRes, storeRes, orderRes, userRes] = await Promise.all([
          fetch("http://localhost:3000/api/admin/manage-products"),
          fetch("http://localhost:3000/api/admin/manage-stores"),
          fetch("http://localhost:3000/api/admin/manage-orders"),
          fetch("http://localhost:3000/api/admin/manage-user"),
        ]);

        if (!productRes.ok || !storeRes.ok || !orderRes.ok || !userRes.ok) {
          throw new Error("Failed to fetch all stats");
        }

        const [productData, storeData, orderData, userData] = await Promise.all([
          productRes.json(),
          storeRes.json(),
          orderRes.json(),
          userRes.json(),
        ]);

        setProductsCount(productData.data.length);
        setStoresCount(storeData.data.length);
        setOrdersCount(orderData.data.length);
        setUsersCount(userData.data.length);

        // Set data for chart
        setChartData([
          { name: "Products", count: productData.data.length },
          { name: "Stores", count: storeData.data.length },
          { name: "Orders", count: orderData.data.length },
          { name: "Users", count: userData.data.length },
        ]);
      } catch (err: any) {
        console.error("Error fetching stats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center text-lg mt-10">Loading stats...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">Error: {error}</div>;

  return (
    <div className="p-5 md:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Stats</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={AiOutlineProduct} label="products" count={productsCount} />
        <StatCard icon={FaUserAlt} label="users" count={usersCount} />
        <StatCard icon={MdStore} label="stores" count={storesCount} />
        <StatCard icon={BiPurchaseTag} label="orders" count={ordersCount} />
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-5">
        <h3 className="text-xl font-semibold mb-5 text-gray-700">Overview Chart</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#43b02a"
                activeBar={<Rectangle fill="#9eff9e" stroke="#2d8a2d" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Stats;
