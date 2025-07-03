"use client";

import { useState, useEffect } from "react";

import { calculateBuyVsRentBreakdown } from "@/utils/calculation";
import Heading from "@/components/Heading";
import BuyVsRentResults from "@/components/BuyVsRentResult";
import BuyVsRentAssumptions from "@/components/AssumptionsBVR";
import BuyVsRentGraph from "@/components/BuyVsRentGraph";
import SliderInput from "@/components/SliderInput";

const BuyVsRentCalculator = () => {
  // State for all calculator inputs
  const [homePrice, setHomePrice] = useState(6000000); // ₹60,00,000
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20%
  const [interestRate, setInterestRate] = useState(8); // 8%
  const [loanTerm, setLoanTerm] = useState(20); // 20 years
  const [monthlyRent, setMonthlyRent] = useState(18000); // ₹18,000
  const [rentIncreasePercent, setRentIncreasePercent] = useState(5); // 5% annually
  const [investmentReturnPercent, setInvestmentReturnPercent] = useState(10); // 10% annually
  const [comparisonPeriod, setComparisonPeriod] = useState(10); // 10 years

  // Calculated values
  const [loanAmount, setLoanAmount] = useState(4800000); // 80% of 60L
  const [downPaymentAmount, setDownPaymentAmount] = useState(1200000);

  // Input display states
  const [homePriceInput, setHomePriceInput] = useState("60,00,000");
  const [downPaymentPercentInput, setDownPaymentPercentInput] = useState("20%");
  const [interestRateInput, setInterestRateInput] = useState("8%");
  const [loanTermInput, setLoanTermInput] = useState("20 yrs");
  const [monthlyRentInput, setMonthlyRentInput] = useState("18,000");
  const [rentIncreasePercentInput, setRentIncreasePercentInput] =
    useState("5%");
  const [investmentReturnPercentInput, setInvestmentReturnPercentInput] =
    useState("10%");
  const [comparisonPeriodInput, setComparisonPeriodInput] = useState("10 yrs");

  // Results - these will only update when Calculate is pressed
  const [result, setResult] = useState(null);

  // Calculation functions

  useEffect(() => {
    const initialLoanAmount = homePrice * (1 - downPaymentPercent / 100);
    const initialDownPayment = homePrice * (downPaymentPercent / 100);
    setLoanAmount(initialLoanAmount);
    setDownPaymentAmount(initialDownPayment);

    // Perform initial calculation with default values
    performCalculations();
  }, []); // Empty dependency array to run only once on mount

  // Update loan amount and down payment when home price or down payment percent changes
  useEffect(() => {
    const calculatedLoanAmount = homePrice * (1 - downPaymentPercent / 100);
    const calculatedDownPayment = homePrice * (downPaymentPercent / 100);
    setLoanAmount(calculatedLoanAmount);
    setDownPaymentAmount(calculatedDownPayment);
  }, [homePrice, downPaymentPercent]);

  // Update input display when values change
  useEffect(() => {
    setLoanTermInput(`${loanTerm} yrs`);
  }, [loanTerm]);

  useEffect(() => {
    setInterestRateInput(`${interestRate}%`);
  }, [interestRate]);

  useEffect(() => {
    setDownPaymentPercentInput(`${downPaymentPercent}%`);
  }, [downPaymentPercent]);

  useEffect(() => {
    setRentIncreasePercentInput(`${rentIncreasePercent}%`);
  }, [rentIncreasePercent]);

  useEffect(() => {
    setInvestmentReturnPercentInput(`${investmentReturnPercent}%`);
  }, [investmentReturnPercent]);

  useEffect(() => {
    setComparisonPeriodInput(`${comparisonPeriod} yrs`);
  }, [comparisonPeriod]);

  // Format number with Indian comma separation
  const formatIndianNumber = (num) => {
    return num.toLocaleString("en-IN");
  };

  const formatShortIndianCurrency = (amount) => {
    const num = parseInt(amount);
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(1)}Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Parse formatted number back to numeric value
  const parseFormattedNumber = (str) => {
    return parseInt(str.replace(/[^\d]/g, "")) || 0;
  };

  const parseAndSetNumericValue = (setter, value, min, max) => {
    const numericValue = parseFloat(value.replace(/[₹,%\syrs]/g, ""));
    if (!isNaN(numericValue)) {
      const constrainedValue = Math.min(Math.max(numericValue, min), max);
      setter(constrainedValue);
    } else {
      setter(min);
    }
  };

  // Separate function to perform calculations
  const performCalculations = () => {
    const breakdown = calculateBuyVsRentBreakdown(
      homePrice,
      downPaymentPercent,
      interestRate,
      loanTerm,
      0.5,
      0.7,
      7,
      2,
      monthlyRent,
      rentIncreasePercent,
      investmentReturnPercent,
      comparisonPeriod
    );

    if (!breakdown) return;

    const netBuyGain = breakdown.netHomeEquity - breakdown.totalBuyingCost;
    const netRentGain = breakdown.investmentReturn;
    const betterOption = netBuyGain > netRentGain ? "Buying" : "Renting";

    setResult({
      loanAmount: breakdown.loanAmount,
      monthlyEMI: breakdown.loanEMI,
      downPayment: breakdown.downPayment,
      totalEMIs: breakdown.totalLoanPayments,
      totalTax: breakdown.totalPropertyTax,
      totalOther: breakdown.totalMaintenance + breakdown.totalSellingCost,
      totalHomeCost: breakdown.totalBuyingCost,
      totalRentPaid: breakdown.totalRentPaid,
      netBuyGain: netBuyGain,
      netRentGain: netRentGain,
      totalMonthlyOutflowBuy: breakdown.totalMonthlyPayment,
      totalMonthlyOutflowRent: breakdown.monthlyRentPaid,
      comparisonPeriod: comparisonPeriod,
      decision: betterOption,
      savings: Math.abs(netBuyGain - netRentGain),
      betterOption,
      displayedTenure: comparisonPeriod,
      chartData: [
        {
          name: "Buy - Cost",
          value: breakdown.totalBuyingCost,
          color: "#AB78FF",
        },
        {
          name: "Rent - Cost",
          value: breakdown.totalRentPaid,
          color: "#F4B6D2",
        },
      ],
    });
  };

  // Handle Calculate button click
  const handleCalculate = () => {
    performCalculations();
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Buy vs Rent Calculator"
          desc="Compare the financial impact of buying vs renting to make an informed decision"
        />

        {/* SLIDERS SECTION ABSTRACTED - Insert your slider components here */}
        <div className="flex flex-col gap-2">
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3">
              Buying
            </h2>
            <div className="flex flex-col gap-4 mt-3 ml-2">
              {/* Home Price */}
              <SliderInput
                label="Home Price"
                value={homePrice}
                onChange={(val) => {
                  setHomePrice(val);
                  setHomePriceInput(val.toLocaleString("en-IN"));
                }}
                min={500000}
                max={50000000}
                step={50000}
                tooltip="The total price of the home you're considering to buy"
                showCurrency={true}
              />

              {/* Down Payment % */}
              <div className="mb-1">
                <SliderInput
                  label="Down Payment (%)"
                  value={downPaymentPercent}
                  onChange={(val) => {
                    setDownPaymentPercent(val);
                    setDownPaymentPercentInput(`${val}`);
                  }}
                  min={5}
                  max={50}
                  step={1}
                  tooltip="Percentage of home price you'll pay upfront"
                  showCurrency={false}
                />
                {/* Down Payment and Loan Amount Display */}
                <div className="flex justify-between items-center text-[10px] px-6 mb-6">
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
              </div>

              {/* Interest Rate */}
              <SliderInput
                label="Housing Interest (%)"
                value={interestRate}
                onChange={(val) => {
                  setInterestRate(val);
                  setInterestRateInput(`${val}`);
                }}
                min={1}
                max={20}
                step={0.5}
                tooltip="Annual interest rate on your home loan"
                showCurrency={false}
              />

              {/* Loan Tenure */}
              <SliderInput
                label="Loan Tenure (years)"
                value={loanTerm}
                onChange={(val) => {
                  setLoanTerm(val);
                  setLoanTermInput(`${val}`);
                }}
                min={1}
                max={30}
                step={1}
                tooltip="Duration of your home loan in years"
                showCurrency={false}
              />
            </div>
          </div>
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3">
              Renting
            </h2>
            <div className="flex flex-col gap-2 ml-2">
              {/* Monthly Rent */}
              <SliderInput
                label="Monthly Rent"
                value={monthlyRent}
                onChange={(val) => {
                  setMonthlyRent(val);
                  setMonthlyRentInput(val.toLocaleString("en-IN"));
                }}
                min={1000}
                max={200000}
                step={1000}
                tooltip="Current monthly rent for a similar property"
                showCurrency={true}
              />

              {/* Rent Increase % */}
              <SliderInput
                label="Rent Increase (%)"
                value={rentIncreasePercent}
                onChange={(val) => {
                  setRentIncreasePercent(val);
                  setRentIncreasePercentInput(`${val}`);
                }}
                min={0}
                max={15}
                step={0.5}
                tooltip="Expected annual percentage increase in rent"
                showCurrency={false}
              />

              {/* Investment Return % */}
              <SliderInput
                label="Investment Return (%)"
                value={investmentReturnPercent}
                onChange={(val) => {
                  setInvestmentReturnPercent(val);
                  setInvestmentReturnPercentInput(`${val}`);
                }}
                min={1}
                max={25}
                step={0.5}
                tooltip="Expected annual return on investing your down payment savings"
                showCurrency={false}
              />

              {/* Comparison Period */}
              <SliderInput
                label="Comparison (years)"
                value={comparisonPeriod}
                onChange={(val) => {
                  setComparisonPeriod(val);
                  setComparisonPeriodInput(`${val}`);
                }}
                min={1}
                max={50}
                step={1}
                tooltip="Number of years to compare buying vs renting"
                showCurrency={false}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleCalculate}
          className="w-full sm:mt-2 mt-4 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>

        {/* Decision Header */}
        <BuyVsRentResults result={result} comparisonPeriod={comparisonPeriod} />
        <BuyVsRentGraph result={result} />
        {/* Chart Placeholder */}
        <BuyVsRentAssumptions />
      </div>
    </div>
  );
};

export default BuyVsRentCalculator;
