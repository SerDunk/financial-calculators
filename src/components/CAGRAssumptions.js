import React, { useState } from "react";

export default function CAGRAssumptions() {
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
            Formulas & Basics
          </button>
          <button
            onClick={() => setActiveTab("benchmarks")}
            className={`px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "benchmarks"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Benchmarks
          </button>
          <button
            onClick={() => setActiveTab("taxation")}
            className={`px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "taxation"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Tax & Inflation
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === "overview" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                💡 Core Concepts & Formulas
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>CAGR (Compound Annual Growth Rate):</strong> Calculated as <code className="bg-white border border-gray-200 px-1 py-0.5 rounded text-[#F04393]">(End Value / Start Value)^(1/Years) − 1</code>. This assumes smooth compounding, though actual market returns are volatile year-to-year.
                </p>
                <p>
                  • <strong>SIP Future Value:</strong> Uses monthly compounding: <code className="bg-white border border-gray-200 px-1 py-0.5 rounded text-[#F04393]">FV = PMT × [((1+r)^n−1)/r] × (1+r)</code> where r = annual rate/12, n = total months.
                </p>
                <p>
                  • <strong>Step-up SIP:</strong> Each year's monthly SIP increases by the step-up percentage. This is computed year by year with month-level compounding.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚖️ Real Return vs Nominal Return
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                 <p>Nominal return is what you see in your account. Real return is what you actually gain in purchasing power.</p>
                 <div className="space-y-1 bg-white p-2 rounded-lg border border-gray-100">
                   <div className="flex justify-between items-center bg-gray-50 p-1.5 rounded">
                     <strong>Real CAGR Formula</strong>
                     <span className="text-[#2C178C]">((1 + Nominal) / (1 + Inflation)) − 1</span>
                   </div>
                 </div>
                 <p className="mt-2 text-gray-500 italic">Do not use the simplified approximation (Nominal - Inflation), as it becomes highly inaccurate over longer durations or higher rates.</p>
              </div>
            </div>

            <div
              style={{
                background:
                  "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
              }}
              className="p-3 rounded-xl text-white mt-3"
            >
              <div className="text-xs font-semibold mb-2">💡 Rule of 72 Pro Tip</div>
              <div className="text-xs">
                To quickly estimate how long it takes to double your money, divide 72 by your expected CAGR. At 12% CAGR, your money doubles every 6 years (72/12 = 6).
              </div>
            </div>
          </div>
        )}

        {activeTab === "benchmarks" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📈 Indian Market Benchmarks (April 2026)
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <p>We use historically verified benchmarks to ground your expectations:</p>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Nifty 50 (Price Index)</span>
                    <span className="font-medium text-[#F04393]">~12–13% (10Y)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Nifty Midcap 150</span>
                    <span className="font-medium text-[#F04393]">~16–17% (10Y)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Nifty Smallcap 250</span>
                    <span className="font-medium text-[#F04393]">~18–20% (5Y)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Gold (INR)</span>
                    <span className="font-medium text-[#F04393]">~12% (10Y)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl mt-3">
               <div className="text-xs font-semibold text-[#2C178C] mb-2">
                 🛡️ Fixed Income Benchmarks
               </div>
               <div className="space-y-2 text-xs text-[#323233]">
                  <ul className="space-y-2">
                     <li>• <strong>EPF:</strong> 8.25% p.a. (FY 2025-26 rate declared by EPFO). Completely tax-free within contribution limits (EEE status).</li>
                     <li>• <strong>PPF:</strong> 7.1% p.a. (current rate, unchanged since October 2019). Reviewed quarterly by Ministry of Finance. EEE status.</li>
                     <li>• <strong>Bank FD (SBI, 3-year):</strong> ~7.0% p.a. (April 2026). Varies by bank and cycle. Fully taxable at your slab rate.</li>
                  </ul>
               </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-xl mt-3">
               <div className="text-xs font-semibold text-yellow-800 mb-1">
                 ⚠️ Benchmark Disclaimer
               </div>
               <div className="text-xs text-yellow-800">
                  All benchmark CAGRs are historical observations — not guarantees of future returns. At any 7+ year rolling window, Nifty 50 has historically delivered positive nominal CAGR, but past performance is not indicative of future results.
               </div>
            </div>
          </div>
        )}

        {activeTab === "taxation" && (
          <div className="space-y-3">
             <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🏛️ Capital Gains Tax Rates (Post July 23, 2024)
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                 <div className="flex flex-col p-2 bg-white rounded-lg gap-1">
                  <div className="flex justify-between items-center">
                     <span className="font-semibold">Listed Equity / Equity MF</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                     <span>STCG (≤12 months)</span>
                     <span className="font-mono text-[#F04393]">20% + Cess</span>
                  </div>
                  <div className="flex justify-between text-gray-600 border-t border-gray-50 pt-1">
                     <span>LTCG ({'>'}12 months)</span>
                     <span className="font-mono text-[#F04393]">12.5% ({'>'}₹1.25L) + Cess</span>
                  </div>
                 </div>
                 
                 <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                  <span className="font-semibold">Debt Mutual Funds / Bonds</span>
                  <span className="font-mono text-[#F04393] text-right w-1/2 leading-tight">Taxed at slab rate regardless of holding period</span>
                 </div>
                 
                 <div className="flex flex-col p-2 bg-white rounded-lg gap-1">
                  <div className="flex justify-between items-center">
                     <span className="font-semibold">Gold / Real Estate</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                     <span>STCG (≤24 months)</span>
                     <span className="font-mono text-[#F04393]">Slab Rate + Cess</span>
                  </div>
                  <div className="flex justify-between text-gray-600 border-t border-gray-50 pt-1">
                     <span>LTCG ({'>'}24 months)</span>
                     <span className="font-mono text-[#F04393]">12.5% (No Indexation)</span>
                  </div>
                 </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📉 Inflation Impact
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Default 6%:</strong> RBI's headline CPI target upper bound is 6%.
                </p>
                <p>
                  • <strong>Lifestyle Inflation (8-10%):</strong> Urban metro residents face significantly higher inflation driven by private schooling, healthcare (14% medical inflation), and discretionary spend.
                </p>
                <p className="mt-2 text-gray-500 italic">
                  Taxes apply on nominal gains. High inflation plus high taxes can result in negative real wealth creation even if your portfolio looks green.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
