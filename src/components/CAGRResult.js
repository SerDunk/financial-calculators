import { Calculator, TrendingUp, AlertTriangle, ShieldCheck, Zap } from "lucide-react";

const CAGRResult = ({ result, mode }) => {
  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-medium mb-2 text-[#2C178C]">
            Awaiting Calculation...
          </h3>
          <p className="text-sm">
            Enter your details to compute CAGR, taxes, and inflation impact.
          </p>
        </div>
      </div>
    );
  }

  const {
    cagr, futureValue, totalInvested, totalGain, absoluteReturn,
    postTaxCorpus, taxAmount, realCagr, realPostTaxCagr,
    wealthMultiplier, ruleOf72, doublingCount, isRealLoss, benchmarks
  } = result;

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val || 0);

  const getVerdict = () => {
    if (realPostTaxCagr < 0) return { color: "text-red-600 bg-red-50 border-red-200", text: "Your investment is losing purchasing power after tax and inflation", icon: <AlertTriangle size={18} /> };
    if (realPostTaxCagr <= 2) return { color: "text-amber-600 bg-amber-50 border-amber-200", text: "Barely preserving wealth — barely beating inflation after tax", icon: <ShieldCheck size={18} /> };
    if (realPostTaxCagr <= 5) return { color: "text-yellow-600 bg-yellow-50 border-yellow-200", text: "Moderate real return — steady wealth creation", icon: <TrendingUp size={18} /> };
    if (realPostTaxCagr <= 8) return { color: "text-green-600 bg-green-50 border-green-200", text: "Good real return — beating inflation comfortably", icon: <TrendingUp size={18} /> };
    return { color: "text-emerald-700 bg-emerald-50 border-emerald-200", text: "Excellent real return — strong wealth compounding", icon: <Zap size={18} /> };
  };

  const verdict = getVerdict();
  const userRank = benchmarks.find(b => b.isUser)?.currentRank || 0;

  return (
    <div className="sm:mt-2 mt-4 space-y-4">
      {/* Primary Result Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
         <h3 className="text-lg font-semibold text-[#020288] border-b pb-3 mb-4">Investment Summary</h3>
         
         {mode === "Reverse" && (
            <div className="text-center mb-6">
              <span className="block text-sm text-gray-500 mb-1">Compound Annual Growth Rate (CAGR)</span>
              <span className="text-4xl font-bold bg-gradient-to-r from-[#020288] to-[#583FCA] bg-clip-text text-transparent">
                 {cagr.toFixed(2)}%
              </span>
            </div>
         )}

         <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-6">
            <div>
               <span className="block text-xs text-gray-500 mb-0.5">Total Invested</span>
               <span className="text-sm font-semibold text-gray-800">₹{formatCurrency(totalInvested)}</span>
            </div>
            <div>
               <span className="block text-xs text-gray-500 mb-0.5">Future Value (Gross)</span>
               <span className="text-sm font-semibold text-gray-800">₹{formatCurrency(futureValue)}</span>
            </div>
            <div>
               <span className="block text-xs text-gray-500 mb-0.5">Total Gain</span>
               <span className="text-sm font-semibold text-green-600">+₹{formatCurrency(totalGain)}</span>
            </div>
            <div>
               <span className="block text-xs text-gray-500 mb-0.5">Estimated Tax</span>
               <span className="text-sm font-semibold text-red-500">-₹{formatCurrency(taxAmount)}</span>
            </div>
         </div>

         <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
            <div className="flex justify-between items-center mb-2">
               <span className="text-sm text-gray-600">Post-Tax Corpus</span>
               <span className="text-lg font-bold text-[#020288]">₹{formatCurrency(postTaxCorpus)}</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-600">Real Post-Tax CAGR</span>
               <span className={`text-base font-bold ${isRealLoss ? 'text-red-500' : 'text-emerald-600'}`}>
                  {realPostTaxCagr.toFixed(2)}%
               </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-right">The truest measure of wealth creation</p>
         </div>

         <div className={`flex items-center gap-2 p-3 rounded-xl border ${verdict.color}`}>
            {verdict.icon}
            <span className="text-xs font-medium">{verdict.text}</span>
         </div>
         
         {cagr > 0 && mode !== "Reverse" && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-[#020288]">
               <strong>Rule of 72:</strong> At {cagr.toFixed(1)}% CAGR, your money doubles every {ruleOf72.toFixed(1)} years. Over this period, it doubles {doublingCount.toFixed(1)} times.
            </div>
         )}
         
         {realPostTaxCagr < 2 && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
               <strong>Warning:</strong> After tax and inflation, your real return is only {realPostTaxCagr.toFixed(1)}%. Consider higher-return assets for long-term goals.
            </div>
         )}
      </div>

      {/* Benchmark Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
         <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h3 className="text-lg font-semibold text-[#020288]">Benchmark Comparison</h3>
            <span className="text-xs font-medium bg-[#EFEDF4] text-[#020288] px-2 py-1 rounded">
               Better than {8 - userRank + (benchmarks.find(b => b.isUser).currentRank === 9 ? 0 : 1)} of 8
            </span>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
               <thead>
                  <tr className="text-gray-500 border-b">
                     <th className="pb-2 font-medium">Rank</th>
                     <th className="pb-2 font-medium">Asset Class</th>
                     <th className="pb-2 font-medium">CAGR</th>
                     <th className="pb-2 font-medium">Post-Tax Corpus</th>
                     <th className="pb-2 font-medium">Real Return</th>
                  </tr>
               </thead>
               <tbody>
                  {benchmarks.map((b) => (
                     <tr key={b.name} className={`border-b border-gray-50 last:border-0 ${b.isUser ? 'bg-blue-50' : ''}`}>
                        <td className="py-3 font-medium text-gray-700">#{b.currentRank}</td>
                        <td className="py-3">
                           <span className={b.isUser ? 'font-semibold text-[#020288]' : 'text-gray-800'}>
                              {b.name}
                           </span>
                        </td>
                        <td className="py-3 text-gray-600">{b.cagr.toFixed(1)}%</td>
                        <td className="py-3 font-medium text-gray-800">₹{formatCurrency(b.postTaxCorpus)}</td>
                        <td className={`py-3 font-semibold ${b.realPostTaxCagr < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                           {b.realPostTaxCagr.toFixed(1)}%
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default CAGRResult;
