import React, { useState } from "react";

export default function ESPPAssumptions() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How ESPP Taxation Works
      </div>

      <div className="bg-white border-b border-[#E5E2F2]">
        <div className="flex sm:justify-around text-center">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-3 text-xs font-medium transition-colors w-1/3 ${
              activeTab === "overview" ? "text-[#2C178C] border-b-2 border-[#2C178C]" : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-3 py-3 text-xs font-medium transition-colors w-1/3 ${
              activeTab === "rules" ? "text-[#2C178C] border-b-2 border-[#2C178C]" : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Tax Guidelines
          </button>
          <button
            onClick={() => setActiveTab("assumptions")}
            className={`px-3 py-3 text-xs font-medium transition-colors w-1/3 ${
              activeTab === "assumptions" ? "text-[#2C178C] border-b-2 border-[#2C178C]" : "text-[#686868] hover:text-[#2C178C]"
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
                💡 Double Taxation Stage
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>ESPPs suffer from a "dual-stage" tax burden. <strong>Stage 1 (Purchase):</strong> You are taxed on the discount you received as if it were pure salary (Perquisite). <strong>Stage 2 (Sale):</strong> Any actual monetary gain from selling the stock later is taxed as Capital Gains.</p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚖️ The Lookback Advantage
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                 <p>Many MNCs generously offer a "lookback provision". This means if the stock price was lower 6 months ago when the program started versus today, your 15% discount is artificially applied to that historic lower price, drastically boosting your perquisite value and net profit.</p>
              </div>
            </div>

            <div style={{ background: "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)" }} className="p-3 rounded-xl text-white mt-3">
              <div className="text-xs font-semibold mb-2">💡 MNC vs Indian Listed</div>
              <div className="text-xs">
                Foreign-listed MNC shares strictly classify as "Unlisted Securities" in India. This demands you hold them for 24 months for LTCG, compared to just 12 months for natively Indian-listed shares.
              </div>
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🟢 Capital Gains Breakdown (Post July 23, 2024 / Budget 2026)
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex flex-col p-2 bg-white rounded-lg">
                    <span className="font-semibold text-xs border-b pb-1 mb-1 text-[#2C178C]">Indian Listed Shares</span>
                    <span className="flex justify-between items-center text-[11px] mb-1"><span>STCG (≤12 Months)</span> <span className="font-medium text-[#F04393]">Flat 20%</span></span>
                    <span className="flex justify-between items-center text-[11px]"><span>LTCG ({'>'}12 Months)</span> <span className="font-medium text-[#F04393]">12.5% (Over ₹1.25L Exemption)</span></span>
                  </div>
                  <div className="flex flex-col p-2 bg-white rounded-lg">
                    <span className="font-semibold text-xs border-b pb-1 mb-1 text-[#2C178C]">Foreign Listed Shares (MNC)</span>
                    <span className="flex justify-between items-center text-[11px] mb-1"><span>STCG (≤24 Months)</span> <span className="font-medium text-[#F04393]">Your Slab Rate (Max 30%)</span></span>
                    <span className="flex justify-between items-center text-[11px]"><span>LTCG ({'>'}24 Months)</span> <span className="font-medium text-[#F04393]">12.5% (No Exemption, No Indexation)</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl mt-3">
               <div className="text-xs font-semibold text-[#2C178C] mb-2">
                 🔴 Cost of Acquisition (Preventing Double Tax)
               </div>
               <div className="space-y-2 text-[11px] text-[#323233]">
                  <p>The Income Tax Act ensures you don't pay capital gains on the discount again. Thus, the "Cost of Acquisition" when calculating your profit is literally exactly the <strong>Fair Market Value (FMV) on the purchase date</strong> — not the cheaper, heavily discounted price you actually paid.</p>
               </div>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div className="space-y-3">
             <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚙️ Key Legislative Parameters
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Perquisite Tax Code</span>
                  <span className="font-mono text-[#F04393]">Sec 17(2)(vi) ITA / Sec 391 ITA 2025</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Health & Edu Cess</span>
                  <span className="font-mono text-[#F04393]">Fixed 4%</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Capital Loss Carry Forward</span>
                  <span className="font-mono text-[#F04393]">Max 8 Years Validity</span>
                 </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚠️ Disclaimers
              </div>
              <div className="text-[11px] text-[#323233] space-y-2">
                <p>• <strong>Surcharges Excluded:</strong> Surcharges dynamically triggering past ₹50L+ gross income brackets are ignored. Consult a CA for accurate threshold handling.</p>
                <p>• <strong>Foreign Currency Rate:</strong> Foreign-listed trades actually utilize the SBI TT Buying Rate on the explicit date of transaction for precision scaling. Slider values emulate INR natively for abstraction.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
