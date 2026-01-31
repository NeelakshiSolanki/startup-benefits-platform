"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = async () => {
    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await axios.post(url, payload);

      // Save JWT
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          (isLogin ? "Login failed" : "Registration failed")
      );
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl text-center px-4"
      >
        {/* HERO */}
        <h1 className="text-5xl font-bold mb-6">
          Exclusive SaaS Deals for Startups
        </h1>

        <p className="text-gray-400 mb-4">
          Unlock premium tools like cloud, productivity, and marketing software
          at startup-friendly prices.
        </p>

        <p className="text-gray-500 mb-10 text-sm">
          Some deals are public, while others require startup verification.
        </p>

        {/* CTA */}
        <div className="flex justify-center gap-4 mb-12">
          <Link
            href="/deals"
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:scale-105 transition"
          >
            Explore Deals
          </Link>
        </div>

        {/* AUTH BOX */}
        <div className="max-w-md mx-auto border border-gray-700 rounded-xl p-6 bg-neutral-900">
          <h2 className="text-xl font-semibold mb-4">
            {isLogin ? "Login to your account" : "Create an account"}
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          {!isLogin && (
            <input
              placeholder="Name"
              className="w-full mb-3 p-2 rounded bg-black border border-gray-600 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            placeholder="Email"
            className="w-full mb-3 p-2 rounded bg-black border border-gray-600 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 rounded bg-black border border-gray-600 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleAuth}
            className="w-full bg-white text-black py-2 rounded font-semibold hover:scale-105 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          <p className="text-sm text-gray-400 mt-4">
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-white underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
