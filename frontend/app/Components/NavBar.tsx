"use client";

import { useState } from "react";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b shadow-sm">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

        {/* Logo */}
        <div className="text-2xl font-bold text-black">
          Shop<span className="text-purple-600">Ease</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-purple-600">Home</a>
          <a href="#" className="hover:text-purple-600">Shop</a>
          <a href="#" className="hover:text-purple-600">Categories</a>
          <a href="#" className="hover:text-purple-600">Deals</a>
          <a href="#" className="hover:text-purple-600">Contact</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <button className="hover:text-purple-600">🔍</button>

          {/* Cart */}
          <button className="relative hover:text-purple-600">
            🛒
            <span className="absolute -top-2 -right-2 text-xs bg-purple-600 text-white w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </button>

          {/* Profile */}
          <button className="hover:text-purple-600">👤</button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2 text-sm font-medium text-gray-700">
          <a href="#" className="block hover:text-purple-600">Home</a>
          <a href="#" className="block hover:text-purple-600">Shop</a>
          <a href="#" className="block hover:text-purple-600">Categories</a>
          <a href="#" className="block hover:text-purple-600">Deals</a>
          <a href="#" className="block hover:text-purple-600">Contact</a>
        </div>
      )}

    </header>
  );
}