import React from "react";
import {
  Plane,
  Calculator,
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
  Info,
} from "lucide-react";

const VacationPlannerResult = ({ result }) => {
  const isPositiveNumber = (val) => typeof val === "number" && val > 0;

  const formatIndianCurrency = (amount) => {
    if (amount == null || isNaN(amount)) return "₹0";
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
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

  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium mb-2">Awaiting Calculation</h3>
          <p className="text-sm">
            Your personalized vacation cost estimate will appear here.
          </p>
        </div>
      </div>
    );
  }

  const { tripDetails, costs, totals, perPersonAnalysis } = result;

  const renderBreakdownItem = (label, value) => {
    if (!isPositiveNumber(value)) return null;
    return (
      <div className="flex justify-between">
        <span>{label}:</span>
        <span>{formatIndianCurrency(value)}</span>
      </div>
    );
  };

  return (
    <div className="sm:mt-2 mt-2 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
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
          <span className="font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
            {tripDetails.totalPeople} travelers
          </span>{" "}
          over {tripDetails.tripDuration} days
        </p>
      </div>

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
            <div className="text-xs text-[#666666] mb-1">Total Trip Cost</div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatIndianCurrency(totals.totalCost)}
            </div>
            {isPositiveNumber(totals.emergencyBuffer) && (
              <div className="text-xs text-[#666666] mt-1">
                Includes 10% Buffer:{" "}
                {formatIndianCurrency(totals.emergencyBuffer)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            {getTransportIcon(costs.transportation.mode)}
          </div>
          <div>
            <h3 className="font-semibold text-[#2C178C]">Transportation</h3>
            <p className="text-xs text-[#666666]">
              {tripDetails.transportMode}
              {tripDetails.transportMode === "Road"
                ? ` (${tripDetails.roadVehicleType})`
                : ""}{" "}
              costs
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Total Transport Cost
            </span>
            <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatIndianCurrency(costs.transportation.total)}
            </span>
          </div>
          {costs.transportation.breakdown && (
            <div className="space-y-1 text-xs text-[#666666]">
              {renderBreakdownItem(
                "Flight Tickets",
                costs.transportation.breakdown.flightTickets
              )}
              {renderBreakdownItem(
                "Airport Transfers",
                costs.transportation.breakdown.airportTransfers
              )}
              {renderBreakdownItem(
                "Train Tickets",
                costs.transportation.breakdown.trainTickets
              )}
              {renderBreakdownItem(
                "Station Transfers",
                costs.transportation.breakdown.stationTransfers
              )}
              {renderBreakdownItem(
                "Fuel Cost",
                costs.transportation.breakdown.fuelCost
              )}
              {renderBreakdownItem(
                "Tolls & Charges",
                costs.transportation.breakdown.tollsAndCharges
              )}
              {renderBreakdownItem(
                "En-route Stay",
                costs.transportation.breakdown.enrouteStay
              )}
              {renderBreakdownItem(
                "Vehicle Rental",
                costs.transportation.breakdown.vehicleRental
              )}
              {renderBreakdownItem(
                "Fuel Estimate",
                costs.transportation.breakdown.fuelEstimate
              )}
              {renderBreakdownItem(
                "Total Fare",
                costs.transportation.breakdown.totalFare
              )}
            </div>
          )}
          {isPositiveNumber(
            costs.transportation.breakdown?.securityDeposit
          ) && (
            <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700 flex items-center gap-2">
              <Info size={14} />
              <span>
                Note: A refundable security deposit of{" "}
                <strong>
                  {formatIndianCurrency(
                    costs.transportation.breakdown.securityDeposit
                  )}
                </strong>{" "}
                is not included in the total cost.
              </span>
            </div>
          )}
        </div>
      </div>

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
          {isPositiveNumber(costs.accommodation.total) ? (
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
                {formatIndianCurrency(
                  costs.accommodation.breakdown.costPerNight
                )}{" "}
                per night × {costs.accommodation.breakdown.numberOfNights}{" "}
                nights{" "}
                {costs.accommodation.breakdown.numberOfRooms > 1 &&
                  `× ${costs.accommodation.breakdown.numberOfRooms} rooms`}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-3 border border-gray-200 text-sm text-gray-600">
              Accommodation with friends/family (₹0)
            </div>
          )}
          {isPositiveNumber(costs.meals.total) && (
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils size={16} className="text-[#AB78FF]" />
                  <span className="text-sm font-medium text-gray-700">
                    Food & Dining
                  </span>
                </div>
                <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                  {formatIndianCurrency(costs.meals.total)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

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
          {Object.entries({
            "Activities & Sightseeing": {
              icon: Camera,
              cost: costs.activities.total,
            },
            "Shopping & Souvenirs": {
              icon: ShoppingBag,
              cost: costs.shopping.total,
            },
            "Local Transport": {
              icon: Navigation,
              cost: costs.localTransport.total,
            },
            "Docs & Insurance": {
              icon: Shield,
              cost: costs.documentation.total,
            },
          }).map(
            ([key, { icon: Icon, cost }]) =>
              isPositiveNumber(cost) && (
                <div
                  key={key}
                  className="bg-white rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-[#AB78FF]" />
                      <span className="text-sm font-medium text-gray-700">
                        {key}
                      </span>
                    </div>
                    <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                      {formatIndianCurrency(cost)}
                    </span>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

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
    </div>
  );
};

export default VacationPlannerResult;
