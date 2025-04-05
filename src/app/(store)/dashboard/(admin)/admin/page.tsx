"use client";

import { useEffect, useState } from "react";
import {
  AiOutlineProduct,
  AiOutlinePieChart,
} from "react-icons/ai";
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
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

const COLORS = ["#43b02a", "#82ca9d", "#ffc658", "#ff8042"];

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
    <div className="p-5 md:p-10 space-y-10">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard Stats</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={AiOutlineProduct} label="products" count={productsCount} />
        <StatCard icon={FaUserAlt} label="users" count={usersCount} />
        <StatCard icon={MdStore} label="stores" count={storesCount} />
        <StatCard icon={BiPurchaseTag} label="orders" count={ordersCount} />
      </div>

      {/* Rounded Bar Chart */}
      <div className="bg-white shadow-xl rounded-2xl p-5">
        <h3 className="text-xl font-semibold mb-5 text-gray-700">Rounded Stats Overview</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#43b02a"
                radius={[10, 10, 0, 0]}
                activeBar={<Rectangle fill="#9eff9e" stroke="#2d8a2d" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* More Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart Section */}
        <div className="bg-white shadow-xl rounded-2xl p-5">
          <h3 className="text-xl font-semibold mb-5 flex items-center gap-2 text-gray-700">
            <AiOutlinePieChart /> Sales by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart Section */}
        <div className="bg-white shadow-xl rounded-2xl p-5">
          <h3 className="text-xl font-semibold mb-5 text-gray-700">Order Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#43b02a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Stats;
