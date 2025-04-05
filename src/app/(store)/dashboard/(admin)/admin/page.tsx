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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Stats = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [storesCount, setStoresCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
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
        setProductsCount(data.data.length);

        // Fetch stores data
        const storesResponse = await fetch(
          "http://localhost:3000/api/admin/manage-stores"
        );

        if (!storesResponse.ok) {
          throw new Error("Failed to fetch stores stats");
        }

        const storesData = await storesResponse.json();
        setStoresCount(storesData.data.length);

        const ordersResponse = await fetch(
          "http://localhost:3000/api/admin/manage-orders"
        );

        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch stores stats");
        }

        const ordersData = await ordersResponse.json();
        setOrdersCount(ordersData.data.length);

        const userResponse = await fetch(
          "http://localhost:3000/api/admin/manage-user"
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user stats");
        }

        const userData = await userResponse.json();
        console.log(userData);
        setUsersCount(userData.data.length);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  //   console.log(stats);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div>Error loading stats: {error}</div>;

  return (
    <div>
      <h2 className="text-3xl mt-10">Stats</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        <div className="flex items-center gap-2 bg-[#43b02a] text-white p-5 border border-black rounded-2xl">
          <div>
            <AiOutlineProduct size={40} />
          </div>

          <div className="">
            <h4>{productsCount}</h4>
            <span>products</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#43b02a] text-white p-5 border border-black rounded-2xl">
          <div>
            <FaUserAlt size={40} />
          </div>

          <div className="">
            <h4>{usersCount}</h4>

            <span>Users</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#43b02a] text-white p-5 border border-black rounded-2xl">
          <div>
            <MdStore size={45} />
          </div>

          <div className="">
            <h4>{storesCount}</h4>
            <span>stores</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#43b02a] text-white p-5 border border-black rounded-2xl">
          <div>
            <BiPurchaseTag size={40} />
          </div>

          <div className="">
            <h4>{ordersCount}</h4>
            <span>orders</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <BarChart
          className="mt-10"
          width={800}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="pv"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="uv"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default Stats;
