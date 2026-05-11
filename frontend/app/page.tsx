"use client";
import Link from "next/link";
import Loader from "./Components/Loader"
import NoProducts from "./Components/Noproduct";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  product_name: string;
  product_price: number;
  product_description: string;
  product_image: string;
};

export default function ProductsPage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products/")
      .then(res =>{
        if(!res.ok){
          throw new Error("This is not okay")
        }
        return res.json();
      })
      .then(data => {setProducts(data);
        setLoading(false);
      })
      .catch(err =>{
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if(loading){
    return(
   <Loader/>);
  }

  if(error){
    return(<NoProducts/>);
  }

  return (
    <div className="bg-gray-950 min-h-screen text-gray-200 px-6 py-12">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Discover high-quality items crafted for modern needs
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.map((item) => (
          <div
            key={item.id}
            className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-gray-600 hover:shadow-lg hover:shadow-black/40"
          >

            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-indigo-500 to-purple-500 transition duration-500"></div>

            {/* IMAGE */}
            <div className="h-44 rounded-xl overflow-hidden mb-5 bg-gray-800 group-hover:scale-[1.02] transition duration-300">
              <img
                src={item.product_image}
                alt={item.product_name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="space-y-2 relative z-10">

              <h2 className="text-lg font-semibold group-hover:translate-x-1 transition duration-300">
                {item.product_name}
              </h2>

              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition">
                {item.product_description}
              </p>

              <div className="flex items-center justify-between mt-4">

                <div className="flex items-baseline gap-1 text-white font-bold text-lg">
                  <span className="text-sm text-gray-400">NPR</span>
                  <span>{item.product_price}</span>
                </div>

                <Link href={item?.id ? `/product/${item.id}` : "#"} className="px-4 py-2 text-sm rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white">
                  Details
                </Link>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}