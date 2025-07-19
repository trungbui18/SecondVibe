"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import productApi from "@/services/product";
import subCategoryApi from "@/services/subcategories";
import { ProductViewResponse } from "@/types/product";
import { SubCategory } from "@/types/subCategory";
import ProductList from "@/components/client/product/ProductList";
import { useBrands } from "@/hooks/useBrand";
import { useConditions } from "@/hooks/useCondition";
import { useSizes } from "@/hooks/useSize";

const categoryMap: Record<string, string> = {
  man: "Man's Fashion",
  woman: "Woman's Fashion",
};

const backgroundMap: Record<string, string> = {
  man: "https://sl3-cdn.karousell.com/homescreens/main/sg_web_homepage/mens_fashion/banner/hero_menfashion.1.png",
  woman:
    "https://sl3-cdn.karousell.com/homescreens/main/sg_web_homepage/womens_fashion/banner/hero_womensfashion.1.png",
};

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<ProductViewResponse[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const { brands } = useBrands();
  const { conditions } = useConditions();
  const { sizes, isLoadingSize, errorSize } = useSizes();

  const categoryName = categoryMap[id as string] || "";
  const heroBackground = backgroundMap[id as string] || backgroundMap["man"];

  const [filter, setFilter] = useState({
    categoryName,
    subCategoryId: 0,
    brandId: 0,
    conditionId: 0,
    priceFrom: 0,
    priceTo: 0,
    keyword: "",
    sizeId: "",
  });

  useEffect(() => {
    if (!categoryName) return;

    setFilter((prev) => ({ ...prev, categoryName }));

    const fetchData = async () => {
      try {
        const resSub = await subCategoryApi.getByCategoryName(categoryName);
        setSubCategories(resSub.data.data || []);

        const resProducts = await productApi.filterProduct({
          ...filter,
          categoryName,
        });
        setProducts(resProducts.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = async () => {
    const res = await productApi.filterProduct({
      ...filter,
      subCategoryId: Number(filter.subCategoryId),
      brandId: Number(filter.brandId),
      conditionId: Number(filter.conditionId),
      priceFrom: Number(filter.priceFrom),
      priceTo: Number(filter.priceTo),
      sizeId: filter.sizeId,
    });
    setProducts(res.data || []);
  };

  return (
    <div>
      {/* HERO SECTION */}
      <div
        className="w-full mt-4 h-[400px] bg-cover bg-center rounded-xl flex flex-col justify-center items-center text-white mb-8"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <h1 className="text-3xl font-bold mb-4 text-center drop-shadow">
          Every kinda thing, for every kinda person
        </h1>
        {/* Search bar (linked to keyword) */}
        <div className="flex bg-white rounded overflow-hidden w-full max-w-2xl">
          <input
            type="text"
            name="keyword"
            placeholder="Search for anything"
            value={filter.keyword}
            onChange={handleFilterChange}
            className="flex-1 px-4 py-2 text-black outline-none"
          />
          <button
            onClick={handleFilter}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
          >
            Search
          </button>
        </div>
        {/* trending keywords */}
        <p className="text-sm text-white mt-4 drop-shadow">
          Trending: bucket hat, love bonito, lululemon, dress, hoodie, nike
          dunk, vintage tee, backpack, zara, uniqlo
        </p>
      </div>

      {/* MAIN CONTENT: FILTER LEFT, PRODUCT LIST RIGHT */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* FILTER AREA LEFT */}
        <div className="md:w-1/6 w-full border border-gray-300 rounded-lg p-4 mb-6 shadow h-fit">
          <div>
            <label className="block text-sm font-medium mb-1">
              Subcategory
            </label>
            <select
              name="subCategoryId"
              value={filter.subCategoryId}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            >
              <option value={0}>All Subcategories</option>
              {subCategories.length === 0 ? (
                <option disabled>No subcategories found</option>
              ) : (
                subCategories.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {sc.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Brand</label>
            <select
              name="brandId"
              value={filter.brandId}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            >
              <option value={0}>All Brands</option>
              {brands?.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Condition</label>
            <select
              name="conditionId"
              value={filter.conditionId}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            >
              <option value={0}>All Conditions</option>
              {conditions?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.description}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Price From</label>
            <input
              type="number"
              name="priceFrom"
              value={filter.priceFrom}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Price To</label>
            <input
              type="number"
              name="priceTo"
              value={filter.priceTo}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Size</label>
            <select
              name="sizeId"
              value={filter.sizeId}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            >
              <option value="">All Sizes</option>
              {sizes?.map((s) => (
                <option key={s.id as string} value={s.id as string}>
                  {s.description}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <button
              onClick={handleFilter}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
            >
              Apply Filter
            </button>
          </div>
        </div>

        {/* PRODUCT LIST RIGHT */}
        <div className="md:w-5/6 w-full">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
