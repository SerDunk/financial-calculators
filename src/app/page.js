"use client";
import Image from "next/image";
import { useState } from "react";

import CalculatorCard from "../components/CalculatorCard";
import { calculatorData } from "@/constants/calculatorData";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filters = [
    { label: "All", value: "all" },
    { label: "Investing & Wealth", value: "investing" },
    { label: "Salary & Tax", value: "salary" },
    { label: "Home & Big Decisions", value: "home" },
    { label: "Lifestyle & Goals", value: "lifestyle" },
    { label: "Debt & Credit", value: "debt" },
  ];

  const filtered =
    activeCategory === "all"
      ? calculatorData
      : calculatorData.filter((c) => c.categories?.includes(activeCategory));

  return (
    <div className="min-h-screen bg-[#EFEDF4] px-1.5 xs:px-0 font-lexend">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header Card */}
        <div
          className="rounded-xl px-6 py-5 text-white relative overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
          }}
        >
          {/* Top-right Calculator Icon */}
          <div className="absolute top-3 right-4 w-20 h-20">
            <Image
              src="/calculator.svg"
              alt="Calculator Icon"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-lg font-semibold mb-2 z-10 relative">
            Calculators
          </h1>
          <p className="text-xs text-white z-10 w-50 relative">
            Always follow your gut feeling—but only after you have crunched some
            numbers.
          </p>
        </div>

        {/* Filter Bar */}
        <div
          className="flex overflow-x-auto scrollbar-width-none gap-1.5"
          style={{ scrollbarWidth: "none" }}
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveCategory(filter.value)}
              className={`rounded-full text-xs px-6 py-1.5 border whitespace-nowrap shrink-0 ${
                activeCategory === filter.value
                  ? "bg-[#6239A8] border-[#6239A8] text-white" // Use a darker color for the active category
                  : "bg-white border-gray-200 text-gray-500"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Calculator Cards */}
        <div className="flex flex-col gap-6">
          {filtered.map((calculator) => (
            <CalculatorCard
              key={calculator.id}
              title={calculator.title}
              description={calculator.description}
              icon={calculator.icon}
              link={calculator.link}
              status={calculator.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
