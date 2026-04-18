import React from "react";
import { Info, HelpCircle, TriangleAlert } from "lucide-react";

export default function ESPPResult({ result, inputs }) {
  if (!result) return null;

  const formatCurrency = (val) => {
    return Math.round(val).toLocaleString('en-IN')
  };

  const isLoss = result.totalCapitalGain < 0;

  return (
    <div className="bg-white rounded-2xl p-6 sm:mt-2 mt-4 shadow-sm overflow-hidden relative border border-gray-100">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#583FCA] to-[#2D14A0]"></div>

      {inputs.shareType === "Foreign Listed (MNC)" && (
         <div className="mb-5 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex gap-2">
           <Info size={16} className="shrink-0 text-amber-600 mt-0.5" />
           <p>For foreign shares, convert USD/other currency amounts to INR strictly using the RBI/SBI TT buying reference rate on the exact date of transaction for reporting.</p>
         </div>
      )}

      {/* Hero Overview */}
      <div className="text-center mb-6 pt-2">
         <p className="text-sm font-medium mb-1 text-[#666666]">Net Profit After All Taxes</p>
         <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent pb-1">
            ₹{formatCurrency(result.netProfitAfterAllTaxes)}
         </h2>
         <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mt-2 px-3 py-1 bg-green-50 text-green-700 rounded-full inline-block">
            {result.effectiveReturnPercent.toFixed(1)}% Effective Return
         </p>
      </div>

      {/* STAGE 1 */}
      <div className="mb-5">
         <h3 className="text-[#020288] text-sm font-bold mb-3 border-b border-indigo-100 pb-2 flex items-center justify-between">
            <span>Stage 1: Purchase Summary</span>
            <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">Perquisite Tax</span>
         </h3>
         
         <div className="border border-gray-100 rounded-lg p-1 divide-y divide-gray-50 bg-gray-50/50">
            <div className="flex justify-between items-center p-2.5">
               <span className="text-xs text-gray-600">Lookback Base Price</span>
               <span className="text-xs font-semibold text-gray-800">₹{formatCurrency(result.basePrice)}</span>
            </div>
            <div className="flex justify-between items-center p-2.5">
               <span className="text-xs text-gray-600">Actual Purchase Price Paid</span>
               <span className="text-xs font-semibold text-gray-800">₹{formatCurrency(result.purchasePrice)}</span>
            </div>
            <div className="flex justify-between items-center p-2.5">
               <span className="text-xs text-gray-600 font-medium">Discount Benefit (Per Share)</span>
               <span className="text-xs font-bold text-[#1A237E]">₹{formatCurrency(result.discountBenefitPerShare)}</span>
            </div>
            <div className="flex justify-between items-center p-2.5 mt-1 border-t-2 border-indigo-100/50">
               <span className="text-xs font-semibold text-gray-800">Total Taxable Perquisite (Salary)</span>
               <span className="text-xs font-bold text-gray-800">₹{formatCurrency(result.totalPerquisite)}</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-red-50/50">
               <span className="text-xs font-medium text-red-800">Perquisite Tax Deducted (via TDS)</span>
               <span className="text-xs font-bold text-red-700">- ₹{formatCurrency(result.perquisiteTax)}</span>
            </div>
         </div>

         {inputs.lookback && result.totalLookbackSavings > 0 && (
             <div className="mt-2 bg-[#EFEDF4] p-2.5 rounded-lg text-[11px] text-[#1A237E] flex items-center gap-2 border border-indigo-100">
                <span className="bg-indigo-100 p-1 rounded"><Info size={12} /></span>
                <p>The lookback provision directly saved you an additional <strong>₹{formatCurrency(result.totalLookbackSavings)}</strong> compared to buying natively without lookback today.</p>
             </div>
         )}
      </div>

      {/* STAGE 2 */}
      <div className="mb-3">
         <h3 className="text-[#020288] text-sm font-bold mb-3 border-b border-indigo-100 pb-2 flex items-center justify-between">
            <span>Stage 2: Sale Summary</span>
            <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">Capital Gains Tax</span>
         </h3>
         
         <div className="border border-gray-100 rounded-lg p-1 divide-y divide-gray-50 bg-gray-50/50">
            <div className="flex justify-between items-center p-2.5">
               <span className="text-xs text-gray-600 flex items-center gap-2">
                  Gain Classification
                  <span className={`px-2 py-0.5 text-[9px] rounded font-bold uppercase tracking-widest ${result.cgClassification === "STCG" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                     {result.cgClassification}
                  </span>
               </span>
               <span className="text-xs font-semibold text-gray-600">{inputs.holdingPeriodMonths} Mo. Held</span>
            </div>

            <div className="flex justify-between items-center p-2.5">
               <span className="text-xs text-gray-600 font-medium">Total Capital {isLoss ? "Loss" : "Gain"}</span>
               <span className={`text-xs font-bold ${isLoss ? "text-amber-600" : "text-[#1A237E]"}`}>
                  {isLoss ? "- " : ""}₹{formatCurrency(Math.abs(result.totalCapitalGain))}
               </span>
            </div>

            <div className="flex justify-between items-center p-2.5">
               <span className="text-xs text-gray-600">Sec 112A Exemption Applied</span>
               <span className="text-xs font-medium text-gray-700">
                  {result.ltcgExemptionApplied > 0 ? `₹${formatCurrency(result.ltcgExemptionApplied)}` : "N/A"}
               </span>
            </div>

            <div className="flex justify-between items-center p-2.5 bg-red-50/50 border-t-2 border-indigo-100/50">
               <span className="text-xs font-medium text-red-800">Capital Gains Tax Paid</span>
               <span className="text-xs font-bold text-red-700">- ₹{formatCurrency(Math.max(0, result.capitalGainsTax))}</span>
            </div>
         </div>

         {isLoss && (
            <div className="mt-2 text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
               <TriangleAlert size={14} className="shrink-0" />
               <p>Capital loss of <strong>₹{formatCurrency(Math.abs(result.totalCapitalGain))}</strong> detected. This tax liability is zeroed; you can legally carry this loss forward for 8 assessment years to offset future capital gains.</p>
            </div>
         )}
      </div>

      {/* OVERALL */}
      <div className="mt-5 bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] rounded-xl p-4 border border-[#E5E2F2]">
         <h4 className="text-[11px] font-bold text-[#1A237E] uppercase tracking-widest mb-3">Overall Investment Flow</h4>
         <div className="space-y-2">
            <div className="flex justify-between text-xs">
               <span className="text-gray-600">Total Purchase Cost (Invested)</span>
               <span className="font-semibold text-gray-800">₹{formatCurrency(result.totalInvestment)}</span>
            </div>
            <div className="flex justify-between text-xs">
               <span className="text-gray-600">Total Sale Proceeds (Gross)</span>
               <span className="font-semibold text-gray-800">₹{formatCurrency(result.totalSaleProceeds)}</span>
            </div>
            <div className="flex justify-between text-xs border-t border-gray-200 pt-2 mt-1">
               <span className="text-gray-600 font-medium">Gross Pre-Tax Profit</span>
               <span className="font-bold text-indigo-800">₹{formatCurrency(result.grossProfit)}</span>
            </div>
            <div className="flex justify-between text-xs">
               <span className="text-red-600 font-medium">Total Double-Tax Burden</span>
               <span className="font-bold text-red-700">- ₹{formatCurrency(result.totalTax)}</span>
            </div>
         </div>
      </div>

    </div>
  );
}
