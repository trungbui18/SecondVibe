import { category as Category } from "@/types/category";
import { SubCategory as SubCategory } from "@/types/subCategory";
import { useEffect, useState } from "react";

export default function CategorySelector({
  categories,
  selectedSubCategory,
  onSelect,
}: {
  categories: Category[];
  selectedSubCategory: string | undefined;
  onSelect: (subName: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSub, setSelectedSub] = useState<SubCategory | null>(null);
  const [open, setOpen] = useState(false);

  // đồng bộ state nếu có selectedSubCategory
  useEffect(() => {
    if (selectedSubCategory) {
      const found = categories
        .flatMap((c) => c.subCategories)
        .find((s) => s.name === selectedSubCategory);
      if (found) {
        setSelectedSub(found);
        const cat = categories.find((c) =>
          c.subCategories.some((s) => s.id === found.id)
        );
        setSelectedCategory(cat || null);
      }
    }
  }, [selectedSubCategory, categories]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSelectedSub(null);
  };

  const handleSubCategorySelect = (sub: SubCategory) => {
    setSelectedSub(sub);
    onSelect(sub.name); // callback trả tên
    setOpen(false);
  };

  const getDisplayValue = () => {
    if (selectedSub) {
      return selectedSub.name;
    }
    if (selectedCategory) {
      return selectedCategory.name;
    }
    return "Vui lòng chọn";
  };

  return (
    <div className="w-full relative">
      <div
        className="border border-gray-300 rounded-md p-2 bg-white cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {getDisplayValue()}
      </div>

      {open && (
        <div className="absolute z-50 mt-1 border border-gray-300 rounded-md bg-white shadow w-full max-h-60 overflow-auto">
          {!selectedCategory &&
            categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCategorySelect(category)}
              >
                <img
                  src={category.imageCategory}
                  alt={category.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{category.name}</span>
              </div>
            ))}

          {selectedCategory &&
            selectedCategory.subCategories.map((sub) => (
              <div
                key={sub.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSubCategorySelect(sub)}
              >
                {sub.name}
              </div>
            ))}
          {selectedCategory && (
            <div
              className="p-2 text-gray-500 cursor-pointer hover:bg-gray-100 border-t"
              onClick={() => setSelectedCategory(null)}
            >
              ← Danh mục
            </div>
          )}
        </div>
      )}
    </div>
  );
}
