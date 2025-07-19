"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import debounce from "lodash.debounce";
import productApi from "@/services/product";

interface SearchInputProps {
  onSearch?: (results: any[]) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if we're on the search page
  const isOnSearchPage = pathname === "/search";

  // Debounced function to search for suggestions
  const debouncedSearch = useCallback(
    debounce(async (key: string) => {
      if (key.trim().length === 0) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        setLoading(true);
        const response = await productApi.searchKeyProduct(key);
        if (response.status === 200) {
          setSuggestions(response.data || []);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Handle search term change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Navigate to search page with query
  const navigateToSearch = (query: string) => {
    if (!isOnSearchPage) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);

    if (!isOnSearchPage) {
      // If not on search page, navigate there with the suggestion
      navigateToSearch(suggestion);
      return;
    }

    // If on search page, perform search directly
    try {
      setLoading(true);
      const response = await productApi.searchProduct(suggestion);
      if (response.status === 200 && onSearch) {
        onSearch(response.data || []);
      }
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search button click
  const handleSearchClick = async () => {
    if (searchTerm.trim().length === 0) return;

    if (!isOnSearchPage) {
      // If not on search page, navigate there with the search term
      navigateToSearch(searchTerm);
      return;
    }

    // If on search page, perform search directly
    try {
      setLoading(true);
      const response = await productApi.searchProduct(searchTerm);
      if (response.status === 200 && onSearch) {
        onSearch(response.data || []);
      }
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className=" flex space-x-2 w-full mt-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-gray-200 w-full h-[40px] text-black p-2 rounded-md focus:outline-none"
        />

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute mt-4 top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
          </div>
        )}
      </div>

      <button
        onClick={handleSearchClick}
        disabled={loading}
        className="w-26 h-[40px] bg-green-700 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "..." : "Search"}
      </button>
    </div>
  );
}
