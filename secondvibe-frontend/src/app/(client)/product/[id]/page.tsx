import productApi from "@/services/product";
import { Product } from "@/types/product";
import ImageGallery from "./components/ImageGallery";
import InforProduct from "./components/InforProduct";
import InforSeller from "./components/InforSeller";
interface Props {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const id = Number(params.id);

  const response = await productApi.getProductById(id);
  const product: Product = response.data;

  return (
    <div className="py-6 px-20">
      <div className="grid grid-cols-2 gap-6 w-full border border-gray-200 rounded shadow-lg border-t-1 p-6">
        <div className="col-span-1">
          <ImageGallery images={product.images} />
        </div>
        <div className="col-span-1">
          <InforProduct Product={product} />
        </div>
      </div>
    </div>
  );
}
