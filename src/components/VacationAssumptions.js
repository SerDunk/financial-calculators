import React, { useState } from "react";

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
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ✈️ Comprehensive Vacation Cost Analysis
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Base Trip Costs:</strong> Flight tickets +
                  accommodation + meals + activities for all travelers
                </p>
                <p>
                  • <strong>Additional Expenses:</strong> Visa & documents +
                  travel insurance + local transport + shopping & miscellaneous
                </p>
                <p>
                  • <strong>Emergency Buffer:</strong> 8% of total trip cost
                  added as safety margin for unexpected expenses
                </p>
                <p>
                  • <strong>Per Person Analysis:</strong> Total cost divided by
                  number of travelers for individual budgeting
                </p>
                <p>
                  • <strong>Cost Optimization:</strong> Potential savings by
                  choosing budget options for flights, hotels, and meals
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📊 Cost Calculation Components
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#AB78FF] rounded-full mr-2"></div>
                  <span>Flight Costs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#CAF5BD] rounded-full mr-2"></div>
                  <span>Accommodation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#45D099] rounded-full mr-2"></div>
                  <span>Meals & Dining</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#97A9FF] rounded-full mr-2"></div>
                  <span>Activities</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F0F9FF] to-[#FFF1F2] p-3 rounded-xl border border-blue-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                💰 Flight Cost Structure
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Domestic Flights:</strong> Economy (₹6K), Premium
                  Economy (₹12K), Business (₹20K) per adult
                </p>
                <p>
                  • <strong>International Flights:</strong> Economy (₹35K),
                  Premium Economy (₹65K), Business (₹1.2L) per adult
                </p>
                <p>
                  • <strong>Children Discount:</strong> 10-20% discount on
                  flight prices for children under 12
                </p>
                <p>
                  • <strong>Round Trip:</strong> All flight costs include return
                  journey
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#ECFDF5] to-[#F0FDF4] p-3 rounded-xl border border-green-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🏨 Accommodation & Living Expenses
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Hotel Categories:</strong> Budget, Mid-range, and
                  Luxury options with seasonal pricing
                </p>
                <p>
                  • <strong>Meal Preferences:</strong> Street Food (₹600), Mix
                  (₹1500), Fine Dining (₹3500) per person per day
                </p>
                <p>
                  • <strong>Children Meals:</strong> 70% of adult meal cost for
                  children
                </p>
                <p>
                  • <strong>Local Transport:</strong> Daily transport costs for
                  getting around the destination
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FFF7ED] to-[#FEFCE8] p-3 rounded-xl border border-orange-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📋 Additional Cost Calculations
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Visa & Documents:</strong> ₹6,000 per person for
                  international travel
                </p>
                <p>
                  • <strong>Travel Insurance:</strong> ₹2,000 per person
                  (international), ₹800 (domestic)
                </p>
                <p>
                  • <strong>Shopping & Miscellaneous:</strong> 12% of base trip
                  cost for souvenirs and extras
                </p>
                <p>
                  • <strong>Emergency Buffer:</strong> 8% of total cost as
                  safety margin
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FFF5F5] p-3 rounded-xl border border-red-200">
              <div className="text-xs font-semibold text-[#FF6B6B] mb-2">
                ⚠️ Important Disclaimer
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Estimates Only:</strong> All costs are approximate
                  estimates based on average market rates and may vary
                  significantly
                </p>
                <p>
                  • <strong>Market Fluctuations:</strong> Flight prices, hotel
                  rates, and other costs change frequently based on demand,
                  seasonality, and availability
                </p>
                <p>
                  • <strong>Individual Variations:</strong> Your actual costs
                  may be higher or lower depending on specific choices, timing,
                  and personal preferences
                </p>
                <p>
                  • <strong>Currency Changes:</strong> International costs may
                  vary due to exchange rate fluctuations
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📅 Pricing & Timing Assumptions
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Seasonal Pricing:</strong> 15% markup applied for
                  peak season travel (holidays, summer)
                </p>
                <p>
                  • <strong>Advance Booking:</strong> Costs assume booking 30-60
                  days in advance for better rates
                </p>
                <p>
                  • <strong>Standard Dates:</strong> Prices based on typical
                  travel dates, not during festivals or major events
                </p>
                <p>
                  • <strong>Mid-week Travel:</strong> Some savings possible for
                  Tuesday-Thursday departures not included
                </p>
                <p>
                  • <strong>Group Bookings:</strong> Potential group discounts
                  for 6+ people not factored in
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🌍 Regional Cost Standards (2025)
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">
                    Domestic Economy Flight
                  </span>
                  <span className="text-[#2C178C] font-medium">₹6,000</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">
                    International Economy Flight
                  </span>
                  <span className="text-[#2C178C] font-medium">₹35,000</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">
                    Budget Hotel (Domestic)
                  </span>
                  <span className="text-[#2C178C] font-medium">
                    ₹2,500/night
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">
                    Budget Hotel (International)
                  </span>
                  <span className="text-[#2C178C] font-medium">
                    ₹5,000/night
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">Street Food Per Day</span>
                  <span className="text-[#2C178C] font-medium">₹600</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                  <span className="text-[#686868]">International Visa</span>
                  <span className="text-[#2C178C] font-medium">₹6,000</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#ECFDF5] to-[#F0FDF4] p-3 rounded-xl border border-green-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ✅ What's Included in Calculations
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Round-trip flights:</strong> Complete air travel
                  costs for all passengers
                </p>
                <p>
                  • <strong>Full accommodation:</strong> Hotel stays for entire
                  duration
                </p>
                <p>
                  • <strong>All meals:</strong> Breakfast, lunch, and dinner
                  costs based on preference
                </p>
                <p>
                  • <strong>Activities budget:</strong> Sightseeing and
                  entertainment as specified
                </p>
                <p>
                  • <strong>Visa & documents:</strong> Passport, visa, and
                  permit costs for international travel
                </p>
                <p>
                  • <strong>Travel insurance:</strong> Basic coverage for
                  medical and trip cancellation
                </p>
                <p>
                  • <strong>Local transport:</strong> Getting around the
                  destination
                </p>
                <p>
                  • <strong>Shopping allowance:</strong> 12% buffer for
                  souvenirs and miscellaneous expenses
                </p>
                <p>
                  • <strong>Emergency fund:</strong> 8% safety margin for
                  unexpected costs
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FFF5F5] p-3 rounded-xl border border-red-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ❌ What's NOT Included
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Airport transfers:</strong> Transport to/from home
                  airport
                </p>
                <p>
                  • <strong>Excess baggage:</strong> Additional charges for
                  overweight luggage
                </p>
                <p>
                  • <strong>Premium activities:</strong> High-end experiences
                  beyond basic sightseeing
                </p>
                <p>
                  • <strong>Alcoholic beverages:</strong> Drinks and bar
                  expenses
                </p>
                <p>
                  • <strong>Spa & wellness:</strong> Massage, spa treatments,
                  and luxury services
                </p>
                <p>
                  • <strong>Communication costs:</strong> International roaming,
                  SIM cards, WiFi
                </p>
                <p>
                  • <strong>Tips & gratuities:</strong> Service charges and tips
                </p>
                <p>
                  • <strong>Travel gear:</strong> Luggage, clothing, and travel
                  accessories
                </p>
                <p>
                  • <strong>Medical expenses:</strong> Medications, treatments
                  beyond insurance coverage
                </p>
                <p>
                  • <strong>Pre-trip expenses:</strong> Vaccinations, medical
                  check-ups, gear shopping
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FFF7ED] to-[#FEFCE8] p-3 rounded-xl border border-orange-200">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🔄 Cost Optimization Logic
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>Flight Savings:</strong> 15-25% savings by choosing
                  lower class of service
                </p>
                <p>
                  • <strong>Hotel Savings:</strong> 20-30% savings by selecting
                  budget accommodation
                </p>
                <p>
                  • <strong>Food Savings:</strong> 25-40% savings by choosing
                  local food over fine dining
                </p>
                <p>
                  • <strong>Combined Effect:</strong> Total potential savings
                  calculated across all categories
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
                💡 Smart Travel Tips
              </div>
              <div className="text-xs space-y-1">
                <p>
                  • <strong>Book Early:</strong> Flight and hotel prices
                  increase closer to travel dates
                </p>
                <p>
                  • <strong>Flexible Dates:</strong> Traveling on weekdays can
                  save 10-20% on flights
                </p>
                <p>
                  • <strong>Compare Options:</strong> Check multiple booking
                  platforms for best deals
                </p>
                <p>
                  • <strong>Local Research:</strong> Study destination costs and
                  local transportation options
                </p>
                <p>
                  • <strong>Currency Planning:</strong> Monitor exchange rates
                  for international travel
                </p>
                <p>
                  • <strong>Travel Insurance:</strong> Don't skip insurance -
                  medical costs abroad can be huge
                </p>
                <p>
                  • <strong>Emergency Fund:</strong> Always keep extra money for
                  unexpected situations
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
