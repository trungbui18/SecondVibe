"use client";

import React from "react";

interface MethodSelectionProps {
  dealMethod: "DELIVERY" | "MEETUP";
  paymentMethod: "VNPAY" | "COD";
  onSelectDealMethod: (value: "DELIVERY" | "MEETUP") => void;
  onSelectPaymentMethod: (value: "VNPAY" | "COD") => void;
}

export default function MethodSelection({
  dealMethod,
  paymentMethod,
  onSelectDealMethod,
  onSelectPaymentMethod,
}: MethodSelectionProps) {
  return (
    <>
      {/* Deal method */}
      <div className="border border-gray-300 p-4 pb-8 rounded w-full bg-white mb-6">
        <h3 className="text-base font-semibold mb-4">Deal method</h3>

        <label
          className={`flex justify-between items-start border rounded-lg px-4 py-3 cursor-pointer ${
            dealMethod === "DELIVERY"
              ? "border-green-500 bg-green-50"
              : "border-gray-300"
          } mb-3`}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="dealMethod"
              value="DELIVERY"
              checked={dealMethod === "DELIVERY"}
              onChange={() => onSelectDealMethod("DELIVERY")}
              className="mt-1"
            />
            <div>
              <p className="font-medium">Seller's custom delivery</p>
              <p className="text-sm text-gray-500">
                1 - 3 days - Untracked
                <br />
                Leave delivery instructions if you are not available for
                receiving/pickup
              </p>
            </div>
          </div>
          <span className="bg-green-100 text-green-600 px-2 py-1 text-sm rounded">
            Free
          </span>
        </label>

        <label
          className={`flex justify-between items-center border rounded-lg px-4 py-3 cursor-pointer ${
            dealMethod === "MEETUP"
              ? "border-green-500 bg-green-50"
              : "border-gray-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="dealMethod"
              value="MEETUP"
              checked={dealMethod === "MEETUP"}
              onChange={() => onSelectDealMethod("MEETUP")}
            />
            <p className="font-medium">Meet up</p>
          </div>
          <span className="bg-green-100 text-green-600 px-2 py-1 text-sm rounded">
            Free
          </span>
        </label>
      </div>

      {/* Payment method */}
      <div className="border border-gray-300 p-4 pb-8 rounded w-full bg-white">
        <h3 className="text-base font-semibold mb-4">Payment method</h3>

        <label
          className={`flex justify-between items-center border rounded-lg px-4 py-3 cursor-pointer ${
            paymentMethod === "VNPAY"
              ? "border-green-500 bg-green-50"
              : "border-gray-300"
          } mb-3`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              value="VNPAY"
              checked={paymentMethod === "VNPAY"}
              onChange={() => onSelectPaymentMethod("VNPAY")}
            />
            <p className="font-medium">VNPAY</p>
          </div>
          <img src="./VNPAY.jpg" className="h-20 w-20" />
        </label>

        <label
          className={`flex justify-between items-center border rounded-lg px-4 py-3 cursor-pointer ${
            paymentMethod === "COD"
              ? "border-green-500 bg-green-50"
              : "border-gray-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => onSelectPaymentMethod("COD")}
            />
            <p className="font-medium">Cash on Delivery (COD)</p>
          </div>
          <img src="./cod.png" className="h-20 w-20" />
        </label>
      </div>
    </>
  );
}
