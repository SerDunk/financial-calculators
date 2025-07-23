// SipCalculator.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Heading from "@/components/Heading";
import { calculateSip } from "@/utils/calculation";
import SipResult from "@/components/SipResult";
import SipAssumptions from "@/components/SipAssumptions";
import SliderInput from "@/components/SliderInput";

const SipCalculator = () => {
  const [inputs, setInputs] = useState({
    monthlyInvestment: 10000,
    annualRate: 12,
    years: 10,
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field, value) => {
    setInputs((p) => ({ ...p, [field]: value }));
  };

  const calculateResults = useCallback(() => {
    setIsCalculating(true);
    const res = calculateSip({ inputs });
    setResult(res);
    setTimeout(() => setIsCalculating(false), 300);
  }, [inputs]);

  // Run calculation on initial load with default values
  useEffect(() => {
    calculateResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] xs:px-0 px-1.5">
      <div className="max-w-xl mx-auto">
        <Heading
          header="SIP Calculator"
          desc="Estimate the future value of your monthly investments with the power of compounding."
        />

        <div className="rounded-2xl p-6 relative bg-white mb-4">
          <h2 className="text-[#020288] font-semibold text-lg mb-4">
            Investment Details
          </h2>
          <div className="space-y-5">
            <SliderInput
              label="Monthly Investment"
              value={inputs.monthlyInvestment}
              onChange={(v) => handleInputChange("monthlyInvestment", v)}
              min={500}
              max={200000}
              step={500}
            />
            <SliderInput
              label="Expected Return Rate (p.a.)"
              value={inputs.annualRate}
              onChange={(v) => handleInputChange("annualRate", v)}
              showCurrency={false}
              min={1}
              max={30}
              step={0.5}
              tooltip="Based on historical market returns for your chosen investment type (e.g., 12% for Nifty 50)."
            />
            <SliderInput
              label="Time Period (Years)"
              value={inputs.years}
              onChange={(v) => handleInputChange("years", v)}
              showCurrency={false}
              min={1}
              max={40}
              step={1}
            />
          </div>
        </div>

        <button
          onClick={calculateResults}
          disabled={isCalculating}
          className={`w-full bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm transition-all ${
            isCalculating
              ? "opacity-70 cursor-not-allowed"
              : "hover:opacity-90 active:scale-[0.98]"
          }`}
        >
          {isCalculating ? "CALCULATING..." : "CALCULATE"}
        </button>

        <SipResult result={result} inputs={inputs} />
        <SipAssumptions />
      </div>
    </div>
  );
};
export default SipCalculator;
