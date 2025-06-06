"use client";

import { useState, useEffect, useRef } from "react";
import { Slider } from "@mui/material";
import ChartDisplay from "@/components/ChartDisplay";
import {
  calculateEMI,
  generateAmortizationSchedule,
  getYearlyAmortization,
} from "@/utils/calculation";

import AmortizationSchedule from "@/components/AmortisationSchedule";

// Safe formatter
const formatShortIndianCurrency = (amount) => {
  amount = parseInt(amount) || 0;
  if (amount >= 10000000) {
    return (amount / 10000000).toFixed(2).replace(/\.00$/, "") + " Cr";
  } else if (amount >= 100000) {
    return (amount / 100000).toFixed(2).replace(/\.00$/, "") + " L";
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(2).replace(/\.00$/, "") + " K";
  }
  return amount.toString();
};

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenure, setTenure] = useState(10);
  const [interestRate, setInterestRate] = useState(8);

  const [loanAmountInput, setLoanAmountInput] = useState("5000000");
  const [tenureInput, setTenureInput] = useState("10 yrs");
  const [interestRateInput, setInterestRateInput] = useState("8%");

  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  const [displayedTenure, setDisplayedTenure] = useState(tenure);
  const [amortizationTable, setAmortizationTable] = useState([]);
  const [showAmortization, setShowAmortization] = useState(false);

  useEffect(() => {
    updateChart(loanAmount, tenure, interestRate);
  }, []);

  useEffect(() => {
    setTenureInput(`${tenure} yrs`);
  }, [tenure]);

  useEffect(() => {
    setInterestRateInput(`${interestRate}%`);
  }, [interestRate]);

  const parseAndSetNumericValue = (setter, value, min, max) => {
    const numericValue = parseFloat(value.replace(/[₹,%\syrs]/g, ""));
    if (!isNaN(numericValue)) {
      const constrainedValue = Math.min(Math.max(numericValue, min), max);
      setter(constrainedValue);
    } else {
      setter(min);
    }
  };

  const updateChart = (loanAmt, tenureYrs, rate) => {
    const emi = calculateEMI(loanAmt, tenureYrs, rate);
    const totalInterest = emi * tenureYrs * 12 - loanAmt;
    const totalPayment = emi * tenureYrs * 12;

    setResult({ emi, totalInterest, totalPayment });

    const amortizationSchedule = generateAmortizationSchedule(
      loanAmt,
      tenureYrs,
      rate
    );
    setAmortizationTable(amortizationSchedule);

    setChartData({
      labels: ["Principal", "Interest"],
      datasets: [
        {
          data: [loanAmt, totalInterest],
          backgroundColor: ["#583FCA", "#FD9CD0"],
          borderWidth: 1,
        },
      ],
    });
  };

  const handleCalculate = () => {
    updateChart(loanAmount, tenure, interestRate);
    setDisplayedTenure(tenure);
  };

  const yearlyAmortization = getYearlyAmortization(amortizationTable);

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-5 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold text-[#2D14A0] mb-2">
          Mortgage Calculator
        </h2>
        <p className="text-xs sm:text-sm text-[#686868] mb-4">
          Calculate your monthly EMI based on loan amount, tenure, and interest
          rate.
        </p>
        <div
          className="rounded-2xl p-6"
          style={{
            background:
              "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
          }}
        >
          {/* Loan Amount */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center text-white font-medium">
              <label>Loan Amount</label>

              <div className="flex items-center text-xs bg-white px-1 py-1 rounded-lg">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-18 text-center outline-none focus:ring-0"
                  value={loanAmountInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setLoanAmountInput(raw);
                    setLoanAmount(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setLoanAmountInput(raw);
                  }}
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setLoanAmount,
                      loanAmountInput,
                      100000,
                      10000000
                    )
                  }
                />
              </div>
            </div>
            <div className="text-[10px] text-white flex justify-end pt-2 px-2">
              ({formatShortIndianCurrency(loanAmountInput)})
            </div>

            <Slider
              value={loanAmount}
              min={100000}
              max={10000000}
              step={10000}
              onChange={(e, val) => {
                setLoanAmount(val);
                setLoanAmountInput(val.toString());
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
          <div>
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
        </div>
        <button
          onClick={handleCalculate}
          className="w-full sm:mt-2 mt-4 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>
        {/* Output + Chart */}
        <div className="sm:mt-2 mt-4 sm:text-sm bg-white py-1 px-3 rounded-lg">
          <div className="mt-4 p-3 bg-[#F5F4F7] rounded-xl font-semibold text-xs text-[#323233] text-center">
            In {displayedTenure} yrs, your total payment would be
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
              {result?.totalPayment?.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>

          <div className="py-3">
            <div className="text-xs flex justify-between px-4 text-[#323233]">
              <span>Total Interest</span>
              <span className="text-[#020288]">
                ₹{" "}
                {result?.totalInterest?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="text-xs flex justify-between px-4 text-[#323233] py-2">
              <span>Monthly EMI</span>
              <span className="text-[#020288]">
                ₹{" "}
                {result?.emi?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>

          <div className="flex justify-center py-2">
            {chartData && <ChartDisplay data={chartData} type="pie" />}
          </div>
        </div>
        <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm">
          <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
            Assumptions & Formula
          </div>
          <div className="bg-white p-4 text-xs text-[#686868] space-y-2 rounded-lg">
            <div className="flex justify-between">
              <span>Loan Amount</span>
              <span className="text-[#2C178C]">
                ₹ {loanAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Interest Rate</span>
              <span className="text-[#2C178C]">{interestRate} %</span>
            </div>
            <div className="flex justify-between">
              <span>Loan Tenure</span>
              <span className="text-[#2C178C]">{tenure} yrs</span>
            </div>
            <div className="rounded-xl px-4 py-2 bg-[#F5F4F7] mt-3 flex justify-between items-center">
              <span className="text-sm text-[#323233]">Final Amount</span>
              <span
                className="font-semibold text-sm"
                style={{
                  background: "linear-gradient(to right,#320992 30%,#F04393)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹{" "}
                {result?.totalPayment?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="mt-4 p-3 bg-[#F5F4F7] rounded-xl text-xs text-[#323233]">
              Formula Used:{" "}
              <span className="text-[#F04393] font-medium">
                EMI = [P × r × (1 + r)<sup>n</sup>] / [(1 + r)<sup>n</sup> – 1]
              </span>
              , where P is principal, r is monthly interest rate, and n is
              number of months.
            </div>
          </div>
        </div>

        {/* Amortization Schedule Section */}
        <AmortizationSchedule
          amortizationTable={amortizationTable}
          yearlyAmortization={yearlyAmortization}
        />
      </div>
    </div>
  );
};

export default MortgageCalculator;
