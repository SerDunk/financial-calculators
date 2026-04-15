"use client";
import Image from "next/image";
import { useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";

import CalculatorCard from "../components/CalculatorCard";
import { calculatorData } from "@/constants/calculatorData";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filters = [
    { label: "All", value: "all" },
    { label: "Investing & Wealth", value: "investing" },
    { label: "Salary & Tax", value: "salary" },
    { label: "Home & Big Decisions", value: "home" },
    { label: "Lifestyle & Goals", value: "lifestyle" },
    { label: "Debt & Credit", value: "debt" },
  ];

  const processedData = calculatorData
    .filter((c) => activeCategory === "all" || c.categories?.includes(activeCategory))
    .filter((c) => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === "asc" ? comparison : -comparison;
    });

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

        {/* Search & Sort Bar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search calculators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white text-xs sm:text-sm rounded-xl appearance-none shadow-sm border border-[#E5E2F2] focus:outline-none focus:ring-1 focus:ring-[#8362D1] text-gray-700 placeholder-gray-400 transition-shadow"
            />
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="p-2.5 bg-white rounded-xl border border-[#E5E2F2] shadow-sm text-[#2C178C] hover:bg-gray-50 flex-shrink-0 transition-colors"
            title={`Sort ${sortOrder === "asc" ? "Z to A" : "A to Z"}`}
          >
            <ArrowUpDown size={18} className={sortOrder === "asc" ? "opacity-100" : "opacity-60"} />
          </button>
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
              className={`rounded-full text-[11px] sm:text-xs px-5 py-1.5 border whitespace-nowrap shrink-0 transition-colors ${
                activeCategory === filter.value
                  ? "bg-[#6239A8] border-[#6239A8] text-white"
                  : "bg-white border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Calculator Cards */}
        <div className="flex flex-col gap-6 pb-10">
          {processedData.length > 0 ? (
            processedData.map((calculator) => (
              <CalculatorCard
                key={calculator.id}
                title={calculator.title}
                description={calculator.description}
                icon={calculator.icon}
                link={calculator.link}
                status={calculator.status}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
               <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                 <Search size={24} className="text-gray-300" />
               </div>
               <h3 className="text-[#2C178C] font-medium text-sm">No calculators found</h3>
               <p className="text-xs text-gray-500 mt-1">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
