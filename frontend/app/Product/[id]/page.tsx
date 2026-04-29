import products from "../../lib/product";
import ProductClient from "./product_client";
import ProductNotFound from "./NoProduct";

export default async function ProductPage({ params }: any) {
  const { id } = await params;

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return (<ProductNotFound />);
  }

 
    return (<ProductClient product={product} />);
}