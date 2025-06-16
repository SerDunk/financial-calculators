import React, { useState } from "react";

export default function BuyVsRentAssumptions() {
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
                💡 What This Compares
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Total Buy Cost:</strong> Includes down payment, EMI,
                  taxes, insurance, maintenance, and resale value at end.
                </p>
                <p>
                  • <strong>Total Rent Cost:</strong> Adds all rental payments,
                  security deposit interest, and assumed investment gains on
                  savings.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 Calculation Overview
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#AB78FF] rounded-full mr-2"></div>
                  <span>Rent Paid Over Years</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#CAF5BD] rounded-full mr-2"></div>
                  <span>Total EMI Paid</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#45D099] rounded-full mr-2"></div>
                  <span>Investment Growth on Savings</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#97A9FF] rounded-full mr-2"></div>
                  <span>Home Value at Exit</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🧾 What Is Net Gain?
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  Net Gain (or Net Wealth) is the difference in your total
                  wealth at the end of the chosen time period between buying and
                  renting.
                </p>
                <p>
                  It's calculated by comparing the resale value of the home (if
                  bought) minus all home-related expenses, with the invested
                  value of savings (if rented) minus rent paid.
                </p>
                <p>
                  <strong>
                    Net Gain = Wealth from Renting – Wealth from Buying
                  </strong>
                </p>
                <p>
                  A positive Net Gain means renting gives you more wealth over
                  time; a negative value means buying results in greater
                  long-term wealth.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "formulas" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🧮 Key Formulas
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Total Rent Cost:</span>
                  <span className="font-mono text-[#F04393]">
                    Σ(Rent × (1 + Hike)^n)
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Home Sale Value:</span>
                  <span className="font-mono text-[#F04393]">
                    Home Price × (1 + Growth Rate)^Years
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Investment Value:</span>
                  <span className="font-mono text-[#F04393]">
                    FV = P × (1 + r)^n
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Net Gain:</span>
                  <span className="font-mono text-[#F04393]">
                    Rent Wealth - Buy Wealth
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
                  • <strong>Constant Growth Rates:</strong> Rent hike and
                  property appreciation assumed to be uniform annually.
                </p>
                <p>
                  • <strong>Opportunity Cost Considered:</strong> Money not used
                  for down payment or EMIs is invested at a given return rate.
                </p>
                <p>
                  • <strong>Exit After N Years:</strong> Both scenarios assume
                  same duration to compare end wealth.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📋 Indian Market Standards
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Rent Hike per Year</span>
                  <span className="text-[#2C178C] font-medium">5% - 10%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Property Growth Rate</span>
                  <span className="text-[#2C178C] font-medium">4% - 8%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Investment Return</span>
                  <span className="text-[#2C178C] font-medium">
                    10% - 14% p.a.
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
                Use this tool to understand long-term wealth impact, not just
                short-term affordability. Include realistic estimates based on
                your city, investment style, and expected lifestyle.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
