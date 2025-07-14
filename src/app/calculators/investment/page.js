// InvestmentCalculator.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Heading from "@/components/Heading";
import { calculateInvestmentGrowth } from "@/utils/calculation";
import InvestmentResult from "@/components/InvestmentResult";
import InvestmentAssumptions from "@/components/InvestmentAssumptions";
import SliderInput from "@/components/SliderInput";

const InvestmentCalculator = () => {
  const [inputs, setInputs] = useState({
    initialAmount: 100000,
    monthlyContribution: 10000,
    annualRate: 12,
    years: 10,
    annualStepUp: 10, // New state for annual increase
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const calculateResults = useCallback(() => {
    setIsCalculating(true);
    const calculationResult = calculateInvestmentGrowth({ inputs });
    setResult(calculationResult);
    setTimeout(() => setIsCalculating(false), 300);
  }, [inputs]);

  useEffect(() => {
    calculateResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCalculate = () => {
    calculateResults();
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] xs:px-0 px-1.5">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Investment Growth Calculator (SIP)"
          desc="Project the future value of your investments with regular contributions."
        />
        <div className="rounded-2xl p-6 relative bg-white mb-4">
          <h2 className="text-[#020288] font-semibold text-lg mb-4">
            Investment Details
          </h2>
          <div className="space-y-5">
            <SliderInput
              label="Initial Investment"
              value={inputs.initialAmount}
              onChange={(v) => handleInputChange("initialAmount", v)}
              min={0}
              max={10000000}
              step={10000}
              tooltip="The starting lump sum amount you are investing."
            />
            <SliderInput
              label="Monthly Contribution (SIP)"
              value={inputs.monthlyContribution}
              onChange={(v) => handleInputChange("monthlyContribution", v)}
              min={0}
              max={500000}
              step={1000}
              tooltip="The fixed amount you plan to invest every month."
            />
            {/* New Slider for Annual Step-Up */}
            <SliderInput
              label="Annual Contribution Increase (%)"
              value={inputs.annualStepUp}
              onChange={(v) => handleInputChange("annualStepUp", v)}
              showCurrency={false}
              min={0}
              max={25}
              step={1}
              tooltip="The percentage by which you'll increase your monthly SIP amount each year (e.g., 10%)."
            />
            <SliderInput
              label="Expected Annual Return (%)"
              value={inputs.annualRate}
              onChange={(v) => handleInputChange("annualRate", v)}
              showCurrency={false}
              min={1}
              max={30}
              step={0.5}
              tooltip="The estimated annual growth rate of your investment."
            />
            <SliderInput
              label="Investment Tenure (Years)"
              value={inputs.years}
              onChange={(v) => handleInputChange("years", v)}
              showCurrency={false}
              min={1}
              max={40}
              step={1}
              tooltip="The total number of years you plan to stay invested."
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className={`w-full bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm transition-all ${
            isCalculating
              ? "opacity-70 cursor-not-allowed"
              : "hover:opacity-90 active:scale-[0.98]"
          }`}
        >
          {isCalculating ? "CALCULATING..." : "CALCULATE"}
        </button>

        <InvestmentResult result={result} />
        <InvestmentAssumptions />
      </div>
    </div>
  );
};
export default InvestmentCalculator;
