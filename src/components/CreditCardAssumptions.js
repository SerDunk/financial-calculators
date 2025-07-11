import React, { useState } from "react";

export default function CreditCardAssumptions() {
  const [activeTab, setActiveTab] = useState("methodology");

  return (
    <div className="sm:mt-4 mt-3 bg-white rounded-lg shadow-sm">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How This Calculator Works
      </div>

      {/* Tab Navigation */}
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
                💳 Two Calculation Modes
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Time to Pay Off:</strong> Based on your fixed
                  monthly payment, we calculate the total number of months it
                  will take to clear your balance, including all compounded
                  interest.
                </p>
                <p>
                  • <strong>Required Payment:</strong> Based on your desired
                  payoff timeline, we calculate the fixed monthly payment you
                  must make to become debt-free by that date.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 Calculation Flow (Monthly Cycle)
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#AB78FF] rounded-full mr-2"></div>
                  <span>Opening Balance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#F04393] rounded-full mr-2"></div>
                  <span>Add Monthly Interest</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#45D099] rounded-full mr-2"></div>
                  <span>Subtract Your Payment</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#97A9FF] rounded-full mr-2"></div>
                  <span>New Closing Balance</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "formulas" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🧮 Key Formulas Used
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Monthly Payment (PMT):</span>
                  <span className="font-mono text-[#F04393] text-right">
                    [P × r × (1+r)ⁿ] / [(1+r)ⁿ - 1]
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Number of Months (NPER):</span>
                  <span className="font-mono text-[#F04393] text-right">
                    -ln(1-(Pr/PMT))/ln(1+r)
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Total Interest:</span>
                  <span className="font-mono text-[#F04393]">
                    (PMT × n) - P
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Where P = Principal, r = Monthly Rate, n = Months, PMT = Monthly
                Payment.
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
                  • <strong>Fixed Interest Rate:</strong> The Annual Percentage
                  Rate (APR) is assumed to remain constant.
                </p>
                <p>
                  • <strong>No New Purchases:</strong> The calculation assumes
                  you make no further purchases on this card.
                </p>
                <p>
                  • <strong>No Additional Fees:</strong> We do not account for
                  late fees, annual fees, or other charges.
                </p>
                <p>
                  • <strong>Consistent Payments:</strong> Your monthly payment
                  is made on time and for the same amount each month.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📋 Indian Market Standards
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Typical APR</span>
                  <span className="text-[#2C178C] font-medium">24% - 48%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Minimum Due</span>
                  <span className="text-[#2C178C] font-medium">
                    ~5% of balance
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Late Payment Fee</span>
                  <span className="text-[#2C178C] font-medium">
                    ₹500 - ₹1,200
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
                Always pay more than the minimum due. Paying only the minimum
                can extend your debt by many years and dramatically increase the
                total interest you pay.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
