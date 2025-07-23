// SipResult.jsx
import React from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { formatters } from "@/utils/calculation";

const ResultDisplay = ({ label, value, colorClass = "text-gray-800" }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm text-gray-600">{label}</span>
    <span
      className={`text-base font-semibold ${colorClass} bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent`}
    >
      {formatters.formatIndianCurrency(value)}
    </span>
  </div>
);

const SipResult = ({ result, inputs }) => {
  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg text-center text-gray-500">
        <Calculator className="mx-auto mb-4" size={48} />
        Enter your details to see the projection.
      </div>
    );
  }

  return (
    <div className="sm:mt-2 mt-2 bg-white py-6 px-5 rounded-2xl shadow-lg">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-[#AB78FF]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <TrendingUp size={28} className="text-[#020288]" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          Your SIP Projection
        </h2>
        <p className="text-sm text-[#666666]">
          After {inputs.years} {inputs.years > 1 ? "Years" : "Year"} at{" "}
          {inputs.annualRate}% p.a.
        </p>
      </div>

      <div className="bg-[#F9F9FB] p-4 rounded-xl border space-y-2">
        <ResultDisplay label="Invested Amount" value={result.investedAmount} />
        <ResultDisplay
          label="Est. Returns"
          value={result.estimatedReturns}
          colorClass="text-green-600"
        />
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-[#2C178C]">
              Total Value
            </span>
            <span className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              {formatters.formatIndianCurrency(result.totalValue)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SipResult;
