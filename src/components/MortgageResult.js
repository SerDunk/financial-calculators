import React from "react";
import { Calculator, PieChart, Wallet, FileText } from "lucide-react";
import HouseResult from "../../public/house-result.png";
import ChartDisplay from "@/components/ChartDisplay";
import AmortizationSchedule from "@/components/AmortisationSchedule";
import Assumptions from "@/components/Assumptions";
import Image from "next/image";
const MortgageResult = ({
  result,
  chartData,
  loanAmount,
  downPayment,
  interestRate,
  displayedTenure,
  amortizationTable,
  yearlyAmortization,
}) => {
  // Loading/Empty State
  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-medium mb-2 text-[#2C178C]">
            Awaiting Calculation...
          </h3>
          <p className="text-sm">Your mortgage breakdown will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="sm:mt-2 mt-4 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
        {/* Grand Total Card */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-18 h-18 rounded-full mb-3 bg-[#AB78FF]">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Image
                src={HouseResult}
                width={30}
                height={30}
                alt="House Result"
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
            Your Mortgage Cost
          </h2>
        </div>
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4 text-center">
          <div className="text-xs text-[#666666] mb-1">
            Total Cost Over {displayedTenure} Years
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
            ₹
            {result.totalCost.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>

        {/* Monthly Payment Card */}
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
          <div className="flex items-center mb-4">
            <Wallet className="text-[#AB78FF] mr-3" size={30} />
            <div>
              <h3 className="font-semibold text-[#2C178C]">
                Your Monthly Payment
              </h3>
              <p className="text-xs text-[#666666]">
                ₹{result.totalMonthlyPayment.toLocaleString("en-IN")} / month
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Loan EMI", value: result.emi, color: "#AB78FF" },
              {
                label: "Property Tax",
                value: result.monthlyPropertyTax,
                color: "#CAF5BD",
              },
              {
                label: "Home Insurance",
                value: result.monthlyHomeInsurance,
                color: "#45D099",
              },
              {
                label: "Other Costs",
                value: result.monthlyOtherCosts,
                color: "#97A9FF",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-600 flex items-center text-xs">
                  <div
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  {item.label}
                </span>
                <span className="font-semibold text-[#2C178C]">
                  ₹{item.value.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Cost Breakdown & Chart Card */}
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
          <div className="flex items-center mb-4">
            <PieChart className="text-[#B3BEF5] mr-3" size={30} />
            <div>
              <h3 className="font-semibold text-[#2C178C]">
                Total Cost Breakdown
              </h3>
              <p className="text-xs text-[#666666]">
                Over {displayedTenure} years
              </p>
            </div>
          </div>
          <div className="flex justify-center my-4">
            {chartData && <ChartDisplay data={chartData} type="pie" />}
          </div>
          <div className="space-y-2">
            {[
              {
                label: "Principal",
                value: loanAmount,
                color: "#AB78FF",
              },
              {
                label: "Total Interest",
                value: result.totalInterest,
                color: "#F4B6D2",
              },
              {
                label: "Total Property Tax",
                value: result.totalPropertyTax,
                color: "#CAF5BD",
              },
              {
                label: "Total Home Insurance",
                value: result.totalHomeInsurance,
                color: "#45D099",
              },
              {
                label: "Total Other Costs",
                value: result.totalOtherCosts,
                color: "#97A9FF",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-600 flex items-center text-xs">
                  <div
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  {item.label}
                </span>
                <span className="font-semibold text-[#2C178C]">
                  ₹{item.value.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Loan Summary Card */}
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
          <div className="flex items-center mb-4">
            <FileText className="text-[#B3BEF5] mr-3" size={30} />
            <h3 className="font-semibold text-[#2C178C]">Loan Summary</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 text-xs">Down Payment</span>
              <span className="font-semibold text-[#2C178C]">
                ₹{downPayment.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 text-xs">Loan Amount</span>
              <span className="font-semibold text-[#2C178C]">
                ₹{loanAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 text-xs">Interest Rate</span>
              <span className="font-semibold text-[#2C178C]">
                {interestRate}% p.a.
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 text-xs">Loan Tenure</span>
              <span className="font-semibold text-[#2C178C]">
                {displayedTenure} years
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Standalone sections outside the main results card */}
      <AmortizationSchedule
        amortizationTable={amortizationTable}
        yearlyAmortization={yearlyAmortization}
      />
      <Assumptions />
    </>
  );
};

export default MortgageResult;
