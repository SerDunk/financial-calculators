import React, { useRef, useEffect } from "react";
import * as Chart from "chart.js/auto";

const CAGRBenchmarkChart = ({ result }) => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  useEffect(() => {
    if (!result || !result.timeline || result.timeline.length === 0) return;
    if (!lineChartRef.current || !barChartRef.current) return;

    const { timeline, benchmarks } = result;

    // 1. Line Chart Setup (Growth Curve)
    const lineCtx = lineChartRef.current.getContext("2d");
    if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
    }

    const labels = timeline.map(t => t.year);
    const corpusData = timeline.map(t => t.corpus);
    const fdData = timeline.map(t => t.fdBenchmark);
    const inflationData = timeline.map(t => t.inflationAdjusted);

    const corpusColor = lineCtx.createLinearGradient(0, 0, 0, 300);
    corpusColor.addColorStop(0, "rgba(88, 63, 202, 0.4)");
    corpusColor.addColorStop(1, "rgba(88, 63, 202, 0.05)");

    const fdColor = lineCtx.createLinearGradient(0, 0, 0, 300);
    fdColor.addColorStop(0, "rgba(79, 172, 254, 0.4)");
    fdColor.addColorStop(1, "rgba(79, 172, 254, 0.05)");

    lineChartInstance.current = new Chart.Chart(lineCtx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Your Portfolio",
            data: corpusData,
            borderColor: "#583FCA",
            backgroundColor: corpusColor,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
          {
            label: "7% Safe Benchmark",
            data: fdData,
            borderColor: "#4facfe",
            backgroundColor: fdColor,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
          {
            label: "Inflation Adjusted (Base)",
            data: inflationData,
            borderColor: "#ff9a9e",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
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
          legend: { 
            position: 'top',
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
              label: (context) => `${context.dataset.label}: ₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(context.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 10 }, color: "#6B7280" },
            title: { display: true, text: "Years", font: { size: 10 }, color: "#6B7280" }
          },
          y: {
            grid: { color: "#F3F4F6" },
            ticks: {
              font: { size: 10 },
              color: "#6B7280",
              callback: (val) => formatCurrency(val)
            }
          }
        }
      }
    });

    // 2. Bar Chart Setup (Benchmarks)
    const barCtx = barChartRef.current.getContext("2d");
    if (barChartInstance.current) {
        barChartInstance.current.destroy();
    }

    const sortedBenchmarks = [...benchmarks].reverse(); // Ascending for horizontal bar
    const barLabels = sortedBenchmarks.map(b => b.name);
    const barData = sortedBenchmarks.map(b => b.postTaxCorpus);
    const barColors = sortedBenchmarks.map(b => b.isUser ? "#583FCA" : "#A5B4FC");

    barChartInstance.current = new Chart.Chart(barCtx, {
      type: "bar",
      data: {
        labels: barLabels,
        datasets: [
          {
            label: "Post-Tax Corpus",
            data: barData,
            backgroundColor: barColors,
            borderRadius: 4,
            barPercentage: 0.6,
          }
        ]
      },
      options: {
        indexAxis: 'y',
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
               label: (context) => {
                  const b = sortedBenchmarks[context.dataIndex];
                  return [
                     `Post-Tax: ₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(b.postTaxCorpus)}`,
                     `CAGR Used: ${b.cagr.toFixed(1)}%`
                  ];
               }
            }
          }
        },
        scales: {
          x: {
            grid: { color: "#F3F4F6" },
            ticks: {
              font: { size: 10 },
              color: "#6B7280",
              callback: (val) => formatCurrency(val)
            }
          },
          y: {
            grid: { display: false },
            ticks: { font: { size: 10 }, color: "#374151" }
          }
        }
      }
    });

    return () => {
      if (lineChartInstance.current) lineChartInstance.current.destroy();
      if (barChartInstance.current) barChartInstance.current.destroy();
    };

  }, [result]);

  if (!result || !result.timeline || result.timeline.length === 0) return null;

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Growth Curve */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-sm font-semibold text-[#020288] mb-4 text-center">Wealth Compounding vs Inflation</h3>
        <div className="h-[250px] w-full relative">
          <canvas ref={lineChartRef}></canvas>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-sm font-semibold text-[#020288] mb-4 text-center">Post-Tax Corpus by Asset Class</h3>
        <div className="h-[300px] w-full relative">
          <canvas ref={barChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default CAGRBenchmarkChart;
