import React, { useRef, useEffect } from "react";
import * as Chart from "chart.js/auto";

const formatCurrencyAxis = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
  return `₹${value}`;
};

const formatCurrencyTooltip = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;

export default function RetirementGraph({ result }) {
  const buildUpChartRef = useRef(null);
  const depletionChartRef = useRef(null);
  const buildUpInstance = useRef(null);
  const depletionInstance = useRef(null);

  useEffect(() => {
    if (!result || !result.buildUpChartData || result.buildUpChartData.length === 0) return;

    // Build-up Chart
    if (buildUpChartRef.current) {
      const ctx = buildUpChartRef.current.getContext("2d");
      if (buildUpInstance.current) buildUpInstance.current.destroy();

      const labels = result.buildUpChartData.map(d => d.age.toString());
      const dataDebt = result.buildUpChartData.map(d => d.Debt);
      const dataPPF = result.buildUpChartData.map(d => d.PPF);
      const dataEPF = result.buildUpChartData.map(d => d.EPF);
      const dataNPS = result.buildUpChartData.map(d => d.NPS);
      const dataEquity = result.buildUpChartData.map(d => d.Equity);
      const dataTarget = result.buildUpChartData.map(d => d.Target);

      buildUpInstance.current = new Chart.Chart(ctx, {
        data: {
          labels,
          datasets: [
            {
              type: 'line',
              label: 'Target',
              data: dataTarget,
              borderColor: '#ef4444',
              borderWidth: 2,
              borderDash: [5, 5],
              fill: false,
              pointRadius: 0,
              stack: 'TargetStack' // separate stack
            },
            {
              type: 'line',
              label: 'Debt',
              data: dataDebt,
              borderColor: '#607d8b',
              backgroundColor: 'rgba(96, 125, 139, 0.5)',
              fill: true,
              pointRadius: 0,
              stack: 'MainStack'
            },
            {
              type: 'line',
              label: 'PPF',
              data: dataPPF,
              borderColor: '#9c27b0',
              backgroundColor: 'rgba(156, 39, 176, 0.5)',
              fill: true,
              pointRadius: 0,
              stack: 'MainStack'
            },
            {
              type: 'line',
              label: 'EPF',
              data: dataEPF,
              borderColor: '#4caf50',
              backgroundColor: 'rgba(76, 175, 80, 0.5)',
              fill: true,
              pointRadius: 0,
              stack: 'MainStack'
            },
            {
              type: 'line',
              label: 'NPS',
              data: dataNPS,
              borderColor: '#ff9800',
              backgroundColor: 'rgba(255, 152, 0, 0.5)',
              fill: true,
              pointRadius: 0,
              stack: 'MainStack'
            },
            {
              type: 'line',
              label: 'Equity',
              data: dataEquity,
              borderColor: '#03a9f4',
              backgroundColor: 'rgba(3, 169, 244, 0.5)',
              fill: true,
              pointRadius: 0,
              stack: 'MainStack'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: { 
               labels: { boxWidth: 12, font: { size: 10 } }
            },
            tooltip: {
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              titleColor: "#374151",
              bodyColor: "#374151",
              borderColor: "#E5E7EB",
              borderWidth: 1,
              cornerRadius: 8,
              callbacks: { 
                 label: (ctx) => `${ctx.dataset.label}: ${formatCurrencyTooltip(ctx.raw)}` 
              }
            }
          },
          scales: {
            x: { 
              display: true,
              title: { display: true, text: 'Age', font: { size: 10 }, color: "#6B7280" },
              ticks: { font: { size: 10 }, color: "#6B7280" },
              grid: { display: false }
            },
            y: { 
              stacked: true, 
              ticks: { callback: formatCurrencyAxis, font: { size: 10 }, color: "#6B7280" },
              grid: { color: "#F3F4F6", drawBorder: false }
            }
          }
        }
      });
    }

    // Depletion Chart
    if (depletionChartRef.current && result.depletionChartData && result.depletionChartData.length > 0) {
      const ctx = depletionChartRef.current.getContext("2d");
      if (depletionInstance.current) depletionInstance.current.destroy();

      const labels = result.depletionChartData.map(d => d.age.toString());
      const corpusVal = result.depletionChartData.map(d => d.CorpusVal);
      const withdrawal = result.depletionChartData.map(d => d.Withdrawal);

      depletionInstance.current = new Chart.Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Remaining Corpus",
              data: corpusVal,
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              fill: true,
              tension: 0.4,
              pointRadius: 0,
            },
            {
              label: "Annual Withdrawal",
              data: withdrawal,
              borderColor: "#f43f5e",
              borderWidth: 2,
              fill: false,
              pointRadius: 0,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: { 
               labels: { boxWidth: 12, font: { size: 10 } }
            },
            tooltip: {
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              titleColor: "#374151",
              bodyColor: "#374151",
              borderColor: "#E5E7EB",
              borderWidth: 1,
              cornerRadius: 8,
              callbacks: { 
                 label: (ctx) => `${ctx.dataset.label}: ${formatCurrencyTooltip(ctx.raw)}` 
              }
            }
          },
          scales: {
            x: { 
               display: true,
               title: { display: true, text: 'Age', font: { size: 10 }, color: "#6B7280" },
               ticks: { font: { size: 10 }, color: "#6B7280" },
               grid: { display: false }
            },
            y: { 
               ticks: { callback: formatCurrencyAxis, font: { size: 10 }, color: "#6B7280" },
               grid: { color: "#F3F4F6", drawBorder: false }
            }
          }
        }
      });
    }

    return () => {
      if (buildUpInstance.current) buildUpInstance.current.destroy();
      if (depletionInstance.current) depletionInstance.current.destroy();
    };
  }, [result]);

  if (!result || !result.buildUpChartData || result.buildUpChartData.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm overflow-hidden text-sm">
        <h2 className="text-[#020288] text-base font-semibold mb-4 border-b pb-2">Corpus Build-Up (By Age)</h2>
        <div className="h-64 w-full relative">
          <canvas ref={buildUpChartRef}></canvas>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm overflow-hidden text-sm">
        <h2 className="text-[#020288] text-base font-semibold mb-4 border-b pb-2">Retirement Depletion (Post-Retirement)</h2>
        <div className="h-64 w-full relative">
          <canvas ref={depletionChartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
