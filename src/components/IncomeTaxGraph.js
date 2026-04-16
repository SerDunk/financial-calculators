import React, { useRef, useEffect } from "react";
import * as Chart from "chart.js/auto";

const IncomeTaxGraph = ({ result }) => {
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const barChartInstance = useRef(null);
  const lineChartInstance = useRef(null);

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toFixed(0)}`;
  };

  // Generate Data for Line Chart
  const generateLineGraphData = () => {
    const labels = [];
    const newRegimeRates = [];
    const oldRegimeRates = [];
    
    // Evaluate across a range of incomes from ₹5L to ₹50L
    const step = 200000;
    for (let income = 500000; income <= 5000000; income += step) {
      if (income >= 100000) {
        labels.push(`${income / 100000}L`);
      } else {
        labels.push(income.toString());
      }
      
      // Calculate effective rates at this income points 
      // based on the deductions selected by user
      const oldTaxable = Math.max(0, income - (result?.oldRegime?.totalDeductions || 0));
      const newTaxable = Math.max(0, income - (result?.newRegime?.totalDeductions || 0));
      
      // We will roughly simulate the effective rate to plot the curve
      let newRegimeTax = 0;
      if (newTaxable > 1200000) {
        // Simplified calculation for curve (doesn't account for marginal exactly, but smooths out)
        if (newTaxable <= 1600000) newRegimeTax = 60000 + (newTaxable - 1200000) * 0.15;
        else if (newTaxable <= 2000000) newRegimeTax = 120000 + (newTaxable - 1600000) * 0.20;
        else if (newTaxable <= 2400000) newRegimeTax = 200000 + (newTaxable - 2000000) * 0.25;
        else newRegimeTax = 300000 + (newTaxable - 2400000) * 0.30;
      }
      const newCess = newRegimeTax * 0.04;
      const effectiveNew = income > 0 ? ((newRegimeTax + newCess) / income) * 100 : 0;
      newRegimeRates.push(effectiveNew);

      let oldRegimeTax = 0;
      if (oldTaxable > 500000) {
        if (oldTaxable <= 1000000) oldRegimeTax = 12500 + (oldTaxable - 500000) * 0.20;
        else oldRegimeTax = 112500 + (oldTaxable - 1000000) * 0.30;
      }
      const oldCess = oldRegimeTax * 0.04;
      const effectiveOld = income > 0 ? ((oldRegimeTax + oldCess) / income) * 100 : 0;
      oldRegimeRates.push(effectiveOld);
    }
    
    return { labels, newRegimeRates, oldRegimeRates };
  };

  useEffect(() => {
    if (!result || !barChartRef.current || !lineChartRef.current) return;

    // 1. Bar Chart Setup
    const barCtx = barChartRef.current.getContext("2d");
    if (barChartInstance.current) {
       barChartInstance.current.destroy();
    }
    
    const newBgColor = barCtx.createLinearGradient(0, 0, 0, 400);
    newBgColor.addColorStop(0, "#FF9A9E");
    newBgColor.addColorStop(1, "#FECFEF");

    const oldBgColor = barCtx.createLinearGradient(0, 0, 0, 400);
    oldBgColor.addColorStop(0, "#4facfe");
    oldBgColor.addColorStop(1, "#00f2fe");

    barChartInstance.current = new Chart.Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["Total Tax Payable (₹)"],
        datasets: [
          {
            label: "New Regime",
            data: [result.newRegime.totalTax],
            backgroundColor: newBgColor,
            borderRadius: 8,
            barPercentage: 0.6,
            categoryPercentage: 0.4
          },
          {
            label: "Old Regime",
            data: [result.oldRegime.totalTax],
            backgroundColor: oldBgColor,
            borderRadius: 8,
            barPercentage: 0.6,
            categoryPercentage: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#374151",
            bodyColor: "#374151",
            borderColor: "#E5E7EB",
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: {
            display: true,
            ticks: {
              font: { size: 10 },
              color: "#6B7280",
              callback: (val) => formatCurrency(val)
            },
            grid: { color: "#F3F4F6" },
            border: { display: false }
          }
        }
      }
    });

    // 2. Line Chart Setup (Effective Rate)
    const lineCtx = lineChartRef.current.getContext("2d");
    if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
    }

    const { labels, newRegimeRates, oldRegimeRates } = generateLineGraphData();

    lineChartInstance.current = new Chart.Chart(lineCtx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "New Regime (%)",
            data: newRegimeRates,
            borderColor: "#FF9A9E",
            backgroundColor: "rgba(255, 154, 158, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 5,
          },
          {
            label: "Old Regime (%)",
            data: oldRegimeRates,
            borderColor: "#4facfe",
            backgroundColor: "rgba(79, 172, 254, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 5,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#374151",
            bodyColor: "#374151",
            borderColor: "#E5E7EB",
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`
            }
          }
        },
        scales: {
          x: {
            display: true,
            grid: { display: false },
            ticks: { font: { size: 10 }, color: "#6B7280", maxTicksLimit: 10 },
            border: { color: "#E5E7EB" },
            title: { display: true, text: "Gross Income (Lakhs)", font: { size: 10, weight: "600" }, color: "#6B7280" }
          },
          y: {
            display: true,
            grid: { color: "#F3F4F6", drawBorder: false },
            ticks: {
              font: { size: 10 },
              color: "#6B7280",
              callback: (val) => `${val}%`
            },
            title: { display: true, text: "Effective Rate (%)", font: { size: 10, weight: "600" }, color: "#6B7280" }
          }
        }
      }
    });

    return () => {
      if (barChartInstance.current) barChartInstance.current.destroy();
      if (lineChartInstance.current) lineChartInstance.current.destroy();
    };
  }, [result]);

  if (!result) return null;

  return (
    <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-[#020288] text-lg font-semibold mb-1">Tax Comparison</h3>
        <p className="text-xs text-gray-500">Visualizing your tax burden and effective rates</p>
      </div>
      
      <div className="flex flex-col gap-8 md:flex-row md:gap-4 mt-6">
          <div className="w-full md:w-1/3">
             <div className="text-center text-sm font-medium text-[#2C178C] mb-2">Total Tax Payable</div>
             <div className="h-64 w-full relative">
                <canvas ref={barChartRef}></canvas>
             </div>
          </div>
          <div className="w-full md:w-2/3">
             <div className="text-center text-sm font-medium text-[#2C178C] mb-2">Effective Tax Rate Curve</div>
             <div className="h-64 w-full relative">
               <canvas ref={lineChartRef}></canvas>
             </div>
          </div>
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF9A9E]"></div>
          <span className="text-xs text-gray-600">New Regime</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4facfe]"></div>
          <span className="text-xs text-gray-600">Old Regime</span>
        </div>
      </div>
    </div>
  );
};

export default IncomeTaxGraph;
