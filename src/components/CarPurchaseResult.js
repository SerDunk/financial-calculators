import React from "react";
import {
  Car,
  Calculator,
  TrendingUp,
  DollarSign,
  PieChart,
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
      <div className="mt-6 p-6 bg-white rounded-2xl">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-2" size={32} />
          <p>Adjust the sliders to see your car loan details</p>
        </div>
      </div>
    );
  }

  const totalCost = result.totalCostOfOwnership || 0;
  const principalPercent = ((result.loanAmount || 0) / totalCost) * 100;
  const interestPercent = ((result.totalInterest || 0) / totalCost) * 100;
  const downPaymentPercent =
    ((result.downPaymentAmount || 0) / totalCost) * 100;
  const taxPercent = ((result.salesTaxAmount || 0) / totalCost) * 100;
  const feesPercent = ((result.otherFees || 0) / totalCost) * 100;

  return (
    <div className="mt-2 space-y-4">
      <div className="bg-gradient-to-r from-[#583FCA] to-[#2D14A0] rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm opacity-90">Monthly EMI</span>
            </div>
            <div className="text-2xl font-bold">
              {formatIndianCurrency(result.monthlyEMI)}
            </div>
            <div className="text-sm opacity-75 mt-1">
              for {result.loanTerm} years
            </div>
          </div>

          <div>
            <div className="text-sm opacity-90 mb-1">Loan Amount</div>
            <div className="text-2xl font-semibold">
              {formatShortCurrency(result.loanAmount)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          {
            label: "Total Interest",
            icon: <TrendingUp size={16} className="text-[#020288]" />,
            value: result.totalInterest,
            subtitle: `Over ${result.loanTerm} years`,
          },
          {
            label: "Down Payment",
            icon: <DollarSign size={16} className="text-[#020288]" />,
            value: result.downPaymentAmount,
            subtitle: `${(
              (result.downPaymentAmount / result.vehiclePrice) *
              100
            ).toFixed(1)}% of vehicle price`,
          },
          {
            label: "Total Upfront",
            icon: <Car size={16} className="text-[#020288]" />,
            value: result.totalUpfrontCost,
            subtitle: "Including taxes & fees",
          },
          {
            label: "Total Cost",
            icon: <PieChart size={16} className="text-[#020288]" />,
            value: result.totalCostOfOwnership,
            subtitle: "Complete ownership cost",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-2">
              {item.icon}
              <span className="text-xs text-[#323233] font-medium">
                {item.label}
              </span>
            </div>
            <div className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent ">
              {formatShortCurrency(item.value)}
            </div>
            <div className="text-xs text-gray-500 mt-1">{item.subtitle}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-5">
        <h3 className="text-[#323233] font-medium text-sm mb-4 flex items-center gap-2">
          <PieChart size={16} />
          Cost Breakdown
        </h3>

        {[
          {
            label: "Loan Principal",
            color: "#FD9CD0",
            value: result.loanAmount,
            percent: principalPercent,
          },
          {
            label: "Interest",
            color: "#CCBBF4",
            value: result.totalInterest,
            percent: interestPercent,
          },
          {
            label: "Down Payment",
            color: "#B3BEF5",
            value: result.downPaymentAmount,
            percent: downPaymentPercent,
          },
          {
            label: "Sales Tax",
            color: "#D4ECCD",
            value: result.salesTaxAmount,
            percent: taxPercent,
          },
          {
            label: "Other Fees",
            color: "#F5DF9F",
            value: result.otherFees,
            percent: feesPercent,
          },
        ]
          .filter((item) => item.value > 0)
          .map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                {/* Colored Dot */}
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>

                {/* Label */}
                <span className="text-xs text-[#323233] whitespace-nowrap">
                  {item.label}
                </span>
                <div>
                  {/* Fixed Width Progress Bar */}
                  <div className="w-[120px] h-2 bg-gray-100 rounded-full ml-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${item.percent}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Value */}
              <span className="text-xs font-medium text-[#323233] ml-2 whitespace-nowrap">
                {formatShortCurrency(item.value)}
              </span>
            </div>
          ))}

        {(result.cashIncentive > 0 || result.tradeInValue > 0) && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-xs text-[#323233] font-medium mb-2">
              Savings & Credits
            </h4>
            <div className="space-y-2">
              {result.cashIncentive > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-green-600">Cash Incentive</span>
                  <span className="text-xs font-medium text-green-600">
                    -{formatShortCurrency(result.cashIncentive)}
                  </span>
                </div>
              )}
              {result.tradeInValue > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-green-600">Trade-in Value</span>
                  <span className="text-xs font-medium text-green-600">
                    -{formatShortCurrency(result.tradeInValue)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-[#EAE9F0] rounded-2xl p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-[#323233] opacity-75">
              Effective Rate
            </div>
            <div className="text-sm font-semibold text-[#020288]">
              {result.interestRate}% p.a.
            </div>
          </div>
          <div>
            <div className="text-xs text-[#323233] opacity-75">Loan Term</div>
            <div className="text-sm font-semibold text-[#020288]">
              {result.loanTerm} years
            </div>
          </div>
          <div>
            <div className="text-xs text-[#323233] opacity-75">Payments</div>
            <div className="text-sm font-semibold text-[#020288]">
              {result.loanTerm * 12} EMIs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPurchaseResult;
