import React, { useState } from "react";
import {
  Plane,
  Calculator,
  TrendingDown,
  PieChart,
  MapPin,
  Users,
  Calendar,
  Hotel,
  Utensils,
  Camera,
  Train,
  Car,
  Shield,
  ShoppingBag,
  Navigation,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const VacationPlannerResult = ({ result }) => {
  const [expandedOptimizations, setExpandedOptimizations] = useState({});

  const isPositiveNumber = (val) => typeof val === "number" && val > 0;

  const formatIndianCurrency = (amount) => {
    if (!amount || amount === 0) return "₹0";
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  };

  const formatShortCurrency = (amount) => {
    if (!amount || amount === 0) return "₹0";
    const num = Math.round(amount);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num}`;
  };

  const getTransportIcon = (mode) => {
    switch (mode) {
      case "Flight":
        return <Plane size={16} className="text-[#AB78FF]" />;
      case "Train":
        return <Train size={16} className="text-[#AB78FF]" />;
      case "Road":
        return <Car size={16} className="text-[#AB78FF]" />;
      default:
        return <Navigation size={16} className="text-[#AB78FF]" />;
    }
  };

  const getBudgetCategoryColor = (category) => {
    switch (category) {
      case "Ultra Budget":
        return "text-green-600 bg-green-50 border-green-200";
      case "Budget Trip":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "Mid-range Trip":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Premium Trip":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "Luxury Trip":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const toggleOptimizationDetails = (type) => {
    setExpandedOptimizations((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const renderOptimizationDetails = (type, savings) => {
    return (
      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleOptimizationDetails(type)}
        >
          <span className="text-sm font-medium text-green-700">{type}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-green-600">
              Save {formatShortCurrency(savings)}
            </span>
          </div>
        </div>
      </div>
    );
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
    totals,
    perPersonAnalysis,
    optimizations,
    summary,
  } = result;

  return (
    <div className="sm:mt-2 mt-2 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-[#AB78FF]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            {getTransportIcon(tripDetails.transportMode)}
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          Your {tripDetails.destination} Vacation
        </h2>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getBudgetCategoryColor(
              tripDetails.budgetCategory
            )}`}
          >
            {tripDetails.budgetCategory}
          </span>
        </div>
        <p className="text-sm text-[#666666]">
          For{" "}
          <span className="bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent font-semibold">
            {tripDetails.totalPeople} travelers
          </span>{" "}
          over {tripDetails.tripDuration} days via {tripDetails.transportMode}
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
          <div className="flex items-center gap-1">
            {summary?.isAffordable ? (
              <CheckCircle size={16} className="text-green-500" />
            ) : (
              <AlertCircle size={16} className="text-orange-500" />
            )}
            <span className="text-xs text-gray-600">
              {summary?.isValueForMoney ? "Great Value" : "Premium Pricing"}
            </span>
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
            <div className="text-xs text-[#666666] mb-1">Total Trip Cost</div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatIndianCurrency(totals.totalCost)}
            </div>
            {isPositiveNumber(totals.emergencyBuffer) && (
              <div className="text-xs text-[#666666] mt-1">
                Emergency buffer: {formatIndianCurrency(totals.emergencyBuffer)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transportation Breakdown */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            {getTransportIcon(costs.transportation.mode)}
          </div>
          <div>
            <h3 className="font-semibold text-[#2C178C]">Transportation</h3>
            <p className="text-xs text-[#666666]">
              {costs.transportation.mode} travel costs
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Total {costs.transportation.mode} Cost
            </span>
            <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatIndianCurrency(costs.transportation.total)}
            </span>
          </div>

          {costs.transportation.breakdown && (
            <div className="space-y-1 text-xs text-[#666666]">
              {isPositiveNumber(
                costs.transportation.breakdown.adultTickets
              ) && (
                <div className="flex justify-between">
                  <span>Adult tickets ({tripDetails.numAdults}×):</span>
                  <span>
                    {formatIndianCurrency(
                      costs.transportation.breakdown.adultTickets
                    )}
                  </span>
                </div>
              )}
              {isPositiveNumber(
                costs.transportation.breakdown.childTickets
              ) && (
                <div className="flex justify-between">
                  <span>Child tickets ({tripDetails.numChildren}×):</span>
                  <span>
                    {formatIndianCurrency(
                      costs.transportation.breakdown.childTickets
                    )}
                  </span>
                </div>
              )}
              {isPositiveNumber(costs.transportation.breakdown.fuelCost) && (
                <div className="flex justify-between">
                  <span>Fuel cost:</span>
                  <span>
                    {formatIndianCurrency(
                      costs.transportation.breakdown.fuelCost
                    )}
                  </span>
                </div>
              )}
              {isPositiveNumber(costs.transportation.breakdown.tollCharges) && (
                <div className="flex justify-between">
                  <span>Toll charges:</span>
                  <span>
                    {formatIndianCurrency(
                      costs.transportation.breakdown.tollCharges
                    )}
                  </span>
                </div>
              )}
              {isPositiveNumber(
                costs.transportation.breakdown.vehicleRental
              ) && (
                <div className="flex justify-between">
                  <span>Vehicle rental:</span>
                  <span>
                    {formatIndianCurrency(
                      costs.transportation.breakdown.vehicleRental
                    )}
                  </span>
                </div>
              )}
              {isPositiveNumber(
                costs.transportation.breakdown.parkingCharges
              ) && (
                <div className="flex justify-between">
                  <span>Parking charges:</span>
                  <span>
                    {formatIndianCurrency(
                      costs.transportation.breakdown.parkingCharges
                    )}
                  </span>
                </div>
              )}
              {isPositiveNumber(
                costs.transportation.breakdown.stationTransfers
              ) && (
                <div className="flex justify-between">
                  <span>Station transfers:</span>
                  <span>
                    {formatIndianCurrency(
                      costs.transportation.breakdown.stationTransfers
                    )}
                  </span>
                </div>
              )}
              {isPositiveNumber(costs.transportation.breakdown.trainMeals) && (
                <div className="flex justify-between">
                  <span>Train meals:</span>
                  <span>
                    {formatIndianCurrency(
                      costs.transportation.breakdown.trainMeals
                    )}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Accommodation & Meals */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            <Hotel className="text-[#AB78FF]" size={30} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2C178C]">Stay & Dining</h3>
            <p className="text-xs text-[#666666]">
              Accommodation and meal expenses
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Accommodation */}
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Hotel size={16} className="text-[#AB78FF]" />
                <span className="text-sm font-medium text-gray-700">
                  {costs.accommodation.type}
                </span>
              </div>
              <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                {formatIndianCurrency(costs.accommodation.total)}
              </span>
            </div>
            <div className="text-xs text-[#666666]">
              {formatIndianCurrency(costs.accommodation.breakdown.costPerNight)}{" "}
              per night × {costs.accommodation.breakdown.numberOfNights} nights
              {costs.accommodation.breakdown.numberOfRooms > 1 &&
                ` × ${costs.accommodation.breakdown.numberOfRooms} rooms`}
            </div>
          </div>

          {/* Meals - Only show if there's a cost */}
          {isPositiveNumber(costs.meals.total) && (
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Utensils size={16} className="text-[#AB78FF]" />
                  <span className="text-sm font-medium text-gray-700">
                    {costs.meals.preference}
                  </span>
                </div>
                <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                  {formatIndianCurrency(costs.meals.total)}
                </span>
              </div>
              <div className="text-xs text-[#666666] space-y-1">
                {isPositiveNumber(costs.meals.breakdown.adultMealCost) && (
                  <div className="flex justify-between">
                    <span>
                      Adults ({tripDetails.numAdults}×{tripDetails.tripDuration}{" "}
                      days):
                    </span>
                    <span>
                      {formatIndianCurrency(
                        costs.meals.breakdown.adultMealCost
                      )}
                    </span>
                  </div>
                )}
                {isPositiveNumber(costs.meals.breakdown.childMealCost) && (
                  <div className="flex justify-between">
                    <span>
                      Children ({tripDetails.numChildren}×
                      {tripDetails.tripDuration} days):
                    </span>
                    <span>
                      {formatIndianCurrency(
                        costs.meals.breakdown.childMealCost
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activities & Other Costs */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            <Camera className="text-[#AB78FF]" size={30} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2C178C]">
              Activities & Extras
            </h3>
            <p className="text-xs text-[#666666]">
              Additional vacation expenses
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Activities */}
          {isPositiveNumber(costs.activities.total) && (
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera size={16} className="text-[#AB78FF]" />
                  <span className="text-sm font-medium text-gray-700">
                    Activities & Sightseeing
                  </span>
                </div>
                <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                  {formatIndianCurrency(costs.activities.total)}
                </span>
              </div>
            </div>
          )}

          {/* Local Transport */}
          {isPositiveNumber(costs.localTransport.total) && (
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Navigation size={16} className="text-[#AB78FF]" />
                  <span className="text-sm font-medium text-gray-700">
                    Local Transport ({costs.localTransport.type})
                  </span>
                </div>
                <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                  {formatIndianCurrency(costs.localTransport.total)}
                </span>
              </div>
              <div className="text-xs text-[#666666]">
                {formatIndianCurrency(costs.localTransport.breakdown.dailyCost)}{" "}
                per day × {costs.localTransport.breakdown.totalDays} days
              </div>
            </div>
          )}

          {/* Documentation - Only show if has valid costs */}
          {isPositiveNumber(costs.documentation?.total) && (
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-[#AB78FF]" />
                  <span className="text-sm font-medium text-gray-700">
                    Documentation & Insurance
                  </span>
                </div>
                <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                  {formatIndianCurrency(costs.documentation.total)}
                </span>
              </div>
              <div className="text-xs text-[#666666] space-y-1">
                {isPositiveNumber(costs.documentation.breakdown?.visaCost) && (
                  <div className="flex justify-between">
                    <span>Visa fees:</span>
                    <span>
                      {formatIndianCurrency(
                        costs.documentation.breakdown.visaCost
                      )}
                    </span>
                  </div>
                )}
                {isPositiveNumber(
                  costs.documentation.breakdown?.insuranceCost
                ) && (
                  <div className="flex justify-between">
                    <span>Travel insurance:</span>
                    <span>
                      {formatIndianCurrency(
                        costs.documentation.breakdown.insuranceCost
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Shopping */}
          {isPositiveNumber(costs.shopping.total) && (
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={16} className="text-[#AB78FF]" />
                  <span className="text-sm font-medium text-gray-700">
                    Shopping & Miscellaneous
                  </span>
                </div>
                <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                  {formatIndianCurrency(costs.shopping.total)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Per Person Analysis */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            <Users className="text-[#AB78FF]" size={30} />
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

      {/* Cost Optimization - Only show if there are actual savings */}
      {optimizations?.overallSavings && (
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
            {renderOptimizationDetails(
              "Transportation",
              optimizations.transportSavings,
              optimizations.transportOptimizationDetails
            )}

            {renderOptimizationDetails(
              "Accommodation",
              optimizations.accommodationSavings,
              optimizations.accommodationOptimizationDetails
            )}

            {renderOptimizationDetails(
              "Dining",
              optimizations.mealSavings,
              optimizations.mealOptimizationDetails
            )}
          </div>

          <div className="bg-green-100 rounded-xl p-3 border border-green-200 mt-4">
            <div className="text-center">
              <div className="text-xs text-green-700 mb-1 font-medium">
                Optimized Budget
              </div>
              <div className="text-lg font-bold text-green-700">
                {formatIndianCurrency(
                  totals.totalCost - optimizations.overallSavings
                )}
              </div>
              <div className="text-xs text-green-600 mt-1">
                Total Potential Savings:{" "}
                {formatIndianCurrency(optimizations.overallSavings)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacationPlannerResult;
