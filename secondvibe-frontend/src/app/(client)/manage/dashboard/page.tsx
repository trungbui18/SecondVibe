"use client";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import orderApi, { SellerStats, SellerRecentOrder } from "@/services/order";
import { RevenueSeller } from "@/types/revenue";
import { useRouter } from "next/navigation";

interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
}

const revenueData: RevenueData[] = [
  { month: "T1", revenue: 125000000, orders: 450 },
  { month: "T2", revenue: 135000000, orders: 520 },
  { month: "T3", revenue: 148000000, orders: 580 },
  { month: "T4", revenue: 162000000, orders: 620 },
  { month: "T5", revenue: 178000000, orders: 680 },
  { month: "T6", revenue: 195000000, orders: 750 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function page() {
  const [stats, setStats] = useState<SellerStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [recentOrders, setRecentOrders] = useState<SellerRecentOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [monthlyRevenue, setMonthlyRevenue] = useState<RevenueSeller[]>([]);
  const [loadingRevenue, setLoadingRevenue] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await orderApi.getSellerStats();
        setStats(res.data);
      } catch (e) {
        setStats(null);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const res = await orderApi.getSellerRecentOrders();
        setRecentOrders(res.data);
      } catch (e) {
        setRecentOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchRecentOrders();
  }, []);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const res = await orderApi.getRevenueSeller();
        setMonthlyRevenue(res.data);
      } catch (e) {
        setMonthlyRevenue([]);
      } finally {
        setLoadingRevenue(false);
      }
    };
    fetchMonthlyRevenue();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-gray-900">
                {loadingStats
                  ? "..."
                  : stats
                  ? Number(stats.revenue).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : "N/A"}
              </p>
              {/* <p className="text-sm text-green-600 mt-1">+12.5% so với tháng trước</p> */}
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đơn hàng</p>
              <p className="text-2xl font-bold text-gray-900">
                {loadingStats ? "..." : stats ? stats.order : "N/A"}
              </p>
              {/* <p className="text-sm text-blue-600 mt-1">+8.2% so với tháng trước</p> */}
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sản phẩm</p>
              <p className="text-2xl font-bold text-gray-900">
                {loadingStats ? "..." : stats ? stats.product : "N/A"}
              </p>
              {/* <p className="text-sm text-purple-600 mt-1">+15 sản phẩm mới</p> */}
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Khách hàng</p>
              <p className="text-2xl font-bold text-gray-900">
                {loadingStats ? "..." : stats ? stats.client : "N/A"}
              </p>
              {/* <p className="text-sm text-orange-600 mt-1">+156 khách hàng mới</p> */}
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Doanh thu theo tháng</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {loadingRevenue ? (
              <div className="w-full text-center text-gray-400">Loading...</div>
            ) : monthlyRevenue.length === 0 ? (
              <div className="w-full text-center text-gray-400">No data</div>
            ) : (
              monthlyRevenue.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-500 rounded-t-sm"
                    style={{
                      height: `${
                        (Number(data.revenue) /
                          Math.max(
                            ...monthlyRevenue.map((d) => Number(d.revenue)),
                            1
                          )) *
                        100
                      }%`,
                    }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">
                    {data.month}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h3>
          <div className="space-y-3">
            {loadingOrders ? (
              <div>Loading...</div>
            ) : recentOrders.length === 0 ? (
              <div className="text-gray-500">
                Không có đơn hàng nào gần đây.
              </div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-white border-l-4 border-blue-400 shadow-sm rounded-lg hover:shadow-md transition"
                  onClick={() => {
                    router.push(`/manage/order/${order.id}`);
                  }}
                >
                  <div>
                    <p className="font-semibold text-blue-600">
                      {order.id.slice(0, 8)}....
                    </p>
                    <p className="text-sm text-gray-500">{order.createdAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">
                      {formatCurrency(order.totalAmount)}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(
                        order.orderStatus.toLowerCase()
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
