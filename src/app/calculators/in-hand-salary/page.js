// InHandSalaryCalculator.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Heading from "@/components/Heading";
import { calculateInHandSalary } from "@/utils/calculation";
import InHandSalaryResult from "@/components/InHandSalaryResult";
import InHandSalaryAssumptions from "@/components/InHandSalaryAssumptions";
import SliderInput from "@/components/SliderInput";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const InHandSalaryCalculator = () => {
  const [selectedRegime, setSelectedRegime] = useState("new");
  const [inputs, setInputs] = useState({
    annualCTC: 1200000,
    variablePay: 50000,
    monthlyPF: 1800,
    annualGratuity: 20000,
    standardDeduction: 50000,
    monthlyRent: 25000,
    custom80C: 50000,
    section80D: 25000,
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field, value) =>
    setInputs((p) => ({ ...p, [field]: value }));

  const calculateResults = useCallback(() => {
    setIsCalculating(true);
    const res = calculateInHandSalary({ inputs, selectedRegime });
    setResult(res);
    setTimeout(() => setIsCalculating(false), 300);
  }, [inputs, selectedRegime]);

  // --- THE CHANGE IS HERE ---
  // This useEffect hook runs only ONCE when the component first mounts.
  // It calculates the result for the initial default values.
  // After this, calculations are only triggered by the button click.
  useEffect(() => {
    calculateResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] xs:px-0 px-1.5">
      <div className="max-w-xl mx-auto">
        <Heading
          header="In-Hand Salary Calculator (FY 2024-25)"
          desc="Select your tax regime and enter your details to get a complete payslip breakdown."
        />

        <div className="rounded-2xl p-6 relative bg-white mb-4">
          <div className="flex justify-between items-center mb-5">
            <label className="text-[#020288] font-semibold text-lg">
              Choose Your Tax Regime
            </label>
            <Select value={selectedRegime} onValueChange={setSelectedRegime}>
              <SelectTrigger className="w-48 h-10 bg-indigo-50 text-[#020288] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Regime (Default)</SelectItem>
                <SelectItem value="old">Old Regime</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SliderInput
            label="Annual CTC"
            value={inputs.annualCTC}
            onChange={(v) => handleInputChange("annualCTC", v)}
            min={300000}
            max={10000000}
            step={50000}
          />
          <SliderInput
            label="Annual Variable / Bonus Pay"
            value={inputs.variablePay}
            onChange={(v) => handleInputChange("variablePay", v)}
            min={0}
            max={2000000}
            step={10000}
          />
        </div>

        <div className="rounded-2xl p-6 relative bg-white mb-4">
          <h2 className="text-[#020288] font-semibold text-lg mb-4">
            Core Deductions & Benefits
          </h2>
          <SliderInput
            label="Your Monthly PF Contribution"
            value={inputs.monthlyPF}
            onChange={(v) => handleInputChange("monthlyPF", v)}
            min={0}
            max={10000}
            step={100}
          />
          <SliderInput
            label="Annual Gratuity Accrual"
            value={inputs.annualGratuity}
            onChange={(v) => handleInputChange("annualGratuity", v)}
            min={0}
            max={100000}
            step={1000}
          />
          {selectedRegime === "old" && (
            <p className="text-xs text-center text-gray-500 mt-2">
              Standard Deduction is fixed at ₹50,000 for this regime.
            </p>
          )}
        </div>

        {selectedRegime === "old" && (
          <div className="rounded-2xl p-6 relative bg-white mb-4">
            <h2 className="text-[#020288] font-semibold text-lg mb-4">
              Old Regime Tax Investments
            </h2>
            <SliderInput
              label="Actual Monthly Rent Paid"
              value={inputs.monthlyRent}
              onChange={(v) => handleInputChange("monthlyRent", v)}
              min={0}
              max={100000}
              step={1000}
            />
            <SliderInput
              label="80C Investments (besides PF)"
              value={inputs.custom80C}
              onChange={(v) => handleInputChange("custom80C", v)}
              min={0}
              max={150000}
              step={5000}
            />
            <SliderInput
              label="80D - Health Insurance"
              value={inputs.section80D}
              onChange={(v) => handleInputChange("section80D", v)}
              min={0}
              max={75000}
              step={2500}
            />
          </div>
        )}

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
        <InHandSalaryResult result={result} regime={selectedRegime} />
        <InHandSalaryAssumptions />
      </div>
    </div>
  );
};
export default InHandSalaryCalculator;
