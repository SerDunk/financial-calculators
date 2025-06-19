import React from "react";
import {
  Home,
  Calculator,
  TrendingUp,
  DollarSign,
  PieChart,
  CreditCard,
  FileText,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Banknote,
  Building,
} from "lucide-react";

const HomeInvestmentResult = ({ result }) => {
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

  const formatPercentage = (value) => {
    if (!value) return "0%";
    return `${value.toFixed(1)}%`;
  };

  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium mb-2">
            Home Investment Calculator
          </h3>
          <p className="text-sm">
            Adjust the sliders to see your property investment analysis
          </p>
        </div>
      </div>
    );
  }

  const {
    propertyPrice,
    downPaymentAmount,
    loanAmount,
    registrationFees,
    totalInitialInvestment,
    monthlyEMI,
    totalInterestPaid,
    totalAmountPaid,
    monthlyRentalIncome,
    annualRentalIncome,
    rentalYield,
    monthlyNetCashFlow,
    netAnnualCashFlow,
    propertyValueAfterLoanTerm,
    capitalGains,
    overallROI,
    annualizedROI,
    cashOnCashReturn,
    breakEvenPoint,
    totalReturns,
    totalInvested,
    totalCostOfOwnership,
    summary,
    loanTerm = 20,
    appreciationRate = 5,
  } = result;

  // Calculate returns breakdown
  const totalRentalIncome = annualRentalIncome * loanTerm;
  const netRentalIncome = totalRentalIncome - monthlyEMI * 12 * loanTerm;
  const totalReturnsValue = capitalGains + totalRentalIncome;

  // Calculate percentages for returns breakdown
  const capitalGainsPercent = (capitalGains / totalReturnsValue) * 100;
  const rentalIncomePercent = (totalRentalIncome / totalReturnsValue) * 100;

  // Calculate percentages for breakdown
  const principalPercent = (loanAmount / totalCostOfOwnership) * 100;
  const interestPercent = (totalInterestPaid / totalCostOfOwnership) * 100;
  const downPaymentPercent = (downPaymentAmount / totalCostOfOwnership) * 100;
  const registrationPercent = (registrationFees / totalCostOfOwnership) * 100;

  const isPositiveFlow = monthlyNetCashFlow > 0;
  const isProfitable = overallROI > 0;

  return (
    <div className="sm:mt-2 mt-2 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-[#97A9FF]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Home className="text-[#97A9FF]" size={24} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          Property Investment Analysis
        </h2>
        <p className="text-sm text-[#666666]">
          Monthly EMI of{" "}
          <span className="bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent font-semibold">
            {formatIndianCurrency(monthlyEMI)}
          </span>{" "}
          with {isPositiveFlow ? "positive" : "negative"} cash flow of{" "}
          <span
            className={`font-semibold ${
              isPositiveFlow ? "text-[#4A7C59]" : "text-red-600"
            }`}
          >
            {formatIndianCurrency(Math.abs(monthlyNetCashFlow))}
          </span>
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Property Value */}
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#97A9FF] rounded-xl flex items-center justify-center">
              <Building className="text-white" size={20} />
            </div>
            <ArrowUpRight className="text-[#4A7C59]" size={16} />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-[#666666] font-medium">Current Value</p>
            <p className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatShortCurrency(propertyPrice)}
            </p>
            <p className="text-xs text-[#666666]">Future Value</p>
            <p className="text-lg font-semibold text-[#4A7C59]">
              {formatShortCurrency(propertyValueAfterLoanTerm)}
            </p>
          </div>
        </div>

        {/* Investment Amount */}
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#97A9FF] rounded-xl flex items-center justify-center">
              <CreditCard className="text-white" size={20} />
            </div>
            <DollarSign className="text-[#97A9FF]" size={16} />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-[#666666] font-medium">
              Initial Investment
            </p>
            <p className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatShortCurrency(totalInitialInvestment)}
            </p>
            <p className="text-xs text-[#666666]">Down Payment</p>
            <p className="text-lg font-semibold text-[#5A7FC7]">
              {formatShortCurrency(downPaymentAmount)}
            </p>
          </div>
        </div>

        {/* ROI */}
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#97A9FF] rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white" size={20} />
            </div>
            {isProfitable ? (
              <ArrowUpRight className="text-[#4A7C59]" size={16} />
            ) : (
              <ArrowDownRight className="text-red-600" size={16} />
            )}
          </div>
          <div className="space-y-2">
            <p className="text-xs text-[#666666] font-medium">Overall ROI</p>
            <p
              className={`text-xl font-bold ${
                isProfitable ? "text-[#4A7C59]" : "text-red-600"
              }`}
            >
              {formatPercentage(overallROI)}
            </p>
            <p className="text-xs text-[#666666]">Annualized ROI</p>
            <p
              className={`text-lg font-semibold ${
                annualizedROI > 0 ? "text-[#4A7C59]" : "text-red-600"
              }`}
            >
              {formatPercentage(annualizedROI)}
            </p>
          </div>
        </div>
      </div>

      {/* Cash Flow and Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Monthly Cash Flow */}
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-gray-50">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#97A9FF] rounded-xl flex items-center justify-center mr-3">
              <DollarSign className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[#320992]">
                Monthly Cash Flow
              </h3>
              <p className="text-xs text-[#666666]">
                Income vs expenses breakdown
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-[#D4ECCD] rounded-xl border border-[#B8D9AD]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#4A7C59] rounded-full"></div>
                <span className="text-sm font-medium text-[#2D5016]">
                  Rental Income
                </span>
              </div>
              <span className="font-bold text-[#4A7C59]">
                +{formatIndianCurrency(monthlyRentalIncome)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-red-800">
                  EMI Payment
                </span>
              </div>
              <span className="font-bold text-red-600">
                -{formatIndianCurrency(monthlyEMI)}
              </span>
            </div>

            <div className="border-t-2 border-dashed border-gray-300 pt-3">
              <div
                className={`flex justify-between items-center p-3 rounded-xl ${
                  isPositiveFlow
                    ? "bg-[#D4ECCD] border-2 border-[#B8D9AD]"
                    : "bg-red-100 border-2 border-red-300"
                }`}
              >
                <span className="text-sm font-bold text-[#320992]">
                  Net Cash Flow
                </span>
                <span
                  className={`font-bold text-lg ${
                    isPositiveFlow ? "text-[#4A7C59]" : "text-red-600"
                  }`}
                >
                  {isPositiveFlow ? "+" : ""}
                  {formatIndianCurrency(monthlyNetCashFlow)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-gray-50">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#97A9FF] rounded-xl flex items-center justify-center mr-3">
              <Target className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[#320992]">
                Performance Metrics
              </h3>
              <p className="text-xs text-[#666666]">
                Key investment indicators
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                label: "Rental Yield",
                value: formatPercentage(rentalYield),
                color: "text-[#5A7FC7]",
              },
              {
                label: "Cash-on-Cash Return",
                value: formatPercentage(cashOnCashReturn),
                color: cashOnCashReturn > 0 ? "text-[#4A7C59]" : "text-red-600",
              },
              {
                label: "Break-even Period",
                value: breakEvenPoint
                  ? `${breakEvenPoint.toFixed(1)} years`
                  : "N/A",
                color: "text-[#5A7FC7]",
              },
            ].map((metric, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200"
              >
                <span className="text-sm font-medium text-[#666666]">
                  {metric.label}
                </span>
                <span className={`font-bold ${metric.color}`}>
                  {metric.value}
                </span>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-gray-300">
              <div className="text-xs text-[#666666] mb-1 text-center">
                Recommendation Score
              </div>
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center relative">
                  <div
                    className="absolute inset-0 rounded-full border-4 border-transparent"
                    style={{
                      borderTopColor:
                        summary.recommendationScore >= 70
                          ? "#4A7C59"
                          : summary.recommendationScore >= 50
                          ? "#F59E0B"
                          : "#EF4444",
                      transform: `rotate(${
                        (summary.recommendationScore / 100) * 360
                      }deg)`,
                    }}
                  ></div>
                  <span className="text-lg font-bold text-[#320992]">
                    {summary.recommendationScore}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Returns Breakdown */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-gray-50 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-[#97A9FF] rounded-xl flex items-center justify-center mr-3">
            <PieChart className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-[#320992]">Returns Breakdown</h3>
            <p className="text-xs text-[#666666]">
              How your returns are generated over {loanTerm} years
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Capital Appreciation */}
          <div className="bg-[#D4ECCD] rounded-2xl p-4 border-2 border-[#B8D9AD]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#4A7C59] rounded-full"></div>
                <span className="text-sm font-semibold text-[#2D5016]">
                  Capital Gains
                </span>
              </div>
              <Building className="text-[#4A7C59]" size={20} />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-[#4A7C59]">
                {formatShortCurrency(capitalGains)}
              </div>
              <div className="text-xs text-[#2D5016]">
                Property value growth over {loanTerm} years
              </div>
              <div className="w-full h-2 bg-[#B8D9AD] rounded-full mt-2">
                <div
                  className="h-2 bg-[#4A7C59] rounded-full"
                  style={{ width: `${capitalGainsPercent.toFixed(1)}%` }}
                ></div>
              </div>
              <div className="text-xs text-[#4A7C59] font-medium">
                {capitalGainsPercent.toFixed(1)}% of total returns
              </div>
            </div>
          </div>

          {/* Rental Income */}
          <div className="bg-[#B3BEF5] rounded-2xl p-4 border-2 border-[#9AAEF0]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#5A7FC7] rounded-full"></div>
                <span className="text-sm font-semibold text-[#2A4A73]">
                  Rental Income
                </span>
              </div>
              <Banknote className="text-[#5A7FC7]" size={20} />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-[#5A7FC7]">
                {formatShortCurrency(totalRentalIncome)}
              </div>
              <div className="text-xs text-[#2A4A73]">
                Total rental income over {loanTerm} years
              </div>
              <div className="w-full h-2 bg-[#9AAEF0] rounded-full mt-2">
                <div
                  className="h-2 bg-[#5A7FC7] rounded-full"
                  style={{ width: `${rentalIncomePercent.toFixed(1)}%` }}
                ></div>
              </div>
              <div className="text-xs text-[#5A7FC7] font-medium">
                {rentalIncomePercent.toFixed(1)}% of total returns
              </div>
            </div>
          </div>
        </div>

        {/* Total Returns Summary */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <div className="text-xs text-[#666666] mb-1">
            Total Expected Returns
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-1">
            {formatShortCurrency(totalReturnsValue)}
          </div>
          <div className="text-xs text-[#666666]">
            Initial Investment: {formatShortCurrency(totalInitialInvestment)} →
            Total Returns: {formatShortCurrency(totalReturnsValue)}
          </div>
        </div>
      </div>

      {/* Investment Summary */}
      <div className="mt-6 pt-4 border-gray-300">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <FileText size={16} className="text-[#97A9FF]" />
          Investment Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            className={`rounded-lg p-3 border ${
              summary.isPositiveCashFlow
                ? "bg-[#D4ECCD] border-[#B8D9AD]"
                : "bg-red-100 border-red-200"
            }`}
          >
            <div className="text-center">
              <div
                className={`text-sm font-medium ${
                  summary.isPositiveCashFlow ? "text-[#2D5016]" : "text-red-700"
                }`}
              >
                Cash Flow Status
              </div>
              <div
                className={`text-lg font-bold ${
                  summary.isPositiveCashFlow ? "text-[#4A7C59]" : "text-red-600"
                }`}
              >
                {summary.isPositiveCashFlow ? "Positive" : "Negative"}
              </div>
            </div>
          </div>

          <div
            className={`rounded-lg p-3 border ${
              summary.isProfitable
                ? "bg-[#D4ECCD] border-[#B8D9AD]"
                : "bg-red-100 border-red-200"
            }`}
          >
            <div className="text-center">
              <div
                className={`text-sm font-medium ${
                  summary.isProfitable ? "text-[#2D5016]" : "text-red-700"
                }`}
              >
                Overall Profitability
              </div>
              <div
                className={`text-lg font-bold ${
                  summary.isProfitable ? "text-[#4A7C59]" : "text-red-600"
                }`}
              >
                {summary.isProfitable ? "Profitable" : "Loss Making"}
              </div>
            </div>
          </div>

          <div className="bg-[#B3BEF5] rounded-lg p-3 border border-[#9AAEF0]">
            <div className="text-center">
              <div className="text-sm font-medium text-[#2A4A73]">
                Expected Net Gain
              </div>
              <div className="text-lg font-bold text-[#5A7FC7]">
                {formatShortCurrency(totalReturns)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInvestmentResult;
