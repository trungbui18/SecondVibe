"use client";

import React from "react";
import { Clock, Settings, Truck, CheckCircle, XCircle } from "lucide-react";

type Props = {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
};

export default function MyPurchasesMenu({
  selectedStatus,
  onStatusChange,
}: Props) {
  const statuses = [
    {
      key: "PENDING",
      label: "Pending",
      icon: <Clock className="w-5 h-5 mb-1" />,
    },
    {
      key: "PROCESSING",
      label: "Processing",
      icon: <Settings className="w-5 h-5 mb-1" />,
    },
    {
      key: "SHIPPING",
      label: "Shipping",
      icon: <Truck className="w-5 h-5 mb-1" />,
    },
    {
      key: "DELIVERED",
      label: "Delivered",
      icon: <CheckCircle className="w-5 h-5 mb-1" />,
    },
    {
      key: "COMPLETED",
      label: "Completed",
      icon: <CheckCircle className="w-5 h-5 mb-1" />,
    },
    {
      key: "CANCEL",
      label: "Cancelled",
      icon: <XCircle className="w-5 h-5 mb-1" />,
    },
  ];

  return (
    <div className="flex mt-4 w-full bg-white rounded-xl space-x-4">
      {statuses.map((status) => (
        <div
          key={status.key}
          onClick={() => onStatusChange(status.key)}
          className={`flex flex-col items-center border border-gray-300 rounded-sm justify-center flex-1 py-4 hover:bg-gray-100 cursor-pointer
          ${selectedStatus === status.key ? "bg-gray-200" : ""}`}
        >
          {status.icon}
          <span className="text-gray-800 text-sm">{status.label}</span>
        </div>
      ))}
    </div>
  );
}
