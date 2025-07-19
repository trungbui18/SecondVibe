import React from "react";
import { useRating } from "@/hooks/useRating";
import { useParams } from "next/navigation";

export default function Review() {
  const params = useParams();
  const userId = Number(params.id);
  const { ratings, error, isLoading } = useRating(userId);

  if (isLoading) {
    return (
      <div className="bg-white border-gray-200 border-2 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Reviews</h2>
        </div>
        <div className="text-center text-neutral-500">
          <p className="mt-10">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border-gray-200 border-2 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Reviews</h2>
        </div>
        <div className="text-center text-neutral-500">
          <p className="mt-10">Error loading reviews</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-gray-200 border-2 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Reviews</h2>
      </div>

      {!ratings || ratings.length === 0 ? (
        <div className="text-center text-neutral-500">
          <p className="mt-10">No reviews yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ratings.map((rating) => (
            <div
              key={rating.id}
              className="border-b border-gray-100 pb-4 last:border-b-0"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={rating.raterAvatar || "/default-avatar.png"}
                  alt={rating.raterName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">
                      {rating.raterName}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating.score
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{rating.comment}</p>

                  {/* Product information with image */}
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src={rating.productFirstImage || "/default-product.png"}
                      alt={rating.productName}
                      className="w-12 h-12 rounded-md object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {rating.productName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(rating.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
