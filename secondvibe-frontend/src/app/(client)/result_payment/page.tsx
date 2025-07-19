"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { OrderResponse } from "@/types/order";
import orderApi from "@/services/order";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState(false);
  const [status, setStatus] = useState<"success" | "failed" | "pending">(
    "pending"
  );

  const responseCode = searchParams.get("vnp_ResponseCode");
  const codePayment = searchParams.get("vnp_TransactionNo") || "";
  const orderId = searchParams.get("vnp_OrderInfo") || "";
  const amount = searchParams.get("vnp_Amount") || "0";
  const date = searchParams.get("vnp_PayDate") || "";

  useEffect(() => {
    if (!responseCode) return;

    if (responseCode === "00") {
      setStatus("success");
      console.log("status", status);
      fetchData(); // chỉ gửi khi thanh toán thành công
    } else {
      setStatus("failed");
    }
  }, [responseCode]);

  const fetchData = async () => {
    const req = {
      idReservation: orderId,
      codePaymet: codePayment,
      amount: Number(amount) / 100,
      date: formatPayDate(date),
      status: "SUCCESS",
    };

    try {
      const res = await orderApi.createOrderVNPay(req);
      res.data == 200 ? setOrder(true) : setOrder(false);
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      setStatus("failed");
    }
  };

  const formatPayDate = (vnpDate: string) => {
    // VNPAY format: yyyyMMddHHmmss → ISO format
    if (vnpDate.length !== 14) return new Date().toISOString();
    return `${vnpDate.slice(0, 4)}-${vnpDate.slice(4, 6)}-${vnpDate.slice(
      6,
      8
    )}T${vnpDate.slice(8, 10)}:${vnpDate.slice(10, 12)}:${vnpDate.slice(
      12,
      14
    )}`;
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl text-center">
          {status === "pending" && (
            <>
              <p className="text-gray-600">Đang xử lý thanh toán...</p>
            </>
          )}
          {status === "success" && order && (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-xl font-bold mt-4">Thanh toán thành công!</h2>
              <p>Cảm ơn bạn đã đặt hàng.</p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Quay về trang chủ
              </button>
            </>
          )}
          {status === "failed" && (
            <>
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h2 className="text-xl font-bold mt-4">Thanh toán thất bại</h2>
              <p>Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Quay về trang chủ
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
