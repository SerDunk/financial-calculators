"use client";

import { useState, useEffect } from "react";
import { calculateCAGR } from "@/utils/cagrCalculation";
import Heading from "@/components/Heading";
import SliderInput from "@/components/SliderInput";
import CAGRResult from "@/components/CAGRResult";
import CAGRBenchmarkChart from "@/components/CAGRBenchmarkChart";
import CAGRAssumptions from "@/components/CAGRAssumptions";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CAGRCalculator() {
  // Mode
  const [mode, setMode] = useState("Reverse"); // Reverse, Lumpsum, SIP

  // Inputs
  const [initialValue, setInitialValue] = useState(100000);
  const [finalValue, setFinalValue] = useState(250000);
  const [principal, setPrincipal] = useState(100000);
  const [monthlySip, setMonthlySip] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(10);
  const [months, setMonths] = useState(0);
  const [stepUp, setStepUp] = useState(0);

  // Tax & Inflation
  const [isTaxExpanded, setIsTaxExpanded] = useState(false);
  const [assetClass, setAssetClass] = useState("Equity"); // Equity, Debt / FD, Gold, PPF / EPF (EEE), Real Estate, Custom
  const [taxSlab, setTaxSlab] = useState(30);
  const [inflation, setInflation] = useState(6);
  const [customTaxRate, setCustomTaxRate] = useState(10);

  const [result, setResult] = useState(null);

  useEffect(() => {
    performCalculations();
  }, [
    mode, initialValue, finalValue, principal, monthlySip, expectedReturn, 
    years, months, stepUp, assetClass, taxSlab, inflation, customTaxRate
  ]);

  const performCalculations = () => {
    const inputs = {
      mode,
      initialValue,
      finalValue,
      principal,
      monthlySip,
      expectedReturn,
      years,
      months,
      stepUp,
      assetClass,
      taxSlab,
      inflation,
      customTaxRate
    };
    
    const output = calculateCAGR(inputs);
    setResult(output);
  };

  const getTaxBadge = () => {
    let duration = years + (months / 12);
    if (mode !== "Reverse") duration = years;

    if (assetClass === 'Equity' || assetClass === 'Equity MF') {
      return duration <= 1 ? "STCG 20%" : "LTCG 12.5% (₹1.25L exempt)";
    }
    if (assetClass === 'Gold' || assetClass === 'Real Estate') {
      return duration <= 2 ? "STCG — Slab Rate" : "LTCG 12.5%";
    }
    if (assetClass === 'Debt / FD') return "Slab Rate (all periods)";
    if (assetClass === 'PPF / EPF (EEE)') return "Tax Free (EEE)";
    return "Custom Rate";
  };

  const getBenchmarkBadge = (rate) => {
    if (rate <= 7.1) return "~PPF Rate";
    if (rate <= 8.25) return "~EPF Rate";
    if (rate <= 10) return "~NPS Equity";
    if (rate <= 13) return "~Nifty 50 LT Avg";
    if (rate <= 16) return "~Midcap LT Avg";
    return "~Aggressive / Smallcap territory";
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0">
      <div className="max-w-xl mx-auto pb-10">
        <Heading
          header="CAGR Returns Calculator"
          desc="Calculate your exact returns, compare with benchmarks, and adjust for tax and inflation"
        />

        <div className="flex flex-col gap-2">
          {/* Mode Form */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">1. Calculator Mode</h2>
            <div className="mt-3 ml-1">
              <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                <button 
                  onClick={() => setMode("Reverse")}
                  className={`flex-1 text-xs py-2 rounded-md transition-all ${mode === "Reverse" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                >Reverse CAGR</button>
                <button 
                  onClick={() => setMode("Lumpsum")}
                  className={`flex-1 text-xs py-2 rounded-md transition-all ${mode === "Lumpsum" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                >Forward - Lumpsum</button>
                <button 
                  onClick={() => setMode("SIP")}
                  className={`flex-1 text-xs py-2 rounded-md transition-all ${mode === "SIP" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                >Forward - SIP</button>
              </div>
            </div>
          </div>

          {/* Core Inputs */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">2. Core Inputs</h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">
              
              {mode === "Reverse" && (
                <>
                  <SliderInput
                    label="Initial Investment / Value (₹)"
                    value={initialValue}
                    onChange={(val) => setInitialValue(val)}
                    min={1000} max={100000000} step={1000}
                    showCurrency={true}
                  />
                  <SliderInput
                    label="Final / Current Value (₹)"
                    value={finalValue}
                    onChange={(val) => setFinalValue(val)}
                    min={1000} max={500000000} step={1000}
                    showCurrency={true}
                  />
                  <div className="flex gap-4">
                     <div className="flex-1">
                        <SliderInput label="Years" value={years} onChange={(val) => setYears(val)} min={1} max={40} step={1} />
                     </div>
                     <div className="flex-1">
                        <SliderInput label="Months" value={months} onChange={(val) => setMonths(val)} min={0} max={11} step={1} tooltip="For precise CAGR — e.g. 3 years 4 months = 3.33 years" />
                     </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg flex justify-between mt-2 text-sm">
                     <span className="text-[#1A237E] font-medium">Absolute Return: {result ? result.absoluteReturn.toFixed(1) : 0}%</span>
                     <span className="text-[#1A237E] font-medium">Total Gain: ₹{result ? result.totalGain.toLocaleString('en-IN') : 0}</span>
                  </div>
                </>
              )}

              {mode === "Lumpsum" && (
                <>
                  <SliderInput
                    label="Principal Amount (₹)"
                    value={principal}
                    onChange={(val) => setPrincipal(val)}
                    min={1000} max={100000000} step={1000}
                    showCurrency={true}
                  />
                  <div className="relative">
                     <SliderInput
                       label="Expected Annual Return / CAGR (%)"
                       value={expectedReturn}
                       onChange={(val) => setExpectedReturn(val)}
                       min={1} max={30} step={0.5}
                     />
                     <span className="absolute top-0 right-0 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {getBenchmarkBadge(expectedReturn)}
                     </span>
                  </div>
                  <SliderInput label="Investment Duration (Years)" value={years} onChange={(val) => setYears(val)} min={1} max={40} step={1} />
                </>
              )}

              {mode === "SIP" && (
                <>
                  <SliderInput
                    label="Monthly SIP Amount (₹)"
                    value={monthlySip}
                    onChange={(val) => setMonthlySip(val)}
                    min={500} max={500000} step={500}
                    showCurrency={true}
                  />
                  <div className="relative">
                     <SliderInput
                       label="Expected Annual Return / CAGR (%)"
                       value={expectedReturn}
                       onChange={(val) => setExpectedReturn(val)}
                       min={1} max={30} step={0.5}
                     />
                     <span className="absolute top-0 right-0 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {getBenchmarkBadge(expectedReturn)}
                     </span>
                  </div>
                  <SliderInput label="Investment Duration (Years)" value={years} onChange={(val) => setYears(val)} min={1} max={40} step={1} />
                  <SliderInput 
                    label="Annual Step-Up % (Optional)" 
                    value={stepUp} 
                    onChange={(val) => setStepUp(val)} 
                    min={0} max={25} step={1} 
                    tooltip="Increase your SIP by this % every year — simulates salary increments. A 10% annual step-up significantly accelerates corpus."
                  />
                </>
              )}

            </div>
          </div>

          {/* Tax & Inflation Details */}
          <div className="rounded-2xl p-6 relative bg-white">
            <div 
               className="flex justify-between items-center cursor-pointer border-b pb-2 mb-3"
               onClick={() => setIsTaxExpanded(!isTaxExpanded)}
            >
               <h2 className="text-[#020288] text-base font-semibold">3. Tax & Inflation Details</h2>
               <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                  {isTaxExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
               </div>
            </div>
            
            {!isTaxExpanded && (
               <p className="text-xs text-gray-500 italic mt-2 cursor-pointer" onClick={() => setIsTaxExpanded(true)}>
                  Tap to configure tax rules based on post-July 2024 budget and adjust for inflation.
               </p>
            )}

            {isTaxExpanded && (
              <div className="flex flex-col gap-6 mt-4 ml-1">
                
                <div>
                  <label className="text-sm font-medium text-[#1A237E] mb-2 block">Asset Class</label>
                  <div className="flex flex-wrap gap-2">
                     {["Equity", "Debt / FD", "Gold", "PPF / EPF (EEE)", "Real Estate", "Custom"].map(ac => (
                        <button 
                           key={ac}
                           onClick={() => setAssetClass(ac)}
                           className={`text-xs px-3 py-1.5 rounded-md transition-all ${assetClass === ac ? 'bg-[#020288] text-white' : 'bg-[#EFEDF4] text-gray-600 hover:bg-gray-200'}`}
                        >
                           {ac}
                        </button>
                     ))}
                  </div>
                  <div className="mt-2 flex items-center">
                     <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-200">
                        {getTaxBadge()}
                     </span>
                  </div>
                </div>

                {assetClass === 'Custom' && (
                  <SliderInput label="Manual Tax Rate on Gains (%)" value={customTaxRate} onChange={setCustomTaxRate} min={0} max={30} step={1} />
                )}

                {(assetClass === 'Debt / FD' || assetClass === 'Gold' || assetClass === 'Real Estate' || assetClass === 'Equity') && assetClass !== 'Custom' && (
                   <div>
                     <label className="text-sm font-medium text-[#1A237E] mb-2 block">Income Tax Slab (%)</label>
                     <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                       {[0, 5, 10, 15, 20, 25, 30].map(slab => (
                         <button 
                           key={slab}
                           onClick={() => setTaxSlab(slab)}
                           className={`flex-1 text-xs py-1.5 rounded-md transition-all ${taxSlab === slab ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                         >{slab}%</button>
                       ))}
                     </div>
                     <p className="text-[10px] text-gray-400 mt-1 italic">Used for STCG, all debt gains, and gold STCG. Not used for 12.5% fixed LTCG.</p>
                   </div>
                )}

                <SliderInput 
                  label="Inflation Rate (%)" 
                  value={inflation} 
                  onChange={setInflation} 
                  min={3} max={12} step={0.5} 
                />
                <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded -mt-2">
                   Urban/metro residents typically experience 8–10% lifestyle inflation. CPI headline is 6%.
                </p>

              </div>
            )}
          </div>
        </div>

        <button
          onClick={performCalculations}
          className="w-full sm:mt-2 mt-4 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90 transition-all active:scale-[0.98]"
        >
          CALCULATE 
        </button>

        <CAGRResult result={result} mode={mode} />
        <CAGRBenchmarkChart result={result} mode={mode} />
        <CAGRAssumptions />
        
      </div>
    </div>
  );
}
