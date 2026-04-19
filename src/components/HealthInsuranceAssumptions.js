"use client";
import React, { useState } from "react";

export default function HealthInsuranceAssumptions() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "rules", label: "80D Rules" },
    { id: "assumptions", label: "Key Assumptions" },
  ];

  return (
    <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How This Calculator Works
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-[#E5E2F2]">
        <div className="flex sm:justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                  : "text-[#686868] hover:text-[#2C178C]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* ── Overview Tab ── */}
        {activeTab === "overview" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🛡️ What This Calculates
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  This is <strong>not a premium calculator</strong>. It tells you how much
                  health insurance cover you <em>should have</em> in 2026, how large your
                  gap is versus what you currently hold, what a super top-up could cost, and
                  how much Section 80D tax saving your premiums generate.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 How the Adequacy Score Works
              </div>
              <div className="text-xs text-[#323233] space-y-1">
                <p>Score = (Effective Personal Cover ÷ Recommended Cover) × 100</p>
                <div className="space-y-1 bg-white p-2 rounded-lg border border-gray-100 mt-2">
                  {[
                    { range: "0–40%", label: "Critical Gap", color: "bg-red-500" },
                    { range: "41–70%", label: "Undercovered", color: "bg-orange-400" },
                    { range: "71–99%", label: "Nearly Adequate", color: "bg-yellow-400" },
                    { range: "100%+", label: "Well Covered", color: "bg-green-500" },
                  ].map(({ range, label, color }) => (
                    <div
                      key={range}
                      className="flex items-center gap-2 py-1 px-1.5 rounded"
                    >
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${color}`} />
                      <span className="font-medium">{range}</span>
                      <span className="text-gray-500">→ {label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                background:
                  "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
              }}
              className="p-3 rounded-xl text-white"
            >
              <div className="text-xs font-semibold mb-2">🔥 2026 Medical Reality</div>
              <div className="text-xs space-y-1">
                <p>• Medical inflation in India: ~14% p.a. (Asia's highest — Aon/WTW 2026)</p>
                <p>• ICU: ₹15,000–₹30,000/day at private hospitals</p>
                <p>• Critical illness events: ₹15–50 lakh at private hospitals</p>
                <p>• A ₹10L procedure today becomes ~₹19L in 5 years</p>
              </div>
            </div>
          </div>
        )}

        {/* ── 80D Rules Tab ── */}
        {activeTab === "rules" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🟢 Section 80D Deduction Limits (Old Regime Only)
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { who: "Self + Family (age < 60)", limit: "₹25,000" },
                    { who: "Self + Family (age ≥ 60 / Senior)", limit: "₹50,000" },
                    { who: "Parents (age < 60)", limit: "+₹25,000" },
                    { who: "Parents (age ≥ 60 / Senior)", limit: "+₹50,000" },
                    { who: "Maximum Total Deduction", limit: "₹1,00,000" },
                  ].map(({ who, limit }) => (
                    <div
                      key={who}
                      className="flex justify-between p-2 bg-white rounded-lg items-center"
                    >
                      <span>{who}</span>
                      <span className="font-medium text-[#F04393]">{limit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🔴 New Regime — 80D Status
              </div>
              <p className="text-xs text-[#323233]">
                Section 80D deduction is <strong>not available</strong> under the New Tax
                Regime (ITA 2025 / Finance Act 2023 onwards). Switching to Old Regime is
                the only way to claim health insurance tax deductions.
              </p>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                💡 How Tax Saved is Calculated
              </div>
              <div className="text-xs text-[#323233] space-y-1">
                <p>Tax Saved = Total 80D Deduction × Tax Slab Rate × 1.04 (4% cess)</p>
                <p className="text-gray-500 mt-1">
                  Example: ₹50,000 deduction × 30% slab × 1.04 = ₹15,600 saved
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Key Assumptions Tab ── */}
        {activeTab === "assumptions" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚙️ Core Calculation Assumptions
              </div>
              <div className="space-y-1.5 text-xs text-[#323233]">
                {[
                  ["Medical Inflation", "14% p.a. (Aon/WTW Global Medical Trends 2026)"],
                  ["Inflation Horizon", "5 years for Ideal Cover projection"],
                  [
                    "Metro Base Cover",
                    "₹15L individual / ₹25L family floater (2026 private tariffs)",
                  ],
                  [
                    "Tier-2 Base Cover",
                    "₹10L individual / ₹15L family floater",
                  ],
                  [
                    "Tier-3 Base Cover",
                    "₹5L individual / ₹10L family floater",
                  ],
                  ["Senior Override (60+)", "Minimum ₹20L regardless of tier"],
                  [
                    "Super Top-Up Premium",
                    "~0.4% of cover (indicative; actual varies by age, insurer)",
                  ],
                  [
                    "Income Rule-of-Thumb",
                    "Recommended cover ≥ 50% of annual income",
                  ],
                  [
                    "Employer Cover",
                    "Excluded from personal adequacy — non-portable",
                  ],
                ].map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-2 p-2 bg-white rounded-lg"
                  >
                    <span className="text-gray-600 shrink-0">{key}</span>
                    <span className="font-medium text-[#F04393] text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚠️ Disclaimer
              </div>
              <div className="text-xs text-[#323233] space-y-1.5">
                <p>
                  • This calculator is <strong>indicative only</strong>. Consult a
                  certified insurance advisor (PoSP/IRDAI-licensed) for personalised
                  recommendations.
                </p>
                <p>
                  • Section 80D deduction available under Old Tax Regime only (Income Tax
                  Act, 1961 / ITA 2025).
                </p>
                <p>
                  • Premium estimates do not account for pre-existing condition loading,
                  No Claim Bonus, or insurer-specific variations.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
