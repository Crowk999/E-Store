"use client";

import { useState } from "react";
import Link from "next/link"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // validation
  const passwordMismatch =
    form.confirmPassword.length > 0 &&
    form.password !== form.confirmPassword;

  const isValid =
    form.name &&
    form.email &&
    form.password &&
    form.confirmPassword &&
    !passwordMismatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    alert("Signup data ready to send to backend");
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-purple-600/30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-600/30 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <div className="relative mb-1 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.05)]">

        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-2">
          Create Account
        </h2>
        <p className="text-white/60 text-sm text-center mb-8">
          Join us and start your journey
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg focus:border-purple-400 outline-none"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg focus:border-purple-400 outline-none"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg focus:border-purple-400 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-xs text-white/60 hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-transparent border rounded-lg outline-none transition
                ${
                  passwordMismatch
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/20 focus:border-purple-400"
                }`}
            />

            {passwordMismatch && (
              <p className="text-red-400 text-xs mt-1">
                Passwords do not match
              </p>
            )}

            {!passwordMismatch && form.confirmPassword && (
              <p className="text-green-400 text-xs mt-1">
                Passwords match ✓
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={!isValid}
            className={`w-full py-3 rounded-lg font-semibold transition
              ${
                isValid
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs text-white/40">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* OAuth buttons (frontend only) */}
        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={() => alert("Google OAuth clicked")}
            className="py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            🔵 Google
          </button>

          <button
            onClick={() => alert("GitHub OAuth clicked")}
            className="py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            ⚫ GitHub
          </button>

        </div>

        {/* Footer */}
        <p className="text-center text-sm text-white/50 mt-6">
          Already have an account?{" "}
          <Link href="/LOGIN/Login" className="text-purple-400 hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}