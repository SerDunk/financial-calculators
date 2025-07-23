// SipAssumptions.jsx
import React, { useState } from "react";

export default function SipAssumptions() {
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
            className={`flex-1 sm:flex-none px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "methodology"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Methodology
          </button>
          <button
            onClick={() => setActiveTab("formulas")}
            className={`flex-1 sm:flex-none px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "formulas"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Formula
          </button>
          <button
            onClick={() => setActiveTab("assumptions")}
            className={`flex-1 sm:flex-none px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "assumptions"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Assumptions
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === "methodology" && (
          <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
            <div className="text-xs font-semibold text-[#2C178C] mb-2">
              The Power of Compounding
            </div>
            <div className="text-xs text-[#323233] space-y-2">
              <p>
                A Systematic Investment Plan (SIP) helps you invest a fixed
                amount regularly. This calculator projects the future value of
                these investments based on a concept called compounding.
              </p>
              <p>
                Compounding means that you not only earn returns on your
                principal investment, but also on the returns themselves,
                leading to exponential growth over time.
              </p>
            </div>
          </div>
        )}

        {activeTab === "formulas" && (
          <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
            <div className="text-xs font-semibold text-[#2C178C] mb-2">
              Future Value of a Series Formula
            </div>
            <div className="bg-white p-3 rounded-lg border text-center">
              <div className="text-sm font-mono text-[#F04393] mb-2">
                M = P × [((1 + i)ⁿ - 1) / i]
              </div>
              <div className="text-xs text-[#686868] space-y-1">
                <div>
                  <strong>M</strong> = Final Amount (Total Value)
                </div>
                <div>
                  <strong>P</strong> = Monthly Investment Amount
                </div>
                <div>
                  <strong>i</strong> = Monthly interest rate (Annual rate ÷
                  1200)
                </div>
                <div>
                  <strong>n</strong> = Total number of payments (Years × 12)
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
            <div className="text-xs font-semibold text-[#2C178C] mb-2">
              Important Assumptions
            </div>
            <div className="text-xs text-[#323233] space-y-2">
              <p>
                • <strong>Fixed Rate of Return:</strong> The return rate is
                assumed to be constant throughout the investment period. Actual
                market returns can and will vary.
              </p>
              <p>
                • <strong>Monthly Compounding:</strong> Interest is calculated
                and compounded on a monthly basis.
              </p>
              <p>
                • <strong>No External Factors:</strong> Projections do not
                account for inflation, taxes (like LTCG/STCG), or fund expense
                ratios, all of which can impact the final net returns.
              </p>
              <p>
                • <strong>Investment Timing:</strong> Assumes investments are
                made at the end of each month.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
