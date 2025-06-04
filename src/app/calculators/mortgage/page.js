"use client";

import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import ChartDisplay from "@/components/ChartDisplay";
import {
  calculateEMI,
  generateAmortizationSchedule,
} from "@/utils/calculation";

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenure, setTenure] = useState(10);
  const [interestRate, setInterestRate] = useState(8);

  const [loanAmountInput, setLoanAmountInput] = useState("");
  const [tenureInput, setTenureInput] = useState("");
  const [interestRateInput, setInterestRateInput] = useState("");

  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setLoanAmountInput(`${loanAmount.toLocaleString("en-IN")}`);
    setTenureInput(`${tenure} yrs`);
    setInterestRateInput(`${interestRate}%`);
    updateChart(loanAmount, tenure, interestRate);
  }, [loanAmount, tenure, interestRate]);

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

    setChartData({
      labels: ["Principal", "Interest"],
      datasets: [
        {
          data: [loanAmt, totalInterest],
          backgroundColor: ["#AB78FF", "#FD9CD0"],
          borderWidth: 1,
        },
      ],
    });
  };

  const handleCalculate = () => {
    updateChart(loanAmount, tenure, interestRate);
  };

  return (
    <div className="min-h-screen bg-[#EFEDF4] px-5 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl font-bold text-[#2D14A0] mb-2">
          Mortgage Calculator
        </h2>
        <p className="text-sm text-[#686868] mb-4">
          Calculate your monthly EMI based on loan amount, tenure, and interest
          rate.
        </p>

        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            background: "radial-gradient(circle at center, #8362D1, #192226)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div className="mb-5">
            <div className="flex justify-between items-center mb-1 text-white font-medium">
              <label>Loan Amount</label>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <span className="mr-1 text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] border-none w-20 text-center outline-none focus:ring-0"
                  value={loanAmountInput}
                  onChange={(e) => setLoanAmountInput(e.target.value)}
                  onFocus={(e) =>
                    setLoanAmountInput(e.target.value.replace(/[₹,\s]/g, ""))
                  }
                  onBlur={(e) => {
                    parseAndSetNumericValue(
                      setLoanAmount,
                      e.target.value,
                      100000,
                      10000000
                    );
                  }}
                />
              </div>
            </div>
            <Slider
              value={loanAmount}
              min={100000}
              max={10000000}
              step={10000}
              onChange={(e, val) => {
                setLoanAmount(val);
                setLoanAmountInput(val.toLocaleString("en-IN"));
              }}
              sx={{
                color: "#fff",
                "& .MuiSlider-thumb": {
                  backgroundImage: `url('/slider.svg')`,
                  backgroundSize: "cover",
                  backgroundColor: "transparent",
                  width: 24,
                  height: 24,
                },
              }}
            />
          </div>

          <div className="mb-5">
            <div className="flex justify-between items-center mb-1 text-white font-medium">
              <label>Loan Tenure</label>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] border-none w-20 text-center outline-none focus:ring-0"
                  value={tenureInput}
                  onChange={(e) => setTenureInput(e.target.value)}
                  onFocus={(e) =>
                    setTenureInput(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  onBlur={(e) => {
                    parseAndSetNumericValue(setTenure, e.target.value, 1, 30);
                    setTenureInput(`${tenure} yrs`);
                  }}
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
                setTenureInput(`${val} yrs`);
              }}
              sx={{
                color: "#fff",
                "& .MuiSlider-thumb": {
                  backgroundImage: `url('/slider.svg')`,
                  backgroundSize: "cover",
                  backgroundColor: "transparent",
                  width: 24,
                  height: 24,
                },
              }}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 text-white font-medium">
              <label>Interest Rate</label>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] border-none w-16 text-center outline-none focus:ring-0"
                  value={interestRateInput}
                  onChange={(e) => setInterestRateInput(e.target.value)}
                  onFocus={(e) =>
                    setInterestRateInput(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  onBlur={(e) => {
                    parseAndSetNumericValue(
                      setInterestRate,
                      e.target.value,
                      1,
                      20
                    );
                    setInterestRateInput(`${interestRate}%`);
                  }}
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
                setInterestRateInput(`${val.toFixed(1)}%`);
              }}
              sx={{
                color: "#fff",
                "& .MuiSlider-thumb": {
                  backgroundImage: `url('/slider.svg')`,
                  backgroundSize: "cover",
                  backgroundColor: "transparent",
                  width: 24,
                  height: 24,
                },
              }}
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full sm:mt-2 bg-[#2C178C] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>

        <div className="sm:mt-6 mt-5 bg-white p-3 rounded-lg ">
          <div className="mt-4 p-3 bg-[#F5F4F7] rounded-xl font-semibold text-sm text-[#323233] text-center">
            In {tenure} yrs, your total payment would be
            <br />
            <span
              className="text-xl font-bold p-2"
              style={{
                background: "linear-gradient(to right, #F04393, #320992)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ₹
              {result?.totalPayment.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>

          <div className="py-2">
            <div className="text-sm flex justify-between px-4 text-[#323233] my-2">
              <span>Total Interest</span>
              <span className="text-[#020288]">
                ₹
                {result?.totalInterest.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="text-sm flex justify-between px-4 text-[#323233] py-2">
              <span>Monthly EMI</span>
              <span className="text-[#020288]">
                ₹
                {result?.emi.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <div className="flex justify-center py-6">
            {chartData && <ChartDisplay data={chartData} type="pie" />}
          </div>
        </div>

        {/* Assumptions Section */}
        <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm">
          <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
            Assumptions & Formula
          </div>
          <div className="bg-white p-4 text-xs text-[#686868] space-y-2 rounded-lg">
            <div className="flex justify-between">
              <span>Loan Amount</span>
              <span className="text-[#2C178C]">₹ 50,00,000</span>
            </div>
            <div className="flex justify-between">
              <span>Interest Rate</span>
              <span className="text-[#2C178C]">8 %</span>
            </div>
            <div className="flex justify-between">
              <span>Loan Tenure</span>
              <span className="text-[#2C178C]">10 yrs</span>
            </div>

            {/* Styled Final Amount */}
            <div className="rounded-xl px-4 py-2 bg-[#F5F4F7] mt-3 flex justify-between items-center">
              <span className="text-sm text-[#323233]">Final Amount</span>
              <span
                className="font-semibold text-sm"
                style={{
                  background: "linear-gradient(to right, #F04393, #320992)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹ 72,79,656
              </span>
            </div>

            {/* Formula with superscripts */}
            <div className="mt-4 p-3 bg-[#F5F4F7] rounded-xl text-xs text-[#323233]">
              Formula Used:{" "}
              <span className="text-[#D20F87] font-medium">
                EMI = [P × r × (1 + r)<sup>n</sup>] / [(1 + r)<sup>n</sup> – 1]
              </span>
              , where P is principal, r is monthly interest rate, and n is
              number of months.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
