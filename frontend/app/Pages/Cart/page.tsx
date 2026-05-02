"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CartItem = {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
};
type Product = {
  id: number;
  product_name: string;
  product_price: number;
  product_description: string;
  product_image: string;
};

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) return; // important safety check

    const res = await fetch("http://127.0.0.1:8000/cart/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch cart");
      return;
    }

    const data = await res.json();
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const [removingId, setRemovingId] = useState<number | null>(null);

  const increase = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = async (id: number) => {
  const token = localStorage.getItem("token");

  if (!token) return;

  setRemovingId(id);

  const res = await fetch(`http://127.0.0.1:8000/remove-from-cart/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Failed to delete item");
    setRemovingId(null);
    return;
  }

  setRemovingId(null);

  fetchCart(); // refresh from backend
};

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

        .cp * { box-sizing: border-box; margin: 0; padding: 0; }

        .cp {
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          background-color: #0c0c12;
          background-image: radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 30px 30px;
          color: #d8d8e4;
        }

        /* ── HEADER — original structure/feel, untouched ── */
        .cp-header {
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .cp-header-inner {
          max-width: 1152px;
          margin: 0 auto;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cp-title {
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
        }

        .cp-back {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.18s;
        }
        .cp-back:hover { color: #fff; }

        /* ── BODY ── */
        .cp-body {
          max-width: 1152px;
          margin: 0 auto;
          padding: 44px 24px 90px;
        }

        /* ── EMPTY ── */
        .cp-empty {
          text-align: center;
          padding: 96px 24px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          background: rgba(255,255,255,0.02);
        }

        .cp-empty h2 {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 600;
          color: rgba(255,255,255,0.45);
          margin-bottom: 8px;
        }

        .cp-empty p {
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.22);
          margin-bottom: 28px;
        }

        .cp-empty-btn {
          display: inline-block;
          padding: 12px 28px;
          border-radius: 10px;
          background: #fff;
          color: #0c0c12;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.18s;
        }
        .cp-empty-btn:hover { opacity: 0.88; }

        /* ── TWO-COL GRID ── */
        .cp-grid {
          display: grid;
          grid-template-columns: 1fr 348px;
          gap: 28px;
          align-items: start;
        }

        @media (max-width: 860px) {
          .cp-grid { grid-template-columns: 1fr; }
          .cp-sticky { position: static !important; }
        }

        /* ── LABEL ── */
        .cp-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-bottom: 16px;
        }

        /* ── ITEMS ── */
        .cp-list { display: flex; flex-direction: column; gap: 10px; }

        .cp-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 18px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          transition: opacity 0.32s ease, transform 0.32s ease, border-color 0.18s, background 0.18s;
          position: relative;
        }

        .cp-item::after {
          content: '';
          position: absolute;
          top: 0; left: 18%; right: 18%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.055), transparent);
          pointer-events: none;
          border-radius: 1px;
        }

        .cp-item:hover {
          border-color: rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.048);
        }

        .cp-item.cp-out {
          opacity: 0;
          transform: translateX(30px);
          pointer-events: none;
        }

        .cp-item img {
          width: 74px;
          height: 74px;
          flex-shrink: 0;
          border-radius: 10px;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.05);
          display: block;
        }

        .cp-info { flex: 1; min-width: 0; }

        .cp-brand {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 4px;
        }

        .cp-name {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 600;
          color: #eaeaf2;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cp-variant {
          font-size: 12px;
          font-weight: 300;
          color: rgba(255,255,255,0.25);
        }

        .cp-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        /* qty stepper */
        .cp-stepper {
          display: flex;
          align-items: center;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px;
          overflow: hidden;
          background: rgba(0,0,0,0.3);
        }

        .cp-step {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          font-size: 18px;
          line-height: 1;
          transition: background 0.15s, color 0.15s;
          user-select: none;
        }

        .cp-step:hover { background: rgba(255,255,255,0.07); color: #fff; }
        .cp-step:active { transform: scale(0.9); }

        .cp-qty-val {
          width: 30px;
          text-align: center;
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          font-weight: 600;
          color: #eaeaf2;
          border-left: 1px solid rgba(255,255,255,0.07);
          border-right: 1px solid rgba(255,255,255,0.07);
        }

        .cp-price {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 700;
          color: #f0f0f8;
          min-width: 52px;
          text-align: right;
        }

        .cp-del {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid rgba(255,70,70,0.12);
          border-radius: 8px;
          color: rgba(255,100,100,0.4);
          cursor: pointer;
          font-size: 13px;
          transition: all 0.18s;
          flex-shrink: 0;
        }

        .cp-del:hover {
          background: rgba(255,60,60,0.1);
          border-color: rgba(255,80,80,0.32);
          color: #ff7878;
        }

        /* ── SUMMARY CARD ── */
        .cp-sticky { position: sticky; top: 28px; }

        .cp-card {
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.034);
          padding: 26px 24px 28px;
          position: relative;
          overflow: hidden;
        }

        .cp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 12%; right: 12%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(220,210,255,0.22), transparent);
        }

        .cp-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #f0f0f8;
          margin-bottom: 22px;
        }

        .cp-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255,255,255,0.36);
          margin-bottom: 11px;
        }

        .cp-row span:last-child { color: rgba(255,255,255,0.68); }
        .cp-free { color: #5edaa4 !important; }

        .cp-hr {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 18px 0;
        }

        .cp-total {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 24px;
        }

        .cp-total-lbl {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        .cp-total-val {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          font-weight: 700;
          color: #f4f4fc;
          letter-spacing: -1px;
        }

        .cp-btn {
          width: 100%;
          height: 52px;
          border-radius: 12px;
          border: none;
          background: #ffffff;
          color: #0c0c12;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.18s, transform 0.18s;
        }

        .cp-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .cp-btn:active { transform: translateY(0); opacity: 1; }

        .cp-secure {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          margin-top: 12px;
          font-size: 11px;
          font-weight: 400;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.2px;
        }
          /* 📱 MOBILE RESPONSIVE FIX */
        @media (max-width: 768px) {

        /* MAIN GRID → stack vertically */
        .cp-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
        }

        /* ITEM CARD → better mobile layout */
        .cp-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 14px;
        }

        /* IMAGE SIZE */
        .cp-item img {
            width: 56px;
            height: 56px;
        }

        /* INFO SECTION FULL WIDTH */
        .cp-info {
            width: 100%;
        }

        /* ACTIONS WRAP CLEANLY */
        .cp-actions {
            width: 100%;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
        }

        /* PRICE SMALLER ON MOBILE */
        .cp-price {
            font-size: 15px;
        }

        /* STEPPER BIGGER FOR TOUCH */
        .cp-step {
            width: 38px;
            height: 38px;
            font-size: 20px;
        }

        /* SUMMARY CARD NOT STICKY */
        .cp-sticky {
            position: static !important;
            top: auto !important;
        }

        /* SUMMARY PADDING REDUCE */
        .cp-card {
            padding: 18px;
        }

        /* TOTAL FONT SIZE ADJUST */
        .cp-total-val {
            font-size: 26px;
        }

        }
      `}</style>

      <div className="cp">

        {/* ── HEADER (original structure) ── */}
        <div className="cp-header">
          <div className="cp-header-inner">
            <h1 className="cp-title">Shopping Cart</h1>
            <Link href="/" className="cp-back">
              Continue shopping →
            </Link>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="cp-body">
          {cart.length === 0 ? (
            <div className="cp-empty">
              <h2>Your cart is empty</h2>
              <p>Start adding products to see them here</p>
              <Link href="/" className="cp-empty-btn">Browse Products</Link>
            </div>
          ) : (
            <div className="cp-grid">

              {/* LEFT */}
              <div>
                <p className="cp-label">Items ({cart.length})</p>
                <div className="cp-list">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className={`cp-item${removingId === item.id ? " cp-out" : ""}`}
                    >
                      <img src={item.image} alt={item.name} />

                      <div className="cp-info">
                        <p className="cp-brand">{item.brand}</p>
                        <h3 className="cp-name">{item.name}</h3>
                        <p className="cp-variant">{item.color}</p>
                      </div>

                      <div className="cp-actions">
                        <div className="cp-stepper">
                          <button className="cp-step" onClick={() => decrease(item.id)}>−</button>
                          <span className="cp-qty-val">{item.quantity}</span>
                          <button className="cp-step" onClick={() => increase(item.id)}>+</button>
                        </div>

                        <span className="cp-price">NPR.{(item.price * item.quantity).toFixed(2)}</span>

                        <button
                          className="cp-del"
                          onClick={() => removeItem(item.id)}
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="cp-sticky">
                <div className="cp-card">
                  <h2 className="cp-card-title">Order Summary</h2>

                  <div className="cp-row">
                    <span>Subtotal</span>
                    <span>NPR.{total}</span>
                  </div>
                  <div className="cp-row">
                    <span>Shipping</span>
                    <span className="cp-free">Free</span>
                  </div>
                  <div className="cp-row">
                    <span>Tax</span>
                    <span>NPR.0</span>
                  </div>

                  <div className="cp-hr" />

                  <div className="cp-total">
                    <span className="cp-total-lbl">Total</span>
                    <span className="cp-total-val">NPR.{total}</span>
                  </div>

                  <button className="cp-btn">Checkout</button>

                  <p className="cp-secure">
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round"/>
                    </svg>
                    Secure checkout · Encrypted payment
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </>
  );
}


