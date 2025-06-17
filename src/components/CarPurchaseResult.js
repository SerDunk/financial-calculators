import React from "react";
import {
  Car,
  Calculator,
  TrendingUp,
  DollarSign,
  PieChart,
  CreditCard,
  FileText,
} from "lucide-react";

const CarPurchaseResult = ({ result }) => {
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
          <h3 className="text-lg font-medium mb-2">Car Loan Calculator</h3>
          <p className="text-sm">
            Adjust the sliders to see your car loan details
          </p>
        </div>
      </div>
    );
  }

  const {
    loanAmount,
    totalLoanPayments,
    totalInterest,
    monthlyEMI,
    downPaymentAmount,
    salesTaxAmount,
    otherFees,
    cashIncentive,
    tradeInValue,
    totalUpfrontCost,
    totalCostOfOwnership,
    loanTerm,
    interestRate,
    vehiclePrice,
  } = result;

  const principalPercent = (loanAmount / totalCostOfOwnership) * 100;
  const interestPercent = (totalInterest / totalCostOfOwnership) * 100;
  const downPaymentPercent = (downPaymentAmount / totalCostOfOwnership) * 100;
  const taxPercent = (salesTaxAmount / totalCostOfOwnership) * 100;
  const feesPercent = (otherFees / totalCostOfOwnership) * 100;

  const totalEMIPayments = monthlyEMI * loanTerm * 12;

  return (
    <div className="sm:mt-2 mt-4 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-[#AB78FF]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Car className="text-[#AB78FF]" size={24} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          Your Car Loan Summary
        </h2>
        <p className="text-sm text-[#666666]">
          Monthly EMI of{" "}
          <span className="bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent font-semibold">
            {formatIndianCurrency(monthlyEMI)}
          </span>{" "}
          for {loanTerm} years
        </p>
      </div>

      {/* Loan & Cost Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Loan Details */}
        <div className="rounded-2xl p-5 border-2 border-[#D4ECCD] bg-[#F4FBF2]">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#B3BEF5] rounded-xl flex items-center justify-center mr-3">
              <CreditCard className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[#2C178C]">Loan Details</h3>
              <p className="text-xs text-[#666666]">Financing breakdown</p>
            </div>
          </div>

          {[
            ["Loan Amount", loanAmount],
            ["Total Interest", totalInterest],
            ["Monthly EMI", monthlyEMI],
            ["Loan Term", `${loanTerm} years`],
          ].map(([label, value]) => (
            <div
              className="flex justify-between items-center text-sm mb-1"
              key={label}
            >
              <span className="text-xs text-[#666666]">{label}</span>
              <span className="font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                {typeof value === "string"
                  ? value
                  : formatIndianCurrency(value)}
              </span>
            </div>
          ))}

          <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4 text-center">
            <div className="text-xs text-[#666666] mb-1">Interest Rate</div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {interestRate}% p.a.
            </div>
          </div>
        </div>

        {/* Total Cost Card */}
        <div className="rounded-2xl p-5 border-2 border-[#CCBBF4] bg-[#F6F0FF]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#AB78FF] rounded-xl flex items-center justify-center mr-3">
                <FileText className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[#2C178C]">
                  Total Vehicle Cost
                </h3>
                <p className="text-xs text-[#666666]">
                  Includes all payments over loan tenure
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-[#666666] font-medium">
                Upfront Cost
              </span>
              <span className="font-semibold text-[#2C178C]">
                {formatIndianCurrency(totalUpfrontCost)}
              </span>
            </div>

            <div className="ml-2 space-y-1 text-xs text-[#666666]">
              {downPaymentAmount > 0 && (
                <div className="flex justify-between">
                  <span>• Down Payment</span>
                  <span>{formatIndianCurrency(downPaymentAmount)}</span>
                </div>
              )}
              {salesTaxAmount > 0 && (
                <div className="flex justify-between">
                  <span>• Sales Tax</span>
                  <span>{formatIndianCurrency(salesTaxAmount)}</span>
                </div>
              )}
              {otherFees > 0 && (
                <div className="flex justify-between">
                  <span>• Other Fees</span>
                  <span>{formatIndianCurrency(otherFees)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-2">
              <span className="text-xs text-[#666666] font-medium">
                EMI Payments
              </span>
              <span className="font-semibold text-[#2C178C]">
                {formatIndianCurrency(totalEMIPayments)}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
            <div className="text-center">
              <div className="text-xs text-[#666666] mb-1">
                Total Ownership Cost
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                {formatIndianCurrency(totalCostOfOwnership)}
              </div>
              <div className="text-xs text-[#666666] mt-1">
                Upfront + EMIs over {loanTerm} years
              </div>
            </div>
          </div>

          {(cashIncentive > 0 || tradeInValue > 0) && (
            <div className="bg-white rounded-xl p-3 border border-green-300 mt-4">
              <div className="text-center">
                <div className="text-xs text-green-700 mb-1 font-medium">
                  Net Effective Cost After Incentives
                </div>
                <div className="text-xl font-bold text-green-700">
                  {formatIndianCurrency(
                    totalCostOfOwnership -
                      (cashIncentive || 0) -
                      (tradeInValue || 0)
                  )}
                </div>
                <div className="text-xs text-[#666666] mt-1">
                  Adjusted for discounts and trade-in
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cost Breakdown and Savings */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-[#AB78FF] rounded-xl flex items-center justify-center mr-3">
            <PieChart className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2C178C]">Cost Breakdown</h3>
            <p className="text-xs text-[#666666]">
              How your money is distributed
            </p>
          </div>
        </div>

        {[
          {
            label: "Loan Principal",
            value: loanAmount,
            percent: principalPercent,
            color: "#B3BEF5",
          },
          {
            label: "Interest",
            value: totalInterest,
            percent: interestPercent,
            color: "#FD9CD0",
          },
          {
            label: "Down Payment",
            value: downPaymentAmount,
            percent: downPaymentPercent,
            color: "#D4ECCD",
          },
          {
            label: "Sales Tax",
            value: salesTaxAmount,
            percent: taxPercent,
            color: "#F5DF9F",
          },
          {
            label: "Other Fees",
            value: otherFees,
            percent: feesPercent,
            color: "#CCBBF4",
          },
        ]
          .filter((item) => item.value > 0)
          .map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-3 border border-gray-200 mb-2"
            >
              <div className="flex justify-between items-center mb-1">
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
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${item.percent.toFixed(1)}%`,
                    backgroundColor: item.color,
                  }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {item.percent.toFixed(1)}% of total cost
              </div>
            </div>
          ))}

        {(cashIncentive > 0 || tradeInValue > 0) && (
          <div className="mt-4 pt-4 border-t border-gray-300">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <TrendingUp size={16} className="text-green-500" />
              Savings & Credits
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cashIncentive > 0 && (
                <div className="bg-green-100 rounded-lg p-3 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-700">
                      Cash Incentive
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      -{formatShortCurrency(cashIncentive)}
                    </span>
                  </div>
                </div>
              )}
              {tradeInValue > 0 && (
                <div className="bg-green-100 rounded-lg p-3 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-700">
                      Trade-in Value
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      -{formatShortCurrency(tradeInValue)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarPurchaseResult;
