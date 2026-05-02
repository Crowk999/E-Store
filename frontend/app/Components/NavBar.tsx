"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Search, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInitial, setUserInitial] = useState(""); // 👈 NEW: store user initial
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setLoggedIn(!!user);
      
      // 👈 NEW: Extract first letter from user's name
      if (user?.user_metadata?.name) {
        const initial = user.user_metadata.name.charAt(0).toUpperCase();
        setUserInitial(initial);
      }
      
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLoggedIn(false);
    router.push("/");
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        dark
          ? "bg-gray-900 border-gray-800 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >

      {/* DESKTOP */}
      <div className="hidden sm:flex items-center justify-between max-w-7xl mx-auto px-6 h-16">

        {/* LEFT - Logo */}
        <div className="font-semibold text-lg mr-6">
          <Link href="/">Store</Link>
        </div>

        {/* CENTER - Search */}
        <div className="flex flex-1 max-w-2xl">
          <div
            className={`flex w-full items-center rounded-full border overflow-hidden ${
              dark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"
            }`}
          >
            <input
              placeholder="Search products..."
              className="flex-1 px-5 py-2 bg-transparent outline-none text-sm"
            />
            <button
              className={`px-4 py-2 ${
                dark ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 ml-6">

          {/* Theme */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Checkout */}
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              dark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            Checkout
          </button>

          {/* Cart */}
          <Link href="/Pages/Cart">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ShoppingCart size={20} />
            </button>
            <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1.5 rounded-full">
              2
            </span>
          </div>
          </Link>

          {/* Profile */}
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold">
            {userInitial || "U"}
          </div>

          {/* Login/Logout */}
          {!loading && (
            loggedIn ? (
              <button 
                onClick={handleLogout}
                className="px-3 py-2 text-sm border rounded-full hover:bg-red-50 dark:hover:bg-red-900 transition"
              >
                Logout
              </button>
            ) : (
              <Link href="/LOGIN/Login">
                <button className="px-3 py-2 text-sm border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  Login
                </button>
              </Link>
            )
          )}

        </div>
      </div>

      {/* MOBILE (completely redesigned, NOT compressed desktop) */}
      <div className="sm:hidden px-4 py-3 space-y-3">

        {/* TOP BAR */}
        <div className="flex items-center justify-between">

          <div className="font-semibold text-lg">Store</div>

          <div className="flex items-center gap-3">

            <button onClick={() => setDark(!dark)}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white px-1 rounded-full">
                2
              </span>
            </div>

          </div>
        </div>

        {/* SEARCH (full width, not squeezed) */}
        <div
          className={`flex items-center rounded-full border overflow-hidden ${
            dark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"
          }`}
        >
          <input
            placeholder="Search products..."
            className="flex-1 px-4 py-2 bg-transparent outline-none text-sm"
          />
          <button className="px-4 py-2">
            <Search size={16} />
          </button>
        </div>

        {/* ACTION ROW */}
        <div className="flex justify-between items-center">

          <button
            className={`px-4 py-2 rounded-full text-sm ${
              dark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            Checkout
          </button>

          <div className="flex items-center gap-3">

            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
              {userInitial || "U"}
            </div>

            {!loading && (
              loggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm border rounded-full hover:bg-red-50 dark:hover:bg-red-900 transition"
                >
                  Logout
                </button>
              ) : (
                <Link href="/LOGIN/Login">
                  <button className="px-3 py-2 text-sm border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    Login
                  </button>
                </Link>
              )
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}