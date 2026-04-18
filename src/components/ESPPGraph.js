import React, { useRef, useEffect } from "react";
import * as Chart from "chart.js/auto";

const ESPPGraph = ({ result }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toFixed(0)}`;
  };

  useEffect(() => {
    if (!result || !chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) {
       chartInstance.current.destroy();
    }

    const { totalInvestment, perquisiteTax, capitalGainsTax, netProfitAfterAllTaxes } = result;

    const createGradient = (color1, color2) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      return gradient;
    };

    const costColor = createGradient("#E5E7EB", "#D1D5DB");
    const perqTaxColor = createGradient("#FF9A9E", "#FECFEF");
    const cgTaxColor = createGradient("#f6d365", "#fda085");
    const profitColor = createGradient("#4facfe", "#00f2fe");

    chartInstance.current = new Chart.Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Original Cost", "Perq Tax", "CG Tax", "Net Profit"],
        datasets: [
          {
            data: [
               totalInvestment, 
               perquisiteTax, 
               Math.max(0, capitalGainsTax), 
               Math.max(0, netProfitAfterAllTaxes)
            ],
            backgroundColor: [costColor, perqTaxColor, cgTaxColor, profitColor],
            borderWidth: 0,
            hoverOffset: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
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

  if (!result) return null;

  const totalEffectiveReturn = result.totalInvestment > 0 ? (Math.max(0, result.netProfitAfterAllTaxes) / result.totalInvestment) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-[#020288] text-lg font-semibold mb-1">Sale Proceeds Distribution</h3>
        <p className="text-xs text-gray-500">Visual mapping of how your total gross sale value is divided</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
          <div className="relative h-48 w-48 shrink-0">
             <canvas ref={chartRef}></canvas>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Growth</span>
                <span className="text-[#1A237E] font-bold text-lg">
                   {totalEffectiveReturn.toFixed(1)}%
                </span>
             </div>
          </div>
          
          <div className="flex flex-col justify-center gap-3 w-full md:w-1/2">
             <div className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded-full flex-shrink-0" style={{background: "linear-gradient(to right, #4facfe, #00f2fe)"}}></div>
                 <div className="flex justify-between w-full text-xs">
                    <span className="text-gray-600 font-semibold">Clean Net Profit</span>
                    <span className="font-bold text-[#1A237E]">₹{formatCurrency(Math.max(0, result.netProfitAfterAllTaxes))}</span>
                 </div>
             </div>
             
             <div className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded-full flex-shrink-0 bg-gray-200"></div>
                 <div className="flex justify-between w-full text-xs">
                    <span className="text-gray-600">Base Cost (Scale)</span>
                    <span className="font-semibold text-gray-800">₹{formatCurrency(result.totalInvestment)}</span>
                 </div>
             </div>

             <div className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded-full flex-shrink-0" style={{background: "linear-gradient(to right, #FF9A9E, #FECFEF)"}}></div>
                 <div className="flex justify-between w-full text-xs">
                    <span className="text-gray-600">Perq Tax (Stage 1)</span>
                    <span className="font-semibold text-gray-800">₹{formatCurrency(result.perquisiteTax)}</span>
                 </div>
             </div>

             <div className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded-full flex-shrink-0" style={{background: "linear-gradient(to right, #f6d365, #fda085)"}}></div>
                 <div className="flex justify-between w-full text-xs">
                    <span className="text-gray-600">CG Tax (Stage 2)</span>
                    <span className="font-semibold text-gray-800">₹{formatCurrency(Math.max(0, result.capitalGainsTax))}</span>
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default ESPPGraph;
