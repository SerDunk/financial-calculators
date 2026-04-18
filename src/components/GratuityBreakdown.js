import React, { useRef, useEffect } from "react";
import * as Chart from "chart.js/auto";

const GratuityBreakdown = ({ result }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toFixed(0)}`;
  };

  useEffect(() => {
    if (!result || !chartRef.current) return;

    if (!result.isEligible) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      return;
    }

    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) {
       chartInstance.current.destroy();
    }
    
    const taxColor = ctx.createLinearGradient(0, 0, 0, 400);
    taxColor.addColorStop(0, "#FF9A9E");
    taxColor.addColorStop(1, "#FECFEF");

    const netColor = ctx.createLinearGradient(0, 0, 0, 400);
    netColor.addColorStop(0, "#4facfe");
    netColor.addColorStop(1, "#00f2fe");

    chartInstance.current = new Chart.Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Net Gratuity Received", "Tax Paid"],
        datasets: [
          {
            data: [result.netGratuity, result.estimatedTax],
            backgroundColor: [netColor, taxColor],
            borderWidth: 0,
            hoverOffset: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
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
                 let label = context.label || '';
                 if (label) {
                     label += ': ';
                 }
                 if (context.parsed !== null) {
                     label += `₹${context.parsed.toLocaleString('en-IN')}`;
                 }
                 return label;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [result]);

  if (!result || !result.isEligible) return null;

  return (
    <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-[#020288] text-lg font-semibold mb-1">Fund Distribution</h3>
        <p className="text-xs text-gray-500">Visual mapping of tax burden vs net proceeds</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
          <div className="relative h-48 w-48 shrink-0">
             <canvas ref={chartRef}></canvas>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Effective</span>
                <span className="text-[#1A237E] font-bold text-lg">
                   {result.gratuityPayable > 0 ? ((result.netGratuity / result.gratuityPayable) * 100).toFixed(1) : 0}%
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-tight">Retained</span>
             </div>
          </div>
          
          <div className="flex flex-col justify-center gap-4 w-full md:w-1/2">
             <div className="bg-[#EFEDF4] px-4 py-3 rounded-xl border-l-4 border-[#00f2fe]">
                 <p className="text-xs text-gray-500 mb-1">Take Home Portion</p>
                 <p className="text-[#1A237E] font-semibold text-sm">₹{result.netGratuity.toLocaleString('en-IN')}</p>
             </div>
             {result.estimatedTax > 0 && (
                <div className="bg-[#FFF5FA] px-4 py-3 rounded-xl border-l-4 border-[#FECFEF]">
                    <p className="text-xs text-gray-500 mb-1">Tax Offset</p>
                    <p className="text-[#F04393] font-semibold text-sm">₹{result.estimatedTax.toLocaleString('en-IN')}</p>
                </div>
             )}
          </div>
      </div>
    </div>
  );
};

export default GratuityBreakdown;
