"use client";

import { useEffect, useState } from "react";
import ProductImages from "@/components/client/product/ProductImages";
import ProductActions from "./ProductActions";
import ProductInfo from "./ProductInfo";
import productApi from "@/services/product";
import { Product } from "@/types/product";

interface Props {
  id: number;
}
export default function ProductModeration({ id }: Props) {
  const [productData, setProductData] = useState<Product | null>(null);
  const [status, setStatus] = useState("Loading...");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getProductById(id);
        setProductData(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Lỗi khi load sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleModeration = async (
    status: "APPROVED" | "REJECTED",
    reason?: string
  ) => {
    if (status === "REJECTED" && !reason?.trim()) {
      alert("Vui lòng nhập lý do từ chối!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await productApi.moderationProduct({
        idProduct: productData?.id ?? 0,
        status,
        reason: status === "REJECTED" ? reason : "",
      });
      setStatus(status);
      alert(
        status === "APPROVED"
          ? "Sản phẩm đã được phê duyệt!"
          : `Sản phẩm đã bị từ chối với lý do: ${reason}`
      );

      if (status === "REJECTED") {
        setShowRejectDialog(false);
        setRejectReason("");
      }
    } catch (error) {
      alert("Có lỗi xảy ra trong quá trình xử lý!");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!productData) {
    return <div className="p-10 text-center">Đang tải sản phẩm...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Kiểm duyệt sản phẩm
          </h1>
          <p className="text-gray-600 mt-1">ID sản phẩm: #{productData.id}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ProductImages images={productData.images} />
          <div className="flex-col space-y-4">
            <ProductInfo productData={productData} status={status} />
            <ProductActions
              showRejectDialog={showRejectDialog}
              rejectReason={rejectReason}
              setRejectReason={setRejectReason}
              setShowRejectDialog={setShowRejectDialog}
              isSubmitting={isSubmitting}
              status={status}
              handleModeration={handleModeration}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
