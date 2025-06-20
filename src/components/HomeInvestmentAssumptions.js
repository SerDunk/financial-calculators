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
            Key Terms
          </button>
          <button
            onClick={() => setActiveTab("assumptions")}
            className={`px-3 py-3 text-xs font-medium transition-colors ${
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
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🏠 Comprehensive Investment Analysis
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Total Upfront Costs:</strong> Down payment +
                  registration fees + stamp duty + legal charges
                </p>
                <p>
                  • <strong>Monthly EMI:</strong> Fixed monthly loan payment
                  including principal and interest
                </p>
                <p>
                  • <strong>Total Cost of Ownership:</strong> All expenses over
                  the loan term including upfront costs, EMI payments, and
                  maintenance
                </p>
                <p>
                  • <strong>Total Returns:</strong> Property value after
                  appreciation + total rental income received
                </p>
                <p>
                  • <strong>Net Profit:</strong> Total returns minus total cost
                  of ownership
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 Return on Investment (ROI) Analysis
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#AB78FF] rounded-full mr-2"></div>
                  <span>Overall ROI</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#CAF5BD] rounded-full mr-2"></div>
                  <span>Annualized ROI</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#45D099] rounded-full mr-2"></div>
                  <span>Cash-on-Cash Return</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#97A9FF] rounded-full mr-2"></div>
                  <span>Rental Yield</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F0F9FF] to-[#FFF1F2] p-3 rounded-xl border border-blue-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                💰 Cash Flow & Break-even Analysis
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Monthly Net Cash Flow:</strong> Monthly rental
                  income minus monthly EMI payment
                </p>
                <p>
                  • <strong>Positive Cash Flow:</strong> When rental income
                  exceeds EMI (cash flows in)
                </p>
                <p>
                  • <strong>Negative Cash Flow:</strong> When EMI exceeds rental
                  income (cash flows out)
                </p>
                <p>
                  • <strong>Break-even Point:</strong> Time in years when
                  cumulative cash flows cover initial investment
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#ECFDF5] to-[#F0FDF4] p-3 rounded-xl border border-green-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📈 Property Appreciation & Capital Gains
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Property Appreciation:</strong> Annual rate at which
                  property value increases
                </p>
                <p>
                  • <strong>Capital Gains:</strong> Profit from property value
                  increase over time
                </p>
                <p>
                  • <strong>Compound Growth:</strong> Property value grows
                  exponentially due to compounding effect
                </p>
                <p>
                  • <strong>Rental Growth:</strong> Annual increase in rental
                  income (typically 3-5%)
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "formulas" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📝 Key Investment Terms Explained
              </div>
              <div className="space-y-3 text-xs text-[#323233]">
                <div className="p-3 bg-white rounded-lg border border-[#E5E2F2]">
                  <div className="font-semibold text-[#2C178C] mb-1">
                    Monthly EMI
                  </div>
                  <div className="text-[#686868]">
                    Equated Monthly Installment - Fixed monthly payment towards
                    your home loan, including both principal repayment and
                    interest charges.
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#E5E2F2]">
                  <div className="font-semibold text-[#2C178C] mb-1">
                    Total Upfront Costs
                  </div>
                  <div className="text-[#686868]">
                    All initial expenses: Down payment + Registration fees +
                    Stamp duty + Legal charges. This is your actual cash
                    investment at the time of purchase.
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#E5E2F2]">
                  <div className="font-semibold text-[#2C178C] mb-1">
                    Net Profit
                  </div>
                  <div className="text-[#686868]">
                    Total money earned from the investment after deducting all
                    costs. Calculated as: (Property Value + Rental Income) -
                    (All Costs)
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F0F9FF] to-[#FFF1F2] p-3 rounded-xl border border-blue-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 Return Metrics Explained
              </div>
              <div className="space-y-3 text-xs text-[#323233]">
                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <div className="font-semibold text-[#2C178C] mb-1">
                    Overall ROI
                  </div>
                  <div className="text-[#686868]">
                    Total percentage return on your investment over the entire
                    period. Higher ROI means better investment performance.
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <div className="font-semibold text-[#2C178C] mb-1">
                    Annualized ROI
                  </div>
                  <div className="text-[#686868]">
                    Average annual return percentage. Helps compare investments
                    of different durations. Formula: [(Final Value / Initial
                    Value)^(1/Years) - 1] × 100
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <div className="font-semibold text-[#2C178C] mb-1">
                    Cash-on-Cash Return
                  </div>
                  <div className="text-[#686868]">
                    Annual cash flow as percentage of initial cash invested.
                    Shows how much cash you earn on the cash you put in.
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <div className="font-semibold text-[#2C178C] mb-1">
                    Rental Yield
                  </div>
                  <div className="text-[#686868]">
                    Annual rental income as percentage of property price. Higher
                    yield means better rental returns relative to property cost.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FFF7ED] to-[#FEFCE8] p-3 rounded-xl border border-orange-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                💡 Cash Flow Concepts
              </div>
              <div className="space-y-3 text-xs text-[#323233]">
                <div className="p-3 bg-white rounded-lg border border-orange-200">
                  <div className="font-semibold text-[#2C178C] mb-1">
                    Monthly Net Cash Flow
                  </div>
                  <div className="text-[#686868]">
                    Money left after paying EMI from rental income each month.
                    Positive = Extra income, Negative = You pay from pocket.
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-orange-200">
                  <div className="font-semibold text-[#2C178C] mb-1">
                    Break-even Point
                  </div>
                  <div className="text-[#686868]">
                    Time (in years) when total rental income equals your initial
                    investment. After this point, you start making pure profit.
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-orange-200">
                  <div className="font-semibold text-[#2C178C] mb-1">
                    Total Cost of Ownership
                  </div>
                  <div className="text-[#686868]">
                    Complete cost of owning the property including upfront
                    costs, all EMI payments, and maintenance over the loan term.
                  </div>
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
                  • <strong>Property appreciation rate</strong> remains constant
                  at the specified percentage throughout the investment period
                </p>
                <p>
                  • <strong>Rental income</strong> is received consistently
                  every month without any vacancy periods or rent defaults
                </p>
                <p>
                  • <strong>Home loan interest rate</strong> remains fixed for
                  the entire loan tenure (floating rates not considered)
                </p>
                <p>
                  • <strong>Rental growth rate</strong> is assumed at 3%
                  annually, compounded over the investment period
                </p>
                <p>
                  • <strong>Property maintenance costs</strong> are estimated at
                  1.5% of property value annually if not specified
                </p>
                <p>
                  • <strong>Tax implications</strong> include 30% tax on rental
                  income but exclude depreciation benefits and other deductions
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📋 Indian Real Estate Market Standards
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">
                    Home Loan Interest Rate
                  </span>
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
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Default Loan Term</span>
                  <span className="text-[#2C178C] font-medium">20 years</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#ECFDF5] to-[#F0FDF4] p-3 rounded-xl border border-green-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ✅ What's Included in Calculations
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Total upfront costs:</strong> Down payment +
                  registration fees + stamp duty + legal charges
                </p>
                <p>
                  • <strong>Complete EMI payments:</strong> Principal + interest
                  over the entire loan term
                </p>
                <p>
                  • <strong>Rental income growth:</strong> 3% annual increase in
                  rental income throughout the period
                </p>
                <p>
                  • <strong>Property appreciation:</strong> Compound growth in
                  property value at specified rate
                </p>
                <p>
                  • <strong>Maintenance costs:</strong> Annual property
                  maintenance estimated at 1.5% of property value
                </p>
                <p>
                  • <strong>Tax on rental income:</strong> 30% tax rate applied
                  to total rental income received
                </p>
                <p>
                  • <strong>Multiple ROI metrics:</strong> Overall ROI,
                  annualized ROI, cash-on-cash return, and rental yield
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FFF5F5] p-3 rounded-xl border border-red-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ❌ What's NOT Included
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Vacancy periods:</strong> Months without rental
                  income between tenants or during repairs
                </p>
                <p>
                  • <strong>Property management fees:</strong> Professional
                  management costs (typically 5-10% of rent)
                </p>
                <p>
                  • <strong>Home insurance premiums:</strong> Annual insurance
                  costs for property protection
                </p>
                <p>
                  • <strong>Property taxes:</strong> Municipal taxes, water
                  charges, and other local levies
                </p>
                <p>
                  • <strong>Major repairs:</strong> Structural repairs,
                  renovations, or unexpected maintenance costs
                </p>
                <p>
                  • <strong>Transaction costs:</strong> Brokerage fees when
                  buying or selling the property
                </p>
                <p>
                  • <strong>Inflation impact:</strong> Effect of inflation on
                  costs and rental income over time
                </p>
                <p>
                  • <strong>Market volatility:</strong> Fluctuations in property
                  prices and rental rates
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FFF7ED] to-[#FEFCE8] p-3 rounded-xl border border-orange-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🔄 Calculation Logic Flow
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Step 1:</strong> Calculate total upfront investment
                  and monthly EMI
                </p>
                <p>
                  • <strong>Step 2:</strong> Determine monthly net cash flow
                  (rental income - EMI)
                </p>
                <p>
                  • <strong>Step 3:</strong> Project property value growth over
                  loan term
                </p>
                <p>
                  • <strong>Step 4:</strong> Calculate total rental income with
                  3% annual growth
                </p>
                <p>
                  • <strong>Step 5:</strong> Sum all costs (upfront + EMI
                  payments + maintenance)
                </p>
                <p>
                  • <strong>Step 6:</strong> Calculate net profit (total returns
                  - total costs)
                </p>
                <p>
                  • <strong>Step 7:</strong> Determine various ROI metrics and
                  break-even point
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
                💡 Smart Investment Tips
              </div>
              <div className="text-xs space-y-1">
                <p>
                  • <strong>Location Research:</strong> Study rental demand,
                  vacancy rates, and future development plans
                </p>
                <p>
                  • <strong>Emergency Fund:</strong> Keep 6-12 months of EMI as
                  buffer for vacancy or repair periods
                </p>
                <p>
                  • <strong>Maintenance Budget:</strong> Set aside 10-15% of
                  rental income for regular maintenance
                </p>
                <p>
                  • <strong>Tax Planning:</strong> Consult CA for rental income
                  tax, depreciation benefits, and capital gains
                </p>
                <p>
                  • <strong>Market Timing:</strong> Consider property cycles and
                  interest rate trends before investing
                </p>
                <p>
                  • <strong>Diversification:</strong> Don't put all savings in
                  one property; diversify across asset classes
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
