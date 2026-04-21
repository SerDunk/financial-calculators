"use client";
import React from "react";
import { AlertTriangle, CheckCircle, Info, TrendingUp } from "lucide-react";

const formatCurrency = (val) => Math.round(val || 0).toLocaleString("en-IN");

export default function RetirementResult({ result }) {
  if (!result) return null;

  const {
    yearsToRetirement,
    futureMonthlyExpenses,
    annualRetirementExpenses,
    targetCorpus,
    totalProjectedCorpus,
    fvEpf, fvNps, fvEquity, fvPpf, fvDebt,
    npsTaxFreeLumpSum, npsTaxableLumpSum, npsAnnuityCorpus, npsMonthlyAnnuity, npsTaxableValue, npsAnnuityTax,
    gap,
    additionalSipNeeded,
    fireAge,
    coastFireNumber,
    currentTotalCorpus,
    isCoastFire,
    corpusSustainsYears,
    corpusDepletionAge,
    monthlySWRWithdrawal
  } = result;

  const scoreRaw = targetCorpus > 0 ? (totalProjectedCorpus / targetCorpus) * 100 : 0;
  const score = Math.min(scoreRaw, 100);

  let scoreColor = "bg-red-500";
  let scoreMsg = "Just Starting — Focus on Saving Rate";
  if (score > 30 && score <= 60) {
    scoreColor = "bg-amber-500";
    scoreMsg = "On Track — Stay Consistent";
  } else if (score > 60 && score <= 90) {
    scoreColor = "bg-yellow-500";
    scoreMsg = "Nearly There — Don't Stop Now";
  } else if (score > 90) {
    scoreColor = "bg-green-500";
    scoreMsg = "FIRE Ready 🎯";
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      
      {/* Warnings & Callouts */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-sm font-bold text-amber-800 mb-1">India SWR Warning</p>
          <p className="text-xs text-amber-700">
            India's recommended safe withdrawal rate is 3% (not the Western 4%) due to higher inflation and longer life expectancy. This calculator uses 3% for Regular FIRE.
          </p>
        </div>
      </div>

      {fvNps > 1200000 && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-bold text-blue-800 mb-1">NPS 2026 Rule Callout</p>
            <p className="text-xs text-blue-700">
              Under PFRDA's 2026 rules, you can withdraw 80% of NPS corpus as lump sum (up to 60% tax-free). Only 20% must go to annuity — up from the old 40% requirement. The new SLW facility lets you draw this gradually between ages 60–75.
            </p>
          </div>
        </div>
      )}

      {isCoastFire && (
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
          <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-bold text-green-800 mb-1">🎉 You've already hit your CoastFIRE number!</p>
            <p className="text-xs text-green-700">
              Even if you stop all contributions today, your current ₹{formatCurrency(currentTotalCorpus)} corpus will grow to your target ₹{formatCurrency(targetCorpus)} by retirement. You now only need to cover living expenses — not save for retirement.
            </p>
          </div>
        </div>
      )}

      {/* Card 1 — FIRE Readiness Score */}
      <div className="bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden text-center">
        <h2 className="text-[#020288] text-base font-semibold mb-2">FIRE Readiness Score</h2>
        <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden mb-2 border">
            <div className={`h-full ${scoreColor} transition-all duration-1000`} style={{ width: `${score}%` }}></div>
        </div>
        <p className="text-2xl font-bold text-[#1A237E]">{score.toFixed(1)}%</p>
        <p className="text-sm font-semibold text-gray-500 mt-1">{scoreMsg}</p>
      </div>

      {/* Card 2 — The Key Numbers */}
      <div className="bg-white rounded-2xl p-6 shadow-sm overflow-hidden relative">
        <h2 className="text-[#020288] text-base font-semibold mb-4 border-b pb-2">The Key Numbers</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-600">Years to Retirement</span>
            <span className="text-sm font-semibold text-[#1A237E]">{yearsToRetirement} years</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-600">Monthly Expenses at Retirement (Inflation-Adjusted)</span>
            <span className="text-sm font-semibold text-[#1A237E]">₹{formatCurrency(futureMonthlyExpenses)}/month</span>
          </div>
          <div className="flex justify-between items-center bg-[#EFEDF4] p-4 rounded-xl border border-[#d0ccee]">
            <span className="text-sm font-semibold text-[#020288]">Target Retirement Corpus</span>
            <span className="text-xl font-bold text-[#020288]">₹{formatCurrency(targetCorpus)}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-600">Total Projected Corpus</span>
            <span className="text-sm font-semibold text-[#1A237E]">₹{formatCurrency(totalProjectedCorpus)}</span>
          </div>
          
          <div className={`flex justify-between items-center p-4 rounded-xl border ${gap > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
            <span className={`text-sm font-semibold ${gap > 0 ? "text-red-800" : "text-green-800"}`}>
              {gap > 0 ? "Corpus Gap" : "Corpus Surplus"}
            </span>
            <span className={`text-lg font-bold ${gap > 0 ? "text-red-600" : "text-green-600"}`}>
              ₹{formatCurrency(Math.abs(gap))}
            </span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-600">Additional Monthly SIP Needed</span>
            <span className="text-sm font-semibold text-[#1A237E]">
              {gap > 0 ? `₹${formatCurrency(additionalSipNeeded)}` : "None — You're on track!"}
            </span>
          </div>

          {gap <= 0 && fireAge && (
            <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
               <span className="text-xs text-gray-600">FIRE Age</span>
               <span className="text-sm font-semibold text-green-700">Age {fireAge}</span>
            </div>
          )}

          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-600">CoastFIRE Number</span>
            <span className="text-sm font-semibold text-[#1A237E]">₹{formatCurrency(coastFireNumber)}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-600">CoastFIRE Status</span>
            <span className="text-sm font-semibold text-[#1A237E]">
              {isCoastFire ? "Already CoastFIRE ✓" : `₹${formatCurrency(coastFireNumber - currentTotalCorpus)} more needed`}
            </span>
          </div>
        </div>
      </div>

      {/* Card 3 — Corpus Breakdown at Retirement */}
      <div className="bg-white rounded-2xl p-6 shadow-sm overflow-hidden relative">
        <h2 className="text-[#020288] text-base font-semibold mb-4 border-b pb-2">Corpus Breakdown at Retirement</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-xs text-gray-600">EPF</span>
            <span className="text-sm font-semibold text-gray-800">₹{formatCurrency(fvEpf)}</span>
          </div>

          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
             <div className="flex justify-between items-center mb-2 border-b pb-2 border-gray-200">
               <span className="text-sm font-semibold text-[#020288]">NPS (Total)</span>
               <span className="text-sm font-bold text-[#020288]">₹{formatCurrency(fvNps)}</span>
             </div>
             <div className="space-y-1.5 ml-2 border-l-2 border-[#d0ccee] pl-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-600">→ NPS Lump Sum (tax-free 60%)</span>
                  <span className="text-xs font-semibold text-green-600">₹{formatCurrency(npsTaxFreeLumpSum)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-600">→ NPS Taxable Lump Sum</span>
                  <span className="text-xs font-semibold text-red-500">₹{formatCurrency(npsTaxableLumpSum)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-600">→ NPS Annuity Corpus</span>
                  <span className="text-xs font-semibold text-gray-700">₹{formatCurrency(npsAnnuityCorpus)}</span>
                </div>
             </div>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-xs text-gray-600">Equity / MF</span>
            <span className="text-sm font-semibold text-gray-800">₹{formatCurrency(fvEquity)}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-xs text-gray-600">PPF</span>
            <span className="text-sm font-semibold text-gray-800">₹{formatCurrency(fvPpf)}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-xs text-gray-600">Debt / FD</span>
            <span className="text-sm font-semibold text-gray-800">₹{formatCurrency(fvDebt)}</span>
          </div>
          <div className="flex justify-between items-center bg-[#EFEDF4] p-3 rounded-lg">
            <span className="text-sm font-bold text-[#1A237E]">Total Projected Corpus</span>
            <span className="text-base font-bold text-[#1A237E]">₹{formatCurrency(totalProjectedCorpus)}</span>
          </div>
        </div>
      </div>

      {/* Card 4 — Post-Retirement Income Snapshot */}
      <div className="bg-white rounded-2xl p-6 shadow-sm overflow-hidden relative">
        <h2 className="text-[#020288] text-base font-semibold mb-4 border-b pb-2">Post-Retirement Income Snapshot</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-600">NPS Monthly Annuity</span>
            <span className="text-sm font-semibold text-[#1A237E]">₹{formatCurrency(npsMonthlyAnnuity)}/month</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-600">Monthly SWR Withdrawal (from non-NPS)</span>
            <span className="text-sm font-semibold text-[#1A237E]">₹{formatCurrency(monthlySWRWithdrawal)}/month</span>
          </div>
          <div className="flex justify-between items-center bg-[#EFEDF4] p-3 rounded-lg border border-[#d0ccee]">
            <span className="text-sm font-bold text-[#020288]">Total Monthly Retirement Income</span>
            <span className="text-base font-bold text-[#020288]">₹{formatCurrency(npsMonthlyAnnuity + monthlySWRWithdrawal)}/month</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg border">
            <span className="text-xs text-gray-600">Corpus Sustainability</span>
            <span className="text-sm font-semibold text-[#1A237E]">
               {corpusSustainsYears >= 40 ? "Sustains 40+ years" : `Sustains for ${corpusSustainsYears} years`}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
            <span className="text-xs text-gray-600">Corpus Runs Out at Age</span>
            <span className={`text-sm font-semibold ${corpusSustainsYears >= 40 ? "text-green-600" : "text-red-500"}`}>
               {corpusSustainsYears >= 40 ? "Never depletes ✓" : corpusDepletionAge}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
