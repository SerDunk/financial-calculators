// CreditCardResult.jsx
import React from "react";
import { Calculator, PieChart, TrendingUp, AlertTriangle } from "lucide-react";
import Card from "../../public/card.png";
import { formatters } from "@/utils/calculation";
import Image from "next/image";

// Helper to format the main result value, which can be currency or a plain number with a suffix.
const formatMainResult = (result) => {
  if (result.isCurrency) {
    return formatters.formatIndianCurrency(result.value);
  }
  return (
    <>
      {result.value}
      <span className="text-2xl ml-2">{result.suffix}</span>
    </>
  );
};

const CreditCardResult = ({ result }) => {
  // Loading State: Shown when result is null
  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-medium mb-2">Awaiting Calculation...</h3>
          <p className="text-sm">
            Your credit card payoff details will appear here.
          </p>
        </div>
      </div>
    );
  }

  // Error State: Shown for invalid inputs like payment too low
  if (result.isError) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-red-600">
          <AlertTriangle className="mx-auto mb-4" size={48} />
          <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
          <p className="text-sm text-gray-600">{result.summaryText}</p>
        </div>
      </div>
    );
  }

  // Success State: Render the full results
  const { title, mainResult, summaryText, breakdown, analysis } = result;

  return (
    <div className="sm:mt-2 mt-2 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-[#78abff]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Image src={Card} alt="Card" width={25} height={25} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          {title}
        </h2>
        <p className="text-sm text-[#666666]">{summaryText}</p>
      </div>

      {/* Main Result Display */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4 text-center">
        <div className="text-xs text-[#666666] mb-1">{mainResult.label}</div>
        <div className="text-3xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
          {formatMainResult(mainResult)}
        </div>
      </div>

      {/* Breakdown Section */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <PieChart className="text-[#B3BEF5] mr-3" size={30} />
          <div>
            <h3 className="font-semibold text-[#2C178C]">Cost Breakdown</h3>
            <p className="text-xs text-[#666666]">Principal vs. Interest</p>
          </div>
        </div>
        <div className="space-y-2">
          {breakdown.map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-gray-600">{item.label}</span>
              <span className="font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Section */}
      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <TrendingUp className="text-[#B3BEF5] mr-3" size={30} />
          <div>
            <h3 className="font-semibold text-[#2C178C]">Payment Analysis</h3>
          </div>
        </div>
        <div className="space-y-2">
          {analysis.map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border"
            >
              <span className="text-gray-600">{item.label}</span>
              <span className="font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditCardResult;
