import React, { useRef, useEffect } from "react";
import * as Chart from "chart.js";

const BuyVsRentGraph = ({
  result,
  homePrice = 8000000,
  downPaymentPercent = 20,
  interestRate = 8.5,
  loanTerm = 20,
  monthlyRent = 25000,
  rentIncreasePercent = 5,
  investmentReturnPercent = 12,
  comparisonPeriod = 10,
  monthlyMaintenance = 2000,
  annualPropertyTaxPercent = 0.1,
  homeAppreciationPercent = 7,
  sellingCostPercent = 2,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Helper function to calculate EMI
  const calculateEMI = (principal, years, rate) => {
    const monthlyRate = rate / 100 / 12;
    const totalPayments = years * 12;
    return (
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1)
    );
  };

  // Helper function to calculate total rent with increases
  const calculateTotalRent = (monthlyRent, years, increasePercent) => {
    let totalRent = 0;
    let currentRent = monthlyRent;

    for (let year = 0; year < years; year++) {
      totalRent += currentRent * 12;
      currentRent = currentRent * (1 + increasePercent / 100);
    }

    return totalRent;
  };

  // Generate data for the graph using result values
  const generateGraphData = () => {
    if (!result) {
      return { labels: [], buyingData: [], rentingData: [] };
    }

    const labels = [];
    const buyingData = [];
    const rentingData = [];

    const finalComparisonPeriod = result.comparisonPeriod || comparisonPeriod;

    // Create progressive data points leading to the final result values
    for (let year = 1; year <= finalComparisonPeriod; year++) {
      labels.push(`${year}Y`);

      // Scale the final values proportionally for intermediate years
      // This creates a smooth progression to the final result
      const yearProgress = year / finalComparisonPeriod;

      // Use exponential scaling to simulate realistic wealth accumulation
      const scalingFactor = Math.pow(yearProgress, 1.5);

      const buyingValue = (result.netBuyGain || 0) * scalingFactor;
      const rentingValue = (result.netRentGain || 0) * scalingFactor;

      buyingData.push(Math.round(buyingValue / 100000)); // Convert to lakhs
      rentingData.push(Math.round(rentingValue / 100000)); // Convert to lakhs
    }

    return { labels, buyingData, rentingData };
  };

  // Format currency for Indian lakhs/crores (without rupee symbol)
  const formatCurrency = (value) => {
    if (value >= 100) {
      return `${(value / 100).toFixed(1)}Cr`;
    } else if (value >= 1) {
      return `${value}L`;
    } else if (value > 0) {
      return `${value.toFixed(1)}L`;
    } else if (value < 0) {
      return `-${Math.abs(value).toFixed(1)}L`;
    } else {
      return "0";
    }
  };

  // Calculate comparison metrics
  const getComparisonMetrics = () => {
    if (!result) {
      return {
        finalBuyingGains: 0,
        finalRentingGains: 0,
        betterOption: "Buying",
        wealthDifference: 0,
      };
    }

    const finalBuyingGains = Math.round((result.netBuyGain || 0) / 100000);
    const finalRentingGains = Math.round((result.netRentGain || 0) / 100000);
    const betterOption =
      finalBuyingGains > finalRentingGains ? "Buying" : "Renting";
    const wealthDifference = Math.abs(finalRentingGains - finalBuyingGains);

    return {
      finalBuyingGains,
      finalRentingGains,
      betterOption,
      wealthDifference,
    };
  };

  useEffect(() => {
    // Add null check for chartRef
    if (!chartRef.current) {
      return;
    }

    const ctx = chartRef.current.getContext("2d");
    const { labels, buyingData, rentingData } = generateGraphData();

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Register Chart.js components
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

    // Find max and min values for scaling
    const maxValue = Math.max(...buyingData, ...rentingData, 0);
    const minValue = Math.min(...buyingData, ...rentingData, 0);

    // Calculate fixed step size for consistent spacing
    const range = Math.max(maxValue - minValue, 20);
    const stepSize = Math.ceil(range / 8); // Aim for ~8 steps

    // Round to nice numbers
    const niceStepSize =
      stepSize <= 5
        ? 5
        : stepSize <= 10
        ? 10
        : stepSize <= 20
        ? 20
        : stepSize <= 50
        ? 50
        : Math.ceil(stepSize / 10) * 10;

    const yAxisMin = Math.floor(minValue / niceStepSize) * niceStepSize;
    const yAxisMax = Math.ceil(maxValue / niceStepSize) * niceStepSize;

    chartInstance.current = new Chart.Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Buying Net Gain",
            data: buyingData,
            borderColor: "#AB78FF",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, "rgba(171, 120, 255, 0.8)");
              gradient.addColorStop(1, "rgba(171, 120, 255, 0.1)");
              return gradient;
            },
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
          {
            label: "Renting Net Gain",
            data: rentingData,
            borderColor: "#FD9CD0",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, "rgba(253, 156, 208, 0.8)");
              gradient.addColorStop(1, "rgba(253, 156, 208, 0.1)");
              return gradient;
            },
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
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
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#374151",
            bodyColor: "#374151",
            borderColor: "#E5E7EB",
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${formatCurrency(
                  context.parsed.y
                )}`;
              },
            },
          },
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
            border: {
              display: true,
              color: "#CCBBF4",
              width: 2,
            },
            ticks: {
              display: true,
              color: "#6B7280",
              font: {
                size: 10,
                weight: "500",
              },
              padding: 8,
              maxRotation: 0,
              minRotation: 0,
              autoSkip: false,
            },
          },
          y: {
            display: true,
            min: yAxisMin,
            max: yAxisMax,
            ticks: {
              display: true,
              stepSize: niceStepSize,
              color: "#6B7280",
              font: {
                size: 10,
                weight: "500",
              },
              padding: 8,
              callback: function (value) {
                return formatCurrency(value);
              },
            },
            grid: {
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            border: {
              display: true,
              color: "#CCBBF4",
              width: 2,
            },
          },
        },
        elements: {
          line: {
            borderJoinStyle: "round",
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [
    homePrice,
    downPaymentPercent,
    interestRate,
    loanTerm,
    monthlyRent,
    rentIncreasePercent,
    investmentReturnPercent,
    comparisonPeriod,
    monthlyMaintenance,
    annualPropertyTaxPercent,
    homeAppreciationPercent,
    sellingCostPercent,
    result,
  ]);

  // Early return if no result data
  if (!result) {
    return (
      <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
        <div className="text-center text-gray-500">
          <p>No calculation results available</p>
        </div>
      </div>
    );
  }

  const {
    finalBuyingGains,
    finalRentingGains,
    betterOption,
    wealthDifference,
  } = getComparisonMetrics();

  return (
    <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
      <div className="mb-6">
        <p className="text-xs text-gray-600">
          Net gains from buying vs renting + investing over{" "}
          {result?.displayedTenure || comparisonPeriod} years
        </p>
      </div>

      <div className="h-80 w-full relative">
        <canvas ref={chartRef}></canvas>
      </div>

      {/* Custom Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#AB78FF]"></div>
          <span className="text-xs text-gray-600">Buying Net Gain</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FD9CD0]"></div>
          <span className="text-xs text-gray-600">Renting Net Gain</span>
        </div>
      </div>

      {/* Summary box */}
      <div
        className={`mt-6 rounded-lg p-4 ${
          betterOption === "Buying" ? "bg-purple-50" : "bg-pink-50"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <span
            className={`text-sm font-medium ${
              betterOption === "Buying" ? "text-purple-800" : "text-pink-800"
            }`}
          >
            {betterOption} is Better
          </span>
          <span
            className={`text-xs ${
              betterOption === "Buying" ? "text-purple-600" : "text-pink-600"
            }`}
          >
            After {result?.displayedTenure || comparisonPeriod} years
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Wealth Advantage</span>
          <span
            className={`text-sm font-semibold ${
              betterOption === "Buying" ? "text-purple-800" : "text-pink-800"
            }`}
          >
            {formatCurrency(wealthDifference)}
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <div>
            Buying: {formatCurrency(finalBuyingGains)} • Renting:{" "}
            {formatCurrency(finalRentingGains)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyVsRentGraph;
