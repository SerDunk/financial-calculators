"use client";
import React, { useRef, useEffect } from "react";
import * as Chart from "chart.js/auto";

export default function HRABreakdown({ result }) {
  const donutRef = useRef(null);
  const donutInstance = useRef(null);

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${Math.round(value).toLocaleString("en-IN")}`;
  };

  useEffect(() => {
    if (!result || !donutRef.current) return;
    if (result.route === "new-regime" || result.route === "property-owned") return;

    const ctx = donutRef.current.getContext("2d");
    if (donutInstance.current) donutInstance.current.destroy();

    let exemptAmt, taxableAmt, totalAmt, exemptLabel, taxableLabel;

    if (result.route === "section-1013a") {
      exemptAmt = result.exemption || 0;
      taxableAmt = result.taxableHRA || 0;
      totalAmt = result.totalHRA;
      exemptLabel = "Exempt HRA";
      taxableLabel = "Taxable HRA";
    } else if (result.route === "section-80gg") {
      exemptAmt = result.deduction || 0;
      taxableAmt = (result.monthlyRent * 12) - exemptAmt;
      totalAmt = result.monthlyRent * 12;
      exemptLabel = "80GG Deduction";
      taxableLabel = "Non-Deductible Rent";
    }

    donutInstance.current = new Chart.Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [exemptLabel, taxableLabel],
        datasets: [
          {
            data: [Math.max(0, exemptAmt), Math.max(0, taxableAmt)],
            backgroundColor: ["#4CAF50", "#EF5350"],
            borderColor: ["#388E3C", "#C62828"],
            borderWidth: 1,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(255,255,255,0.97)",
            titleColor: "#374151",
            bodyColor: "#374151",
            borderColor: "#E5E7EB",
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${formatCurrency(ctx.raw)} (${totalAmt > 0 ? ((ctx.raw / totalAmt) * 100).toFixed(1) : 0}%)`,
            },
          },
        },
      },
    });

    return () => {
      if (donutInstance.current) donutInstance.current.destroy();
    };
  }, [result]);

  if (
    !result ||
    result.route === "new-regime" ||
    result.route === "property-owned"
  )
    return null;

  let exemptAmt, taxableAmt, totalAmt, exemptLabel, taxableLabel;

  if (result.route === "section-1013a") {
    exemptAmt = result.exemption || 0;
    taxableAmt = result.taxableHRA || 0;
    totalAmt = result.totalHRA;
    exemptLabel = "Tax-Exempt HRA";
    taxableLabel = "Taxable HRA";
  } else {
    exemptAmt = result.deduction || 0;
    taxableAmt = Math.max(0, (result.monthlyRent * 12) - exemptAmt);
    totalAmt = result.monthlyRent * 12;
    exemptLabel = "80GG Deduction";
    taxableLabel = "Non-Deductible Rent";
  }

  const exemptPct = totalAmt > 0 ? ((exemptAmt / totalAmt) * 100).toFixed(1) : 0;
  const taxablePct = totalAmt > 0 ? ((taxableAmt / totalAmt) * 100).toFixed(1) : 0;

  return (
    <div className="bg-white rounded-2xl p-6 mt-4 shadow-sm">
      <h3 className="text-[#020288] text-lg font-semibold mb-1">HRA Breakdown</h3>
      <p className="text-xs text-gray-500 mb-6">Annual split between exempt and taxable portions</p>

      <div className="flex flex-col items-center">
        {/* Donut Chart */}
        <div className="relative h-52 w-52 mb-6">
          <canvas ref={donutRef} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Total</p>
            <p className="text-lg font-bold text-[#020288]">{formatCurrency(totalAmt)}</p>
            <p className="text-[10px] text-gray-400">per year</p>
          </div>
        </div>

        {/* Legend Cards */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-green-700">
                {exemptLabel}
              </span>
            </div>
            <p className="text-lg font-bold text-green-800">{formatCurrency(exemptAmt)}</p>
            <p className="text-xs text-green-600">{exemptPct}% of total</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-red-700">
                {taxableLabel}
              </span>
            </div>
            <p className="text-lg font-bold text-red-700">{formatCurrency(taxableAmt)}</p>
            <p className="text-xs text-red-500">{taxablePct}% of total</p>
          </div>
        </div>

        {/* Horizontal stacked bar */}
        <div className="w-full mt-4">
          <div className="flex rounded-full overflow-hidden h-3">
            <div
              className="bg-green-500 transition-all duration-700"
              style={{ width: `${exemptPct}%` }}
            />
            <div
              className="bg-red-400 transition-all duration-700"
              style={{ width: `${taxablePct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-green-600 font-medium">{exemptPct}% Exempt</span>
            <span className="text-[10px] text-red-500 font-medium">{taxablePct}% Taxable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
