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
} from "lucide-react";

const WeddingResult = ({ result }) => {
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
    categoryBreakdown,
    totals,
    additionalCosts,
    budgetAnalysis,
    optimizations,
  } = result;

  // Calculate typical extra charges as percentages of total budget
  const calculateExtraCharges = () => {
    const totalBudget = weddingDetails.totalBudget;

    // Typical percentages for extra charges
    const ritualsPercentage = 8; // 8% of total budget for rituals & ceremonies
    const weddingPlannerPercentage = weddingDetails.hasWeddingPlanner ? 10 : 0; // 10% if planner is selected
    const emergencyBufferPercentage = 10; // 10% emergency buffer
    const miscellaneousPercentage = 5; // 5% for miscellaneous expenses

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
      rituals: {
        amount: ritualsAmount,
        percentage: ritualsPercentage,
      },
      weddingPlanner: weddingDetails.hasWeddingPlanner
        ? {
            amount: weddingPlannerAmount,
            percentage: weddingPlannerPercentage,
          }
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

  // Calculate per-guest costs only for guest-relevant categories
  const calculateGuestRelevantTotal = () => {
    const guestRelevantCategories = [
      "food",
      "venue",
      "entertainment",
      "accommodation",
      "invitations",
    ];
    return categoryBreakdown
      .filter((item) => guestRelevantCategories.includes(item.category))
      .reduce((sum, item) => sum + item.amount, 0);
  };

  const guestRelevantTotal = calculateGuestRelevantTotal();

  // Calculate main expenses total
  const mainExpensesTotal = categoryBreakdown.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // Calculate grand total with new extra charges
  const grandTotal = mainExpensesTotal + extraCharges.total;

  const isOverBudget = grandTotal > weddingDetails.totalBudget;
  const budgetDifference = grandTotal - weddingDetails.totalBudget;
  const budgetUtilization = (grandTotal / weddingDetails.totalBudget) * 100;

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
            <span className="font-bold">
              {formatIndianCurrency(Math.abs(budgetDifference))}
            </span>
          </p>
          <div className="text-xs text-red-500 mb-2">
            <div>Main Expenses: {formatIndianCurrency(mainExpensesTotal)}</div>
            <div>Extra Charges: {formatIndianCurrency(extraCharges.total)}</div>
            <div className="font-semibold">
              Total Cost: {formatIndianCurrency(grandTotal)} | Budget:{" "}
              {formatIndianCurrency(weddingDetails.totalBudget)}
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
              <FileText size={16} className="text-[#AB78FF]" />
              <span className="text-xs text-[#666666]">Planning</span>
            </div>
            <div className="font-semibold text-[#2C178C]">
              {weddingDetails.hasWeddingPlanner
                ? "Professional"
                : "Self-Planned"}
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
              {formatIndianCurrency(weddingDetails.totalBudget)}
            </div>
            <div className="text-xs text-[#666666] mt-1">
              {formatIndianCurrency(
                weddingDetails.totalBudget / weddingDetails.guestCount
              )}{" "}
              per guest budget
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <PieChart className="text-[#B3BEF5] mr-3" size={30} />
          <div>
            <h3 className="font-semibold text-[#2C178C]">Expense Breakdown</h3>
            <p className="text-xs text-[#666666]">Wedding costs by category</p>
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
                  {getCategoryIcon(item.category)}
                  <span className="text-sm font-medium text-gray-700">
                    {getCategoryName(item.category)}
                  </span>
                </div>
                <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                  {formatIndianCurrency(item.amount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-[#666666]">
                  {((item.amount / grandTotal) * 100).toFixed(1)}% of total cost
                </div>
                {/* Only show per-guest cost for guest-relevant categories */}
                {[
                  "food",
                  "venue",
                  "entertainment",
                  "accommodation",
                  "invitations",
                ].includes(item.category) && (
                  <div className="text-xs text-[#666666]">
                    {formatIndianCurrency(
                      item.amount / weddingDetails.guestCount
                    )}{" "}
                    per guest
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
          <div className="text-center">
            <div className="text-xs text-[#666666] mb-1">
              Total Main Expenses
            </div>
            <div className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatIndianCurrency(mainExpensesTotal)}
            </div>
            <div className="text-xs text-[#666666] mt-1">
              {formatIndianCurrency(
                guestRelevantTotal / weddingDetails.guestCount
              )}{" "}
              per guest (guest-relevant costs)
            </div>
          </div>
        </div>
      </div>

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
              {formatIndianCurrency(extraCharges.rituals.amount)}
            </span>
          </div>

          {extraCharges.weddingPlanner && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#666666] font-medium">
                Wedding Planner
              </span>
              <span className="font-semibold text-[#2C178C]">
                {formatIndianCurrency(extraCharges.weddingPlanner.amount)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-xs text-[#666666] font-medium">
              Emergency Buffer
            </span>
            <span className="font-semibold text-[#2C178C]">
              {formatIndianCurrency(extraCharges.emergencyBuffer.amount)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-[#666666] font-medium">
              Miscellaneous Expenses
            </span>
            <span className="font-semibold text-[#2C178C]">
              {formatIndianCurrency(extraCharges.miscellaneous.amount)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
          <div className="text-center">
            <div className="text-xs text-[#666666] mb-1">
              Total Extra Charges
            </div>
            <div className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatIndianCurrency(extraCharges.total)}
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
            <h3 className="font-semibold text-[#2C178C]">Analysis</h3>
            <p className="text-xs text-[#666666]">Cost breakdown</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
            <div className="text-xs text-[#666666] mb-1">
              Guest-Relevant Per Guest
            </div>
            <div className="font-bold text-[#2C178C]">
              {formatIndianCurrency(
                guestRelevantTotal / weddingDetails.guestCount
              )}
            </div>
            <div className="text-xs text-[#666666] mt-1">
              Food, Venue, Entertainment, etc.
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-[#666666] mb-2 font-medium">
              Complete Cost Breakdown
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#666666]">Main Expenses</span>
                <span className="font-semibold text-[#2C178C]">
                  {formatIndianCurrency(mainExpensesTotal)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#666666]">Extra Charges</span>
                <span className="font-semibold text-[#2C178C]">
                  {formatIndianCurrency(extraCharges.total)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-[#666666]">
                    Grand Total
                  </span>
                  <span className="font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                    {formatIndianCurrency(grandTotal)}
                  </span>
                </div>
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
        <div className="flex items-center mb-4">
          <div className="mr-3">
            {isOverBudget ? (
              <XCircle className="text-red-500" size={30} />
            ) : (
              <CheckCircle className="text-green-500" size={30} />
            )}
          </div>
          <div>
            <h3
              className={`font-semibold ${
                isOverBudget ? "text-red-700" : "text-green-700"
              }`}
            >
              Budget Summary
            </h3>
            <p
              className={`text-xs ${
                isOverBudget ? "text-red-600" : "text-green-600"
              }`}
            >
              {isOverBudget
                ? "Budget exceeded - consider optimization suggestions"
                : "Budget looks good - ready to plan your dream wedding!"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-[#666666] mb-1">Grand Total</div>
            <div
              className={`font-bold text-lg ${
                isOverBudget ? "text-red-600" : "text-green-600"
              }`}
            >
              {formatIndianCurrency(grandTotal)}
            </div>
            <div className="text-xs text-[#666666]">Including all expenses</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-[#666666] mb-1">
              Budget Utilization
            </div>
            <div
              className={`font-bold text-lg ${
                budgetUtilization > 100 ? "text-red-600" : "text-green-600"
              }`}
            >
              {budgetUtilization.toFixed(1)}%
            </div>
            <div className="text-xs text-[#666666]">Of total budget used</div>
          </div>
        </div>

        {/* Final Recommendation */}
        <div
          className={`mt-4 p-3 rounded-lg border ${
            isOverBudget
              ? "bg-red-100 border-red-200"
              : "bg-green-100 border-green-200"
          }`}
        >
          <div
            className={`text-sm font-medium ${
              isOverBudget ? "text-red-700" : "text-green-700"
            }`}
          >
            {isOverBudget
              ? "💡 Recommendation: Consider the optimization suggestions above to bring your wedding within budget while maintaining quality."
              : "🎉 Congratulations! Your wedding budget is well-planned. Don't forget to keep some extra buffer for last-minute expenses."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingResult;
