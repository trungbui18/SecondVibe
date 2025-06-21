"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"success" | "failed" | "pending">(
    "pending"
  );

  useEffect(() => {
    const responseCode = searchParams.get("vnp_ResponseCode");

    if (responseCode === "00") {
      setStatus("success");
    } else {
      setStatus("failed");
    }
  }, [searchParams]);

  const renderContent = () => {
    switch (status) {
      case "success":
        return (
          <div className="flex flex-col items-center">
            <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              Thanh toán thành công!
            </h1>
            <p className="text-gray-700 mb-6">
              Cảm ơn bạn đã mua hàng tại{" "}
              <span className="font-semibold">SecondVibe</span>.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Quay lại trang chủ
            </button>
          </div>
        );
      case "failed":
        return (
          <div className="flex flex-col items-center">
            <XCircle className="text-red-500 w-20 h-20 mb-4" />
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Thanh toán thất bại!
            </h1>
            <p className="text-gray-700 mb-6">
              Giao dịch của bạn không thành công hoặc đã bị hủy.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Về trang chủ
            </button>
          </div>
        );
      default:
        return (
          <div className="text-lg font-medium text-gray-600">
            Đang xử lý thanh toán...
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        {renderContent()}
      </div>
    </div>
  );
}
