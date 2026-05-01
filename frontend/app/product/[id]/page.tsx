import ProductClient from "./product_client";
import ProductNotFound from "./NoProduct";

async function getProduct(id: string) {
  const res = await fetch(`http://127.0.0.1:8000/products/${id}/`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function ProductPage({ params }: any) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const product = await getProduct(id);

  if (!product) {
    return <ProductNotFound />;
  }

  return <ProductClient product={product} />;
}