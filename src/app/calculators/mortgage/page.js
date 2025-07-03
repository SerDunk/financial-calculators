"use client";

import { useState, useEffect } from "react";
import { tipData, headingData } from "@/constants/displayData";
import {
  calculateTotalCostBreakdown,
  generateAmortizationSchedule,
  getYearlyAmortization,
} from "@/utils/calculation";
import { formatShortIndianCurrency } from "@/utils/formatting";
import Heading from "@/components/Heading";
import SliderInput from "@/components/SliderInput";
import MortgageResult from "@/components/MortgageResult"; // Import the new component

const MortgageCalculator = () => {
  // Input states remain the same
  const [homePrice, setHomePrice] = useState(8000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [propertyTaxes, setPropertyTaxes] = useState(8000);
  const [homeInsurance, setHomeInsurance] = useState(3000);
  const [otherCosts, setOtherCosts] = useState(4000);
  const [loanAmount, setLoanAmount] = useState(6400000);

  // Results and chart data states remain the same
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [displayedTenure, setDisplayedTenure] = useState(20);
  const [amortizationTable, setAmortizationTable] = useState([]);

  // useEffect hooks remain the same
  useEffect(() => {
    const initialLoanAmount = homePrice * (1 - downPaymentPercent / 100);
    setLoanAmount(initialLoanAmount);
    performCalculations(
      initialLoanAmount,
      tenure,
      interestRate,
      propertyTaxes,
      homeInsurance,
      otherCosts
    );
  }, []);

  useEffect(() => {
    const calculatedLoanAmount = homePrice * (1 - downPaymentPercent / 100);
    setLoanAmount(calculatedLoanAmount);
  }, [homePrice, downPaymentPercent]);

  // performCalculations function remains the same
  const performCalculations = (
    loanAmt,
    tenureYrs,
    rate,
    propTax,
    homeIns,
    otherCost
  ) => {
    const costBreakdown = calculateTotalCostBreakdown(
      loanAmt,
      tenureYrs,
      rate,
      propTax,
      homeIns,
      otherCost
    );
    setResult({
      emi: costBreakdown.loanEMI,
      totalInterest: costBreakdown.totalInterest,
      totalPayment: costBreakdown.totalLoanPayments,
      totalCost: costBreakdown.totalCost,
      totalMonthlyPayment: costBreakdown.totalMonthlyPayment,
      monthlyPropertyTax: costBreakdown.monthlyPropertyTax,
      monthlyHomeInsurance: costBreakdown.monthlyHomeInsurance,
      monthlyOtherCosts: costBreakdown.monthlyOtherCosts,
      totalPropertyTax: costBreakdown.totalPropertyTax,
      totalHomeInsurance: costBreakdown.totalHomeInsurance,
      totalOtherCosts: costBreakdown.totalOtherCosts,
    });
    const amortizationSchedule = generateAmortizationSchedule(
      loanAmt,
      tenureYrs,
      rate
    );
    setAmortizationTable(amortizationSchedule);
    setChartData({
      labels: [
        "Principal",
        "Interest",
        "Property Tax",
        "Home Insurance",
        "Other Costs",
      ],
      datasets: [
        {
          data: [
            loanAmt,
            costBreakdown.totalInterest,
            costBreakdown.totalPropertyTax,
            costBreakdown.totalHomeInsurance,
            costBreakdown.totalOtherCosts,
          ],
          backgroundColor: [
            "#AB78FF",
            "#F4B6D2",
            "#CAF5BD",
            "#45D099",
            "#97A9FF",
          ],
          borderWidth: 1,
        },
      ],
    });
    setDisplayedTenure(tenureYrs);
  };

  const handleCalculate = () => {
    performCalculations(
      loanAmount,
      tenure,
      interestRate,
      propertyTaxes,
      homeInsurance,
      otherCosts
    );
  };

  const yearlyAmortization = getYearlyAmortization(amortizationTable);

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0">
      <div className="max-w-xl mx-auto">
        <Heading
          header={headingData.mortgage.heading}
          desc={headingData.mortgage.desc}
        />
        <div className="rounded-2xl p-6 relative bg-white">
          {/* All SliderInput components remain here */}
          <SliderInput
            label="Home Price"
            value={homePrice}
            onChange={(val) => setHomePrice(val)}
            min={500000}
            max={50000000}
            step={100000}
            tooltip={tipData.homePrice}
            showCurrency={true}
          />
          <div className="mb-1">
            <SliderInput
              label="Down Payment (%)"
              value={downPaymentPercent}
              onChange={(val) => setDownPaymentPercent(val)}
              min={5}
              max={50}
              step={1}
              tooltip={tipData.downPayment}
              showCurrency={false}
            />
            <div className="flex justify-between items-center text-[10px] px-6 mb-6">
              <div className="flex flex-col gap-2">
                <span className="text-[#020288]">Down Payment</span>
                <span className="font-medium bg-[#EAE9F0] text-[#2D14A0] px-2 py-1 rounded-md">
                  ₹
                  {formatShortIndianCurrency(
                    ((homePrice * downPaymentPercent) / 100).toString()
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#020288]">Loan Amount</span>
                <span className="font-medium bg-[#EAE9F0] text-[#2D14A0] px-2 py-1 rounded-md">
                  ₹{formatShortIndianCurrency(loanAmount.toString())}
                </span>
              </div>
            </div>
          </div>
          <SliderInput
            label="Loan Tenure (years)"
            value={tenure}
            onChange={(val) => setTenure(val)}
            min={1}
            max={50}
            step={1}
            tooltip={tipData.tenure}
            showCurrency={false}
          />
          <SliderInput
            label="Interest Rate (%)"
            value={interestRate}
            onChange={(val) => setInterestRate(val)}
            min={1}
            max={20}
            step={0.5}
            tooltip={tipData.interestRate}
            showCurrency={false}
          />
          <SliderInput
            label="Property Taxes (Annual)"
            value={propertyTaxes}
            onChange={(val) => setPropertyTaxes(val)}
            min={0}
            max={50000}
            step={1000}
            tooltip={tipData.propertyTax}
            showCurrency={true}
          />
          <SliderInput
            label="Home Insurance (Annual)"
            value={homeInsurance}
            onChange={(val) => setHomeInsurance(val)}
            min={0}
            max={50000}
            step={1000}
            tooltip={tipData.homeInsurance}
            showCurrency={true}
          />
          <SliderInput
            label="Other Costs (Monthly)"
            value={otherCosts}
            onChange={(val) => setOtherCosts(val)}
            min={0}
            max={50000}
            step={1000}
            tooltip={tipData.otherCosts}
            showCurrency={true}
          />
        </div>
        <button
          onClick={handleCalculate}
          className="w-full sm:mt-2 mt-4 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>

        {/* --- REFACTORED PART --- */}
        {/* Render the new component and pass all necessary data as props */}
        <MortgageResult
          result={result}
          chartData={chartData}
          loanAmount={loanAmount}
          downPayment={(homePrice * downPaymentPercent) / 100}
          interestRate={interestRate}
          displayedTenure={displayedTenure}
          amortizationTable={amortizationTable}
          yearlyAmortization={yearlyAmortization}
        />
        {/* --- END OF REFACTORED PART --- */}
      </div>
    </div>
  );
};

export default MortgageCalculator;
