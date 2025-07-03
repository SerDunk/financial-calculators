import React from "react";
import {
  Home,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  PieChart,
  FileText,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import HomeResult from "../../public/profit.png";

const HomeInvestmentResult = ({ result }) => {
  const formatCurrency = (amount) => {
    if (!amount) return "₹0";
    const num = Math.round(amount);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const formatIndianCurrency = (amount) => {
    if (!amount) return "₹0";
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  };

  const formatPercent = (value) => {
    return `${Math.abs(value).toFixed(1)}%`;
  };

  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Home className="mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium mb-2">
            Property Investment Calculator
          </h3>
          <p className="text-sm">
            Enter your property details to see the investment analysis
          </p>
        </div>
      </div>
    );
  }

  const {
    propertyPrice,
    monthlyEMI,
    totalUpfrontCosts,
    totalCostOfOwnership,
    totalReturns,
    netProfit,
    overallROI,
    annualizedROI,
    monthlyNetCashFlow,
    rentalYield,
    cashOnCashReturn,
    breakEvenPoint,
    loanTerm = 20,
    summary,
  } = result;

  const isPositive = netProfit > 0;
  const isPositiveCashFlow = monthlyNetCashFlow > 0;

  return (
    <div className="sm:mt-2 mt-3 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-[#AB78FF]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Image src={HomeResult} width={28} height={28} alt="Home Result" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          Property Investment Analysis
        </h2>
        <p className="text-sm text-[#666666]">
          Property Value{" "}
          <span className="bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent font-semibold">
            {formatCurrency(propertyPrice)}
          </span>{" "}
        </p>
        <p>
          EMI{" "}
          <span className="bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent font-semibold">
            {formatCurrency(monthlyEMI)}/month
          </span>{" "}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Total Investment */}
        <div className="rounded-2xl p-4 border-2 border-gray-200 bg-[#F9F9FB]">
          <h3 className="text-xs text-[#666666] font-medium mb-2">
            Total Investment
          </h3>
          <p className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
            {formatCurrency(totalCostOfOwnership)}
          </p>
          <p className="text-xs text-[#666666] mt-1">Over {loanTerm} years</p>
        </div>

        {/* Expected Returns */}
        <div className="rounded-2xl p-4 border-2 border-gray-200 bg-[#F9F9FB]">
          <h3 className="text-xs text-[#666666] font-medium mb-2">
            Expected Returns
          </h3>
          <p className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
            {formatCurrency(totalReturns)}
          </p>
          <p className="text-xs text-[#666666] mt-1">
            Property + Rental Income
          </p>
        </div>

        {/* Net Profit */}
        <div className="rounded-2xl p-4 border-2 border-gray-200 bg-[#F9F9FB]">
          <h3 className="text-xs text-[#666666] font-medium mb-2">
            Net Profit
          </h3>
          <p
            className={`text-xl font-bold ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(netProfit)}
          </p>
          <p className="text-xs text-[#666666] mt-1">After all costs</p>
        </div>
      </div>

      {/* ROI Section */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="rounded-xl flex items-center justify-center mr-3">
              <TrendingUp className="text-[#AB78FF]" size={30} />
            </div>
            <div>
              <h3 className="font-semibold text-[#2C178C]">
                Return on Investment
              </h3>
              <p className="text-xs text-[#666666]">Investment performance</p>
            </div>
          </div>
          <div className="text-right">
            {isPositive ? (
              <CheckCircle className="text-green-500" size={24} />
            ) : (
              <AlertCircle className="text-red-500" size={24} />
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#666666]">Total ROI</span>
            <span
              className={`font-semibold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatPercent(overallROI)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#666666]">Annual ROI</span>
            <span
              className={`font-semibold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatPercent(annualizedROI)}
            </span>
          </div>
        </div>
      </div>

      {/* Cash Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB]">
          <div className="flex items-center mb-4">
            <div className="rounded-xl flex items-center justify-center mr-3">
              <CreditCard className="text-[#B3BEF5]" size={30} />
            </div>
            <div>
              <h3 className="font-semibold text-[#2C178C]">
                Monthly Cash Flow
              </h3>
              <p className="text-xs text-[#666666]">Income vs expenses</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-xs text-[#666666]">Rental Income</span>
              <span className="font-semibold text-green-600">
                +{formatCurrency(result.monthlyRentalIncome)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-xs text-[#666666]">EMI Payment</span>
              <span className="font-semibold text-red-600">
                -{formatCurrency(monthlyEMI)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-xs text-[#666666]">Maintenance (Est.)</span>
              <span className="font-semibold text-red-600">
                -{formatCurrency(result.estimatedMaintenance / 12)}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
            <div className="text-center">
              <div className="text-xs text-[#666666] mb-1">Net Cash Flow</div>
              <div
                className={`text-xl font-bold ${
                  isPositiveCashFlow ? "text-green-600" : "text-red-600"
                }`}
              >
                {isPositiveCashFlow ? "+" : ""}
                {formatCurrency(monthlyNetCashFlow)}
              </div>
              <div className="text-xs text-[#666666] mt-1">
                Monthly surplus/deficit
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB]">
          <div className="flex items-center mb-4">
            <div className="rounded-xl flex items-center justify-center mr-3">
              <PieChart className="text-[#AB78FF]" size={30} />
            </div>
            <div>
              <h3 className="font-semibold text-[#2C178C]">Key Ratios</h3>
              <p className="text-xs text-[#666666]">Investment metrics</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-xs text-[#666666]">Rental Yield</span>
              <span className="font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                {formatPercent(rentalYield)} p.a.
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-xs text-[#666666]">
                Cash-on-Cash Return
              </span>
              <span
                className={`font-semibold ${
                  cashOnCashReturn > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatPercent(cashOnCashReturn)} p.a.
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-xs text-[#666666]">Break-even Period</span>
              <span className="font-semibold text-[#2C178C]">
                {breakEvenPoint
                  ? `${breakEvenPoint.toFixed(1)} years`
                  : "No break-even"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-xs text-[#666666]">Investment Score</span>
              <span className="font-semibold text-[#2C178C]">
                {summary?.recommendationScore || 0}/100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            <FileText className="text-[#AB78FF]" size={30} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2C178C]">Investment Summary</h3>
            <p className="text-xs text-[#666666]">Overall assessment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2">
              {summary?.isPositiveCashFlow ? (
                <CheckCircle className="text-green-500" size={16} />
              ) : (
                <AlertCircle className="text-red-500" size={16} />
              )}
              <span className="text-xs font-medium text-gray-700">
                {summary?.isPositiveCashFlow ? "Positive" : "Negative"} Cash
                Flow
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2">
              {summary?.isProfitable ? (
                <CheckCircle className="text-green-500" size={16} />
              ) : (
                <AlertCircle className="text-red-500" size={16} />
              )}
              <span className="text-xs font-medium text-gray-700">
                {summary?.isProfitable ? "Profitable" : "Loss Making"}{" "}
                Investment
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2">
              {(summary?.recommendationScore || 0) > 60 ? (
                <CheckCircle className="text-green-500" size={16} />
              ) : (
                <AlertCircle className="text-orange-500" size={16} />
              )}
              <span className="text-xs font-medium text-gray-700">
                {(summary?.recommendationScore || 0) > 60
                  ? "Recommended"
                  : "Review Required"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Note */}
      {result.afterTaxROI && (
        <div className="rounded-2xl p-5 border-2 border-yellow-200 bg-yellow-50">
          <div className="flex items-center mb-3">
            <div className="rounded-xl flex items-center justify-center mr-3">
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800">
                Tax Considerations
              </h4>
              <p className="text-xs text-yellow-700">
                Important tax implications
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-yellow-200">
            <div className="flex justify-between items-center">
              <span className="text-xs text-yellow-700">After-tax ROI</span>
              <span className="font-semibold text-yellow-800">
                {formatPercent(result.afterTaxROI)}
              </span>
            </div>
            <p className="text-xs text-yellow-600 mt-1">
              (assuming 30% tax on rental income)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeInvestmentResult;
