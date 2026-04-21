import React, { useState } from "react";
import { Info } from "lucide-react";

export default function RetirementAssumptions() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm flex items-center gap-2">
        <Info size={16} /> How This Calculator Works
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
            FIRE Variants
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "rules"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            NPS 2026 Rules
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
                💡 FIRE Fundamentals (India Context)
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Lean FIRE (25x):</strong> Minimalist lifestyle. Riskier in India due to high medical and education inflation. Uses 4% SWR.
                </p>
                <p>
                  • <strong>Regular FIRE (33x):</strong> Recommended for the Indian middle class. Accounts for higher sequence-of-returns risk. Uses 3% SWR.
                </p>
                <p>
                  • <strong>Fat FIRE (40x+):</strong> Premium lifestyle proxy with maximum safety buffer for luxury spending and top-tier healthcare. Uses 2.5% SWR.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚖️ The CoastFIRE Approach
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                 <p>CoastFIRE is the milestone where your existing corpus is large enough to grow into your Target Corpus on its own, assuming a baseline equity return until retirement age. Once you hit this, you can stop saving for retirement entirely and just cover current living expenses.</p>
              </div>
            </div>

            <div
              style={{
                background:
                  "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
              }}
              className="p-3 rounded-xl text-white mt-3"
            >
              <div className="text-xs font-semibold mb-2">💡 SWR Reality Check</div>
              <div className="text-xs">
                The Western "4% Rule" assumes 2-3% inflation and highly stable equity markets. In India, with ~6% baseline inflation and much higher lifestyle inflation, a 3% SWR is significantly safer.
              </div>
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🟢 NPS 2026 Withdrawal Matrix
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <p>Recent December 2025 PFRDA amendments updated how your NPS corpus can be utilized at age 60:</p>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center text-left">
                    <span>Corpus ≤ ₹8 Lakhs</span>
                    <span className="font-medium text-[#F04393] whitespace-nowrap text-right">100% Lump Sum<br/><span className="text-[10px] text-gray-400">60% Tax-Free</span></span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center text-left">
                    <span>Corpus ₹8L – ₹12 Lakhs</span>
                    <span className="font-medium text-[#F04393] whitespace-nowrap text-right">₹6L Tax-Free Lump Sum<br/><span className="text-[10px] text-gray-400">Rest to Annuity</span></span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center text-left">
                    <span>Corpus &gt; ₹12 Lakhs</span>
                    <span className="font-medium text-[#F04393] whitespace-nowrap text-right">80% Lump Sum + 20% Annuity<br/><span className="text-[10px] text-gray-400">Only 60% of total is Tax-Free</span></span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center text-left">
                    <span>Govt/PSU Employees</span>
                    <span className="font-medium text-[#F04393] whitespace-nowrap text-right">60% Tax-Free Lump Sum<br/><span className="text-[10px] text-gray-400">40% Mandatory Annuity</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl mt-3">
               <div className="text-xs font-semibold text-[#2C178C] mb-2">
                 🔴 Sytematic Lumpsum Withdrawal (SLW)
               </div>
               <div className="space-y-2 text-xs text-[#323233]">
                  <ul className="space-y-2">
                     <li>• Instead of withdrawing the entire 60% tax-free lump sum at once, you can schedule it monthly/quarterly between ages 60 and 75.</li>
                     <li>• This keeps your money invested and growing in the NPS ecosystem while providing tax-free regular cash flow.</li>
                  </ul>
               </div>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div className="space-y-3">
             <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚙️ Core Formula Rates & Multipliers
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>General Inflation Default</span>
                  <span className="font-mono text-[#F04393]">6.0%</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Urban Lifestyle Inflation</span>
                  <span className="font-mono text-[#F04393]">8.0%</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg border-t mt-1 pt-2">
                  <span>EPF Default Return</span>
                  <span className="font-mono text-[#F04393]">8.25%</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>NPS Expected Return</span>
                  <span className="font-mono text-[#F04393]">10.0%</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Equity / MF Expected</span>
                  <span className="font-mono text-[#F04393]">12.0%</span>
                 </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚠️ Simulator Constraints
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Step-Up SIPs:</strong> The additional monthly SIP value shown is a flat amount. If you step up your SIPs by 10% annually, the "Additional SIP needed today" formula drops by almost half.
                </p>
                <p>
                  • <strong>Taxes on Withdrawals:</strong> Except for NPS Annuity logic, this calculator does not adjust the final required corpus for Long Term Capital Gains (LTCG) tax on equity sales.
                </p>
                <p>
                  • <strong>Medical Inflation:</strong> Healthcare inflates at ~14% in India. Do NOT rely on the standard inflation multiplier alone; hold a buffer.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
