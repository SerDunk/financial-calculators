import React, { useState } from "react";
import {
  Heart,
  Calculator,
  TrendingUp,
  AlertTriangle,
  Info,
  Percent,
} from "lucide-react";

export default function WeddingAssumptions() {
  const [activeTab, setActiveTab] = useState("methodology");

  return (
    <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How This Wedding Calculator Works
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
            Calculation Logic
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
                💕 What This Calculator Does
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Category-wise Breakdown:</strong> Calculates costs
                  for all major wedding categories like venue, food, decoration,
                  photography, etc.
                </p>
                <p>
                  • <strong>Per-Guest Analysis:</strong> Shows cost per guest
                  for guest-dependent categories to help with guest list
                  planning.
                </p>
                <p>
                  • <strong>Extra Charges:</strong> Adds realistic buffer costs
                  that are often overlooked in wedding planning.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🎯 Main Wedding Categories
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#AB78FF] rounded-full mr-2"></div>
                  <span>Food & Catering</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#CAF5BD] rounded-full mr-2"></div>
                  <span>Venue & Accommodation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#45D099] rounded-full mr-2"></div>
                  <span>Decoration & Flowers</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#97A9FF] rounded-full mr-2"></div>
                  <span>Photography & Entertainment</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFB347] rounded-full mr-2"></div>
                  <span>Clothing & Jewelry</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FF9999] rounded-full mr-2"></div>
                  <span>Transportation & Gifts</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🧮 How Budget Analysis Works
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  The calculator compares your{" "}
                  <strong>total estimated cost</strong> (main expenses + extra
                  charges) with your <strong>set budget</strong> to determine if
                  you're within limits.
                </p>
                <p>
                  <strong>Budget Status:</strong> Green if within budget, Red if
                  exceeding budget with exact overage amount shown.
                </p>
                <p>
                  <strong>Per-Guest Metrics:</strong> Only guest-relevant costs
                  (food, venue, entertainment, accommodation, invitations) are
                  divided by guest count for accurate per-person analysis.
                </p>
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
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Main Expenses:</span>
                  <span className="font-mono text-[#F04393]">
                    Σ(Category Costs)
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Extra Charges:</span>
                  <span className="font-mono text-[#F04393]">
                    Budget × (8% + 10% + 10% + 5%)
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Grand Total:</span>
                  <span className="font-mono text-[#F04393]">
                    Main Expenses + Extra Charges
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Budget Status:</span>
                  <span className="font-mono text-[#F04393]">
                    Grand Total - Set Budget
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 Per-Guest Calculations
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <div className="p-2 bg-white rounded-lg">
                  <div className="font-medium mb-1">
                    Guest-Relevant Categories:
                  </div>
                  <div>
                    Food, Venue, Entertainment, Accommodation, Invitations
                  </div>
                </div>
                <div className="flex justify-between p-2 bg-white rounded-lg">
                  <span>Per Guest Cost:</span>
                  <span className="font-mono text-[#F04393]">
                    Guest-Relevant Total ÷ Guest Count
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
                  • <strong>Fixed Category Percentages:</strong> Each wedding
                  category is allocated a percentage of total budget based on
                  Indian wedding standards.
                </p>
                <p>
                  • <strong>Guest-Dependent Scaling:</strong> Food, venue, and
                  accommodation costs scale linearly with guest count.
                </p>
                <p>
                  • <strong>Standard Quality Assumptions:</strong> Mid-range
                  quality standards assumed for all categories unless specified.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📋 Extra Charges Breakdown & Justification
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#686868] font-medium">
                      Rituals & Ceremonies
                    </span>
                    <span className="text-[#2C178C] font-bold">8%</span>
                  </div>
                  <div className="text-[#555555]">
                    Includes pandit fees, religious items, havan materials,
                    ceremonial decorations, and traditional ritual requirements
                  </div>
                </div>

                <div className="p-2 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#686868] font-medium">
                      Wedding Planner Fee
                    </span>
                    <span className="text-[#2C178C] font-bold">10%</span>
                  </div>
                  <div className="text-[#555555]">
                    Professional wedding planners typically charge 8-12% of
                    total budget for full-service coordination and vendor
                    management
                  </div>
                </div>

                <div className="p-2 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#686868] font-medium">
                      Emergency Buffer
                    </span>
                    <span className="text-[#2C178C] font-bold">10%</span>
                  </div>
                  <div className="text-[#555555]">
                    Recommended buffer for last-minute changes, vendor price
                    increases, additional guests, or unexpected requirements
                  </div>
                </div>

                <div className="p-2 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#686868] font-medium">
                      Miscellaneous Expenses
                    </span>
                    <span className="text-[#2C178C] font-bold">5%</span>
                  </div>
                  <div className="text-[#555555]">
                    Small expenses like tips, service charges, vendor meals,
                    coordination costs, and other minor but essential items
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 Indian Wedding Market Standards
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Food Cost per Guest</span>
                  <span className="text-[#2C178C] font-medium">
                    ₹800 - ₹2,500
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Venue Cost Range</span>
                  <span className="text-[#2C178C] font-medium">
                    ₹15,000 - ₹1,00,000/day
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Photography Package</span>
                  <span className="text-[#2C178C] font-medium">
                    ₹50,000 - ₹5,00,000
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Decoration Budget</span>
                  <span className="text-[#2C178C] font-medium">
                    8% - 15% of total
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
                Wedding costs can vary significantly based on location, season,
                and vendor choice. Use this calculator as a starting point and
                get quotes from local vendors for accurate pricing. Always keep
                15-20% extra buffer beyond the calculated amount for unforeseen
                expenses.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
