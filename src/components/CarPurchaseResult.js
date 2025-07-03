import React from "react";
import {
  Car,
  Calculator,
  TrendingUp,
  PieChart,
  CreditCard,
  FileText,
} from "lucide-react";
import Image from "next/image";
import CarResult from "../../public/car.png";

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
    otherFees,
    cashIncentive,
    tradeInValue,
    loanTerm,
    interestRate,
    vehiclePrice,
  } = result;

  // Calculate the total cost of ownership without sales tax
  const totalCostOfOwnership =
    totalLoanPayments + (downPaymentAmount || 0) + (otherFees || 0);

  // Net cost after savings/incentives
  const netCostAfterSavings =
    totalCostOfOwnership - (cashIncentive || 0) - (tradeInValue || 0);

  const totalSavings = (cashIncentive || 0) + (tradeInValue || 0);

  return (
    <div className="sm:mt-2 mt-2 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-[#AB78FF]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Image src={CarResult} width={30} height={30} alt="Car Result" />
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
              {formatIndianCurrency(totalLoanPayments)}
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

          {/* Only show other fees if it's greater than 0 */}
          {otherFees > 0 && (
            <div className="flex justify-between">
              <span className="text-xs text-[#666666] font-medium">
                Other Fees
              </span>
              <span className="font-semibold text-[#2C178C]">
                {formatIndianCurrency(otherFees)}
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
              {formatIndianCurrency(totalCostOfOwnership)}
            </div>
            <div className="text-xs text-[#666666] mt-1">
              EMI + Down Payment{otherFees > 0 ? " + Fees" : ""}
            </div>
          </div>
        </div>

        {totalSavings > 0 && (
          <div className="bg-green-50 rounded-xl p-3 border border-green-200 mt-4">
            <div className="text-center">
              <div className="text-xs text-green-700 mb-1 font-medium">
                Net Cost After Savings
              </div>
              <div className="text-lg font-bold text-green-700">
                {formatIndianCurrency(netCostAfterSavings)}
              </div>
              <div className="text-xs text-green-600 mt-1">
                Total Savings: {formatIndianCurrency(totalSavings)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loan Details */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            <CreditCard className="text-[#B3BEF5] " size={30} />
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
          ["Total Loan Payment", totalLoanPayments],
        ].map(([label, value]) => (
          <div
            className="flex justify-between items-center text-sm mb-2"
            key={label}
          >
            <span className="text-xs text-[#666666]">{label}</span>
            <span className="font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatIndianCurrency(value)}
            </span>
          </div>
        ))}

        <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4 text-xs">
          <div className="flex justify-between mb-1">
            <span className="text-[#666666]">Interest Rate</span>
            <span className="font-semibold text-[#2C178C]">
              {interestRate}% p.a.
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666666]">Loan Term</span>
            <span className="font-semibold text-[#2C178C]">
              {loanTerm} years
            </span>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB]">
        <div className="flex items-center mb-4">
          <div className="rounded-xl flex items-center justify-center mr-3">
            <PieChart className="text-[#AB78FF]" size={30} />
          </div>
          <div>
            <h3 className="font-semibold text-[#2C178C]">Cost Breakdown</h3>
            <p className="text-xs text-[#666666]">
              How your money is distributed
            </p>
          </div>
        </div>

        {/* Calculate cost components for breakdown (no sales tax) */}
        {(() => {
          const costComponents = [
            { label: "Loan Principal", value: loanAmount, color: "#B3BEF5" },
            { label: "Interest", value: totalInterest, color: "#FD9CD0" },
            {
              label: "Down Payment",
              value: downPaymentAmount,
              color: "#D4ECCD",
            },
            // Only include other fees if it's greater than 0
            ...(otherFees > 0
              ? [{ label: "Other Fees", value: otherFees, color: "#CCBBF4" }]
              : []),
          ].filter((item) => item.value > 0);

          return (
            <>
              {costComponents.map((item, index) => {
                const percent =
                  totalCostOfOwnership > 0
                    ? (item.value / totalCostOfOwnership) * 100
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
                      {percent.toFixed(1)}% of total cost
                    </div>
                  </div>
                );
              })}
            </>
          );
        })()}

        {/* Savings section - only show if there are savings */}
        {totalSavings > 0 && (
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
