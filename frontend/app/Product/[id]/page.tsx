import products from "../../lib/product";
import ProductClient from "./product_client";

export default async function ProductPage({ params }: any) {
  const { id } = await params;

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

 
    return (<ProductClient product={product} />);
}