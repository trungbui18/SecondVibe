"use client";
import { useState } from "react";
import { Star, X } from "lucide-react";
import ratingApi from "@/services/rating";
import { RatingRequest } from "@/types/rating";

interface RatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetailId: number;
  productId: number;
  productName: string;
  ratedUserId: number; // ID của seller
  onRatingSubmitted: () => void;
}

export default function RatingDialog({
  isOpen,
  onClose,
  orderDetailId,
  productId,
  productName,
  ratedUserId,
  onRatingSubmitted,
}: RatingDialogProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá");
      return;
    }

    if (!comment.trim()) {
      alert("Vui lòng nhập đánh giá");
      return;
    }

    setIsSubmitting(true);
    try {
      const ratingData: RatingRequest = {
        orderDetailId: orderDetailId,
        ratedUserId,
        productId,
        score: rating,
        comment: comment.trim(),
      };

      console.log("Sending rating data:", ratingData);
      const response = await ratingApi.createRating(ratingData);
      console.log("Rating response:", response);
      onRatingSubmitted();
      onClose();
      // Reset form
      setRating(0);
      setComment("");
    } catch (error: any) {
      console.error("Error submitting rating:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      alert(
        `Có lỗi xảy ra khi gửi đánh giá: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Đánh giá sản phẩm
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Sản phẩm:</p>
          <p className="font-medium text-gray-900">{productName}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Đánh giá của bạn:</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {rating > 0 && `${rating} sao`}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">
            Nhận xét (bắt buộc):
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">
            {comment.length}/500 ký tự
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            disabled={isSubmitting}
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0 || !comment.trim()}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </div>
      </div>
    </div>
  );
}
