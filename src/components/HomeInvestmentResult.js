import React from "react";
import {
  Home,
  Calculator,
  TrendingUp,
  PieChart,
  CreditCard,
  FileText,
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

  // Calculate total cost of ownership
  const totalCostOfOwnershipCalc =
    totalAmountPaid + (downPaymentAmount || 0) + (registrationFees || 0);

  // Calculate total rental income over loan term
  const totalRentalIncome = annualRentalIncome * loanTerm;

  // Calculate net returns after all costs
  const netReturnsAfterCosts =
    propertyValueAfterLoanTerm + totalRentalIncome - totalCostOfOwnershipCalc;

  // Check if investment is cash flow positive
  const isPositiveFlow = monthlyNetCashFlow > 0;
  const isTotallyProfitable = netReturnsAfterCosts > 0;

  return (
    <div className="sm:mt-2 mt-2 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-[#AB78FF]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Home className="text-[#AB78FF]" size={24} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          Your Property Investment Summary
        </h2>
        <p className="text-sm text-[#666666]">
          Monthly EMI of{" "}
          <span className="bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent font-semibold">
            {formatIndianCurrency(monthlyEMI)}
          </span>{" "}
          for {loanTerm} years
        </p>
      </div>

      {/* Total Cost Card */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="rounded-xl flex items-center justify-center mr-3">
              <FileText className="text-[#AB78FF]" size={30} />
            </div>
            <div>
              <h3 className="font-semibold text-[#2C178C]">Cost Breakdown</h3>
              <p className="text-xs text-[#666666]">All costs included</p>
            </div>
          </div>
        </div>

        <div className="text-sm space-y-2">
          <div className="flex justify-between pt-2">
            <span className="text-xs text-[#666666] font-medium">
              Total Loan Payment
            </span>
            <span className="font-semibold text-[#2C178C]">
              {formatIndianCurrency(totalAmountPaid)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs text-[#666666] font-medium">
              Down Payment
            </span>
            <span className="font-semibold text-[#2C178C]">
              {formatIndianCurrency(downPaymentAmount)}
            </span>
          </div>

          {registrationFees > 0 && (
            <div className="flex justify-between">
              <span className="text-xs text-[#666666] font-medium">
                Registration Fees
              </span>
              <span className="font-semibold text-[#2C178C]">
                {formatIndianCurrency(registrationFees)}
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
          <div className="text-center">
            <div className="text-xs text-[#666666] mb-1">
              Total Cost of Ownership
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatIndianCurrency(totalCostOfOwnershipCalc)}
            </div>
            <div className="text-xs text-[#666666] mt-1">
              EMI + Down Payment{registrationFees > 0 ? " + Fees" : ""}
            </div>
          </div>
        </div>

        {/* Returns section */}
        <div className="bg-green-50 rounded-xl p-3 border border-green-200 mt-4">
          <div className="text-center">
            <div className="text-xs text-green-700 mb-1 font-medium">
              Expected Total Returns
            </div>
            <div className="text-lg font-bold text-green-700">
              {formatIndianCurrency(
                propertyValueAfterLoanTerm + totalRentalIncome
              )}
            </div>
            <div className="text-xs text-green-600 mt-1">
              Property Value + Rental Income
            </div>
          </div>
        </div>

        {isTotallyProfitable && (
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200 mt-4">
            <div className="text-center">
              <div className="text-xs text-blue-700 mb-1 font-medium">
                Net Profit After All Costs
              </div>
              <div className="text-lg font-bold text-blue-700">
                {formatIndianCurrency(netReturnsAfterCosts)}
              </div>
              <div className="text-xs text-blue-600 mt-1">
                Total Returns - Total Investment
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cash Flow Details */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            <CreditCard className="text-[#B3BEF5]" size={30} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2C178C]">Monthly Cash Flow</h3>
            <p className="text-xs text-[#666666]">Income vs expenses</p>
          </div>
        </div>

        {[
          ["Monthly Rental Income", monthlyRentalIncome, "positive"],
          ["Monthly EMI", monthlyEMI, "negative"],
          [
            "Net Monthly Cash Flow",
            monthlyNetCashFlow,
            isPositiveFlow ? "positive" : "negative",
          ],
        ].map(([label, value, type]) => (
          <div
            className="flex justify-between items-center text-sm mb-2"
            key={label}
          >
            <span className="text-xs text-[#666666]">{label}</span>
            <span
              className={`font-semibold ${
                type === "positive"
                  ? "text-green-600"
                  : type === "negative"
                  ? "text-red-600"
                  : "bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent"
              }`}
            >
              {type === "positive" && "+"}
              {type === "negative" && label !== "Net Monthly Cash Flow" && "-"}
              {formatIndianCurrency(Math.abs(value))}
            </span>
          </div>
        ))}

        <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4 text-xs">
          <div className="flex justify-between mb-1">
            <span className="text-[#666666]">Rental Yield</span>
            <span className="font-semibold text-[#2C178C]">
              {rentalYield?.toFixed(2)}% p.a.
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666666]">Cash-on-Cash Return</span>
            <span
              className={`font-semibold ${
                cashOnCashReturn > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {cashOnCashReturn?.toFixed(2)}% p.a.
            </span>
          </div>
        </div>
      </div>

      {/* Investment Performance */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB]">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            <PieChart className="text-[#AB78FF]" size={30} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2C178C]">
              Investment Analysis
            </h3>
            <p className="text-xs text-[#666666]">
              Performance over {loanTerm} years
            </p>
          </div>
        </div>

        {/* Calculate components for breakdown */}
        {(() => {
          const investmentComponents = [
            { label: "Principal Amount", value: loanAmount, color: "#B3BEF5" },
            {
              label: "Total Interest",
              value: totalInterestPaid,
              color: "#FD9CD0",
            },
            {
              label: "Down Payment",
              value: downPaymentAmount,
              color: "#D4ECCD",
            },
            ...(registrationFees > 0
              ? [
                  {
                    label: "Registration Fees",
                    value: registrationFees,
                    color: "#CCBBF4",
                  },
                ]
              : []),
          ].filter((item) => item.value > 0);

          return (
            <>
              {investmentComponents.map((item, index) => {
                const percent =
                  totalCostOfOwnershipCalc > 0
                    ? (item.value / totalCostOfOwnershipCalc) * 100
                    : 0;

                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 border border-gray-200 mb-2"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-sm font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                        {formatShortCurrency(item.value)}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(percent, 100)}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {percent.toFixed(1)}% of total investment
                    </div>
                  </div>
                );
              })}
            </>
          );
        })()}

        {/* Returns breakdown */}
        <div className="mt-4 pt-4 border-t border-gray-300">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-green-500" />
            Expected Returns
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-green-100 rounded-lg p-3 border border-green-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-green-700">
                  Property Appreciation
                </span>
                <span className="text-sm font-bold text-green-600">
                  {formatShortCurrency(capitalGains)}
                </span>
              </div>
              <div className="text-xs text-green-600">
                {propertyPrice
                  ? ((capitalGains / propertyPrice) * 100).toFixed(1)
                  : 0}
                % growth over {loanTerm} years
              </div>
            </div>
            <div className="bg-blue-100 rounded-lg p-3 border border-blue-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-blue-700">
                  Total Rental Income
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {formatShortCurrency(totalRentalIncome)}
                </span>
              </div>
              <div className="text-xs text-blue-600">
                {formatIndianCurrency(annualRentalIncome)} per year
              </div>
            </div>
          </div>

          {/* Overall ROI */}
          <div className="mt-3">
            <div
              className={`rounded-lg p-3 border-2 ${
                overallROI > 0
                  ? "bg-green-50 border-green-300"
                  : "bg-red-50 border-red-300"
              }`}
            >
              <div className="text-center">
                <div
                  className={`text-sm font-medium ${
                    overallROI > 0 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  Overall ROI
                </div>
                <div
                  className={`text-2xl font-bold ${
                    overallROI > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {overallROI?.toFixed(1)}%
                </div>
                <div
                  className={`text-xs ${
                    overallROI > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Annualized: {annualizedROI?.toFixed(1)}% per year
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInvestmentResult;
