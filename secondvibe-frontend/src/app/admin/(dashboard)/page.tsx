"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import orderApi from "@/services/order";
import productApi from "@/services/product";
import profileApi from "@/services/profile";
import { TopSeller } from "@/components/ui/TopSeller";
import OrderStatusPieChart from "./components/OrderStatusPieChart";
export default function PageAdmin() {
  const [stats, setStats] = useState({
    orderCount: 0,
    platformRevenue: 0,
    adminRevenue: 0,
    productCount: 0,
    clientCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [orderCountRes, revenueRes, productCountRes, clientCountRes] =
          await Promise.all([
            orderApi.getCountOrderAdmin(),
            orderApi.getRevenueAdmin(),
            productApi.getCountProduct(),
            profileApi.getClientCount(),
          ]);

        setStats({
          orderCount: orderCountRes.data,
          productCount: productCountRes.data,
          clientCount: clientCountRes.data,
          platformRevenue: revenueRes.data.platformRevenue,
          adminRevenue: revenueRes.data.adminRevenue,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: "Total Orders",
      value: stats.orderCount,
      change: "+12%",
      icon: TrendingUp,
    },
    {
      title: "Revenue today",
      value: stats.platformRevenue.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
      subtext: `Revenue admin: ${stats.adminRevenue.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
      change: "+10%",
      icon: TrendingUp,
    },
    {
      title: "Total Products",
      value: stats.productCount,
      change: "+5%",
      icon: TrendingUp,
    },
    {
      title: "Total Users",
      value: stats.clientCount,
      change: "+8%",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">
                {card.title}
              </h3>
              <div className="p-2 bg-gray-50 rounded-lg">
                <card.icon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              {card.subtext && (
                <p className="text-xs text-gray-500">{card.subtext}</p>
              )}
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">
                  {card.change}
                </span>
                <span className="text-gray-500 ml-1">since last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <TopSeller />
        <OrderStatusPieChart />
      </div>
    </div>
  );
}
