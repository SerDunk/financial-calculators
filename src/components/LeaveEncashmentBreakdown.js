import React from 'react';

const LeaveEncashmentBreakdown = ({ result, employeeType }) => {
  if (!result || employeeType === 'government' || !result.limbs) return null;

  const { limbs, exemptAmount } = result;

  const getLimbDescription = (limbNum) => {
    switch(limbNum) {
      case 1: return "Actual amount received";
      case 2: return "Lifetime ₹25L cap (balance)";
      case 3: return "10 months' average salary";
      case 4: return "Leave @ max 30 days × years";
      default: return "";
    }
  };

  const getBindingExplanation = () => {
    switch(limbs.bindingLimb) {
      case 1: 
        return "Limb 1 (Actual amount received) is your binding constraint. Your encashment amount is lower than all other statutory limits, meaning your entire leave encashment is tax-exempt.";
      case 2:
        return "Limb 2 (Lifetime ₹25L cap) is your binding constraint. You have exhausted your lifetime exemption limit under Section 10(10AA).";
      case 3:
        return `Limb 3 (10 months' salary = ₹${Math.round(limbs.limb3).toLocaleString('en-IN')}) is your binding constraint. Even though you have large unused leave, your exemption is capped by your salary level.`;
      case 4:
        return `Limb 4 (Leave @ 30 days/year = ₹${Math.round(limbs.limb4).toLocaleString('en-IN')}) is your binding constraint. The law caps the exemption based on a maximum of 30 days per year of service, regardless of your company's policy.`;
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-4">
      <h3 className="text-[#020288] text-base font-semibold mb-4 border-b pb-2">
        Four-Limb Exemption Test
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 rounded-t-lg">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Limb</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-right">Value</th>
              <th className="px-4 py-3 text-center rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((num) => {
              const isBinding = limbs.bindingLimb === num;
              return (
                <tr key={`limb-${num}`} className={`border-b ${isBinding ? 'bg-orange-50' : ''}`}>
                  <td className="px-4 py-3 font-medium text-gray-900">Limb {num}</td>
                  <td className="px-4 py-3 text-gray-600">{getLimbDescription(num)}</td>
                  <td className="px-4 py-3 text-right font-medium text-[#1A237E]">
                    ₹{Math.round(limbs[`limb${num}`]).toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {isBinding ? (
                      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">Lowest</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
            <tr className="bg-green-50 font-semibold">
              <td colSpan={2} className="px-4 py-3 text-green-800 rounded-bl-lg">Exempt Amount (Lowest of above)</td>
              <td className="px-4 py-3 text-right text-green-800">
                ₹{Math.round(exemptAmount).toLocaleString('en-IN')}
              </td>
              <td className="px-4 py-3 text-center text-green-600 rounded-br-lg">✓</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-sm rounded-lg border border-blue-100">
        <span className="font-semibold block mb-1">Diagnostic:</span>
        {getBindingExplanation()}
      </div>
    </div>
  );
};

export default LeaveEncashmentBreakdown;
