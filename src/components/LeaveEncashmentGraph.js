import React, { useRef, useEffect } from "react";
import * as Chart from "chart.js/auto";

const LeaveEncashmentGraph = ({ result, employeeType }) => {
  const barChartRef = useRef(null);
  const donutChartRef = useRef(null);
  const barChartInstance = useRef(null);
  const donutChartInstance = useRef(null);

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
    return `₹${value.toFixed(0)}`;
  };

  useEffect(() => {
    if (!result || !barChartRef.current) return;

    // 1. Horizontal Bar Chart (Gross vs Net Breakdown)
    const barCtx = barChartRef.current.getContext("2d");
    if (barChartInstance.current) barChartInstance.current.destroy();

    const exempt = result.exemptAmount;
    const taxPayable = result.taxOnTaxablePortion;
    const taxableRemaining = result.taxableLeaveEncashment - taxPayable;

    barChartInstance.current = new Chart.Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["Gross Breakdown", "Net Breakdown"],
        datasets: [
          {
            label: "Tax-Exempt",
            data: [exempt, 0],
            backgroundColor: "#10B981", // green
            stack: "Stack 0",
          },
          {
            label: "Taxable Portion",
            data: [result.taxableLeaveEncashment, 0],
            backgroundColor: "#F59E0B", // amber
            stack: "Stack 0",
          },
          {
            label: "Net In-Hand",
            data: [0, result.netAmountReceived],
            backgroundColor: "#1E3A8A", // dark blue
            stack: "Stack 1",
          },
          {
            label: "Tax Payable",
            data: [0, taxPayable],
            backgroundColor: "#EF4444", // red
            stack: "Stack 1",
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${formatCurrency(context.parsed.x)}`
            }
          }
        },
        scales: {
          x: { stacked: true, ticks: { callback: (val) => formatCurrency(val) } },
          y: { stacked: true }
        }
      }
    });

    // 2. Donut Chart (Four Limbs)
    if (employeeType !== 'government' && result.limbs && donutChartRef.current) {
      const donutCtx = donutChartRef.current.getContext("2d");
      if (donutChartInstance.current) donutChartInstance.current.destroy();

      const { limb1, limb2, limb3, limb4 } = result.limbs;
      
      donutChartInstance.current = new Chart.Chart(donutCtx, {
        type: "doughnut",
        data: {
          labels: ["Actual Received", "Lifetime Cap Bal", "10 Months Salary", "30 Days/Yr Cap"],
          datasets: [{
            data: [limb1, limb2, limb3, limb4],
            backgroundColor: ["#60A5FA", "#34D399", "#A78BFA", "#FBBF24"],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right', labels: { boxWidth: 12, font: { size: 10 } } },
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${formatCurrency(context.parsed)}`
              }
            }
          }
        }
      });
    }

    return () => {
      if (barChartInstance.current) barChartInstance.current.destroy();
      if (donutChartInstance.current) donutChartInstance.current.destroy();
    };
  }, [result, employeeType]);

  if (!result) return null;

  return (
    <div className="bg-white rounded-2xl p-6 mt-4 shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-[#020288] text-base font-semibold mb-1">Visual Breakdown</h3>
      </div>
      
      <div className={`flex flex-col ${employeeType !== 'government' ? 'md:flex-row' : ''} gap-6 mt-4`}>
        <div className={`w-full ${employeeType !== 'government' ? 'md:w-1/2' : ''}`}>
          <div className="text-center text-xs font-medium text-gray-500 mb-2">Value Distribution</div>
          <div className="h-64 relative">
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>

        {employeeType !== 'government' && result.limbs && (
          <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-4">
            <div className="text-center text-xs font-medium text-gray-500 mb-2">Four Limb Comparison</div>
            <div className="h-64 relative">
              <canvas ref={donutChartRef}></canvas>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveEncashmentGraph;
