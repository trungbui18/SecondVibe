import ProductModeration from "./components/ProductModerationClient";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const id = Number(params.id);
  return <ProductModeration id={id} />;
}
