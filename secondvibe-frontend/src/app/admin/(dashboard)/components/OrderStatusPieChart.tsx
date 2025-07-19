"use client";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import orderApi from "@/services/order";
import { OrderStatusCountResponse } from "@/types/order";
import { useEffect, useState } from "react";

const COLORS = ["#FDBA74", "#60A5FA", "#34D399", "#A78BFA", "#F87171"];

export default function OrderStatusPieChart() {
  const [data, setData] = useState<OrderStatusCountResponse[] | []>([]);
  const fetchData = async () => {
    const res = await orderApi.fetchOrderStatusCount();
    setData(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Tỷ lệ đơn hàng theo trạng thái
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) =>
              percent !== undefined
                ? `${name}: ${(percent * 100).toFixed(0)}%`
                : name
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip formatter={(value: any) => `${value} đơn hàng`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
