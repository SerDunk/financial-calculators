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
                🌱 The Power of Compounding & Step-Up
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Initial Investment:</strong> The starting amount
                  grows over time based on the annual return rate.
                </p>
                <p>
                  • <strong>Monthly SIPs:</strong> Each monthly contribution
                  also starts to grow, and the returns themselves generate more
                  returns.
                </p>
                {/* Updated Point */}
                <p>
                  • <strong>Annual Step-Up:</strong> At the start of each new
                  year, your monthly SIP amount is increased by the percentage
                  you choose, accelerating your wealth creation.
                </p>
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
                <p className="p-2 bg-white rounded-lg">
                  Due to the annual step-up, a simple formula is not used.
                  Instead, we perform an iterative calculation year by year.
                </p>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>For each year:</span>
                  <span className="font-mono text-[#F04393]">
                    End Balance = FV(Start Balance) + FV(Year's SIPs)
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                FV is the Future Value calculation, applied annually to
                incorporate the increased SIP amount.
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
                {/* New Point */}
                <p>
                  • <strong>Step-Up Timing:</strong> The contribution increase
                  is applied at the beginning of each new year (after 12 monthly
                  payments).
                </p>
                <p>
                  • <strong>Fixed Rate of Return:</strong> The return rate is
                  assumed to be constant, but actual market returns can vary.
                </p>
                <p>
                  • <strong>Monthly Compounding:</strong> Interest is calculated
                  and compounded on a monthly basis.
                </p>
                <p>
                  • <strong>No Taxes or Fees:</strong> Projections do not
                  account for capital gains tax or expense ratios.
                </p>
              </div>
            </div>
            {/* ... other assumption cards remain the same ... */}
          </div>
        )}
      </div>
    </div>
  );
}
