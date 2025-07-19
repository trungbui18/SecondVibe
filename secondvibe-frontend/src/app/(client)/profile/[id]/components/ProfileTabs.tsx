"use client";

import { useState } from "react";
import { useProductsInProfile } from "@/hooks/useProduct";
import ProfileProductList from "./ProfileProductList";
import Review from "./Review";
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
          <Review />
        ) : (
          <ProfileProductList products={products || []} />
        )}
      </div>
    </>
  );
}
