// WeddingAssumptions.jsx
import React, { useState } from "react";
import { CheckCircle, Info, TrendingUp, AlertTriangle } from "lucide-react";

export default function WeddingAssumptions() {
  const [activeTab, setActiveTab] = useState("methodology");

  return (
    <div className="sm:mt-4 mt-3 bg-white rounded-lg shadow-sm">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How This Wedding Calculator Works
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-[#E5E2F2]">
        <div className="flex justify-around">
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
            Logic
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
              <div className="text-xs font-semibold text-[#2C178C] mb-2 flex items-center">
                <Info size={14} className="mr-2" /> How It Works
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  This tool acts as your personal wedding budget aggregator.
                  Instead of using pre-filled estimates, it relies entirely on
                  the costs you provide for maximum accuracy and
                  personalization.
                </p>
                <p>
                  • <strong>Bottom-Up Planning:</strong> You build your budget
                  from the ground up by adding events and their specific costs.
                </p>
                <p>
                  • <strong>Event-Specific & Shared Costs:</strong> The
                  calculator separates costs tied to individual events (like
                  venue, decor) from expenses that are shared across the whole
                  wedding (like attire).
                </p>
                <p>
                  • <strong>Pure Aggregation:</strong> It simply adds up all the
                  numbers you enter to give you a grand total.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🎯 Core Cost Categories
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#AB78FF] rounded-full mr-2"></div>
                  <span>Event Costs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#CAF5BD] rounded-full mr-2"></div>
                  <span>Shared Expenses</span>
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
                To get the most accurate estimate, research real vendor prices
                in your city for venues, catering, decor, and other services
                before filling out the calculator.
              </div>
            </div>
          </div>
        )}

        {activeTab === "formulas" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🧮 Core Calculation Logic
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="p-2 bg-white rounded-lg">
                  <p className="font-mono text-center text-[#2C178C]">
                    Grand Total = (Total Events Cost) + (Total Shared Cost)
                  </p>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Total Events Cost:</span>
                  <span className="font-mono text-[#F04393]">
                    Σ(All Event Inputs)
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Total Shared Cost:</span>
                  <span className="font-mono text-[#F04393]">
                    Σ(All Shared Inputs)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 Per-Event & Accommodation Logic
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Event Food Cost:</span>
                  <span className="font-mono text-[#F04393]">
                    (Guests) × (Cost/Plate)
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Accommodation Cost:</span>
                  <span className="font-mono text-[#F04393]">
                    (Rooms) × (Cost/Room) × (Days)
                  </span>
                </div>
                <div className="p-2 bg-white rounded-lg">
                  <p>
                    All other event costs (Venue, Decor, etc.) are taken
                    directly from your inputs for that event.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F0F9FF] to-[#FFF1F2] p-3 rounded-xl border border-blue-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2 flex items-center">
                <CheckCircle size={14} className="mr-2" /> Our Philosophy: No
                Assumptions
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  This calculator is designed to be a **pure reflection of YOUR
                  inputs**. We have intentionally removed almost all built-in
                  cost assumptions to give you the most accurate, personalized
                  budget possible.
                </p>
                <p>
                  • <strong>You Are in Control:</strong> Every number, from food
                  cost to decor, is entered by you.
                </p>
                <p>
                  • <strong>No Hidden Costs:</strong> The total is a simple,
                  transparent sum of all the values you see on the screen. There
                  are no hidden percentages or fees added automatically.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FFF5F5] p-3 rounded-xl border border-red-200">
              <div className="text-xs font-semibold text-red-600 mb-2 flex items-center">
                <AlertTriangle size={14} className="mr-2" /> The Only Assumption
                Made
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Accommodation Duration:</strong> We assume that if
                  you specify a "Cost Per Room" for an event, that cost applies
                  for the **Total Wedding Days** you set at the top. For
                  example, ₹4,000/room for 3 days becomes a ₹12,000 total
                  accommodation cost for that event.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                What to Include in 'Miscellaneous & Buffer'
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  The "Miscellaneous & Buffer" slider is your place to account
                  for costs not listed separately. We recommend a buffer of at
                  least 10-15% of your total estimated cost. Use it for:
                </p>
                <p>
                  • Pandit/Priest Fees • Ghori/Band for Baraat • Transportation
                  Logistics • Vendor Tips • Small Ritual Items • An Emergency
                  Fund
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
