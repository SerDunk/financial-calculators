"use client";

import { useState, useEffect, useRef } from "react";
import { Slider } from "@mui/material";
import ChartDisplay from "@/components/ChartDisplay";
import {
  calculateEMI,
  calculateTotalCostBreakdown,
  generateAmortizationSchedule,
  getYearlyAmortization,
} from "@/utils/calculation";

import AmortizationSchedule from "@/components/AmortisationSchedule";
import Assumptions from "@/components/Assumptions";
import { formatShortIndianCurrency } from "@/utils/formatting";

const MortgageCalculator = () => {
  // Updated default values as per your requirements
  const [homePrice, setHomePrice] = useState(8000000); // ₹80,00,000
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20%
  const [tenure, setTenure] = useState(20); // 20 years
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [propertyTaxes, setPropertyTaxes] = useState(8000); // ₹8,000
  const [homeInsurance, setHomeInsurance] = useState(3000); // ₹3,000
  const [otherCosts, setOtherCosts] = useState(4000); // ₹4,000

  // Calculated loan amount (80% of home price with 20% down payment)
  const [loanAmount, setLoanAmount] = useState(6400000); // 80% of 80L

  // Input display states
  const [tenureInput, setTenureInput] = useState("20 yrs");
  const [interestRateInput, setInterestRateInput] = useState("8.5%");
  const [homePriceInput, setHomePriceInput] = useState("8000000");
  const [downPaymentPercentInput, setDownPaymentPercentInput] = useState("20%");
  const [propertyTaxesInput, setPropertyTaxesInput] = useState("8000");
  const [homeInsuranceInput, setHomeInsuranceInput] = useState("3000");
  const [otherCostsInput, setOtherCostsInput] = useState("4000");

  // Results and chart data - these will only update when Calculate is pressed
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [displayedTenure, setDisplayedTenure] = useState(20);
  const [amortizationTable, setAmortizationTable] = useState([]);

  // Initialize with default calculation on component mount
  useEffect(() => {
    // Calculate initial values with defaults
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
  }, []); // Empty dependency array - only run once on mount

  // Update loan amount when home price or down payment changes (but don't recalculate results)
  useEffect(() => {
    const calculatedLoanAmount = homePrice * (1 - downPaymentPercent / 100);
    setLoanAmount(calculatedLoanAmount);
  }, [homePrice, downPaymentPercent]);

  // Update input display when values change
  useEffect(() => {
    setTenureInput(`${tenure} yrs`);
  }, [tenure]);

  useEffect(() => {
    setInterestRateInput(`${interestRate}%`);
  }, [interestRate]);

  useEffect(() => {
    setDownPaymentPercentInput(`${downPaymentPercent}%`);
  }, [downPaymentPercent]);

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
  const performCalculations = (
    loanAmt,
    tenureYrs,
    rate,
    propTax,
    homeIns,
    otherCost
  ) => {
    // Calculate total cost breakdown including all expenses
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
      totalPayment: costBreakdown.totalLoanPayments, // This is just loan payments
      totalCost: costBreakdown.totalCost, // This includes all costs
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

    // Update chart to show breakdown of total cost, not just loan
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
            "#583FCA",
            "#FD9CD0",
            "#FF6B6B",
            "#4ECDC4",
            "#45B7D1",
          ],
          borderWidth: 1,
        },
      ],
    });

    setDisplayedTenure(tenureYrs);
  };

  // Handle Calculate button click - this is the only place calculations should update
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
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-2 sm:px-4 lg:px-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold text-[#2D14A0] mb-2">
          Mortgage Calculator
        </h2>
        <p className="text-xs sm:text-sm text-[#686868] mb-4">
          Calculate your monthly EMI based on home price, down payment, tenure,
          and interest rate including all associated costs.
        </p>
        <div
          className="rounded-2xl p-6"
          style={{
            background:
              "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
          }}
        >
          {/* Home Price */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center text-white font-medium">
              <label>Home Price</label>

              <div className="flex items-center text-xs bg-white px-1 py-1 rounded-lg">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-18 text-center outline-none focus:ring-0"
                  value={homePriceInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setHomePriceInput(raw);
                    setHomePrice(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setHomePriceInput(raw);
                  }}
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setHomePrice,
                      homePriceInput,
                      500000,
                      50000000
                    )
                  }
                />
              </div>
            </div>
            <div className="text-[10px] text-white flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(homePriceInput)}
            </div>

            <Slider
              value={homePrice}
              min={500000}
              max={50000000}
              step={50000}
              onChange={(e, val) => {
                setHomePrice(val);
                setHomePriceInput(val.toString());
              }}
              sx={{
                color: "#fff",
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                },
              }}
            />
          </div>

          {/* Down Payment % */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <label>Down Payment</label>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-16 text-center outline-none focus:ring-0"
                  value={downPaymentPercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setDownPaymentPercentInput(raw);
                    setDownPaymentPercent(raw === "" ? 0 : parseFloat(raw));
                  }}
                  onFocus={(e) =>
                    setDownPaymentPercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setDownPaymentPercent,
                      downPaymentPercentInput,
                      5,
                      50
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={downPaymentPercent}
              min={5}
              max={50}
              step={1}
              onChange={(e, val) => {
                setDownPaymentPercent(val);
                setDownPaymentPercentInput(`${val}`);
              }}
              sx={{
                color: "#fff",
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                },
              }}
            />
          </div>

          {/* Tenure */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <label>Loan Tenure</label>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-20 text-center outline-none focus:ring-0"
                  value={tenureInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setTenureInput(raw);
                    setTenure(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) =>
                    setTenureInput(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(setTenure, tenureInput, 1, 30)
                  }
                />
              </div>
            </div>
            <Slider
              value={tenure}
              min={1}
              max={30}
              step={1}
              onChange={(e, val) => {
                setTenure(val);
                setTenureInput(`${val}`);
              }}
              sx={{
                color: "#fff",
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                },
              }}
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <label>Interest Rate</label>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-16 text-center outline-none focus:ring-0"
                  value={interestRateInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setInterestRateInput(raw);
                    setInterestRate(raw === "" ? 0 : parseFloat(raw));
                  }}
                  onFocus={(e) =>
                    setInterestRateInput(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setInterestRate,
                      interestRateInput,
                      1,
                      20
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={interestRate}
              min={1}
              max={20}
              step={0.1}
              onChange={(e, val) => {
                setInterestRate(val);
                setInterestRateInput(`${val}`);
              }}
              sx={{
                color: "#fff",
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                },
              }}
            />
          </div>

          {/* Property Taxes */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center text-white font-medium">
              <label>Property Taxes (Annual)</label>

              <div className="flex items-center text-xs bg-white px-1 py-1 rounded-lg">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-18 text-center outline-none focus:ring-0"
                  value={propertyTaxesInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setPropertyTaxesInput(raw);
                    setPropertyTaxes(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setPropertyTaxesInput(raw);
                  }}
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setPropertyTaxes,
                      propertyTaxesInput,
                      0,
                      500000
                    )
                  }
                />
              </div>
            </div>
            <div className="text-[10px] text-white flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(propertyTaxesInput)}
            </div>

            <Slider
              value={propertyTaxes}
              min={0}
              max={50000}
              step={1000}
              onChange={(e, val) => {
                setPropertyTaxes(val);
                setPropertyTaxesInput(val.toString());
              }}
              sx={{
                color: "#fff",
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                },
              }}
            />
          </div>

          {/* Home Insurance */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center text-white font-medium">
              <label>Home Insurance (Annual)</label>

              <div className="flex items-center text-xs bg-white px-1 py-1 rounded-lg">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-18 text-center outline-none focus:ring-0"
                  value={homeInsuranceInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setHomeInsuranceInput(raw);
                    setHomeInsurance(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setHomeInsuranceInput(raw);
                  }}
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setHomeInsurance,
                      homeInsuranceInput,
                      0,
                      100000
                    )
                  }
                />
              </div>
            </div>
            <div className="text-[10px] text-white flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(homeInsuranceInput)}
            </div>

            <Slider
              value={homeInsurance}
              min={0}
              max={50000}
              step={500}
              onChange={(e, val) => {
                setHomeInsurance(val);
                setHomeInsuranceInput(val.toString());
              }}
              sx={{
                color: "#fff",
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                },
              }}
            />
          </div>

          {/* Other Costs */}
          <div>
            <div className="flex text-sm justify-between items-center text-white font-medium">
              <label>Other Costs (Monthly)</label>

              <div className="flex items-center text-xs bg-white px-1 py-1 rounded-lg">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-18 text-center outline-none focus:ring-0"
                  value={otherCostsInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setOtherCostsInput(raw);
                    setOtherCosts(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setOtherCostsInput(raw);
                  }}
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setOtherCosts,
                      otherCostsInput,
                      0,
                      50000
                    )
                  }
                />
              </div>
            </div>
            <div className="text-[10px] text-white flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(otherCostsInput)}
            </div>

            <Slider
              value={otherCosts}
              min={0}
              max={50000}
              step={500}
              onChange={(e, val) => {
                setOtherCosts(val);
                setOtherCostsInput(val.toString());
              }}
              sx={{
                color: "#fff",
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                },
              }}
            />
          </div>
        </div>
        <button
          onClick={handleCalculate}
          className="w-full sm:mt-2 mt-4 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>

        {/* Output + Chart */}
        <div className="sm:mt-2 mt-4 sm:text-sm bg-white py-1 px-3 rounded-lg">
          <div className="mt-4 py-3 bg-[#F5F4F7] rounded-xl font-semibold text-xs text-[#323233] text-center">
            Loan Amount
            <br />
            <span
              className="text-lg font-bold p-2"
              style={{
                background: "linear-gradient(to right,#320992 30%,#F04393)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ₹{" "}
              {loanAmount?.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </span>
            <div className="mt-2 p-3 bg-[#F5F4F7] rounded-xl font-semibold text-xs text-[#323233] text-center">
              Total Monthly Payment
              <br />
              <span
                className="text-lg font-bold p-2"
                style={{
                  background: "linear-gradient(to right,#320992 30%,#F04393)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹{" "}
                {result?.totalMonthlyPayment?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="p-3 font-semibold text-xs text-[#323233] text-center">
              In {displayedTenure} yrs, your total cost would be
              <br />
              <span
                className="text-lg font-bold p-2"
                style={{
                  background: "linear-gradient(to right,#320992 30%,#F04393)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹{" "}
                {result?.totalCost?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>

          <div className="py-4 flex flex-col gap-1">
            <div className="text-xs flex justify-between px-4 text-[#323233]">
              <span>Loan EMI</span>
              <span className="text-[#020288]">
                ₹{" "}
                {result?.emi?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="text-xs flex justify-between px-4 text-[#323233] py-1">
              <span>Property Tax (Monthly)</span>
              <span className="text-[#020288]">
                ₹{" "}
                {result?.monthlyPropertyTax?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="text-xs flex justify-between px-4 text-[#323233] py-1">
              <span>Home Insurance (Monthly)</span>
              <span className="text-[#020288]">
                ₹{" "}
                {result?.monthlyHomeInsurance?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="text-xs flex justify-between px-4 text-[#323233] py-1">
              <span>Other Costs (Monthly)</span>
              <span className="text-[#020288]">
                ₹{" "}
                {result?.monthlyOtherCosts?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <hr className="my-2 mx-4" />
            <div className="text-xs flex justify-between px-4 text-[#323233] font-semibold">
              <span>Total Interest (Loan Only)</span>
              <span className="text-[#020288]">
                ₹{" "}
                {result?.totalInterest?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>

          <div className="flex justify-center py-2">
            {chartData && <ChartDisplay data={chartData} type="pie" />}
          </div>
        </div>

        {/* Amortization Schedule Section */}
        <AmortizationSchedule
          amortizationTable={amortizationTable}
          yearlyAmortization={yearlyAmortization}
        />

        {/* Assumptions*/}
        <Assumptions />
      </div>
    </div>
  );
};

export default MortgageCalculator;
