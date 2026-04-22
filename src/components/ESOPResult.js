import React from "react";

const ESOPResult = ({ result }) => {
  if (!result) return null;

  return (
    <div className="flex flex-col gap-4 mt-6">
      
      {/* P&L Summary (Most Prominent) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-16 -translate-y-16 opacity-50"></div>
        <h3 className="text-[#1A237E] font-semibold text-lg border-b pb-3 mb-4">Overall P&L Summary</h3>

        <div className="grid grid-cols-1 gap-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Investment (Cash Paid)</span>
            <span className="font-medium text-[#020288]">₹{result.summary.cashPaidToExercise.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Sale Proceeds</span>
            <span className="font-medium text-[#020288]">₹{result.summary.totalSaleProceeds.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Gross Gain</span>
            <span className="font-medium text-[#020288]">₹{result.summary.grossGain.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="h-px bg-gray-100"></div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Perquisite Tax</span>
            <span className="font-medium text-red-600">₹{result.summary.totalPerquisiteTax.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Capital Gains Tax</span>
            <span className="font-medium text-red-600">₹{result.summary.totalCGTax.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-gray-800">Total Tax Outflow</span>
            <span className="text-red-700">₹{result.summary.totalTaxOutflow.toLocaleString('en-IN')}</span>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mt-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">Net Gain After All Taxes</span>
              <span className="text-2xl font-bold text-green-600">₹{result.summary.netGainAfterTax.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-blue-100">
              <span className="text-sm text-gray-600">Effective Post-Tax Return</span>
              <span className="font-semibold text-green-700">{(result.summary.effectiveReturnPercent).toFixed(2)}%</span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">Break-Even Sale Price</span>
              <span className="font-medium text-[#020288]">₹{result.summary.breakEvenSalePrice.toLocaleString('en-IN')} / share</span>
            </div>
          </div>
        </div>
      </div>

      {result.summary.shortfallWarning && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-sm text-orange-800 font-medium">⚡ Tax Without Cash: You owe ₹{result.summary.totalPerquisiteTax.toLocaleString('en-IN')} in perquisite tax at exercise, but your shares are illiquid — you cannot sell them to fund the tax. This must be paid from your regular salary. Plan ahead or use Startup Deferral if eligible.</p>
        </div>
      )}

      {/* Stage 1: Exercise Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-[#1A237E] font-medium text-base border-b pb-2 mb-3">Stage 1: Exercise Summary</h3>
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Options Being Exercised</span>
            <span className="font-medium">{result.shares.toLocaleString('en-IN')} shares</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Perquisite per Share</span>
            <span className="font-medium text-[#020288]">₹{result.perquisite.perquisitePerShare.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Perquisite (Taxed as Salary)</span>
            <span className="font-medium text-[#020288]">₹{result.perquisite.totalPerquisite.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Marginal Slab Rate Applied</span>
            <span className="font-medium">{result.perquisite.marginalSlabRate}%</span>
          </div>
          
          {result.perquisite.surchargeAmount > 0 && (
            <div className="flex justify-between text-sm text-gray-500">
              <span>Surcharge ({result.perquisite.surchargeRate}%)</span>
              <span>₹{result.perquisite.surchargeAmount.toLocaleString('en-IN')}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm text-gray-500">
            <span>Health & Education Cess (4%)</span>
            <span>₹{result.perquisite.cess.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between text-sm pt-2 border-t font-medium">
            <span className="text-gray-800">Total Perquisite Tax Due</span>
            <span className="text-red-600">₹{result.perquisite.totalTaxLiability.toLocaleString('en-IN')}</span>
          </div>

          {result.perquisite.taxDeferred > 0 && (
            <div className="mt-2 bg-green-50 rounded p-3">
               <div className="flex justify-between text-sm">
                 <span className="text-green-800">Tax Deferred (Startup)</span>
                 <span className="font-bold text-green-700">₹{result.perquisite.taxDeferred.toLocaleString('en-IN')}</span>
               </div>
               <div className="flex justify-between text-xs mt-1">
                 <span className="text-green-600">Deferral Trigger Deadline</span>
                 <span className="font-medium text-green-700">{result.perquisite.deferralTriggerDate}</span>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Stage 2: Sale Summary */}
      {result.capitalGains && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#1A237E] font-medium text-base border-b pb-2 mb-3">Stage 2: Sale Summary</h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Cost of Acquisition (Exercise FMV)</span>
              <span className="font-medium">₹{result.capitalGains.costOfAcquisition.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Capital Gain per Share</span>
              <span className="font-medium text-[#020288]">₹{result.capitalGains.capitalGainPerShare.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Capital Gain / Loss</span>
              <span className="font-medium text-[#020288]">₹{result.capitalGains.totalCapitalGain.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-500">Holding Classification</span>
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${result.capitalGains.cgClassification === 'LTCG' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {result.capitalGains.cgClassification}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">LTCG Exemption Applied</span>
              <span className="font-medium">{result.capitalGains.ltcgExemptionUsed}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Taxable Capital Gain</span>
              <span className="font-medium">₹{result.capitalGains.taxableCapitalGain.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Capital Gains Tax Rate</span>
              <span className="font-medium">{result.capitalGains.cgTaxRate}%</span>
            </div>

            <div className="flex justify-between text-sm pt-2 border-t font-medium">
              <span className="text-gray-800">Capital Gains Tax</span>
              <span className="text-red-600">₹{result.capitalGains.totalCGTax.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Regimes Comparison */}
      {result.oldRegimeComparison && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#1A237E] font-medium text-base border-b pb-2 mb-3">Regime Comparison</h3>
          
          <div className="grid grid-cols-3 gap-2 text-sm text-center mb-2 font-medium">
            <div className="text-left text-gray-500"></div>
            <div className="text-[#020288]">Old Regime</div>
            <div className="text-[#020288]">New Regime</div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm text-center mb-2">
            <div className="text-left text-gray-500">Total Tax</div>
            <div>₹{result.oldRegimeComparison.totalTax.toLocaleString('en-IN')}</div>
            <div>₹{result.summary.totalTaxOutflow.toLocaleString('en-IN')}</div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm text-center mb-2">
            <div className="text-left text-gray-500">Net Gain</div>
            <div className="font-medium">₹{result.oldRegimeComparison.netGain.toLocaleString('en-IN')}</div>
            <div className="font-medium text-green-600">₹{result.summary.netGainAfterTax.toLocaleString('en-IN')}</div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ESOPResult;
