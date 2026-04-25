"use client";

import { useState } from "react";
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      
      {/* Glow background */}
      <div className="absolute w-72 h-72 bg-purple-600/30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-600/30 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <div className="relative mb-20 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.05)]">

        {/* Header */}
        <h2 className="text-3xl font-semibold mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-white/60 mb-8 text-sm text-center">
          Sign in to your account
        </p>

        {/* Form */}
        <form className="space-y-6">

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              required
              placeholder=" "
              className="peer w-full px-4 pt-5 pb-2 bg-transparent border border-white/20 rounded-lg focus:outline-none focus:border-purple-400"
            />
            <label className="absolute left-4 top-2 text-xs text-white/60 transition-all 
              peer-placeholder-shown:top-3.5 
              peer-placeholder-shown:text-sm 
              peer-placeholder-shown:text-white/40">
              Email address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder=" "
              className="peer w-full px-4 pt-5 pb-2 bg-transparent border border-white/20 rounded-lg focus:outline-none focus:border-purple-400"
            />
            <label className="absolute left-4 top-2 text-xs text-white/60 transition-all 
              peer-placeholder-shown:top-3.5 
              peer-placeholder-shown:text-sm 
              peer-placeholder-shown:text-white/40">
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-xs text-white/60 hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm text-white/60">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-500" />
              Remember me
            </label>
            <a href="#" className="hover:text-white">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:opacity-90 transition">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs text-white/40">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm">
            Google
          </button>
          <button className="py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm">
            GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-white/50 mt-6">
          Don’t have an account?{" "}
          <Link href="/LOGIN/Register" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

