import React, { useState } from "react";

export default function HomeInvestmentAssumptions() {
  const [activeTab, setActiveTab] = useState("methodology");

  return (
    <div className="sm:mt-4 mt-3 bg-white rounded-lg shadow-sm">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How This Home Investment Calculator Works
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-[#E5E2F2]">
        <div className="flex sm:justify-around">
          <button
            onClick={() => setActiveTab("methodology")}
            className={`px-3 py-3 text-xs font-medium transition-colors ${
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
                🏠 Total Investment Analysis
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Initial Investment:</strong> Down payment +
                  registration fees + stamp duty + legal charges
                </p>
                <p>
                  • <strong>Financing Cost:</strong> Home loan EMI payments over
                  the selected tenure with interest
                </p>
                <p>
                  • <strong>Rental Returns:</strong> Monthly rental income
                  generating cash flow throughout ownership
                </p>
                <p>
                  • <strong>Capital Appreciation:</strong> Property value growth
                  based on appreciation rate over time
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 Investment Flow Analysis
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#AB78FF] rounded-full mr-2"></div>
                  <span>Down Payment</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#CAF5BD] rounded-full mr-2"></div>
                  <span>Loan Principal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#45D099] rounded-full mr-2"></div>
                  <span>Rental Income</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#97A9FF] rounded-full mr-2"></div>
                  <span>Capital Gains</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F0F9FF] to-[#FFF1F2] p-3 rounded-xl border border-blue-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                💰 Cash Flow Components
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Monthly Rental Income:</strong> Positive cash inflow
                  from tenant payments
                </p>
                <p>
                  • <strong>Monthly EMI Outflow:</strong> Loan repayment
                  including principal + interest
                </p>
                <p>
                  • <strong>Net Cash Flow:</strong> Rental Income - EMI (can be
                  positive or negative)
                </p>
                <p>
                  • <strong>Break-even Point:</strong> When cumulative rental
                  income covers initial investment
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "formulas" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🧮 Core Investment Formulas
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Monthly EMI:</span>
                  <span className="font-mono text-[#F04393]">
                    [P × R × (1+R)^N] / [(1+R)^N – 1]
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Total Interest:</span>
                  <span className="font-mono text-[#F04393]">
                    (EMI × Months) - Principal
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Net Cash Flow:</span>
                  <span className="font-mono text-[#F04393]">
                    Rental Income - EMI
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F0F9FF] to-[#FFF1F2] p-3 rounded-xl border border-blue-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📈 Return Calculation Formulas
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Rental Yield:</span>
                  <span className="font-mono text-[#F04393]">
                    (Annual Rent / Property Price) × 100
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Cash-on-Cash Return:</span>
                  <span className="font-mono text-[#F04393]">
                    (Annual Cash Flow / Initial Investment) × 100
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Future Property Value:</span>
                  <span className="font-mono text-[#F04393]">
                    Current Price × (1 + Appreciation Rate)^Years
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Capital Gains:</span>
                  <span className="font-mono text-[#F04393]">
                    Future Value - Current Value
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Overall ROI:</span>
                  <span className="font-mono text-[#F04393]">
                    [(Total Returns - Total Investment) / Total Investment] ×
                    100
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FFF7ED] to-[#FEFCE8] p-3 rounded-xl border border-orange-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⏱️ Time-Based Calculations
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Total Rental Income:</span>
                  <span className="font-mono text-[#F04393]">
                    Monthly Rent × 12 × Loan Term
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Break-even Time:</span>
                  <span className="font-mono text-[#F04393]">
                    Initial Investment / Annual Net Cash Flow
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Annualized ROI:</span>
                  <span className="font-mono text-[#F04393]">
                    [(Final Value / Initial Value)^(1/Years) - 1] × 100
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
                ⚠️ Critical Investment Assumptions
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Property appreciation</strong> remains constant
                  throughout the investment period
                </p>
                <p>
                  • <strong>Rental income</strong> is received consistently
                  without vacancy periods
                </p>
                <p>
                  • <strong>Home loan interest rate</strong> remains fixed for
                  the entire tenure
                </p>
                <p>
                  • <strong>Property maintenance costs</strong> are not included
                  in cash flow calculations
                </p>
                <p>
                  • <strong>Tax implications</strong> on rental income and
                  capital gains are not considered
                </p>
                <p>
                  • <strong>Property taxes</strong> and insurance costs are
                  excluded from analysis
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📋 Indian Real Estate Market Standards
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Home Loan Interest</span>
                  <span className="text-[#2C178C] font-medium">
                    8.5% - 9.5%
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Registration Fees</span>
                  <span className="text-[#2C178C] font-medium">1% - 3%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Stamp Duty</span>
                  <span className="text-[#2C178C] font-medium">3% - 7%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Property Appreciation</span>
                  <span className="text-[#2C178C] font-medium">
                    5% - 8% annually
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Rental Yield</span>
                  <span className="text-[#2C178C] font-medium">
                    2% - 4% annually
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Down Payment</span>
                  <span className="text-[#2C178C] font-medium">20% - 25%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#ECFDF5] to-[#F0FDF4] p-3 rounded-xl border border-green-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                💡 What's Included in Calculations
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Initial Investment:</strong> Down payment +
                  registration fees + stamp duty
                </p>
                <p>
                  • <strong>Financing Costs:</strong> Total EMI payments
                  (principal + interest) over loan term
                </p>
                <p>
                  • <strong>Rental Returns:</strong> Monthly rental income
                  multiplied by investment period
                </p>
                <p>
                  • <strong>Capital Appreciation:</strong> Property value growth
                  based on annual appreciation rate
                </p>
                <p>
                  • <strong>Cash Flow Analysis:</strong> Monthly rental income
                  minus EMI payments
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FFF5F5] p-3 rounded-xl border border-red-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ❌ What's NOT Included
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Vacancy Periods:</strong> Months without rental
                  income between tenants
                </p>
                <p>
                  • <strong>Property Management:</strong> Fees for managing
                  rental property
                </p>
                <p>
                  • <strong>Insurance Premiums:</strong> Home insurance and
                  other protection costs
                </p>
                <p>
                  • <strong>Property Taxes:</strong> Annual municipal taxes and
                  assessments
                </p>
                <p>
                  • <strong>Income Tax:</strong> Tax on rental income and
                  capital gains
                </p>
                <p>
                  • <strong>Transaction Costs:</strong> Brokerage fees when
                  buying/selling
                </p>
              </div>
            </div>

            <div
              style={{
                background:
                  "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
              }}
              className="p-3 rounded-xl text-white"
            >
              <div className="text-xs font-semibold mb-2">
                💡 Pro Investment Tips
              </div>
              <div className="text-xs space-y-1">
                <p>
                  • Research local rental rates and vacancy patterns before
                  investing
                </p>
                <p>
                  • Factor in 10-15% of rental income for maintenance and
                  repairs
                </p>
                <p>
                  • Consider property location, connectivity, and future
                  development plans
                </p>
                <p>
                  • Keep 2-3 months of EMI as emergency fund for vacancy periods
                </p>
                <p>
                  • Consult tax advisor for rental income and capital gains tax
                  planning
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
