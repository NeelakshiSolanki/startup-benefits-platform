"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Claim {
  _id: string;
  status: string;
  deal?: {
    title: string;
  };
}

export default function Dashboard() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/claims/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClaims(res.data);
      } catch (error) {
        console.error("Failed to fetch claims", error);
      }
    };

    fetchClaims();
  }, [token]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Claimed Deals</h1>

      {claims.length === 0 && (
        <p className="text-gray-500">No deals claimed yet.</p>
      )}

      {claims.map((claim) => (
        <div
          key={claim._id}
          className="border p-4 rounded mb-4"
        >
          <h2 className="font-semibold">
            {claim.deal?.title || "Deal no longer available"}
          </h2>
          <p className="text-sm text-gray-500">
            Status: {claim.status}
          </p>
        </div>
      ))}
    </div>
  );
}
