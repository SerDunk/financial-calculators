// InvestmentAssumptions.jsx
import React, { useState } from "react";

export default function InvestmentAssumptions() {
  const [activeTab, setActiveTab] = useState("methodology");

  return (
    <div className="sm:mt-4 mt-3 bg-white rounded-lg shadow-sm">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How This Calculator Works
      </div>

      <div className="bg-white border-b border-[#E5E2F2]">
        <div className="flex sm:justify-around">
          <button
            onClick={() => setActiveTab("methodology")}
            className={`px-3 py-3 text-xs font-medium transition-colors w-1/3 ${
              activeTab === "methodology"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Methodology
          </button>
          <button
            onClick={() => setActiveTab("formulas")}
            className={`px-3 py-3 text-xs font-medium transition-colors w-1/3 ${
              activeTab === "formulas"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Formulas
          </button>
          <button
            onClick={() => setActiveTab("assumptions")}
            className={`px-3 py-3 text-xs font-medium transition-colors w-1/3 ${
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
        {activeTab === "methodology" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🌱 The Power of Compounding
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Initial Investment:</strong> The starting amount
                  grows over time based on the annual return rate.
                </p>
                <p>
                  • <strong>Monthly SIPs:</strong> Each monthly contribution
                  (Systematic Investment Plan) also starts to grow, and the
                  returns themselves generate more returns.
                </p>
                <p>
                  • <strong>Total Corpus:</strong> The final value is the sum of
                  the grown initial investment and the grown value of all your
                  monthly contributions.
                </p>
              </div>
            </div>
            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 Calculation Flow
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#AB78FF] rounded-full mr-2"></div>
                  <span>Start with Initial Capital</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#CAF5BD] rounded-full mr-2"></div>
                  <span>Add Monthly SIP</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#45D099] rounded-full mr-2"></div>
                  <span>Apply Compounded Growth</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#97A9FF] rounded-full mr-2"></div>
                  <span>Repeat for Tenure</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "formulas" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🧮 Core Formulas
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Lump Sum FV:</span>
                  <span className="font-mono text-[#F04393]">P * (1+r)ⁿ</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>SIP FV:</span>
                  <span className="font-mono text-[#F04393]">
                    PMT * [((1+r)ⁿ - 1) / r]
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Where P = Principal, PMT = Monthly Payment, r = Monthly Rate, n
                = Total Months.
              </p>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚠️ Important Assumptions
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Fixed Rate of Return:</strong> The return rate is
                  assumed to be constant, but actual market returns can vary
                  significantly.
                </p>
                <p>
                  • <strong>Monthly Compounding:</strong> Interest is calculated
                  and compounded on a monthly basis.
                </p>
                <p>
                  • <strong>No Taxes or Fees:</strong> Projections do not
                  account for capital gains tax, expense ratios (for mutual
                  funds), or other fees, which can impact final returns.
                </p>
              </div>
            </div>
            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📋 Indian Market Averages (p.a.)
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Bank FD / RD</span>
                  <span className="text-[#2C178C] font-medium">6% - 8%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Nifty 50 Index Fund</span>
                  <span className="text-[#2C178C] font-medium">12% - 14%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Actively Managed Funds</span>
                  <span className="text-[#2C178C] font-medium">15% - 18%</span>
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
              <div className="text-xs font-semibold mb-2">💡 Pro Tip</div>
              <div className="text-xs">
                These are projections, not guarantees. Diversifying your
                investments is key to managing risk and achieving long-term
                growth.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
