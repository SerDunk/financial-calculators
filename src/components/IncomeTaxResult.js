import { Calculator, Banknote } from "lucide-react";
import { useState } from "react";

const IncomeTaxResult = ({ result }) => {
  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-medium mb-2 text-[#2C178C]">
            Awaiting Calculation...
          </h3>
          <p className="text-sm">
            Your Old vs. New Tax Regime analysis will appear here.
          </p>
        </div>
      </div>
    );
  }

  const { newRegime, oldRegime, winner, savings, grossIncome } = result;
  
  const winnerTitle = winner === 'new' ? 'New Regime' : winner === 'old' ? 'Old Regime' : 'Both Regimes';
  const isNewBetter = winner === 'new';
  const isTie = winner === 'tie';

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val || 0);

  const RegimeCard = ({ title, data, isWinner, isNew }) => {
    const [slabsExpanded, setSlabsExpanded] = useState(false);
    
    // Choose styling based on new/old and winner status
    const borderColor = isWinner ? (isNew ? "border-[#FF9A9E]" : "border-[#4facfe]") : "border-gray-200";
    const bgGradient = isNew ? "from-[#FF9A9E] to-[#FECFEF]" : "from-[#4facfe] to-[#00f2fe]";
    const txtColor = isNew ? "text-pink-500" : "text-blue-500";

    return (
      <div className={`rounded-2xl p-5 border-2 bg-[#F9F9FB] ${borderColor}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 bg-gradient-to-r ${bgGradient} rounded-xl flex items-center justify-center mr-3 shadow-sm`}>
              <Banknote className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-[#2C178C]">{title}</h3>
              <p className="text-xs text-[#666666]">Tax calculation</p>
            </div>
          </div>
          {isWinner && (
            <div className={`${isNew ? "bg-[#FF9A9E]" : "bg-[#4facfe]"} text-white text-xs px-2 py-1 rounded-full font-medium`}>
              WINNER
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-xs text-gray-600">Gross Income</span>
            <span className="font-semibold text-sm text-gray-800">
              ₹{formatCurrency(grossIncome)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-xs text-gray-600">Total Deductions</span>
            <span className="font-semibold text-sm text-[#4CAF50]">
              - ₹{formatCurrency(data.totalDeductions)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-1 mt-1">
            <span className="text-xs text-gray-600">Taxable Income</span>
            <span className="font-semibold text-sm text-[#2C178C]">
              ₹{formatCurrency(data.taxableIncome)}
            </span>
          </div>
          
          {/* Slabs Accordion */}
          <div className="border-t border-gray-100 pt-2 mt-2">
            <button 
              onClick={() => setSlabsExpanded(!slabsExpanded)}
              className="text-xs font-medium text-[#2C178C] w-full text-left flex justify-between items-center"
            >
              <span>View Slab-wise Tax Breakdown</span>
              <span>{slabsExpanded ? "▲" : "▼"}</span>
            </button>
            {slabsExpanded && (
              <div className="mt-2 text-xs space-y-1 bg-white p-2 rounded border border-gray-100">
                {data.breakdown.length === 0 ? (
                   <div className="flex justify-between text-gray-500">
                     <span>No tax in any slab</span>
                     <span>₹0</span>
                   </div>
                ) : (
                  data.breakdown.map((b, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-gray-500">{b.range}</span>
                      <span className="font-medium text-gray-700">₹{formatCurrency(b.taxForSlab)}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-2 mt-2">
            <span className="text-xs text-gray-600">Tax Before Rebate</span>
            <span className="font-semibold text-xs text-gray-800">
              ₹{formatCurrency(data.taxBeforeCess + data.rebate)}
            </span>
          </div>
          {data.rebate > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-xs text-gray-600">Rebate U/s 87A</span>
              <span className="font-semibold text-xs text-[#4CAF50]">
                - ₹{formatCurrency(data.rebate)}
              </span>
            </div>
          )}
          {data.surcharge > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-xs text-gray-600">Surcharge</span>
              <span className="font-semibold text-xs text-gray-800">
                + ₹{formatCurrency(data.surcharge)}
              </span>
            </div>
          )}
          {data.surchargeMarginalRelief > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-xs text-gray-600">Marginal Relief</span>
              <span className="font-semibold text-xs text-[#4CAF50]">
                - ₹{formatCurrency(data.surchargeMarginalRelief)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center text-sm">
            <span className="text-xs text-gray-600">Health & Edu Cess (4%)</span>
            <span className="font-semibold text-xs text-gray-800">
              + ₹{formatCurrency(data.cess)}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-2 mt-2">
            <span className="text-xs text-gray-600">Effective Tax Rate</span>
            <span className="font-semibold text-sm text-[#2C178C]">
              {data.effectiveTaxRate.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
            <div className="flex flex-col">
               <span className="text-sm font-medium text-[#2C178C]">Total Tax Payable</span>
               <span className="text-xs text-gray-500">₹{formatCurrency(data.monthlyOutflow)} /mo expected outflow</span>
            </div>
            
            <span className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              ₹{formatCurrency(data.totalTax)}
            </span>
        </div>
        
        <div className="mt-3 bg-white p-3 rounded-xl border border-gray-100 text-center">
           <span className="block text-xs text-gray-500 mb-1">In-hand Annual Income</span>
           <span className="font-bold text-lg text-[#2C178C]">₹{formatCurrency(data.inHandAnnual)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="sm:mt-2 mt-4 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 shadow-[0px_4px_10px_rgba(0,0,0,0.1)]"
          style={{
            background: isTie ? "linear-gradient(to right, #4facfe 0%, #FF9A9E 100%)" : (isNewBetter ? "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)" : "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"),
          }}
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
             <Banknote size={24} className={isTie ? "text-purple-500" : (isNewBetter ? "text-pink-500" : "text-blue-500")} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          {isTie ? "It's a Tie!" : `${winnerTitle} is Better`}
        </h2>
        <p className="text-sm text-[#666666]">
          {isTie ? "Both regimes result in the same tax amount" : (
             <>
             You save{" "}
             <span className="font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
               ₹{formatCurrency(savings)}
             </span>{" "}
             in taxes this year
             </>
          )}
        </p>
      </div>

      <div className="space-y-4">
        {/* New Regime Card */}
        <RegimeCard 
           title="New Tax Regime" 
           data={newRegime} 
           isWinner={isNewBetter || isTie} 
           isNew={true} 
        />

        {/* Old Regime Card */}
        <RegimeCard 
           title="Old Tax Regime" 
           data={oldRegime} 
           isWinner={!isNewBetter || isTie} 
           isNew={false} 
        />
      </div>
    </div>
  );
};

export default IncomeTaxResult;
