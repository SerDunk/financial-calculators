import React from "react";
import { Info, HelpCircle } from "lucide-react";

export default function GratuityResult({ result }) {
  if (!result) return null;

  const formatCurrency = (val) => {
    return Math.round(val).toLocaleString('en-IN')
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:mt-2 mt-4 shadow-sm overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#583FCA] to-[#2D14A0]"></div>
      
      {/* Elegibility Banner */}
      {!result.isEligible && (
         <div className="mb-5 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 flex gap-2">
           <Info size={18} className="shrink-0 text-amber-600" />
           <p><strong>You are not yet eligible for gratuity.</strong> Minimum 5 years of continuous service is required based on your separation reason.</p>
         </div>
      )}

      <h3 className="text-[#020288] text-lg font-semibold mb-4 border-b pb-2">Your Gratuity Overview</h3>
      
      {/* Total Banner - Creative highlight */}
      <div className="text-center mb-6">
         <p className="text-sm font-medium mb-1 text-[#666666]">Estimated Net Gratuity Payable</p>
         <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent pb-1">₹{formatCurrency(result.netGratuity)}</h2>
         {result.estimatedTax > 0 && <p className="text-xs text-gray-500 mt-2">After deducting estimated tax of ₹{formatCurrency(result.estimatedTax)}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
           <div className="bg-[#EFEDF4] p-3 rounded-lg">
             <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Effective Years</p>
             <p className="text-gray-800 font-bold">{result.effectiveYears} Years</p>
             <p className="text-[10px] text-gray-400 mt-0.5">Used for calculation</p>
           </div>
           <div className="bg-[#EFEDF4] p-3 rounded-lg">
             <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Base Wages</p>
             <p className="text-gray-800 font-bold">₹{formatCurrency(result.wages)}</p>
             <p className="text-[10px] text-gray-400 mt-0.5">Per month</p>
           </div>
        </div>

        <div className="border border-gray-100 rounded-lg p-1 divide-y divide-gray-50">
          
          <div className="flex justify-between items-center p-3 hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-600 flex items-center gap-1.5">
               Formula Used 
               <div className="group relative">
                  <HelpCircle size={14} className="text-gray-400 cursor-pointer" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 text-[10px] bg-gray-800 text-white p-2 rounded invisible group-hover:visible shadow-lg z-10 text-center">
                     Divisor is 26 for Act-covered, 30 for non-covered
                  </div>
               </div>
            </span>
            <span className="text-sm font-semibold text-gray-800">{result.formulaUsed}</span>
          </div>

          <div className="flex justify-between items-center p-3 hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-600">Calculated Gratuity (Raw)</span>
            <span className="text-sm font-semibold text-gray-800">₹{formatCurrency(result.grossGratuity)}</span>
          </div>

          <div className="flex justify-between items-center p-3 hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-600">Statutory Cap Check</span>
            <span className="text-sm font-medium text-[#1A237E]">
               {result.statutoryCapApplied ? `Capped at ₹${formatCurrency(result.statutoryCapApplied)}` : "No Cap Applied"}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium text-[#1A237E]">Gross Gratuity Limit</span>
            <span className="text-sm font-bold text-[#1A237E]">₹{formatCurrency(result.gratuityPayable)}</span>
          </div>

        </div>

        <div className="mt-2 bg-green-50 rounded-lg p-4 border border-green-100">
           <h4 className="text-xs font-bold text-green-800 uppercase tracking-wide mb-3 flex items-center justify-between">
              Tax Impact Breakdown
           </h4>
           <div className="space-y-2">
              <div className="flex justify-between text-sm">
                 <span className="text-green-700">Tax Exempt Portion</span>
                 <span className="font-semibold text-green-900">₹{formatCurrency(result.exemptPortion)}</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-gray-600">Taxable Portion</span>
                 <span className="font-semibold text-gray-800">₹{formatCurrency(result.taxablePortion)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-green-200/50 pt-2 mt-2">
                 <span className="text-red-600">Estimated Tax Paid</span>
                 <span className="font-bold text-red-700">- ₹{formatCurrency(result.estimatedTax)}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
