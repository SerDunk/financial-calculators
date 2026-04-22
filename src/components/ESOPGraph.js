import React, { useRef, useEffect } from "react";
import * as Chart from "chart.js/auto";

const ESOPGraph = ({ result }) => {
  const stackedBarRef = useRef(null);
  const comparisonBarRef = useRef(null);
  const stackedChartInstance = useRef(null);
  const comparisonChartInstance = useRef(null);

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
    return `₹${value.toFixed(0)}`;
  };

  useEffect(() => {
    if (!result || !result.summary || !stackedBarRef.current) return;

    const ctxStacked = stackedBarRef.current.getContext("2d");
    if (stackedChartInstance.current) {
      stackedChartInstance.current.destroy();
    }

    stackedChartInstance.current = new Chart.Chart(ctxStacked, {
      type: "bar",
      data: {
        labels: [""],
        datasets: [
          {
            label: "Cash Paid",
            data: [result.summary.cashPaidToExercise],
            backgroundColor: "#1A237E",
            barThickness: window.innerWidth < 768 ? 40 : 80,
          },
          {
            label: "Perquisite Tax",
            data: [result.summary.totalPerquisiteTax],
            backgroundColor: "#E53935",
            barThickness: window.innerWidth < 768 ? 40 : 80,
          },
          {
            label: "CG Tax",
            data: [result.summary.totalCGTax],
            backgroundColor: "#FB8C00",
            barThickness: window.innerWidth < 768 ? 40 : 80,
          },
          {
            label: "Net Gain",
            data: [result.summary.netGainAfterTax],
            backgroundColor: "#43A047",
            barThickness: window.innerWidth < 768 ? 40 : 80,
            borderRadius: { topRight: 4, bottomRight: 4 }
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            position: 'bottom',
            labels: { font: { size: 11 }, padding: 15, usePointStyle: true, pointStyle: 'circle' }
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#374151",
            bodyColor: "#374151",
            borderColor: "#E5E7EB",
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${formatCurrency(context.parsed.x)}`
            }
          }
        },
        scales: {
          x: { 
            stacked: true, 
            display: true,
            ticks: { font: { size: 10 }, color: "#6B7280", callback: (val) => formatCurrency(val) },
            grid: { color: "#F3F4F6", drawBorder: false }
          },
          y: { 
            stacked: true, 
            display: false,
            grid: { display: false }
          }
        }
      }
    });

    if (comparisonBarRef.current && result.capitalGains && result.capitalGains.totalCapitalGain > 0) {
        const ctxComparison = comparisonBarRef.current.getContext("2d");
        if (comparisonChartInstance.current) {
            comparisonChartInstance.current.destroy();
        }

        const totalGain = result.capitalGains.totalCapitalGain;
        let stcgTax = 0;
        let ltcgTax = 0;
        
        // Simulating the STCG vs LTCG based on standard rules
        // For Listed (assumes STT paid)
        // Listed STCG: 20%, LTCG: 12.5% (>1.25L)
        // Unlisted STCG: Slab Rate, LTCG: 12.5%

        if (result.capitalGains.cgTaxRate === 20 || (result.capitalGains.ltcgExemptionUsed !== "N/A" && result.capitalGains.cgTaxRate === 12.5)) {
            // Listed simulation
            stcgTax = totalGain * 0.20;
            ltcgTax = Math.max(0, totalGain - 125000) * 0.125;
        } else {
            // Unlisted simulation
            stcgTax = totalGain * (result.perquisite.marginalSlabRate / 100);
            ltcgTax = totalGain * 0.125;
        }

        // Add some rudimentary surcharge & cess proportionally
        stcgTax = stcgTax * 1.04; // Simple cess proxy
        ltcgTax = ltcgTax * 1.04;

        comparisonChartInstance.current = new Chart.Chart(ctxComparison, {
            type: "bar",
            data: {
                labels: ["If STCG", "If LTCG"],
                datasets: [{
                    label: "Estimated CG Tax",
                    data: [stcgTax, ltcgTax],
                    backgroundColor: ["#FB8C00", "#43A047"],
                    borderRadius: 4,
                    barPercentage: 0.5
                }]
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
                            label: (context) => `Tax: ${formatCurrency(context.parsed.y)}`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 11, weight: 'bold' }, color: "#4B5563" }
                    },
                    y: {
                        display: true,
                        grid: { color: "#F3F4F6", drawBorder: false },
                        ticks: { font: { size: 10 }, color: "#6B7280", callback: (val) => formatCurrency(val) }
                    }
                }
            }
        });
    }

    return () => {
      if (stackedChartInstance.current) stackedChartInstance.current.destroy();
      if (comparisonChartInstance.current) comparisonChartInstance.current.destroy();
    };
  }, [result]);

  if (!result || !result.summary) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-4">
      <h3 className="text-[#1A237E] font-semibold text-lg mb-1">Value Breakdown</h3>
      <p className="text-xs text-gray-500 mb-6">Total Proceeds: {formatCurrency(result.summary.totalSaleProceeds)}</p>
      
      <div className="w-full h-32 mb-8 relative">
        <canvas ref={stackedBarRef}></canvas>
      </div>

      {result.capitalGains && result.capitalGains.totalCapitalGain > 0 && (
         <div className="mt-8 border-t pt-6">
            <h4 className="text-[#1A237E] font-medium text-sm mb-1 text-center">STCG vs LTCG Tax Simulation</h4>
            <p className="text-[10px] text-gray-400 text-center mb-4">How your tax changes by holding longer (estimated on current gain)</p>
            <div className="w-full max-w-sm mx-auto h-40 relative">
               <canvas ref={comparisonBarRef}></canvas>
            </div>
         </div>
      )}

    </div>
  );
};

export default ESOPGraph;
