"use client";
import { useState, useRef } from "react";
import {supabase} from "@/utils/supabase/client"

export default function AddProductPage() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isSubmitting = useRef(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [colour, setColour] = useState("");
  

  const loadImage = (file: File) => {
  if (!file || !file.type.startsWith("image/")) return;
  isSubmitting.current = true;

  setFile(file); // ✅ store real file

  const reader = new FileReader();
  reader.onload = (e) => setImage(e.target?.result as string);
  reader.readAsDataURL(file);
  };

  const uploadToImageKit = async () => {
  if (!file) return null;

  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token
  const authRes = await fetch("http://localhost:8000/imagekit-auth/",{
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },});
  const auth = await authRes.json();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("publicKey", "public_ZlPPlks3ZilPQ95dIM4ip19laNY=");
  formData.append("fileName", file.name);
  formData.append("token", auth.token);
  formData.append("expire", auth.expire);
  formData.append("signature", auth.signature);
  
  const res = await fetch(
    "https://upload.imagekit.io/api/v1/files/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  console.log("FULL ImageKit response:", data);

  if (!data.url) {
    console.error("UPLOAD FAILED:", data);
    return null;
  }

  return data.url;
};


  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) loadImage(file);
  };

  const handleSubmit = async () => {
  if (countdown > 0) return;

  // 🔥 STEP 1: upload image
  const imageUrl = await uploadToImageKit();

  console.log("Image URL:", imageUrl);

  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token
  // 🔥 STEP 2: send to Django
  await fetch("http://localhost:8000/add-products/", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
    body: JSON.stringify({
    product_name: name,
    product_price: price,
    product_description: description,
    product_image: imageUrl,
    product_brand: brand,
    product_colour: colour
      }),
  });
  

  //  Countdown logic 
  let t = 10;
  setCountdown(t);
  const iv = setInterval(() => {
    t--;
    if (t <= 0) {
      clearInterval(iv);
      setCountdown(0);
      isSubmitting.current = false; 
    } else {
      setCountdown(t);
    }
  }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[520px]">
        <div className="bg-[#111118] border border-white/7 rounded-[20px] overflow-hidden">

          {/* Header */}
          <div className="px-9 pt-9 pb-7 text-center border-b border-white/6">
            <h1 className="text-[2.2rem] font-extrabold tracking-tight leading-tight bg-linear-to-br from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Place Your Product
            </h1>
            <p className="text-slate-500 text-[0.82rem] mt-2 tracking-wide">
              Upload, describe, and publish in seconds
            </p>
          </div>

          {/* Body */}
          <div className="px-9 py-7 flex flex-col gap-5">

            {/* Image Upload */}
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-violet-400/70 mb-2">
                Product Image
              </p>
              <label
                className="relative block min-h-[170px] rounded-[14px] border-[1.5px] border-dashed border-violet-400/25 bg-violet-400/4 cursor-pointer overflow-hidden transition-colors hover:border-violet-400/50 hover:bg-violet-400/7"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) loadImage(file);
                  }}
                />

                {image ? (
                  <>
                    <img
                      src={image}
                      alt="preview"
                      className="w-full h-[200px] object-cover rounded-[13px]"
                    />
                    <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-white text-[0.72rem] px-3 py-1 rounded-full border border-white/15 pointer-events-none">
                      Change photo
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2.5 p-8 pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-violet-400/10 flex items-center justify-center">
                      <svg
                        width="20" height="20" fill="none"
                        stroke="rgba(167,139,250,0.85)"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-violet-400/85 text-[0.85rem] font-medium">
                        Click or drag image here
                      </p>
                      <p className="text-slate-500/60 text-[0.75rem] mt-1">
                        PNG, JPG, WEBP
                      </p>
                    </div>
                  </div>
                )}
              </label>
            </div>

            {/* Name + Price */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-violet-400/70 mb-2">
                  Product Name
                </p>
                <input
                  type="text"
                  placeholder="e.g. Wireless Earbuds"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0d0d16] border border-white/7 rounded-xl px-4 py-3 text-slate-200 text-[0.88rem] placeholder:text-slate-500/40 outline-none focus:border-violet-400/45 focus:ring-2 focus:ring-violet-400/7 transition-colors"
                />
              </div>
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-violet-400/70 mb-2">
                  Price
                </p>
                <div className="relative">
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 text-slate-500/50 text-[0.88rem] pointer-events-none">
                    NPR.
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    className="w-full bg-[#0d0d16] border border-white/7 rounded-xl pl-10 pr-4 py-3 text-slate-200 text-[0.88rem] placeholder:text-slate-500/40 outline-none focus:border-violet-400/45 focus:ring-2 focus:ring-violet-400/7 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Brand and Colour */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-violet-400/70 mb-2">
                  Product Brand
                </p>
                <input
                  type="text"
                  placeholder="Brand of Product"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-[#0d0d16] border border-white/7 rounded-xl px-4 py-3 text-slate-200 text-[0.88rem] placeholder:text-slate-500/40 outline-none focus:border-violet-400/45 focus:ring-2 focus:ring-violet-400/7 transition-colors"
                />
              </div>
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-violet-400/70 mb-2">
                  Product Colour
                </p>
                <input
                  type="text"
                  placeholder="Colour of Product"
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                  className="w-full bg-[#0d0d16] border border-white/7 rounded-xl px-4 py-3 text-slate-200 text-[0.88rem] placeholder:text-slate-500/40 outline-none focus:border-violet-400/45 focus:ring-2 focus:ring-violet-400/7 transition-colors"
                />
              </div>

            </div>

            {/* Description */}
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-violet-400/70 mb-2">
                Description
              </p>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product — features, materials, dimensions…"
                className="w-full bg-[#0d0d16] border border-white/7 rounded-xl px-4 py-3 text-slate-200 text-[0.88rem] placeholder:text-slate-500/40 outline-none focus:border-violet-400/45 focus:ring-2 focus:ring-violet-400/7 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={countdown > 0}
              className={`w-full py-4 rounded-[13px] text-white text-[0.95rem] font-bold tracking-wide transition-all
                ${countdown > 0
                  ? "bg-white/[0.07] text-white/30 cursor-not-allowed"
                  : "bg-linear-to-r from-violet-600 via-pink-500 to-orange-500 hover:opacity-90 hover:-translate-y-px active:translate-y-0 cursor-pointer"
                }`}
            >
              {countdown > 0 ? `Wait ${countdown}s to publish again` : "Publish Product"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}