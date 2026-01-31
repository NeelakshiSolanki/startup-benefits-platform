"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Deals() {
  const [deals, setDeals] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [access, setAccess] = useState("all");

  useEffect(() => {
    const loadDeals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/deals"
        );
        setDeals(response.data);
      } catch (error) {
        console.log("Error fetching deals", error);
      }
    };

    loadDeals();
  }, []);

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch = deal.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || deal.category === category;

    const matchesAccess =
      access === "all" || deal.accessLevel === access;

    return matchesSearch && matchesCategory && matchesAccess;
  });

  return (
    <div className="p-10 bg-white min-h-screen">
      {/* Search */}
      <input
        type="text"
        placeholder="Search deals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-400 p-2 mb-6 rounded-md
                   focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-400 p-2 rounded-md bg-white text-black
                     focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="all">All Categories</option>
          <option value="cloud">Cloud</option>
          <option value="productivity">Productivity</option>
          <option value="marketing">Marketing</option>
          <option value="analytics">Analytics</option>
        </select>

        <select
          value={access}
          onChange={(e) => setAccess(e.target.value)}
          className="border border-gray-400 p-2 rounded-md bg-white text-black
                     focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="all">All Access</option>
          <option value="public">Public</option>
          <option value="locked">Locked</option>
        </select>
      </div>

      {/* Deals */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredDeals.map((deal) => (
          <motion.div
            key={deal._id}
            whileHover={{ scale: 1.03 }}
            className="border rounded-xl p-6 relative bg-white"
          >
            {deal.accessLevel === "locked" && (
              <span className="absolute top-3 right-3 text-xs bg-red-500 text-white px-2 py-1 rounded">
                Locked
              </span>
            )}

            <h2 className="text-xl font-semibold">
              {deal.title}
            </h2>

            <p className="text-gray-500">
              {deal.partnerName}
            </p>

            <Link
              href={`/deals/${deal._id}`}
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              View Details →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
