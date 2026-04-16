import React, { useState } from "react";

export default function IncomeTaxAssumptions() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How This Calculator Works
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-[#E5E2F2]">
        <div className="flex sm:justify-around">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "overview"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "rules"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Deduction Rules
          </button>
          <button
            onClick={() => setActiveTab("assumptions")}
            className={`px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "assumptions"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Key Assumptions
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === "overview" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                💡 What This Compares
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Old Regime:</strong> Offers high flexibility with various exemptions (80C, 80D, HRA, LTA, Home Loan). However, the tax brackets are steeper and the tax-free baseline is lower (₹5 Lakhs with rebate).
                </p>
                <p>
                  • <strong>New Regime:</strong> The default tax regime in India since FY 2023-24. It offers lower, wider tax slabs and a massive tax-free allowance up to ₹12 Lakhs (via 87A rebate), but strictly disallows most common Chapter VI-A deductions.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚖️ How to Choose (Rule of Thumb)
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                 <p>The decision broadly rests on how much deductions you can claim. The Break-Even deductions (at which both regimes yield identical tax) for a salaried employee roughly are:</p>
                 <div className="space-y-1 bg-white p-2 rounded-lg border border-gray-100">
                   <div className="flex justify-between items-center bg-gray-50 p-1.5 rounded">
                     <strong>₹10 Lakhs Gross Income</strong>
                     <span className="text-[#2C178C]">New Regime ALWAYS wins</span>
                   </div>
                   <div className="flex justify-between items-center bg-gray-50 p-1.5 rounded">
                     <strong>₹15 Lakhs Gross Income</strong>
                     <span className="text-[#2C178C]">Old requires ~₹4.08L deductions</span>
                   </div>
                   <div className="flex justify-between items-center bg-gray-50 p-1.5 rounded">
                     <strong>₹20 Lakhs Gross Income</strong>
                     <span className="text-[#2C178C]">Old requires ~₹4.50L deductions</span>
                   </div>
                 </div>
              </div>
            </div>

            <div
              style={{
                background:
                  "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
              }}
              className="p-3 rounded-xl text-white mt-3"
            >
              <div className="text-xs font-semibold mb-2">💡 TL;DR Pro Tip</div>
              <div className="text-xs">
                If your gross income is less than ₹12.75L, stick to the New Regime unconditionally! If it's higher, you only benefit from the Old Regime if you max out 80C, 80D, and have significant HRA or a Home Loan footprint.
              </div>
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🟢 New Regime Allowed Deductions
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <p>Only a small handful of deductions survived the transition to the new tax structure:</p>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Standard Deduction</span>
                    <span className="font-medium text-[#F04393]">₹75,000</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Corporate NPS (80CCD(2))</span>
                    <span className="font-medium text-[#F04393]">10% of Basic Pay</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Agniveer Corpus (80CCH)</span>
                    <span className="font-medium text-[#F04393]">100% Tax Free</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Family Pension Deduction</span>
                    <span className="font-medium text-[#F04393]">Up to ₹25,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl mt-3">
               <div className="text-xs font-semibold text-[#2C178C] mb-2">
                 🔴 Old Regime Common Deduction Caps
               </div>
               <div className="space-y-2 text-xs text-[#323233]">
                  <ul className="space-y-2">
                     <li>• <strong>Section 80C:</strong> Capped at ₹1.5 Lakhs (EPF, PPF, ELSS, LIC, Home Loan Principal).</li>
                     <li>• <strong>Section 80D:</strong> ₹25,000 for self/family (₹50,000 if senior citizen). Additional limits apply for parents.</li>
                     <li>• <strong>Home Loan Interest (Sec 24b):</strong> Max ₹2 Lakhs for a self-occupied property. No limit for let-out properties.</li>
                     <li>• <strong>NPS (80CCD(1B)):</strong> Additional ₹50,000 tax deduction over and above the 80C limit.</li>
                     <li>• <strong>HRA:</strong> Exemption is strictly the least of: actual HRA received, rent paid minus 10% basic salary, or 50%/40% of basic salary.</li>
                  </ul>
               </div>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div className="space-y-3">
             <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚙️ Core Formula Mechanics (FY 2025-26)
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>87A Rebate - New Regime</span>
                  <span className="font-mono text-[#F04393]">Up to ₹60K (Income ≤ ₹12L)</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>87A Rebate - Old Regime</span>
                  <span className="font-mono text-[#F04393]">Up to ₹12.5K (Income ≤ ₹5L)</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg text-right items-center">
                  <span>Marginal Relief</span>
                  <span className="font-mono text-[#F04393] w-2/3">Tax increase cannot exceed the income earned above the bracket limit</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Surcharge Caps</span>
                  <span className="font-mono text-[#F04393]">Old: 37% &nbsp;&nbsp;|&nbsp;&nbsp; New: 25%</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Health & Edu Cess</span>
                  <span className="font-mono text-[#F04393]">Flat 4% on (Tax + Surcharge)</span>
                 </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚠️ What is excluded from this calculator?
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Capital Gains (STCG/LTCG):</strong> Gains from stocks, mutual funds, or real estate have completely separate slab structures.
                </p>
                <p>
                  • <strong>Crypto/VDA Tax:</strong> Virtual digital assets are taxed flat out at 30% irrespective of the slab or chosen regime.
                </p>
                <p>
                  • <strong>Advance Tax Int:</strong> Penalties under Section 234 ABC for delaying tax payments are extremely specific to when income was realized and are not projected here.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
