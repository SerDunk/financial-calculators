import React from 'react';

const LeaveEncashmentResult = ({ result, unusedLeaveDays }) => {
  if (!result) return null;

  const {
    dailySalaryRate,
    grossLeaveEncashment,
    exemptAmount,
    taxableLeaveEncashment,
    marginalSlabRate,
    taxOnTaxablePortion,
    netAmountReceived,
    effectiveTaxRate,
    remainingLifetimeExemption
  } = result;

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Card 1: Leave Encashment Calculation */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-[#020288] text-base font-semibold mb-4 border-b pb-2">
          Leave Encashment Calculation
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Daily Salary Rate (Basic + DA + Commission ÷ 30)</span>
            <span className="font-semibold text-[#1A237E]">₹{Math.round(dailySalaryRate).toLocaleString('en-IN')}/day</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Unused Leave Days</span>
            <span className="font-semibold text-[#1A237E]">{unusedLeaveDays} days</span>
          </div>
          <div className="flex justify-between items-center text-base pt-2 border-t mt-2">
            <span className="text-[#1A237E] font-medium">Gross Leave Encashment</span>
            <span className="font-bold text-[#1A237E]">₹{Math.round(grossLeaveEncashment).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Card 3: Tax Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-[#020288] text-base font-semibold mb-4 border-b pb-2">
          Tax Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Exempt Leave Encashment</span>
            <span className="font-semibold text-green-600">₹{Math.round(exemptAmount).toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Taxable Leave Encashment</span>
            <span className={`font-semibold ${taxableLeaveEncashment > 0 ? 'text-red-500' : 'text-gray-600'}`}>
              ₹{Math.round(taxableLeaveEncashment).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Marginal Slab Rate Applied</span>
            <span className="font-semibold text-gray-800">{marginalSlabRate}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Tax on Taxable Portion (incl. cess)</span>
            <span className="font-semibold text-red-500">₹{Math.round(taxOnTaxablePortion).toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex justify-between items-center text-lg pt-3 border-t mt-3">
            <span className="text-[#1A237E] font-semibold">Net Leave Encashment</span>
            <span className="font-bold text-green-600">₹{Math.round(netAmountReceived).toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between items-center text-sm mt-3 pt-3 border-t border-gray-100 border-dashed">
            <span className="text-gray-600">Effective Tax Rate</span>
            <span className="font-medium text-gray-800">{effectiveTaxRate.toFixed(1)}%</span>
          </div>
          {remainingLifetimeExemption !== undefined && (
             <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Remaining Lifetime Exemption</span>
               <span className="font-medium text-gray-800">₹{Math.round(remainingLifetimeExemption).toLocaleString('en-IN')}</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveEncashmentResult;
