"use client";
import productApi from "@/services/product";
import { Product, ProductImage } from "@/types/product";
import { useEffect, useState } from "react";
import ProductImages from "./components/ProductImages";
import BasicInformation from "./components/BasicInformation";
import SizeAndQuantity from "./components/SizeAndQuantity";
import { ProductSize } from "@/types/product";
import FullPageLoading from "@/components/ui/FullPageLoading ";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const { id } = await params;
      console.log("slug: ", id);
      const response = await productApi.getProductById(Number(id));
      setProduct(response.data);
      // Reset các state tạm thời khi fetch lại dữ liệu
      setDeletedImageIds([]);
      setNewFiles([]);
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Lỗi khi tải dữ liệu sản phẩm");
    }
  };
  useEffect(() => {
    fetchData();
  }, [params]);

  const handleToggleImage = (idImage: number) => {
    setDeletedImageIds((prev) =>
      prev.includes(idImage)
        ? prev.filter((id) => id !== idImage)
        : [...prev, idImage]
    );
  };

  const handleAddImages = (files: File[]) => {
    if (!product) return;
    // preview
    const previews: ProductImage[] = files.map((file) => ({
      idImage: Date.now() + Math.random(),
      urlImage: URL.createObjectURL(file),
    }));

    // lưu file thật
    setNewFiles((prev) => [...prev, ...files]);

    // cập nhật hiển thị - chỉ thêm ảnh mới vào cuối
    setProduct((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        images: [...prev.images, ...previews],
      };
    });
  };

  const handleChangeProduct = (field: keyof Product, value: any) => {
    setProduct((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value,
      };
    });
  };
  const handleChangeProductSize = (
    index: number,
    field: keyof ProductSize,
    value: any
  ) => {
    setProduct((prev) => {
      if (!prev) return prev;
      const newSizes = [...prev.productSizes];
      newSizes[index] = { ...newSizes[index], [field]: value };
      return {
        ...prev,
        productSizes: newSizes,
      };
    });
  };

  const handleRemoveProductSize = (index: number) => {
    setProduct((prev) => {
      if (!prev) return prev;
      const newSizes = prev.productSizes.filter((_, i) => i !== index);
      return {
        ...prev,
        productSizes: newSizes,
      };
    });
  };

  const handleSubmit = async () => {
    if (!product) return;

    // Validation cơ bản
    if (!product.name || !product.description || !product.price) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm");
      return;
    }

    if (product.productSizes.length === 0) {
      alert("Vui lòng thêm ít nhất một size cho sản phẩm");
      return;
    }

    setIsLoading(true);
    const data = {
      name: product.name,
      description: product.description,
      status: product.status,
      price: product.price,
      condition: product.condition,
      brand: product.brand,
      subCategory: product.subCategory,
      productSizes: product.productSizes,
    };
    console.log("product:", product);
    const formData = new FormData();

    formData.append("product", JSON.stringify(data));

    newFiles.forEach((file) => {
      formData.append("imagesUploaded", file);
    });

    // id ảnh xóa
    deletedImageIds.forEach((id) => {
      formData.append("imagesDeleted", id.toString());
    });

    try {
      const response = await productApi.updateProduct(product.id, formData);

      // Cập nhật state với dữ liệu mới từ server
      if (response.data) {
        setProduct(response.data);
        // Reset các state tạm thời
        setDeletedImageIds([]);
        setNewFiles([]);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi update");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    const result = await Swal.fire({
      title: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });
    if (result.isConfirmed) {
      try {
        await productApi.deleteProduct(product.id);
        Swal.fire({
          icon: "success",
          title: "Delete product successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/manage/product");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Delete product failed!",
        });
      }
    }
  };

  return (
    <div className="py-6 px-20">
      {product ? (
        <div className="space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Detail Product</h1>
            {/* <p className="mt-2 text-gray-600">Product ID: {product.id}</p> */}
          </div>
          <BasicInformation
            product={product}
            onChangeProduct={handleChangeProduct}
          />
          <ProductImages
            images={product.images}
            deletedImageIds={deletedImageIds}
            onToggleImage={handleToggleImage}
            onAddImages={handleAddImages}
          />
          <SizeAndQuantity
            productSize={product.productSizes}
            onChange={handleChangeProductSize}
            onRemove={handleRemoveProductSize}
          />

          <div className="mt-6 flex gap-4">
            <button
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Đang lưu..." : "Save"}
            </button>
            <button
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              onClick={handleDelete}
              disabled={isLoading}
            >
              Delete product
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">Đang tải dữ liệu sản phẩm...</div>
      )}
      {isLoading && <FullPageLoading />}
    </div>
  );
}
