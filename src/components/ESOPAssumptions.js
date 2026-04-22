import React, { useState } from "react";

export default function ESOPAssumptions() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How ESOP Taxation Works
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
            Tax Rules
          </button>
          <button
            onClick={() => setActiveTab("assumptions")}
            className={`px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "assumptions"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Key Guidelines
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === "overview" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                💡 The Two Stages of Tax
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Stage 1 - Exercise:</strong> When you buy shares, the spread (FMV minus exercise price) is treated as a salary perquisite and taxed at your marginal slab rate immediately.
                </p>
                <p>
                  • <strong>Stage 2 - Sale:</strong> When you eventually sell, you pay Capital Gains Tax. Your buy-price for this calculation is safely set to the FMV at exercise, preventing double taxation.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚖️ When to use Startup Deferral
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                 <p>Tax deferral under Section 192(1C) delays your Stage 1 tax to when your shares are sold, you leave the company, or 48 months expire. It does NOT reduce your tax.</p>
                 <div className="space-y-1 bg-white p-2 rounded-lg border border-gray-100 mt-2">
                   <div className="flex justify-between items-center bg-gray-50 p-1.5 rounded">
                     <strong>High Perquisite Tax</strong>
                     <span className="text-[#2C178C]">Use Deferral (Preserves cash)</span>
                   </div>
                   <div className="flex justify-between items-center bg-gray-50 p-1.5 rounded">
                     <strong>Planning to leave soon</strong>
                     <span className="text-[#2C178C]">Pay now (Avoids shock tax)</span>
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
                To legally minimize ESOP tax, aim to hold Listed shares for over 12 months and Unlisted shares for over 24 months to transition from high slab rates to consistent 12.5% Long Term Capital Gains (LTCG) tax!
              </div>
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🟢 Capital Gains Holding Periods (2026)
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <p>Tax rates change dramatically depending on the specific duration you hold the shares post-exercise:</p>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Listed STCG (≤ 12mo)</span>
                    <span className="font-medium text-[#F04393]">20%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Listed LTCG (&gt; 12mo)</span>
                    <span className="font-medium text-[#F04393]">12.5% (over ₹1.25L)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Unlisted STCG (≤ 24mo)</span>
                    <span className="font-medium text-[#F04393]">Marginal Slab Rate</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Unlisted LTCG (&gt; 24mo)</span>
                    <span className="font-medium text-[#F04393]">12.5%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl mt-3">
               <div className="text-xs font-semibold text-[#2C178C] mb-2">
                 🔴 Fair Market Value (FMV) Requirements
               </div>
               <div className="space-y-2 text-xs text-[#323233]">
                  <ul className="space-y-2">
                     <li>• <strong>Listed:</strong> The closing price (or average) on NSE/BSE strictly on your exact exercise date.</li>
                     <li>• <strong>Unlisted:</strong> Certified by a Category I Merchant Banker within 180 days surrounding the exercise date.</li>
                     <li>• <strong>Invalid Dates:</strong> Grant date and vesting date market prices are mathematically irrelevant for calculating taxation.</li>
                  </ul>
               </div>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div className="space-y-3">
             <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚙️ Core Formula Mechanics (FY 2026-27 / ITA 2025)
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Sections</span>
                  <span className="font-mono text-[#F04393]">Perquisite: 17(2)(vi) | CG: 111A/112A</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Startup Deferral</span>
                  <span className="font-mono text-[#F04393]">Needs 80-IAC + DPIIT certs</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg text-right items-center">
                  <span>Double Taxation</span>
                  <span className="font-mono text-[#F04393] w-2/3">Prevented natively by upgrading Buy Cost to the Exercised FMV</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Equity Surcharge Caps</span>
                  <span className="font-mono text-[#F04393]">Capped max at 15% across board</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Health & Edu Cess</span>
                  <span className="font-mono text-[#F04393]">Flat 4% on (Tax + Surcharge)</span>
                 </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚠️ Exclusions and ITR Reporting
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Global / MNC ESOPs:</strong> Foreign company shares MUST be painstakingly disclosed in Schedule FA even if unsold. Defaulters face ₹10 Lakhs Black Money Act penalty.
                </p>
                <p>
                  • <strong>RSUs (Restricted Stock):</strong> This exact math applies to Options, not RSUs. RSUs are taxed entirely at Vesting.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
