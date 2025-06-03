"use client";

import { useState } from "react";
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
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const handleCalculate = () => {
    const emi = calculateEMI(loanAmount, tenure, interestRate);
    const totalInterest = emi * tenure * 12 - loanAmount;
    const totalPayment = emi * tenure * 12;

    setResult({
      emi,
      totalInterest,
      totalPayment,
      loanAmount,
      tenure,
      interestRate,
    });

    const amortizationSchedule = generateAmortizationSchedule(
      loanAmount,
      tenure,
      interestRate
    );
    setSchedule(amortizationSchedule.slice(0, 12));

    setChartData({
      labels: ["Principal", "Interest"],
      datasets: [
        {
          data: [loanAmount, totalInterest],
          backgroundColor: ["#AB78FF", "#A197BA"],
          borderColor: ["#AB78FF", "#A197BA"],
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-[#EFEDF4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4 sm:p-6">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D14A0] mb-2">
            Mortgage Calculator
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Calculate your monthly EMI for home loans based on loan amount,
            tenure, and interest rate.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="bg-[radial-gradient(circle_at_center,_#AB78FF,_#192226)] p-4 sm:p-6 rounded-lg text-white">
            <div className="mb-4 sm:mb-6">
              <label className="block mb-2 text-sm font-medium">
                Loan Amount: ₹{loanAmount.toLocaleString("en-IN")}
              </label>
              <Slider
                value={loanAmount}
                min={100000}
                max={10000000}
                step={10000}
                onChange={(e, val) => setLoanAmount(val)}
                sx={{ color: "#FFFFFF" }}
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block mb-2 text-sm font-medium">
                Loan Tenure: {tenure} years
              </label>
              <Slider
                value={tenure}
                min={1}
                max={30}
                step={1}
                onChange={(e, val) => setTenure(val)}
                sx={{ color: "#FFFFFF" }}
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block mb-2 text-sm font-medium">
                Interest Rate: {interestRate}%
              </label>
              <Slider
                value={interestRate}
                min={1}
                max={20}
                step={0.1}
                onChange={(e, val) => setInterestRate(val)}
                sx={{ color: "#FFFFFF" }}
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full mt-4 bg-white text-[#2D14A0] py-3 px-4 rounded-lg font-bold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-2"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-[#2D14A0] mb-4">
                Results
              </h3>
              <div className="space-y-4">
                <div className="p-4">
                  <p className="text-sm text-gray-600">Monthly EMI</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#2D14A0]">
                    ₹
                    {result.emi.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4">
                    <p className="text-sm text-gray-600">Total Interest</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ₹
                      {result.totalInterest.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600">Total Payment</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ₹
                      {result.totalPayment.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                {chartData && (
                  <div className="mt-4">
                    <h4 className="text-base sm:text-lg font-medium text-[#2D14A0] mb-3">
                      Payment Breakdown
                    </h4>
                    <div className="p-4">
                      <ChartDisplay data={chartData} type="pie" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {schedule.length > 0 && (
          <div className="mt-8 bg-gray-50 p-4 sm:p-6 rounded-lg overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-semibold text-[#2D14A0] mb-4">
              Amortization Schedule (First Year)
            </h3>
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-[#2D14A0] text-white">
                <tr>
                  <th className="px-3 py-2 text-left uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-3 py-2 text-left uppercase tracking-wider">
                    EMI
                  </th>
                  <th className="px-3 py-2 text-left uppercase tracking-wider">
                    Principal
                  </th>
                  <th className="px-3 py-2 text-left uppercase tracking-wider">
                    Interest
                  </th>
                  <th className="px-3 py-2 text-left uppercase tracking-wider">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedule.map((row, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 whitespace-nowrap">{row.month}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      ₹{row.emi.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      ₹{row.principal.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      ₹{row.interest.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      ₹{row.balance.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;
