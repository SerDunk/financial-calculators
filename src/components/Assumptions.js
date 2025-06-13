import React, { useState } from "react";

export default function Assumptions() {
  const [activeTab, setActiveTab] = useState("methodology");

  return (
    <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How This Calculator Works
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-[#E5E2F2]">
        <div className="flex sm:justify-around">
          <button
            onClick={() => setActiveTab("methodology")}
            className={`px-3  py-3 text-xs font-medium transition-colors ${
              activeTab === "methodology"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Methodology
          </button>
          <button
            onClick={() => setActiveTab("formulas")}
            className={`px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "formulas"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Formulas
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
        {activeTab === "methodology" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                💡 What Makes This Calculator Different
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Total Cost Approach:</strong> Unlike basic EMI
                  calculators, we show your complete monthly housing cost
                  including taxes, insurance, and maintenance
                </p>
                <p>
                  • <strong>Indian Market Context:</strong> Pre-configured with
                  typical Indian property values, tax rates, and insurance costs
                </p>
                <p>
                  • <strong>Real-Time Updates:</strong> All calculations update
                  dynamically as you adjust parameters
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 Calculation Components
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#AB78FF] rounded-full mr-2"></div>
                  <span>Loan EMI (Principal + Interest)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#CAF5BD] rounded-full mr-2"></div>
                  <span>Property Tax (Annual ÷ 12)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#45D099] rounded-full mr-2"></div>
                  <span>Home Insurance (Annual ÷ 12)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#97A9FF] rounded-full mr-2"></div>
                  <span>Maintenance & Other Costs</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "formulas" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🧮 Core EMI Formula
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#E5E2F2] text-center">
                <div className="text-sm font-mono text-[#F04393] mb-2">
                  EMI = [P × r × (1 + r)ⁿ] / [(1 + r)ⁿ – 1]
                </div>
                <div className="text-xs text-[#686868] space-y-1">
                  <div>
                    <strong>P</strong> = Principal loan amount
                  </div>
                  <div>
                    <strong>r</strong> = Monthly interest rate (Annual rate ÷ 12
                    ÷ 100)
                  </div>
                  <div>
                    <strong>n</strong> = Total number of monthly payments (Years
                    × 12)
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📈 Additional Calculations
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Loan Amount:</span>
                  <span className="font-mono text-[#F04393]">
                    Home Price × (1 - Down Payment %)
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Total Interest:</span>
                  <span className="font-mono text-[#F04393]">
                    (EMI × n) - Principal
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Monthly Property Tax:</span>
                  <span className="font-mono text-[#F04393]">
                    Annual Property Tax ÷ 12
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Total Monthly Cost:</span>
                  <span className="font-mono text-[#F04393]">
                    EMI + Monthly Tax + Insurance + Other
                  </span>
                </div>
              </div>
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
                  • <strong>Fixed Interest Rate:</strong> Calculations assume a
                  constant interest rate throughout the loan tenure
                </p>
                <p>
                  • <strong>No Prepayments:</strong> EMI and total interest
                  calculations don't account for prepayments or part-payments
                </p>
                <p>
                  • <strong>Constant Additional Costs:</strong> Property tax and
                  insurance are assumed to remain constant (inflation not
                  considered)
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📋 Indian Market Standards
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Typical Down Payment</span>
                  <span className="text-[#2C178C] font-medium">10% - 30%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Interest Rate Range</span>
                  <span className="text-[#2C178C] font-medium">
                    8% - 12% p.a.
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Property Tax (Annual)</span>
                  <span className="text-[#2C178C] font-medium">
                    0.1% - 1% of value
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Home Insurance</span>
                  <span className="text-[#2C178C] font-medium">
                    0.1% - 0.5% of value
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Maintenance Cost</span>
                  <span className="text-[#2C178C] font-medium">
                    ₹2-5 per sq.ft/month
                  </span>
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
                This calculator provides estimates based on standard market
                practices. Always consult with your bank or financial advisor
                for personalized advice and current interest rates.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
