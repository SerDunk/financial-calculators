// InvestmentResult.jsx
import React from "react";
import {
  Calculator,
  PieChart,
  TrendingUp,
  BarChartHorizontal,
} from "lucide-react";
import { formatters } from "@/utils/calculation";

const InvestmentResult = ({ result }) => {
  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-medium mb-2">Awaiting Calculation...</h3>
          <p className="text-sm">
            Your investment projection will appear here.
          </p>
        </div>
      </div>
    );
  }

  const { title, mainResult, summaryText, breakdown, yearlyData } = result;

  return (
    <div className="sm:mt-2 mt-2 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-[#AB78FF]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <TrendingUp size={28} className="text-[#020288]" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          {title}
        </h2>
        <p className="text-sm text-[#666666]">{summaryText}</p>
      </div>

      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4 text-center">
        <div className="text-xs text-[#666666] mb-1">{mainResult.label}</div>
        <div className="text-3xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
          {formatters.formatIndianCurrency(mainResult.value)}
        </div>
      </div>

      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <PieChart className="text-[#B3BEF5] mr-3" size={30} />
          <div>
            <h3 className="font-semibold text-[#2C178C]">
              Investment Breakdown
            </h3>
            <p className="text-xs text-[#666666]">Principal vs. Interest</p>
          </div>
        </div>
        <div className="space-y-2">
          {breakdown.map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-gray-600">{item.label}</span>
              <span className="font-semibold text-[#2C178C]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB]">
        <div className="flex items-center mb-4">
          <BarChartHorizontal className="text-[#B3BEF5] mr-3" size={30} />
          <div>
            <h3 className="font-semibold text-[#2C178C]">
              Yearly Growth Table
            </h3>
            <p className="text-xs text-[#666666]">End-of-year projections</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-gray-500">
              <tr>
                <th className="py-2 px-1">Year</th>
                <th className="py-2 px-1">Invested</th>
                <th className="py-2 px-1">Interest</th>
                <th className="py-2 px-1 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="font-medium text-[#2C178C]">
              {yearlyData.map((row) => (
                <tr key={row.year} className="border-t border-gray-200">
                  <td className="py-2 px-1">{row.year}</td>
                  <td className="py-2 px-1">{row.totalInvestment}</td>
                  <td className="py-2 px-1">{row.interestEarned}</td>
                  <td className="py-2 px-1 text-right font-semibold">
                    {row.endBalance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default InvestmentResult;
