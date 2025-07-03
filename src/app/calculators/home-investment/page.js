"use client";

import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import Heading from "@/components/Heading";
import { calculateHomeInvestmentBreakdown } from "@/utils/calculation";
import HomeInvestmentResult from "@/components/HomeInvestmentResult";
import HomeInvestmentAssumptions from "@/components/HomeInvestmentAssumptions";
import SliderInput from "@/components/SliderInput";
// import HomeInvestmentGraph from "@/components/HomeInvestmentGraph";

const HomeInvestmentCalculator = () => {
  // States for inputs
  const [propertyPrice, setPropertyPrice] = useState(5000000); // ₹50,00,000
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [annualMaintenance, setAnnualMaintenance] = useState(50000);
  const [propertyAppreciationRate, setPropertyAppreciationRate] = useState(6);
  const [monthlyRentalIncome, setMonthlyRentalIncome] = useState(25000);
  const [registrationFees, setRegistrationFees] = useState(300000);

  // Derived amounts
  const [loanAmount, setLoanAmount] = useState(0);
  const [downPaymentAmount, setDownPaymentAmount] = useState(0);

  // Display strings
  const [propertyPriceInput, setPropertyPriceInput] = useState("50,00,000");
  const [downPaymentPercentInput, setDownPaymentPercentInput] = useState("20%");
  const [interestRateInput, setInterestRateInput] = useState("8.5%");
  const [loanTermInput, setLoanTermInput] = useState("20 yrs");
  const [annualMaintenanceInput, setAnnualMaintenanceInput] =
    useState("50,000");
  const [propertyAppreciationRateInput, setPropertyAppreciationRateInput] =
    useState("6%");
  const [monthlyRentalIncomeInput, setMonthlyRentalIncomeInput] =
    useState("25,000");
  const [registrationFeesInput, setRegistrationFeesInput] =
    useState("3,00,000");

  // Results
  const [result, setResult] = useState(null);

  // Formatters
  const formatIndianNumber = (num) => num.toLocaleString("en-IN");
  const formatShortIndianCurrency = (amt) => {
    const num = parseInt(amt);
    if (num >= 1e7) return `${(num / 1e7).toFixed(1)}Cr`;
    if (num >= 1e5) return `${(num / 1e5).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return `${num}`;
  };
  const parseFormattedNumber = (str) =>
    parseInt(str.replace(/[^\d]/g, "")) || 0;
  const parseAndSet = (setter, value, min, max) => {
    const num = parseFloat(value.replace(/[₹,%\syrs]/g, ""));
    setter(isNaN(num) ? min : Math.min(Math.max(num, min), max));
  };

  // Calculate derived loan/down-payment and trigger calculation
  useEffect(() => {
    const dpAmt = (propertyPrice * downPaymentPercent) / 100;
    const loanAmt = propertyPrice - dpAmt;
    setDownPaymentAmount(dpAmt);
    setLoanAmount(loanAmt);

    // Auto-calculate results when inputs change
    calculate();
  }, []);

  // Display updates
  useEffect(() => setLoanTermInput(`${loanTerm} yrs`), [loanTerm]);
  useEffect(() => setInterestRateInput(`${interestRate}%`), [interestRate]);
  useEffect(
    () => setDownPaymentPercentInput(`${downPaymentPercent}%`),
    [downPaymentPercent]
  );
  useEffect(
    () => setPropertyAppreciationRateInput(`${propertyAppreciationRate}%`),
    [propertyAppreciationRate]
  );

  // Initial trigger
  useEffect(() => handleCalculate(), []);

  const handleCalculate = () => {
    calculate();
  };

  const calculate = () => {
    const calculationResult = calculateHomeInvestmentBreakdown({
      propertyPrice,
      downPaymentPercent,
      interestRate,
      loanTerm,
      annualMaintenance,
      propertyAppreciationRate,
      monthlyRentalIncome,
      registrationFees,
    });

    setResult(calculationResult);
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-2 sm:px-4 lg:px-6">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Home Investment Calculator"
          desc="Analyze your property investment returns and financing details"
        />

        <div className="rounded-2xl p-6 relative bg-white">
          {/* Property Purchase Price */}
          <SliderInput
            label="Property Price"
            value={propertyPrice}
            onChange={(val) => {
              setPropertyPrice(val);
              setPropertyPriceInput(val.toLocaleString("en-IN"));
            }}
            min={500000}
            max={100000000}
            step={100000}
            tooltip="Total purchase price of the property"
            showCurrency={true}
          />
          {/* Down Payment % */}
          <SliderInput
            label="Down Payment (%)"
            value={downPaymentPercent}
            onChange={(val) => {
              setDownPaymentPercent(val);
              setDownPaymentPercentInput(`${val}`);
            }}
            min={10}
            max={100}
            step={1}
            tooltip="Percentage paid upfront for the property"
            showCurrency={false}
          />
          {/* Down Payment and Loan Amount Display */}
          <div className="flex justify-between items-center text-[10px] pt-2 px-2 mb-2">
            <div className="flex flex-col gap-2">
              <span className="text-[#020288]">Down Payment</span>
              <span className="font-medium bg-[#EFEDF4] text-[#2D14A0] px-2 py-1 rounded-md">
                ₹{formatShortIndianCurrency(downPaymentAmount.toString())}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#020288]">Loan Amount</span>
              <span className="font-medium bg-[#EFEDF4] text-[#2D14A0] px-2 py-1 rounded-md">
                ₹{formatShortIndianCurrency(loanAmount.toString())}
              </span>
            </div>
          </div>
          {/* Interest Rate */}
          <SliderInput
            label="Loan Interest (%)"
            value={interestRate}
            onChange={(val) => {
              setInterestRate(val);
              setInterestRateInput(`${val}`);
            }}
            min={6}
            max={18}
            step={0.1}
            tooltip="Annual home loan interest rate"
            showCurrency={false}
          />
          {/* Loan Term */}
          <SliderInput
            label="Loan Term (years)"
            value={loanTerm}
            onChange={(val) => {
              setLoanTerm(val);
              setLoanTermInput(`${val}`);
            }}
            min={5}
            max={30}
            step={1}
            tooltip="Duration of home loan in years"
            showCurrency={false}
          />
          {/* Annual Maintenance */}
          <SliderInput
            label="Annual Maintenance"
            value={annualMaintenance}
            onChange={(val) => {
              setAnnualMaintenance(val);
              setAnnualMaintenanceInput(val.toLocaleString("en-IN"));
            }}
            min={0}
            max={500000}
            step={5000}
            tooltip="Yearly maintenance, repairs, and upkeep costs"
            showCurrency={true}
          />
          {/* Property Appreciation Rate */}
          <SliderInput
            label="Property Appreciation (%)"
            value={propertyAppreciationRate}
            onChange={(val) => {
              setPropertyAppreciationRate(val);
              setPropertyAppreciationRateInput(`${val}`);
            }}
            min={0}
            max={15}
            step={0.1}
            tooltip="Expected annual property value growth rate"
            showCurrency={false}
          />
          {/* Monthly Rental Income */}
          <SliderInput
            label="Monthly Rental Income"
            value={monthlyRentalIncome}
            onChange={(val) => {
              setMonthlyRentalIncome(val);
              setMonthlyRentalIncomeInput(val.toLocaleString("en-IN"));
            }}
            min={0}
            max={200000}
            step={1000}
            tooltip="Expected monthly rental income if renting out"
            showCurrency={true}
          />
          {/* Registration & Other Fees */}
          <SliderInput
            label="Registration & Fees"
            value={registrationFees}
            onChange={(val) => {
              setRegistrationFees(val);
              setRegistrationFeesInput(val.toLocaleString("en-IN"));
            }}
            min={0}
            max={1000000}
            step={10000}
            tooltip="Registration, stamp duty, legal fees, etc."
            showCurrency={true}
          />

          {/* <HomeInvestmentGraph result={result} /> */}
        </div>
        <button
          onClick={handleCalculate}
          className="w-full mt-2 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>
        <HomeInvestmentResult result={result} />
        <HomeInvestmentAssumptions />
      </div>
    </div>
  );
};

export default HomeInvestmentCalculator;
