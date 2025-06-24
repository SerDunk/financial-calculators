import React from "react";
import {
  Heart,
  Calculator,
  TrendingDown,
  PieChart,
  Users,
  FileText,
  Camera,
  Utensils,
  Music,
  Flower2,
  MapPin,
  Shirt,
  Sparkles,
  Gift,
  Car,
  AlertTriangle,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  Clock,
} from "lucide-react";
import { formatters } from "@/utils/calculation";

const WeddingResult = ({ result }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      food: <Utensils size={16} className="text-[#AB78FF]" />,
      venue: <MapPin size={16} className="text-[#AB78FF]" />,
      decoration: <Flower2 size={16} className="text-[#AB78FF]" />,
      photography: <Camera size={16} className="text-[#AB78FF]" />,
      clothing: <Shirt size={16} className="text-[#AB78FF]" />,
      makeup: <Sparkles size={16} className="text-[#AB78FF]" />,
      entertainment: <Music size={16} className="text-[#AB78FF]" />,
      accommodation: <MapPin size={16} className="text-[#AB78FF]" />,
      invitations: <Gift size={16} className="text-[#AB78FF]" />,
      transportation: <Car size={16} className="text-[#AB78FF]" />,
    };
    return icons[category] || <FileText size={16} className="text-[#AB78FF]" />;
  };

  const getCategoryName = (category) => {
    const names = {
      food: "Food & Catering",
      venue: "Venue",
      decoration: "Decoration",
      photography: "Photography & Videography",
      clothing: "Clothing & Jewelry",
      makeup: "Makeup & Grooming",
      entertainment: "Entertainment",
      accommodation: "Accommodation",
      invitations: "Invitations & Gifts",
      transportation: "Transportation",
    };
    return (
      names[category] || category.charAt(0).toUpperCase() + category.slice(1)
    );
  };

  const getEventIcon = (eventType) => {
    const icons = {
      mehendi: <Flower2 size={16} className="text-[#AB78FF]" />,
      sangam: <Music size={16} className="text-[#AB78FF]" />,
      haldi: <Sparkles size={16} className="text-[#AB78FF]" />,
      wedding: <Heart size={16} className="text-[#AB78FF]" />,
      reception: <Users size={16} className="text-[#AB78FF]" />,
    };
    return (
      icons[eventType] || <Calendar size={16} className="text-[#AB78FF]" />
    );
  };

  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium mb-2">
            Wedding Budget Calculator
          </h3>
          <p className="text-sm">
            Adjust the settings to see your wedding cost breakdown
          </p>
        </div>
      </div>
    );
  }

  const {
    weddingDetails,
    events,
    categoryBreakdown,
    budgetStatus,
    formattedTotals,
  } = result;

  const calculateExtraCharges = () => {
    const totalBudget = weddingDetails.totalBudget;

    const ritualsPercentage = 8;
    const weddingPlannerPercentage = weddingDetails.hasWeddingPlanner ? 10 : 0;
    const emergencyBufferPercentage = 10;
    const miscellaneousPercentage = 5;

    const ritualsAmount = (totalBudget * ritualsPercentage) / 100;
    const weddingPlannerAmount = (totalBudget * weddingPlannerPercentage) / 100;
    const emergencyBufferAmount =
      (totalBudget * emergencyBufferPercentage) / 100;
    const miscellaneousAmount = (totalBudget * miscellaneousPercentage) / 100;

    const totalExtraCharges =
      ritualsAmount +
      weddingPlannerAmount +
      emergencyBufferAmount +
      miscellaneousAmount;

    return {
      rituals: { amount: ritualsAmount, percentage: ritualsPercentage },
      weddingPlanner: weddingDetails.hasWeddingPlanner
        ? { amount: weddingPlannerAmount, percentage: weddingPlannerPercentage }
        : null,
      emergencyBuffer: {
        amount: emergencyBufferAmount,
        percentage: emergencyBufferPercentage,
      },
      miscellaneous: {
        amount: miscellaneousAmount,
        percentage: miscellaneousPercentage,
      },
      total: totalExtraCharges,
    };
  };

  const extraCharges = calculateExtraCharges();
  const isOverBudget = budgetStatus.isOverBudget;
  const budgetDifference = budgetStatus.difference;
  const budgetUtilization = budgetStatus.effectiveUtilization;

  return (
    <div className="sm:mt-2 mt-2 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-[#AB78FF]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Heart className="text-[#AB78FF]" size={24} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          Your Dream Wedding Budget
        </h2>
        <p className="text-sm text-[#666666]">
          Complete planning for{" "}
          <span className="bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent font-semibold">
            {weddingDetails.guestCount} guests
          </span>
          {weddingDetails.hasWeddingPlanner && " with professional planning"}
        </p>
      </div>

      {/* Budget Status Alert */}
      {isOverBudget && (
        <div className="rounded-2xl p-4 border-2 border-red-200 bg-red-50 mb-4">
          <div className="flex items-center mb-2">
            <AlertTriangle className="text-red-500 mr-2" size={20} />
            <h3 className="font-semibold text-red-700">Budget Alert!</h3>
          </div>
          <p className="text-sm text-red-600 mb-2">
            Your total expenses exceed your budget by{" "}
            <span className="font-bold">{formattedTotals.difference}</span>
          </p>
          <div className="text-xs text-red-500 mb-2">
            <div>Main Expenses: {formattedTotals.totalMainExpenses}</div>
            <div>Events Total: {formattedTotals.eventsTotal}</div>
            <div>
              Extra Charges:{" "}
              {formatters.formatIndianCurrency(extraCharges.total)}
            </div>
            <div className="font-semibold">
              Total Cost: {formattedTotals.grandTotal} | Budget:{" "}
              {formattedTotals.totalBudget}
            </div>
          </div>
        </div>
      )}

      {/* Wedding Overview */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Heart className="text-[#AB78FF] mr-3" size={30} />
            <div>
              <h3 className="font-semibold text-[#2C178C]">Wedding Overview</h3>
              <p className="text-xs text-[#666666]">Budget summary & details</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-[#AB78FF]" />
              <span className="text-xs text-[#666666]">Guest Count</span>
            </div>
            <div className="font-semibold text-[#2C178C]">
              {weddingDetails.guestCount} Guests
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={16} className="text-[#AB78FF]" />
              <span className="text-xs text-[#666666]">Events</span>
            </div>
            <div className="font-semibold text-[#2C178C]">
              {events.length} Events
            </div>
          </div>
        </div>

        <div
          className={`rounded-xl p-3 border ${
            isOverBudget
              ? "bg-red-50 border-red-200"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="text-center">
            <div className="text-xs text-[#666666] mb-1">Total Budget</div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formattedTotals.totalBudget}
            </div>
            <div className="text-xs text-[#666666] mt-1">
              {formatters.formatIndianCurrency(
                weddingDetails.totalBudget / weddingDetails.guestCount
              )}{" "}
              per guest budget
            </div>
          </div>
        </div>
      </div>

      {/* Events Breakdown */}
      {events.length > 0 && (
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
          <div className="flex items-center mb-4">
            <Calendar className="text-[#AB78FF] mr-3" size={30} />
            <div>
              <h3 className="font-semibold text-[#2C178C]">Event Breakdown</h3>
              <p className="text-xs text-[#666666]">Individual event costs</p>
            </div>
          </div>

          <div className="space-y-3">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getEventIcon(event.name.toLowerCase())}
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {event.name}
                    </span>
                  </div>
                  <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                    {formatters.formatIndianCurrency(
                      event.calculatedCosts.total
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="text-xs text-[#666666]">
                    <Clock size={12} className="inline mr-1" />
                    {event.totalGuests} guests
                  </div>
                  <div className="text-xs text-[#666666] text-right">
                    {formatters.formatIndianCurrency(
                      event.calculatedCosts.perGuest
                    )}{" "}
                    per guest
                  </div>
                </div>

                <div className="space-y-1">
                  {event.calculatedCosts.food > 0 && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#666666]">Food & Catering</span>
                      <span className="font-medium text-[#2C178C]">
                        {formatters.formatIndianCurrency(
                          event.calculatedCosts.food
                        )}
                      </span>
                    </div>
                  )}
                  {event.calculatedCosts.venue > 0 && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#666666]">Venue</span>
                      <span className="font-medium text-[#2C178C]">
                        {formatters.formatIndianCurrency(
                          event.calculatedCosts.venue
                        )}
                      </span>
                    </div>
                  )}
                  {event.decorationAmount > 0 && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#666666]">Decoration</span>
                      <span className="font-medium text-[#2C178C]">
                        {formatters.formatIndianCurrency(
                          event.decorationAmount
                        )}
                      </span>
                    </div>
                  )}
                  {event.calculatedCosts.accommodation > 0 && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#666666]">Accommodation</span>
                      <span className="font-medium text-[#2C178C]">
                        {formatters.formatIndianCurrency(
                          event.calculatedCosts.accommodation
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
            <div className="text-center">
              <div className="text-xs text-[#666666] mb-1">
                Total Events Cost
              </div>
              <div className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                {formattedTotals.eventsTotal}
              </div>
              <div className="text-xs text-[#666666] mt-1">
                {formatters.formatIndianCurrency(
                  budgetStatus.eventsTotal / weddingDetails.guestCount
                )}{" "}
                per guest average
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      {categoryBreakdown.length > 0 && (
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
          <div className="flex items-center mb-4">
            <PieChart className="text-[#B3BEF5] mr-3" size={30} />
            <div>
              <h3 className="font-semibold text-[#2C178C]">
                Additional Expenses
              </h3>
              <p className="text-xs text-[#666666]">
                Other wedding costs by category
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {categoryBreakdown.map((item, index) => (
              <div
                key={item.category}
                className="bg-white rounded-lg p-3 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(item.category.toLowerCase())}
                    <span className="text-sm font-medium text-gray-700">
                      {getCategoryName(item.category)}
                    </span>
                  </div>
                  <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                    {item.formattedAmount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-[#666666]">
                    {item.formattedPercentage} of total cost
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
            <div className="text-center">
              <div className="text-xs text-[#666666] mb-1">
                Additional Expenses Total
              </div>
              <div className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                {formattedTotals.totalMainExpenses}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Extra Charges */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <DollarSign className="text-[#AB78FF] mr-3" size={30} />
          <div>
            <h3 className="font-semibold text-[#2C178C]">Extra Charges</h3>
            <p className="text-xs text-[#666666]">
              Additional expenses as % of total budget
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#666666] font-medium">
              Rituals & Ceremonies
            </span>
            <span className="font-semibold text-[#2C178C]">
              {formatters.formatIndianCurrency(extraCharges.rituals.amount)}
            </span>
          </div>

          {extraCharges.weddingPlanner && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#666666] font-medium">
                Wedding Planner
              </span>
              <span className="font-semibold text-[#2C178C]">
                {formatters.formatIndianCurrency(
                  extraCharges.weddingPlanner.amount
                )}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-xs text-[#666666] font-medium">
              Emergency Buffer
            </span>
            <span className="font-semibold text-[#2C178C]">
              {formatters.formatIndianCurrency(
                extraCharges.emergencyBuffer.amount
              )}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-[#666666] font-medium">
              Miscellaneous Expenses
            </span>
            <span className="font-semibold text-[#2C178C]">
              {formatters.formatIndianCurrency(
                extraCharges.miscellaneous.amount
              )}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
          <div className="text-center">
            <div className="text-xs text-[#666666] mb-1">
              Total Extra Charges
            </div>
            <div className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatters.formatIndianCurrency(extraCharges.total)}
            </div>
            <div className="text-xs text-[#666666] mt-1">
              {(
                (extraCharges.total / weddingDetails.totalBudget) *
                100
              ).toFixed(1)}
              % of total budget
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <Users className="text-[#B3BEF5] mr-3" size={30} />
          <div>
            <h3 className="font-semibold text-[#2C178C]">Cost Analysis</h3>
            <p className="text-xs text-[#666666]">Complete breakdown</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-[#666666] mb-2 font-medium">
              Complete Cost Breakdown
            </div>
            <div className="space-y-2">
              {budgetStatus.eventsTotal > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#666666]">Events Total</span>
                  <span className="font-semibold text-[#2C178C]">
                    {formattedTotals.eventsTotal}
                  </span>
                </div>
              )}
              {budgetStatus.totalAllocated > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#666666]">
                    Additional Expenses
                  </span>
                  <span className="font-semibold text-[#2C178C]">
                    {formattedTotals.totalMainExpenses}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#666666]">Extra Charges</span>
                <span className="font-semibold text-[#2C178C]">
                  {formatters.formatIndianCurrency(extraCharges.total)}
                </span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#2C178C]">
                    Grand Total
                  </span>
                  <span className="font-bold text-lg bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                    {formattedTotals.grandTotal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-[#666666] mb-2 font-medium">
              Per Guest Analysis
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#666666]">
                  Total Cost per Guest
                </span>
                <span className="font-semibold text-[#2C178C]">
                  {formatters.formatIndianCurrency(
                    budgetStatus.grandTotal / weddingDetails.guestCount
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#666666]">Budget per Guest</span>
                <span className="font-semibold text-[#2C178C]">
                  {formatters.formatIndianCurrency(
                    weddingDetails.totalBudget / weddingDetails.guestCount
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-[#666666] mb-2 font-medium">
              Budget Utilization
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#666666]">
                  Budget Utilization
                </span>
                <span
                  className={`font-semibold ${
                    budgetUtilization > 100 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {formatters.formatPercentage(budgetUtilization)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#666666]">
                  {isOverBudget ? "Over Budget" : "Remaining Budget"}
                </span>
                <span
                  className={`font-semibold ${
                    isOverBudget ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {formatters.formatIndianCurrency(
                    Math.abs(budgetStatus.difference)
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Summary */}
      <div
        className={`rounded-2xl p-5 border-2 ${
          isOverBudget
            ? "border-red-200 bg-red-50"
            : "border-green-200 bg-green-50"
        }`}
      >
        <div className="text-center">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
              isOverBudget ? "bg-red-100" : "bg-green-100"
            }`}
          >
            {isOverBudget ? (
              <XCircle className="text-red-600" size={24} />
            ) : (
              <CheckCircle className="text-green-600" size={24} />
            )}
          </div>

          <h3
            className={`text-lg font-semibold mb-2 ${
              isOverBudget ? "text-red-700" : "text-green-700"
            }`}
          >
            {isOverBudget ? "Budget Exceeded" : "Budget on Track"}
          </h3>

          <p
            className={`text-sm mb-3 ${
              isOverBudget ? "text-red-600" : "text-green-600"
            }`}
          >
            {isOverBudget
              ? `Your wedding will cost ${formatters.formatIndianCurrency(
                  Math.abs(budgetStatus.difference)
                )} more than planned`
              : `You have ${formatters.formatIndianCurrency(
                  budgetStatus.remainingBudget
                )} remaining in your budget`}
          </p>

          <div className="text-xs text-gray-600">
            Planning a wedding for {weddingDetails.guestCount} guests with{" "}
            {events.length} events
            {weddingDetails.hasWeddingPlanner && " and professional planning"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingResult;
