import React, { useState } from "react";
import {
  CheckCircle,
  Info,
  TrendingUp,
  AlertTriangle,
  LifeBuoy,
  XCircle,
} from "lucide-react";

export default function VacationAssumptions() {
  const [activeTab, setActiveTab] = useState("methodology");

  return (
    <div className="sm:mt-4 mt-3 bg-white rounded-lg shadow-sm">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How This Vacation Cost Calculator Works
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
              <div className="text-xs font-semibold text-[#2C178C] mb-2 flex items-center">
                <Info size={14} className="mr-2" /> How It Works
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  This tool acts as a powerful aggregator for your own travel
                  research. Instead of using pre-filled estimates, it relies
                  entirely on the cost inputs you provide for maximum accuracy
                  and personalization.
                </p>
                <p>
                  • <strong>You Input Costs:</strong> You enter your estimated
                  costs for every category, from flights to food.
                </p>
                <p>
                  • <strong>It Calculates Totals:</strong> The tool sums up your
                  inputs to provide a comprehensive trip total.
                </p>
                <p>
                  • <strong>It Adds a Buffer:</strong> A standard 10% emergency
                  buffer is added to your total for financial safety.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F0F9FF] to-[#FFF1F2] p-3 rounded-xl border border-blue-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2 flex items-center">
                <TrendingUp size={14} className="mr-2" /> Calculation Formula
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  The total cost is a direct sum of your inputs plus a safety
                  buffer:
                </p>
                <p>
                  <strong>
                    Total Cost = (Base Costs) + (10% of Base Costs)
                  </strong>
                </p>
                <p>
                  <strong>Base Costs =</strong> Transportation + Accommodation +
                  Daily Expenses + Local Transport + Documentation
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#ECFDF5] to-[#F0FDF4] p-3 rounded-xl border border-green-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2 flex items-center">
                <CheckCircle size={14} className="mr-2" /> Your Cost Components
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Transportation:</strong> Your total estimated cost
                  for flights, train, or road travel.
                </p>
                <p>
                  • <strong>Accommodation:</strong> Calculated as (Cost per
                  Night × Number of Rooms × Trip Duration).
                </p>
                <p>
                  • <strong>Daily Expenses:</strong> Includes (Food Cost per Day
                  × Trip Duration) plus your total budgets for Activities and
                  Shopping.
                </p>
                <p>
                  • <strong>Local Transport:</strong> Your estimated cost for
                  getting around at the destination.
                </p>
                <p>
                  • <strong>Documentation:</strong> The sum of your inputs for
                  Travel Insurance and Visa fees.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FFF5F5] p-3 rounded-xl border border-red-200">
              <div className="text-xs font-semibold text-red-600 mb-2 flex items-center">
                <AlertTriangle size={14} className="mr-2" /> Important
                Disclaimer
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Your Estimates Matter:</strong> The accuracy of this
                  budget is 100% dependent on the accuracy of the numbers you
                  provide.
                </p>
                <p>
                  • <strong>Planning Tool Only:</strong> This is a budgeting
                  tool, not a final quote. Real-world prices can and will vary.
                </p>
                <p>
                  • <strong>Market Fluctuations:</strong> Use up-to-date
                  research for your inputs, as flight and hotel prices change
                  constantly.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2 flex items-center">
                <LifeBuoy size={14} className="mr-2" /> The Only Built-in
                Assumption
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>This calculator makes only ONE assumption on your behalf:</p>
                <p>
                  • <strong>10% Emergency Buffer:</strong> We automatically add
                  a 10% buffer to the total of all your costs. This is a
                  standard travel planning practice to account for unforeseen
                  expenses like price surges, medical needs, or other
                  emergencies. You should always travel with a safety fund.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FFF5F5] p-3 rounded-xl border border-red-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2 flex items-center">
                <XCircle size={14} className="mr-2" /> What's NOT Included
                (Unless You Add It)
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  Remember to account for these costs within your budgets (e.g.,
                  in Shopping or Activities), as they are not listed separately:
                </p>
                <p>
                  • <strong>Pre-trip Expenses:</strong> Passports, vaccinations,
                  travel gear.
                </p>
                <p>
                  • <strong>Excess Baggage Fees:</strong> Charges by airlines
                  for extra luggage.
                </p>
                <p>
                  • <strong>Communication Costs:</strong> International roaming
                  charges or local SIM cards.
                </p>
                <p>
                  • <strong>Tips & Gratuities:</strong> For guides, drivers, and
                  restaurant staff.
                </p>
                <p>
                  • <strong>Currency Exchange Fees:</strong> Fees charged by
                  banks or exchange counters.
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
                💡 Smart Budgeting Tips
              </div>
              <div className="text-xs space-y-1">
                <p>
                  • <strong>Research First:</strong> Use sites like Google
                  Flights, Skyscanner, Booking.com, and Agoda to find realistic
                  costs to input into this calculator.
                </p>
                <p>
                  • <strong>Be Honest:</strong> Input realistic daily spending
                  habits for food and shopping for an accurate budget.
                </p>
                <p>
                  • <strong>Overestimate Slightly:</strong> It's always better
                  to budget a little more and have money left over, than to
                  budget too little and run out.
                </p>
                <p>
                  • <strong>Check Local Blogs:</strong> Search for "cost of
                  travel in [your destination]" to find articles with detailed
                  cost breakdowns to help you fill out the fields.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
