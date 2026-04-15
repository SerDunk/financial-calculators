import React, { useRef, useEffect } from "react";
import * as Chart from "chart.js";

const CarLeaseGraph = ({ result }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const generateGraphData = () => {
    if (!result) return { labels: [], leaseData: [], loanData: [] };

    const labels = [];
    const leaseData = [];
    const loanData = [];
    
    const maxMonths = result.tenureMonths;
    const years = maxMonths / 12;

    for (let year = 1; year <= years; year++) {
      labels.push(`Year ${year}`);
      
      const loanCostSoFar = (year * 12) * result.totalMonthlyOutflowLoan;
      let leaseCostSoFar = (year * 12) * result.netEffectiveMonthlyLeaseCost;
      
      // Residual buyback outflow hits at the end of the term
      if (year === years) {
         leaseCostSoFar += result.residualBuyback;
      }
      
      loanData.push(loanCostSoFar);
      leaseData.push(leaseCostSoFar);
    }
    return { labels, leaseData, loanData };
  };

  const formatCurrency = (value) => {
    if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
    return `₹${value.toFixed(0)}`;
  };

  useEffect(() => {
    if (!chartRef.current || !result) return;
    const ctx = chartRef.current.getContext("2d");
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const { labels, leaseData, loanData } = generateGraphData();

    Chart.Chart.register(
      Chart.CategoryScale,
      Chart.LinearScale,
      Chart.LineElement,
      Chart.PointElement,
      Chart.LineController,
      Chart.Filler,
      Chart.Tooltip,
      Chart.Legend
    );

    chartInstance.current = new Chart.Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Cumulative Lease Outflow",
            data: leaseData,
            borderColor: "#FF9A9E",
            backgroundColor: (context) => {
              const chartCtx = context.chart.ctx;
              const gradient = chartCtx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, "rgba(255, 154, 158, 0.8)");
              gradient.addColorStop(1, "rgba(255, 154, 158, 0.1)");
              return gradient;
            },
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
          {
            label: "Cumulative Loan Outflow",
            data: loanData,
            borderColor: "#4facfe",
            backgroundColor: (context) => {
              const chartCtx = context.chart.ctx;
              const gradient = chartCtx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, "rgba(79, 172, 254, 0.8)");
              gradient.addColorStop(1, "rgba(79, 172, 254, 0.1)");
              return gradient;
            },
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
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
            displayColors: true,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: true,
              drawOnChartArea: false,
              drawTicks: true,
              tickLength: 8,
              tickColor: "#CCBBF4",
              tickWidth: 2,
            },
            border: { display: true, color: "#CCBBF4", width: 2 },
            ticks: {
              display: true,
              color: "#6B7280",
              font: { size: 10, weight: "500" },
              padding: 8,
            },
          },
          y: {
            display: true,
            beginAtZero: true,
            ticks: {
              display: true,
              color: "#6B7280",
              font: { size: 10, weight: "500" },
              padding: 8,
              callback: function(value) { return formatCurrency(value); }
            },
            grid: { display: false },
            border: { display: true, color: "#CCBBF4", width: 2 },
          }
        },
        elements: {
          line: { borderJoinStyle: "round" }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [result]);

  if (!result) return null;

  return (
    <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-[#020288] text-base font-semibold mb-1">Cumulative Outflow Over Time</h3>
        <p className="text-xs text-gray-500">Lease outflow includes final buyback residual</p>
      </div>
      <div className="h-80 w-full relative">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF9A9E]"></div>
          <span className="text-xs text-gray-600">Leasing Cost</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4facfe]"></div>
          <span className="text-xs text-gray-600">Loan Cost</span>
        </div>
      </div>
    </div>
  );
};

export default CarLeaseGraph;
