import React, { useState } from "react";

export default function CarLeaseAssumptions() {
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
                  • <strong>Corporate Lease:</strong> Your company leases the car for you. The monthly rent, maintenance, and insurance are deducted from your <strong>pre-tax salary</strong>. This massively lowers your taxable income, saving you money on income tax.
                </p>
                <p>
                  • <strong>Auto Loan:</strong> You buy the car yourself. You pay the EMI, maintenance, and insurance from your <strong>post-tax take-home salary</strong>. You receive no tax benefits for these payments.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 Calculation Overview
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FF9A9E] rounded-full mr-2"></div>
                  <span>Lease Rentals pre-tax</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#CAF5BD] rounded-full mr-2"></div>
                  <span>Income Tax Saved</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#4facfe] rounded-full mr-2"></div>
                  <span>Loan EMIs post-tax</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#97A9FF] rounded-full mr-2"></div>
                  <span>Buyback (Residual) Cost</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🧾 Understanding Perquisite Tax
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  When a company provides a car for mixed (official + personal) use, the Income Tax Department considers it a "Perquisite" (a non-cash benefit) and adds a fixed nominal value to your taxable income.
                </p>
                <p>
                  <strong>For EVs and Engine ≤ 1.6L:</strong> ₹5,000 per month is added to your income. <br/>
                  <strong>For Engine &gt; 1.6L:</strong> ₹7,000 per month is added to your income.<br/>
                  <strong>If a Driver is provided:</strong> An additional ₹3,000 per month is added.
                </p>
                <p>
                  You pay tax <em>only on this small notional amount</em> based on your marginal tax slab, which is significantly cheaper than paying tax on the entire EMI.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "formulas" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🧮 Key Formulas (FY 2026-27 Indian Market)
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>On-Road Price:</span>
                  <span className="font-mono text-[#F04393]">
                    Ex-Showroom + Road Tax (10%) + Ins. (4%)
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Gross Lease Rental:</span>
                  <span className="font-mono text-[#F04393]">
                    [Interest on Principal & RV] + GST Slab
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg text-right items-center">
                  <span>Monthly Tax Saved:</span>
                  <span className="font-mono text-[#F04393] w-2/3">
                    (Lease Rent + Maintenance) × Marginal Tax Rate
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg text-right items-center">
                  <span>Net Lease Outflow:</span>
                  <span className="font-mono text-[#F04393] w-2/3">
                    (Lease Rent + Maint.) - Tax Saved + Perk Tax
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Final Buyback:</span>
                  <span className="font-mono text-[#F04393]">
                    Residual Value + GST
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
                  • <strong>Ex-Showroom Price Includes Base GST:</strong> The calculator assumes the Ex-Showroom price you enter already contains the vehicle's inherent GST.
                </p>
                <p>
                  • <strong>Tax Regime:</strong> Calculations use the progressive 2025-26 New Tax Regime slabs (e.g., up to 30% for incomes &gt; ₹24L, plus standard cess effects simplified into the marginal rates).
                </p>
                <p>
                  • <strong>100% Financing for Loan:</strong> For an apples-to-apples comparison, the Auto Loan assumes you are financing the entire On-Road price without a down payment.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📋 Indian Market Estimates Used
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Registration / Road Tax</span>
                  <span className="text-[#2C178C] font-medium">10% of Ex-Showroom</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Initial Insurance</span>
                  <span className="text-[#2C178C] font-medium">4% of Ex-Showroom</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">GST on Lease Rentals & Buyback</span>
                  <span className="text-[#2C178C] font-medium">
                    Same as Car Slab (5%, 18%, 40%)
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Perquisite Added to Income</span>
                  <span className="text-[#2C178C] font-medium">
                    Fixed ₹5K - ₹10K / month
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
                To maximize your lease tax savings, include your estimated monthly fuel budget in the "Monthly Maintenance" slider. In India, fuel limits provided by employers can also be claimed entirely tax-free under a corporate lease structure!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
