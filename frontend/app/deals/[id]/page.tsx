"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Deal {
  title: string;
  partnerName: string;
  description: string;
  eligibilityText: string;
}

export default function DealDetails() {
  const { id } = useParams();
  const [deal, setDeal] = useState<Deal | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/deals/${id}`
        );
        setDeal(res.data);
      } catch (error) {
        console.error("Error fetching deal details", error);
      }
    };

    fetchDeal();
  }, [id]);

  const claimDeal = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/claims/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Deal claimed successfully!");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to claim deal"
      );
    }
  };

  if (!deal) {
    return <p className="p-10">Loading deal details...</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{deal.title}</h1>
      <p className="mt-2 text-gray-500">
        {deal.partnerName}
      </p>

      <p className="mt-6">{deal.description}</p>

      <p className="mt-4 text-sm text-gray-600">
        Eligibility: {deal.eligibilityText}
      </p>

      <button
        onClick={claimDeal}
        className="mt-6 px-5 py-2 bg-black text-white rounded hover:scale-105 transition"
      >
        Claim Deal
      </button>
    </div>
  );
}
