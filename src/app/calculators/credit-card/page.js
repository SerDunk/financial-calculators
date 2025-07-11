// CreditCardCalculator.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Heading from "@/components/Heading";
import { calculateCreditCardPayoff } from "@/utils/calculation";
import CreditCardResult from "@/components/CalculationResult"; // Using the specific result component
import CreditCardAssumptions from "@/components/CreditCardAssumptions";
import SliderInput from "@/components/SliderInput";

const CreditCardCalculator = () => {
  const [calculationMode, setCalculationMode] = useState("fixedPayment");

  const [inputs, setInputs] = useState({
    cardBalance: 500000,
    annualInterestRate: 24,
    monthlyPayment: 15000,
    payoffTimeInMonths: 24,
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const calculateResults = useCallback(() => {
    setIsCalculating(true);
    const calculationResult = calculateCreditCardPayoff({
      inputs,
      calculationMode,
    });
    setResult(calculationResult);
    // A small delay to make the "CALCULATING..." state visible
    setTimeout(() => setIsCalculating(false), 300);
  }, [inputs, calculationMode]);

  // Calculate once on initial component mount to show the default result.
  // After this, calculations will only be triggered by the button click.
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
          header="Credit Card Payoff Calculator"
          desc="Find out how long it'll take to clear your dues or what you need to pay."
        />
        <div className="rounded-2xl p-6 relative bg-white mb-2">
          <h2 className="text-[#020288] font-semibold text-lg mb-4">
            Card Details
          </h2>
          <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-5">
            <label>Compute</label>
            <Select value={calculationMode} onValueChange={setCalculationMode}>
              <SelectTrigger className="w-48 h-10 bg-indigo-50 text-[#020288] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixedPayment">Time to Pay Off</SelectItem>
                <SelectItem value="fixedTime">
                  Required Monthly Payment
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-5">
            <SliderInput
              label="Credit Card Balance"
              value={inputs.cardBalance}
              onChange={(v) => handleInputChange("cardBalance", v)}
              min={1000}
              max={5000000}
              step={1000}
              tooltip="The total outstanding amount on your credit card."
            />
            <SliderInput
              label="APR (%) "
              value={inputs.annualInterestRate}
              onChange={(v) => handleInputChange("annualInterestRate", v)}
              showCurrency={false}
              min={8}
              max={50}
              step={0.1}
              tooltip="The annual percentage rate charged by your card provider."
            />

            {calculationMode === "fixedPayment" && (
              <SliderInput
                label="Monthly Payment"
                value={inputs.monthlyPayment}
                onChange={(v) => handleInputChange("monthlyPayment", v)}
                min={100}
                max={100000}
                step={100}
                tooltip="The fixed amount you plan to pay every month."
              />
            )}

            {calculationMode === "fixedTime" && (
              <SliderInput
                label="Payoff Time (Months)"
                value={inputs.payoffTimeInMonths}
                onChange={(v) => handleInputChange("payoffTimeInMonths", v)}
                showCurrency={false}
                min={1}
                max={120}
                step={1}
                tooltip="The number of months within which you want to clear your balance."
              />
            )}
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

        <CreditCardResult result={result} />
        <CreditCardAssumptions />
      </div>
    </div>
  );
};
export default CreditCardCalculator;
