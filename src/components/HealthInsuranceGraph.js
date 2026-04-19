"use client";
import React, { useRef, useEffect } from "react";
import * as Chart from "chart.js/auto";

const fmtShort = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${value.toFixed(0)}`;
};

export default function HealthInsuranceGraph({ result }) {
  const barChartRef = useRef(null);
  const barChartInstance = useRef(null);

  useEffect(() => {
    if (!result || !barChartRef.current) return;

    const {
      effectivePersonalCover,
      employerCover,
      recommendedCover,
      idealCover,
    } = result;

    const gapToRecommended = Math.max(0, recommendedCover - effectivePersonalCover);
    const gapToIdeal = Math.max(0, idealCover - recommendedCover);

    const ctx = barChartRef.current.getContext("2d");
    if (barChartInstance.current) {
      barChartInstance.current.destroy();
    }

    barChartInstance.current = new Chart.Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Your Coverage Stack"],
        datasets: [
          {
            label: "Personal Cover",
            data: [effectivePersonalCover],
            backgroundColor: "rgba(88, 63, 202, 0.85)",
            borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 8, bottomRight: 8 },
            borderSkipped: false,
          },
          {
            label: "Employer Cover (non-portable)",
            data: [employerCover],
            backgroundColor: "rgba(156, 163, 175, 0.5)",
            borderRadius: 0,
            borderSkipped: false,
          },
          {
            label: "Gap to Recommended",
            data: [gapToRecommended],
            backgroundColor: "rgba(239, 68, 68, 0.7)",
            borderRadius: 0,
            borderSkipped: false,
          },
          {
            label: "Gap to Ideal (Inflation-adjusted)",
            data: [gapToIdeal],
            backgroundColor: "rgba(251, 191, 36, 0.7)",
            borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 },
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
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
              label: (ctx) =>
                `${ctx.dataset.label}: ${fmtShort(ctx.parsed.x)}`,
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: { color: "#F3F4F6" },
            border: { display: false },
            ticks: {
              font: { size: 9 },
              color: "#9CA3AF",
              callback: (v) => fmtShort(v),
            },
          },
          y: {
            stacked: true,
            grid: { display: false },
            border: { display: false },
            ticks: { display: false },
          },
        },
      },
    });

    return () => {
      if (barChartInstance.current) barChartInstance.current.destroy();
    };
  }, [result]);

  if (!result) return null;

  const { effectivePersonalCover, employerCover, recommendedCover, idealCover } = result;
  const gapToRecommended = Math.max(0, recommendedCover - effectivePersonalCover);
  const gapToIdeal = Math.max(0, idealCover - recommendedCover);

  return (
    <div className="bg-white rounded-2xl p-5 mt-4 shadow-sm">
      <div className="mb-4">
        <h3 className="text-[#020288] text-sm font-semibold mb-1">
          Coverage Stack Visualised
        </h3>
        <p className="text-xs text-gray-500">
          Stacked view of your cover, buffer, and gaps
        </p>
      </div>

      <div className="h-28 relative mb-6">
        <canvas ref={barChartRef} />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {[
          { color: "rgba(88,63,202,0.85)", label: `Personal Cover`, val: fmtShort(effectivePersonalCover) },
          { color: "rgba(156,163,175,0.5)", label: "Employer (non-portable)", val: fmtShort(employerCover) },
          { color: "rgba(239,68,68,0.7)", label: "Gap to Recommended", val: fmtShort(gapToRecommended) },
          { color: "rgba(251,191,36,0.7)", label: "Gap to Ideal (5-yr)", val: fmtShort(gapToIdeal) },
        ].map(({ color, label, val }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: color }}
            />
            <div className="min-w-0">
              <div className="text-[10px] text-gray-500 truncate">{label}</div>
              <div className="text-xs font-semibold text-[#2C178C]">{val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
