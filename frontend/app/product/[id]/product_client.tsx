"use client";

import { useState } from "react";

export default function ProductClient({ product }: any) {
  const [qty, setQty] = useState(1);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // 🛡️ Safety check (IMPORTANT)
  if (!product) return <div className="text-white">Loading...</div>;

  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => Math.max(1, q - 1));

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showToast("Please login first 🔐");
      return;
    }  

    try {
      const res = await fetch("https://e-store-ja69.onrender.com/add-to-cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: qty,
        }),
    });

    if (!res.ok) throw new Error("Failed");

    showToast("Added to cart ✓");
  } catch (err) {
    showToast("Error adding to cart ❌");
  }
  };

  // 🛡️ Safe fallback (optional future use)
  const variants = product?.variants || ["Default"];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e4dc] flex items-center justify-center px-4 py-12 font-sans relative overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#c9a96e20] blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="w-full max-w-5xl grid md:grid-cols-[1fr_360px] gap-12 items-start relative z-10">

        {/* ── LEFT: Image + Info ── */}
        <div className="space-y-6">

          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden bg-[#161616] shadow-2xl group">
            <img
              src={product.product_image || "/placeholder.jpg"}
              alt={product.product_name}
              className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#c9a96e] text-black text-[11px] px-3 py-1 rounded-full tracking-widest shadow-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Meta */}
          <div className="space-y-3">

            <h1 className="text-3xl font-semibold text-white leading-snug tracking-tight">
              {product.product_name}
            </h1>

            <p className="text-[#aaa] text-sm leading-relaxed max-w-lg">
              {product.product_description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <span className="text-2xl font-semibold text-[#c9a96e]">
                NPR {Number(product.product_price).toLocaleString()}
              </span>

              {product.originalPrice && (
                <span className="text-sm text-[#555] line-through">
                  NPR {Number(product.originalPrice).toLocaleString()}
                </span>
              )}
            </div>

          </div>
        </div>

        {/* ── RIGHT: FLOATING GLASS PANEL ── */}
        <div className="relative">

          <div className="absolute inset-0 bg-[#c9a96e10] blur-2xl rounded-2xl" />

          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-7 space-y-6 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

            <h2 className="text-sm uppercase tracking-widest text-[#aaa] border-b border-white/10 pb-3">
              Purchase
            </h2>

            {/* Quantity */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#666] uppercase tracking-widest">
                Quantity
              </span>

              <div className="flex items-center bg-[#111] border border-white/10 rounded-full overflow-hidden">
                <button
                  onClick={decrease}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#1a1a1a] transition"
                >
                  −
                </button>

                <span className="w-10 text-center">{qty}</span>

                <button
                  onClick={increase}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#1a1a1a] transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-y border-white/10 py-4">
              <span className="text-xs text-[#666] uppercase tracking-widest">
                Total
              </span>

              <span className="text-xl font-semibold text-[#c9a96e]">
                NPR {(Number(product.product_price) * qty).toLocaleString()}
              </span>
            </div>

            {/* BUTTONS */}
            <div className="space-y-3">

              <button
                onClick={addToCart}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c9a96e] to-[#e6c98a] text-black font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => showToast("Redirecting...")}
                className="w-full py-3 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
              >
                Buy Now →
              </button>

            </div>

            {/* Trust */}
            <div className="flex justify-between text-xs text-[#666] pt-2">
              <span>🔒 Secure</span>
              <span>🚚 Free</span>
              <span>↩ Returns</span>
            </div>

          </div>
        </div>
      </div>

      {/* Toast */}
      <div
        className={`fixed bottom-6 right-6 bg-black/80 backdrop-blur-md border border-[#c9a96e44] text-[#c9a96e] px-4 py-2 rounded-lg transition ${
          toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        {toastMsg}
      </div>

    </div>
  );
}