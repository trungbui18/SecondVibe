"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/ui/SearchInput";
import ProductList from "@/components/client/product/ProductList";
import { ProductViewResponse } from "@/types/product";
import productApi from "@/services/product";

export default function Search() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<ProductViewResponse[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");

  // Handle search from URL query parameter
  useEffect(() => {
    const query = searchParams.get("q");
    if (query && query !== initialQuery) {
      setInitialQuery(query);
      performSearch(query);
    }
  }, [searchParams, initialQuery]);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    try {
      const response = await productApi.searchProduct(searchTerm);
      if (response.status === 200) {
        setSearchResults(response.data || []);
        setHasSearched(true);
      }
    } catch (error) {
      console.error("Error performing search:", error);
      setSearchResults([]);
      setHasSearched(true);
    }
  };

  const handleSearch = (results: ProductViewResponse[]) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className="py-8 w-full">
      <SearchInput onSearch={handleSearch} />

      {/* Search Results */}
      <div className="mt-8">
        {hasSearched && (
          <ProductList
            products={searchResults}
            title="Kết quả tìm kiếm"
            showSellerInfo={true}
          />
        )}
      </div>
    </div>
  );
}
