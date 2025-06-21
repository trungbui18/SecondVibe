"use client";

import { useState } from "react";
import { useProductsInProfile } from "@/hooks/useProduct";
import ProfileProductList from "./ProfileProductList";
export default function ProfileTabs({ id }: { id: number }) {
  const [activeTab, setActiveTab] = useState<"Listings" | "Reviews">(
    "Listings"
  );
  const { products, error, isLoading } = useProductsInProfile(id);
  return (
    <>
      <div className="mt-6 mx-4 md:mx-20 border-b">
        <div className="flex space-x-6 text-sm font-medium">
          {["Listings", "Reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "Listings" | "Reviews")}
              className={`pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-teal-400 text-teal-400"
                  : "text-black/70 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-4 md:mx-20 mt-6 shadow-md">
        {activeTab === "Reviews" ? (
          <div className="bg-white border-gray-200 border-2 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Reviews</h2>
              <div className="relative">
                <select className="bg-neutral-800 text-white px-3 py-1 pr-8 rounded border border-neutral-700 appearance-none">
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>
            <div className="text-center text-neutral-500">
              <p className="mt-10">No reviews yet</p>
            </div>
          </div>
        ) : (
          <ProfileProductList products={products || []} />
        )}
      </div>
    </>
  );
}
