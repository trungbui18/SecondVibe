import { Product } from "@/types/product";
import { useBrands } from "@/hooks/useBrand";
import { useConditions } from "@/hooks/useCondition";
import { useCategories } from "@/hooks/useCategory";
import CategorySelector from "@/components/ui/CategorySelector";

export default function BasicInformation({
  product,
  onChangeProduct,
}: {
  product: Product;
  onChangeProduct: (field: keyof Product, value: any) => void;
}) {
  const { brands, isLoadingBrand, errorBrand } = useBrands();
  const { conditions, isLoadingCondition, errorCondition } = useConditions();
  const { categories, isLoadingCategory, errorCategory } = useCategories();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Name *
          </label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => onChangeProduct("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded "
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-2">Price *</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => onChangeProduct("price", Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded "
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium mb-2">Condition</label>
          <select
            value={product.condition}
            onChange={(e) => onChangeProduct("condition", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">{product.condition}</option>
            {conditions?.map((con) => (
              <option key={con.id} value={con.description}>
                {con.description}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium mb-2">Brand</label>
          <select
            value={product.brand}
            onChange={(e) => onChangeProduct("brand", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">{product.brand}</option>
            {brands?.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <CategorySelector
          categories={categories || []}
          selectedSubCategory={product.subCategory}
          onSelect={(subName) => onChangeProduct("subCategory", subName)}
        />
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          rows={4}
          value={product.description}
          onChange={(e) => onChangeProduct("description", e.target.value)}
          className="w-full px-3 py-2 border rounded "
        />
      </div>
    </div>
  );
}
