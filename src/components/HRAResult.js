"use client";
import React from "react";
import { Info, AlertTriangle, CheckCircle, TrendingUp, FileText } from "lucide-react";

const formatCurrency = (val) =>
  Math.round(val || 0).toLocaleString("en-IN");

const MetroBadge = ({ isNewMetro }) => {
  if (!isNewMetro) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-green-100 text-green-700 border border-green-200 rounded-full px-2 py-0.5 ml-1 whitespace-nowrap">
      ✦ New Metro 2026
    </span>
  );
};

export default function HRAResult({ result }) {
  if (!result) return null;

  const { route } = result;

  if (route === "new-regime") {
    const { monthlyHRA } = result;
    return (
      <div className="bg-white rounded-2xl p-6 sm:mt-2 mt-4 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-bold text-amber-800 mb-1">
              HRA Exemption Unavailable — New Tax Regime
            </p>
            <p className="text-xs text-amber-700">
              HRA exemption (Sec 10(13A)) and rent deduction (Sec 80GG) are both unavailable
              under the New Tax Regime. Your entire HRA of{" "}
              <strong>₹{formatCurrency(monthlyHRA * 12)}/year</strong> is added to your taxable
              income. Switch to Old Regime to claim this exemption.
            </p>
          </div>
        </div>
        <div className="mt-4 bg-[#EFEDF4] rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Taxable HRA (Annual)</p>
          <p className="text-2xl font-bold text-red-500">₹{formatCurrency(monthlyHRA * 12)}</p>
          <p className="text-xs text-gray-400 mt-1">₹{formatCurrency(monthlyHRA)}/month</p>
        </div>
      </div>
    );
  }

  if (route === "property-owned") {
    return (
      <div className="bg-white rounded-2xl p-6 sm:mt-2 mt-4 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-rose-500" />
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-bold text-red-800 mb-1">Section 80GG Not Applicable</p>
            <p className="text-xs text-red-700">
              You own property in the city where you live/work. Section 80GG cannot be claimed.
              This includes property in your spouse's or minor child's name.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (route === "section-1013a") {
    const {
      c1, c2, c3, exemption, taxableHRA, totalHRA, taxSaved,
      salaryBase, metroRate, isNewMetro, city, limitingCondition, optimizationTip,
      pan1LRequired, rentToParents, isMultiCity, splitPeriods, slabRate,
    } = result;

    const conditionColors = { 1: "text-blue-600", 2: "text-purple-600", 3: "text-orange-600" };
    const conditionBg = { 1: "bg-blue-50 border-blue-200", 2: "bg-purple-50 border-purple-200", 3: "bg-orange-50 border-orange-200" };

    return (
      <div className="bg-white rounded-2xl p-6 sm:mt-2 mt-4 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#583FCA] to-[#2D14A0]" />

        {/* New Metro Callout */}
        {isNewMetro && (
          <div className="mb-4 flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
            <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-xs text-green-800">
              <strong>✦ New Metro from April 1, 2026:</strong> {city} now qualifies for the{" "}
              <strong>50% rate</strong> instead of the earlier 40%. If you were under-claiming before
              FY 2026-27, this increases your annual HRA exemption significantly.
            </p>
          </div>
        )}

        {/* PAN Warning */}
        {pan1LRequired && (
          <div className="mb-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              <strong>Annual rent exceeds ₹1,00,000.</strong> Your landlord&apos;s PAN is mandatory.
              Without it, your employer will not process the HRA exemption in Form 16, and the IT
              department may disallow the claim.
            </p>
          </div>
        )}

        {/* Rent to Parents */}
        {rentToParents && (
          <div className="mb-4 flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
            <p className="text-xs text-green-800">
              <strong>Paying rent to parents is valid.</strong> Ensure: (a) written rent agreement,
              (b) bank transfer only, (c) parents declare rent as income in their ITR, (d) you do
              not co-own the property.
            </p>
          </div>
        )}

        <h3 className="text-[#020288] text-lg font-semibold mb-4 border-b pb-2 flex items-center gap-2">
          Section 10(13A) — HRA Exemption
          <MetroBadge isNewMetro={isNewMetro} />
        </h3>

        {/* Salary Base */}
        <div className="bg-[#EFEDF4] rounded-xl p-3 mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-2">HRA Salary Base</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Monthly</span>
            <span className="text-sm font-bold text-[#020288]">₹{formatCurrency(salaryBase)}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-600">Annual</span>
            <span className="text-sm font-bold text-[#020288]">₹{formatCurrency(salaryBase * 12)}</span>
          </div>
        </div>

        {/* Three Conditions */}
        <div className="space-y-2 mb-4">
          {[
            { n: 1, label: "Actual HRA Received", val: c1 },
            { n: 2, label: `${metroRate}% of Annual Salary (${isNewMetro ? "New Metro" : metroRate === 50 ? "Metro" : "Non-Metro"})`, val: c2 },
            { n: 3, label: "Annual Rent − 10% of Annual Salary", val: c3 },
          ].map(({ n, label, val }) => {
            const isLimiting = limitingCondition === n;
            return (
              <div
                key={n}
                className={`rounded-xl p-3 border flex justify-between items-center transition-all ${
                  isLimiting ? "bg-amber-50 border-amber-300 ring-1 ring-amber-300" : "bg-gray-50 border-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isLimiting ? "bg-amber-400 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    C{n}
                  </span>
                  <span className="text-xs text-gray-600">{label}</span>
                  {isLimiting && (
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full border border-amber-200">
                      LIMITING
                    </span>
                  )}
                </div>
                <span className={`text-sm font-bold ${isLimiting ? "text-amber-800" : "text-gray-800"}`}>
                  ₹{formatCurrency(val)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Key Results */}
        <div className="border border-gray-100 rounded-xl divide-y divide-gray-50 mb-4">
          <div className="flex justify-between items-center p-3">
            <span className="text-sm text-gray-600">Total HRA Received (Annual)</span>
            <span className="text-sm font-semibold text-gray-800">₹{formatCurrency(totalHRA)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-blue-50/50">
            <span className="text-sm font-semibold text-[#020288]">HRA Exemption (Lowest of 3)</span>
            <span className="text-base font-bold text-[#020288]">₹{formatCurrency(exemption)}</span>
          </div>
          <div className="flex justify-between items-center p-3">
            <span className="text-sm text-gray-600">Taxable HRA</span>
            <span className="text-sm font-semibold text-red-500">₹{formatCurrency(taxableHRA)}</span>
          </div>
        </div>

        {/* Tax Saved */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center mb-4">
          <p className="text-xs font-medium text-green-700 mb-1 flex items-center justify-center gap-1">
            <TrendingUp size={14} /> Estimated Tax Saved (incl. 4% cess, {slabRate}% slab)
          </p>
          <p className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
            ₹{formatCurrency(taxSaved)}
          </p>
        </div>

        {/* Condition Diagnostic */}
        <div
          style={{ background: "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)" }}
          className="p-3 rounded-xl text-white mb-4"
        >
          <div className="text-xs font-semibold mb-1.5 flex items-center gap-1.5">
            <Info size={13} /> Condition Diagnostic
          </div>
          <p className="text-xs leading-relaxed">
            {limitingCondition === 1 &&
              `Your exemption is capped by Condition 1 — actual HRA received (₹${formatCurrency(c1)}). Your rent and salary support a higher exemption, but your employer's HRA component is the real ceiling.`}
            {limitingCondition === 2 &&
              `Your exemption is capped by Condition 2 — ${metroRate}% of salary (₹${formatCurrency(c2)}). Your salary base (Basic + DA) is the ceiling. Consider increasing Basic or DA restructuring with HR.`}
            {limitingCondition === 3 &&
              `Your exemption is capped by Condition 3 — rent minus 10% of salary (₹${formatCurrency(c3)}). Your rent paid is the limiting factor. Paying higher rent increases exempt income up to the C2 ceiling.`}
          </p>
        </div>

        {/* Optimization Tip */}
        {optimizationTip && (
          <div className="bg-[#EFEDF4] rounded-xl p-3 border border-[#d0ccee]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#1A237E] mb-1">💡 Optimisation Tip</p>
            <p className="text-xs text-[#1A237E]">{optimizationTip}</p>
          </div>
        )}

        {/* Multi-City Split */}
        {isMultiCity && splitPeriods?.length > 0 && (
          <div className="mt-4 border border-gray-100 rounded-xl overflow-hidden">
            <div className="bg-[#EFEDF4] px-3 py-2 text-xs font-semibold text-[#020288]">
              Mid-Year City Split Breakdown
            </div>
            {splitPeriods.map((p, i) => (
              <div key={i} className="p-3 border-t border-gray-50">
                <p className="text-xs font-semibold text-[#1A237E] mb-2">
                  Period {i + 1} — {p.city} ({p.months} months)
                </p>
                <div className="space-y-1">
                  {[
                    { label: "HRA Received", val: p.hraReceived },
                    { label: `${p.rate}% of Salary`, val: p.c2 },
                    { label: "Rent − 10% Salary", val: p.c3 },
                    { label: "Period Exemption", val: p.exemption, bold: true },
                  ].map(({ label, val, bold }) => (
                    <div key={label} className={`flex justify-between text-xs ${bold ? "font-semibold text-[#020288]" : "text-gray-600"}`}>
                      <span>{label}</span>
                      <span>₹{formatCurrency(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (route === "section-80gg") {
    const { c1, c2, c3, deduction, taxSaved, slabRate, adjustedGTI, monthlyRent } = result;

    return (
      <div className="bg-white rounded-2xl p-6 sm:mt-2 mt-4 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#583FCA] to-[#2D14A0]" />

        {/* Form 10BA reminder */}
        <div className="mb-4 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
          <FileText size={16} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800">
            <strong>Form 10BA Required:</strong> Section 80GG requires filing Form 10BA on the
            Income Tax portal before your ITR due date (31 July 2026). Without it, the deduction is
            not available.
          </p>
        </div>

        <h3 className="text-[#020288] text-lg font-semibold mb-4 border-b pb-2">
          Section 80GG — Rent Deduction
        </h3>

        {/* Three Conditions */}
        <div className="space-y-2 mb-4">
          {[
            { n: 1, label: "₹5,000/month cap (Annual)", val: c1 },
            { n: 2, label: "25% of Adjusted Gross Total Income", val: c2 },
            { n: 3, label: "Annual Rent − 10% of Gross Income", val: c3 },
          ].map(({ n, label, val }) => {
            const isLimiting = val === Math.min(c1, c2, c3) && val === deduction;
            return (
              <div
                key={n}
                className={`rounded-xl p-3 border flex justify-between items-center ${
                  isLimiting ? "bg-amber-50 border-amber-300" : "bg-gray-50 border-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isLimiting ? "bg-amber-400 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    C{n}
                  </span>
                  <span className="text-xs text-gray-600">{label}</span>
                  {isLimiting && (
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full border border-amber-200">
                      LIMITING
                    </span>
                  )}
                </div>
                <span className={`text-sm font-bold ${isLimiting ? "text-amber-800" : "text-gray-800"}`}>
                  ₹{formatCurrency(val)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="border border-gray-100 rounded-xl divide-y divide-gray-50 mb-4">
          <div className="flex justify-between items-center p-3 bg-blue-50/50">
            <span className="text-sm font-semibold text-[#020288]">80GG Deduction (Lowest of 3)</span>
            <span className="text-base font-bold text-[#020288]">₹{formatCurrency(deduction)}</span>
          </div>
          <div className="flex justify-between items-center p-3">
            <span className="text-xs text-gray-500">Form 10BA Required</span>
            <span className="text-xs font-semibold text-amber-700">Yes — file before 31 July 2026</span>
          </div>
        </div>

        {/* Tax Saved */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-xs font-medium text-green-700 mb-1 flex items-center justify-center gap-1">
            <TrendingUp size={14} /> Estimated Tax Saved (incl. 4% cess, {slabRate}% slab)
          </p>
          <p className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
            ₹{formatCurrency(taxSaved)}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
