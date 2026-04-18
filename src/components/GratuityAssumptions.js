import React, { useState } from "react";

export default function GratuityAssumptions() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How This Calculator Works
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-[#E5E2F2]">
        <div className="flex sm:justify-around text-center">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-3 text-xs font-medium transition-colors w-1/3 ${
              activeTab === "overview"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-3 py-3 text-xs font-medium transition-colors w-1/3 ${
              activeTab === "rules"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Gratuity Rules
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
        {activeTab === "overview" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                💡 What is Gratuity?
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  Gratuity is a financial benefit paid by an employer to an employee in recognition of their continuous service. It operates as a part of an employee's final settlement upon separation (resignation, retirement, or death).
                </p>
                <p>
                  Calculations here are governed comprehensively by the upcoming <strong>Code on Social Security, 2020</strong> rules, which consolidates previous legislations including the Payment of Gratuity Act, 1972.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚖️ The Wage Base
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                 <p>Not all of your salary components are used for the calculation. Your terminal benefit is based specifically on:</p>
                 <div className="space-y-1 bg-white p-2 rounded-lg border border-gray-100">
                   <div className="flex justify-between items-center bg-gray-50 p-1.5 rounded">
                     <strong>Included Payments</strong>
                     <span className="text-[#2C178C]">Basic Salary + DA + Retaining Allowance</span>
                   </div>
                   <div className="flex justify-between items-center border border-dashed border-red-200 bg-red-50 p-1.5 rounded mt-2">
                     <strong>Excluded Payments</strong>
                     <span className="text-red-600">HRA, Bonus, Commission, Overtime</span>
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
              <div className="text-xs font-semibold mb-2">💡 Quick Fact</div>
              <div className="text-xs">
                Under normal resignation, you exclusively require a minimum of 5 continuous years of service. However, in the event of death or disablement, this stringent minimum requirement is immediately waived off.
              </div>
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🟢 Formula & Denominators
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <p>The standard formula effectively multiplies your 15 days of salary against the years you spent at the company.</p>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Act Covered Org (≥10 folks)</span>
                    <span className="font-medium text-[#F04393]">Uses Base / 26 days</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg items-center">
                    <span>Not Covered Org (&lt;10)</span>
                    <span className="font-medium text-[#F04393]">Uses Base / 30 days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl mt-3">
               <div className="text-xs font-semibold text-[#2C178C] mb-2">
                 🔴 Taxation and Statutory Limits
               </div>
               <div className="space-y-2 text-xs text-[#323233]">
                  <ul className="space-y-2">
                     <li>• <strong>Government/PSU Sector:</strong> Zero tax boundary — fully tax exempt up to the statutory cap limit of ₹25,00,000.</li>
                     <li>• <strong>Private Sector Limit:</strong> Gratuity payout is inherently capped at ₹20,00,000. Anything awarded above this exemption bracket by an employer constitutes a gratuitous payout, taxed strictly per your marginal tax slab limit.</li>
                     <li>• <strong>Rounding Rules:</strong> Only "Act Covered" employees get to round up their tenure. A duration of precisely 5 years and 6 months inherently transforms into 6 effective years. Non-covered workers count absolute flat years.</li>
                  </ul>
               </div>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div className="space-y-3">
             <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚙️ Key Calculator Guardrails
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Implementation Date</span>
                  <span className="font-mono text-[#F04393]">November 21, 2025</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Delayed Payment Penalty</span>
                  <span className="font-mono text-[#F04393]">10% p.a. simple interest</span>
                 </div>
                 <div className="flex justify-between p-2 bg-white rounded-lg text-right items-center">
                  <span>Tax Regimes Context</span>
                  <span className="font-mono text-[#F04393] w-2/3">Calculation relies on your net marginal tax bracket slab rate; ignores 87A rebate for raw gratuity portioning.</span>
                 </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚠️ Advisory
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                   Calculator estimates are explicitly indicative. The exact payable structure may slightly deviate based on internal corporate structures or mid-month severance settlements. Consult your HR directly.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
