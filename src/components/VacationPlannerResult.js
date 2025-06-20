import React from "react";
import {
  Plane,
  Calculator,
  TrendingDown,
  PieChart,
  MapPin,
  FileText,
  Users,
  Calendar,
  Hotel,
  Utensils,
  Camera,
} from "lucide-react";

const VacationResult = ({ result }) => {
  const formatIndianCurrency = (amount) => {
    if (!amount) return "₹0";
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  };

  const formatShortCurrency = (amount) => {
    if (!amount) return "₹0";
    const num = Math.round(amount);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num}`;
  };

  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium mb-2">Vacation Cost Calculator</h3>
          <p className="text-sm">
            Adjust the settings to see your vacation cost breakdown
          </p>
        </div>
      </div>
    );
  }

  const {
    tripDetails,
    costs,
    additionalCosts,
    totals,
    perPersonAnalysis,
    optimizations,
    summary,
  } = result;

  const totalSavings = optimizations?.potentialSavings || 0;
  const optimizedBudget = totals.recommendedBudget - totalSavings;
  const optimizedPerPersonBudget = optimizations?.optimizedPerPersonBudget || 0;

  return (
    <div className="sm:mt-2 mt-2 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-[#AB78FF]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Plane className="text-[#AB78FF]" size={24} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          Your {tripDetails.destination} Vacation
        </h2>
        <p className="text-sm text-[#666666]">
          {tripDetails.budgetCategory} for{" "}
          <span className="bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent font-semibold">
            {tripDetails.totalPeople} travelers
          </span>{" "}
          over {tripDetails.tripDuration} days
        </p>
      </div>

      {/* Trip Overview Card */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="rounded-xl flex items-center justify-center mr-3">
              <MapPin className="text-[#AB78FF]" size={30} />
            </div>
            <div>
              <h3 className="font-semibold text-[#2C178C]">Trip Overview</h3>
              <p className="text-xs text-[#666666]">Essential details</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-[#AB78FF]" />
              <span className="text-xs text-[#666666]">Travelers</span>
            </div>
            <div className="font-semibold text-[#2C178C]">
              {tripDetails.numAdults} Adults
              {tripDetails.numChildren > 0 &&
                `, ${tripDetails.numChildren} Kids`}
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={16} className="text-[#AB78FF]" />
              <span className="text-xs text-[#666666]">Duration</span>
            </div>
            <div className="font-semibold text-[#2C178C]">
              {tripDetails.tripDuration} Days
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-gray-200">
          <div className="text-center">
            <div className="text-xs text-[#666666] mb-1">
              Total Recommended Budget
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatIndianCurrency(totals.recommendedBudget)}
            </div>
            <div className="text-xs text-[#666666] mt-1">
              {formatIndianCurrency(perPersonAnalysis.costPerPerson)} per person
              • Emergency buffer: {formatIndianCurrency(totals.emergencyBuffer)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Cost Breakdown */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            <FileText className="text-[#B3BEF5]" size={30} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2C178C]">Cost Breakdown</h3>
            <p className="text-xs text-[#666666]">
              Main vacation expenses (total for all travelers)
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Flights */}
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Plane size={16} className="text-[#AB78FF]" />
                <span className="text-sm font-medium text-gray-700">
                  Flight Costs (Total)
                </span>
              </div>
              <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                {formatIndianCurrency(costs.flights.total)}
              </span>
            </div>
            <div className="text-xs text-[#666666]">
              {tripDetails.numAdults} adults:{" "}
              {formatIndianCurrency(costs.flights.adults)}
              {tripDetails.numChildren > 0 && (
                <>
                  , {tripDetails.numChildren} children:{" "}
                  {formatIndianCurrency(costs.flights.children)}
                </>
              )}
            </div>
          </div>

          {/* Accommodation */}
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Hotel size={16} className="text-[#AB78FF]" />
                <span className="text-sm font-medium text-gray-700">
                  Accommodation (Total)
                </span>
              </div>
              <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                {formatIndianCurrency(costs.accommodation.total)}
              </span>
            </div>
            <div className="text-xs text-[#666666]">
              {formatIndianCurrency(costs.accommodation.perNight)} per night ×{" "}
              {costs.accommodation.totalNights} nights
            </div>
          </div>

          {/* Meals */}
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Utensils size={16} className="text-[#AB78FF]" />
                <span className="text-sm font-medium text-gray-700">
                  Meals & Dining (All Travelers)
                </span>
              </div>
              <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                {formatIndianCurrency(costs.meals.total)}
              </span>
            </div>
            <div className="text-xs text-[#666666]">
              ~{formatIndianCurrency(costs.meals.perPersonPerDay)} per person
              per day
            </div>
          </div>

          {/* Activities */}
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Camera size={16} className="text-[#AB78FF]" />
                <span className="text-sm font-medium text-gray-700">
                  Activities & Sightseeing (Total)
                </span>
              </div>
              <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                {formatIndianCurrency(costs.activities)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
          <div className="text-center">
            <div className="text-xs text-[#666666] mb-1">
              Main Trip Cost (Total)
            </div>
            <div className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatIndianCurrency(totals.baseTripCost)}
            </div>
            <div className="text-xs text-[#666666] mt-1">
              {formatIndianCurrency(
                totals.baseTripCost / tripDetails.totalPeople
              )}{" "}
              per person
            </div>
          </div>
        </div>
      </div>

      {/* Additional Costs */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            <FileText className="text-[#AB78FF]" size={30} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2C178C]">
              Additional Expenses
            </h3>
            <p className="text-xs text-[#666666]">
              Extra costs to consider (total amounts)
            </p>
          </div>
        </div>

        <div className="text-sm space-y-2">
          {additionalCosts.visaAndDocuments > 0 && (
            <div className="flex justify-between">
              <span className="text-xs text-[#666666] font-medium">
                Visa & Documents (All Travelers)
              </span>
              <span className="font-semibold text-[#2C178C]">
                {formatIndianCurrency(additionalCosts.visaAndDocuments)}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-xs text-[#666666] font-medium">
              Travel Insurance (All Travelers)
            </span>
            <span className="font-semibold text-[#2C178C]">
              {formatIndianCurrency(additionalCosts.travelInsurance)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs text-[#666666] font-medium">
              Local Transport (Total)
            </span>
            <span className="font-semibold text-[#2C178C]">
              {formatIndianCurrency(additionalCosts.localTransport)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs text-[#666666] font-medium">
              Shopping & Misc (Total)
            </span>
            <span className="font-semibold text-[#2C178C]">
              {formatIndianCurrency(additionalCosts.shoppingAndMisc)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
          <div className="text-center">
            <div className="text-xs text-[#666666] mb-1">
              Total Additional Costs
            </div>
            <div className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatIndianCurrency(additionalCosts.total)}
            </div>
            <div className="text-xs text-[#666666] mt-1">
              {formatIndianCurrency(
                additionalCosts.total / tripDetails.totalPeople
              )}{" "}
              per person
            </div>
          </div>
        </div>
      </div>

      {/* Per Person Analysis */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            <Users className="text-[#B3BEF5]" size={30} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2C178C]">
              Per Person Analysis
            </h3>
            <p className="text-xs text-[#666666]">Individual cost breakdown</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
            <div className="text-xs text-[#666666] mb-1">Total Per Person</div>
            <div className="font-bold text-[#2C178C]">
              {formatIndianCurrency(perPersonAnalysis.costPerPerson)}
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
            <div className="text-xs text-[#666666] mb-1">Total Per Day</div>
            <div className="font-bold text-[#2C178C]">
              {formatIndianCurrency(perPersonAnalysis.costPerDay)}
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
            <div className="text-xs text-[#666666] mb-1">
              Per Person Per Day
            </div>
            <div className="font-bold text-[#2C178C]">
              {formatIndianCurrency(perPersonAnalysis.costPerPersonPerDay)}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Optimization */}
      {totalSavings > 0 && (
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
          <div className="flex items-center mb-4">
            <div className="rounded-xl flex items-center justify-center mr-3">
              <TrendingDown className="text-green-500" size={30} />
            </div>
            <div>
              <h3 className="font-semibold text-[#2C178C]">
                Cost Optimization
              </h3>
              <p className="text-xs text-[#666666]">
                Potential savings available
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {optimizations.suggestions.flightSavings > 0 && (
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-700">
                    Flight Class Downgrade
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    Save{" "}
                    {formatShortCurrency(
                      optimizations.suggestions.flightSavings
                    )}
                  </span>
                </div>
              </div>
            )}

            {optimizations.suggestions.hotelSavings > 0 && (
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-700">
                    Budget Accommodation
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    Save{" "}
                    {formatShortCurrency(
                      optimizations.suggestions.hotelSavings
                    )}
                  </span>
                </div>
              </div>
            )}

            {optimizations.suggestions.mealSavings > 0 && (
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-700">
                    Local Food Options
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    Save{" "}
                    {formatShortCurrency(optimizations.suggestions.mealSavings)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-green-100 rounded-xl p-3 border border-green-200 mt-4">
            <div className="text-center">
              <div className="text-xs text-green-700 mb-1 font-medium">
                Optimized Budget
              </div>
              <div className="text-lg font-bold text-green-700">
                {formatIndianCurrency(optimizedBudget)}
              </div>
              <div className="text-xs text-green-600 mt-1">
                Total Potential Savings: {formatIndianCurrency(totalSavings)}
              </div>
              <div className="text-xs text-green-600 mt-1">
                {formatIndianCurrency(optimizedPerPersonBudget)} per person
                after optimization
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacationResult;
