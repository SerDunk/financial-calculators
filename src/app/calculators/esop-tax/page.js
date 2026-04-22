"use client";

import { useState, useEffect } from "react";
import { calculateESOPTaxBreakdown } from "@/utils/calculation";
import Heading from "@/components/Heading";
import SliderInput from "@/components/SliderInput";
import ESOPResult from "@/components/ESOPResult";
import ESOPGraph from "@/components/ESOPGraph";
import ESOPAssumptions from "@/components/ESOPAssumptions";
import { ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";

export default function ESOPTaxCalculator() {
  // Section 1 — Company & Grant Details
  const [companyType, setCompanyType] = useState("listed");
  const [taxRegime, setTaxRegime] = useState("new");
  const [optionsGranted, setOptionsGranted] = useState(1000);
  const [optionsVested, setOptionsVested] = useState(1000);
  const [exercisePrice, setExercisePrice] = useState(100);

  // Section 2 — FMV & Exercise Details
  const [fmvAtExercise, setFmvAtExercise] = useState(500);

  // Section 3 — Your Tax Profile
  const [annualSalary, setAnnualSalary] = useState(1500000);
  const [manualSlab, setManualSlab] = useState(-1);

  // Section 4 — Startup Tax Deferral
  const [isDeferring, setIsDeferring] = useState(true);
  const [deferralTrigger, setDeferralTrigger] = useState("sale");

  // Section 5 — Sale Details
  const [isSaleSectionExpanded, setIsSaleSectionExpanded] = useState(true);
  const [isSelling, setIsSelling] = useState(true);
  const [salePrice, setSalePrice] = useState(800);
  const [monthsHeld, setMonthsHeld] = useState(12);
  const [sttPaid, setSttPaid] = useState(true);

  // Section 6 — Advanced / Regime Comparison
  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(false);
  const [showOldvsNew, setShowOldvsNew] = useState(false);
  const [manualSurcharge, setManualSurcharge] = useState(-1);

  // Extra notes
  const [isForeignEsop, setIsForeignEsop] = useState(false);

  const [result, setResult] = useState(null);

  useEffect(() => {
    if (optionsVested > optionsGranted) {
      setOptionsVested(optionsGranted);
    }
  }, [optionsGranted, optionsVested]);

  useEffect(() => {
    performCalculations();
  }, [
    companyType, taxRegime, optionsGranted, optionsVested, exercisePrice, fmvAtExercise,
    annualSalary, manualSlab, isDeferring, deferralTrigger, isSelling, salePrice,
    monthsHeld, sttPaid, showOldvsNew, manualSurcharge
  ]);

  const performCalculations = () => {
    const inputs = {
      companyType,
      taxRegime,
      optionsGranted,
      optionsVested,
      exercisePrice,
      fmvAtExercise,
      annualSalary,
      startupDeferralOptions: { isAvailing: isDeferring, trigger: deferralTrigger },
      saleDetails: { isSelling, salePrice, monthsHeld, sttPaid },
      advancedDetails: { showOldvsNew, manualSurcharge, manualSlab }
    };
    
    const breakdown = calculateESOPTaxBreakdown(inputs);
    setResult(breakdown);
  };

  const getHoldingBadge = () => {
    const threshold = companyType === 'listed' ? 12 : 24;
    return monthsHeld <= threshold ? "Short-Term (STCG)" : "Long-Term (LTCG)";
  };
  const isLTCG = (companyType === 'listed' ? monthsHeld > 12 : monthsHeld > 24);

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0 pb-12">
      <div className="max-w-xl mx-auto pt-6">
        <Heading
          header="ESOP Tax Calculator"
          desc="Calculate perquisite & capital gains tax on employee stock options for FY 2026-27"
        />

        {isForeignEsop && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-sm text-amber-800">
            <strong>Foreign ESOP Warning:</strong> Foreign company shares must be disclosed in Schedule FA (Foreign Assets) of your ITR, regardless of whether you sell. Non-disclosure attracts ₹10 lakh penalty under the Black Money Act. If foreign tax was deducted, file Form 67 to claim tax credit before ITR due date.
          </div>
        )}

        <div className="flex flex-col gap-2">
          
          <div className="flex justify-end pr-2 mb-2">
            <label className="flex items-center text-xs font-medium text-gray-500 cursor-pointer bg-white px-3 py-1 rounded-full shadow-sm">
              <input type="checkbox" className="mr-2 accent-[#020288]" checked={isForeignEsop} onChange={e => setIsForeignEsop(e.target.checked)} />
              This is a foreign company ESOP (MNC)
            </label>
          </div>

          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">1. Company & Grant Details</h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">
              
              <div className="mb-1 group relative">
                <label className="text-sm font-medium text-[#1A237E] mb-2 flex items-center justify-between">
                  Company Type
                  <div className="hidden group-hover:block absolute z-10 bottom-full right-0 mb-1 max-w-xs bg-gray-800 text-white text-xs rounded p-2 shadow-lg">
                    Select 'DPIIT-Eligible Startup' ONLY if your company has BOTH DPIIT recognition AND an IMB certificate under Section 80-IAC. DPIIT recognition alone is NOT sufficient.
                  </div>
                </label>
                <div className="flex flex-col gap-1 bg-[#EFEDF4] rounded-lg p-1 sm:flex-row">
                  <button 
                    onClick={() => setCompanyType("listed")}
                    className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${companyType === "listed" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Listed</button>
                  <button 
                    onClick={() => setCompanyType("unlisted")}
                    className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${companyType === "unlisted" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Unlisted Private</button>
                  <button 
                    onClick={() => setCompanyType("startup")}
                    className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${companyType === "startup" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >DPIIT-Eligible Startup</button>
                </div>
              </div>

              {companyType === 'startup' && (
                <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg mt-[-10px]">
                  🔴 DPIIT recognition alone is NOT enough for tax deferral. Your company must also have an IMB certificate under Section 80-IAC. Only ~4,000 of 1.97 lakh+ DPIIT-recognised startups qualify.
                </div>
              )}

              <div className="mb-1 group relative">
                <label className="text-sm font-medium text-[#1A237E] mb-2 flex items-center justify-between">
                  Tax Regime
                  <div className="hidden group-hover:block absolute z-10 bottom-full right-0 mb-1 max-w-xs bg-gray-800 text-white text-xs rounded p-2 shadow-lg">
                    Both regimes tax ESOP perquisite at slab rates. The difference is in other deductions available.
                  </div>
                </label>
                <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                  <button 
                    onClick={() => setTaxRegime("new")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${taxRegime === "new" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >New Regime</button>
                  <button 
                    onClick={() => setTaxRegime("old")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${taxRegime === "old" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Old Regime</button>
                </div>
              </div>

              <SliderInput
                label="Number of Options Granted"
                value={optionsGranted}
                onChange={(val) => setOptionsGranted(val)}
                min={1} max={100000} step={100}
              />

              <div className="relative">
                <div className="absolute top-0 right-0 text-xs font-semibold text-[#020288] bg-blue-50 px-2 py-0.5 rounded">
                  Unvested: {Math.max(0, optionsGranted - optionsVested)} remaining
                </div>
                <SliderInput
                  label="Options Vested (Exercising Now)"
                  value={optionsVested}
                  onChange={(val) => setOptionsVested(Math.min(val, optionsGranted))}
                  min={1} max={100000} step={100}
                />
              </div>

              <SliderInput
                label="Exercise Price per Share"
                value={exercisePrice}
                onChange={(val) => setExercisePrice(val)}
                min={1} max={50000} step={1}
                tooltip="The fixed price at which you can buy shares — stated in your grant letter. Also called 'strike price'."
                showCurrency={true}
              />
            </div>
          </div>

          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">2. FMV & Profile Details</h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">
              
              <div className="relative">
                <div className={`absolute top-0 right-0 text-xs font-semibold px-2 py-0.5 rounded ${(fmvAtExercise - exercisePrice) <= 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  Spread: ₹{(fmvAtExercise - exercisePrice).toLocaleString('en-IN')}
                </div>
                <SliderInput
                  label="FMV at Exercise Date"
                  value={fmvAtExercise}
                  onChange={(val) => setFmvAtExercise(val)}
                  min={1} max={100000} step={1}
                  tooltip={companyType === 'listed' ? "Current market price of the share on NSE/BSE on the date you exercise." : "Value certified by a Category I Merchant Banker as of exercise date. Must not be older than 180 days."}
                  showCurrency={true}
                />
              </div>

              {fmvAtExercise <= exercisePrice && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-sm p-3 rounded-lg flex items-start gap-2">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                  <p><strong>⚠️ Underwater Options:</strong> Your exercise price (₹{exercisePrice}) exceeds FMV (₹{fmvAtExercise}). Exercising now means buying above market value and taking an immediate loss of ₹{exercisePrice - fmvAtExercise} per share. No perquisite tax applies.</p>
                </div>
              )}

              <SliderInput
                label="Annual Salary (excluding ESOP)"
                value={annualSalary}
                onChange={(val) => setAnnualSalary(val)}
                min={300000} max={50000000} step={50000}
                tooltip="Your total annual salary income BEFORE adding the ESOP perquisite. Determines which tax slab applies."
                showCurrency={true}
              />

              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 flex items-center justify-between">
                  Your True Marginal Slab (%) 
                  {result && <span className="bg-blue-100 text-[#020288] px-2 py-0.5 rounded text-xs font-bold">{result.perquisite.marginalSlabRate}% Applied</span>}
                </label>
                <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                  {[-1, 5, 10, 15, 20, 25, 30].map(val => (
                    <button 
                      key={val}
                      onClick={() => setManualSlab(val)}
                      className={`flex-1 text-[10px] sm:text-xs py-2 rounded-md transition-all ${manualSlab === val ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {val === -1 ? 'Auto' : `${val}%`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {companyType === 'startup' && (
            <div className="rounded-2xl p-6 relative bg-white border-l-4 border-[#583FCA]">
              <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">Startup Tax Deferral</h2>
              <div className="flex flex-col gap-4 mt-3 ml-1">
                <div className="mb-1 group relative">
                  <label className="text-sm font-medium text-[#1A237E] mb-2 flex items-center justify-between">
                    Availing Tax Deferral?
                    <div className="hidden group-hover:block absolute z-10 bottom-full right-0 mb-1 max-w-xs bg-gray-800 text-white text-xs rounded p-2 shadow-lg">
                      Deferral means no TDS at exercise. Tax triggers at sale, exit from company, or 48 months. You owe the same total tax.
                    </div>
                  </label>
                  <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                    <button onClick={() => setIsDeferring(true)} className={`flex-1 text-xs py-2 rounded-md transition-all ${isDeferring ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}>Yes — Deferring Tax</button>
                    <button onClick={() => setIsDeferring(false)} className={`flex-1 text-xs py-2 rounded-md transition-all ${!isDeferring ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}>No — Pay Now</button>
                  </div>
                </div>

                {isDeferring && (
                  <div className="mb-1 group relative">
                    <label className="text-sm font-medium text-[#1A237E] mb-2 block">Expected Deferral Trigger</label>
                    <div className="flex flex-col sm:flex-row bg-[#EFEDF4] rounded-lg p-1 gap-1">
                      <button onClick={() => setDeferralTrigger("sale")} className={`flex-1 text-xs py-2 rounded-md transition-all ${deferralTrigger === "sale" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}>Sale of Shares</button>
                      <button onClick={() => setDeferralTrigger("leave")} className={`flex-1 text-xs py-2 rounded-md transition-all ${deferralTrigger === "leave" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}>Leaving Company</button>
                      <button onClick={() => setDeferralTrigger("48-months")} className={`flex-1 text-xs py-2 rounded-md transition-all ${deferralTrigger === "48-months" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}>48-Month Timeout</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="rounded-2xl p-6 relative bg-white">
            <div 
               className="flex justify-between items-center cursor-pointer border-b pb-2 mb-3"
               onClick={() => setIsSaleSectionExpanded(!isSaleSectionExpanded)}
            >
               <h2 className="text-[#020288] text-base font-semibold">3. Sale Details</h2>
               <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                  {isSaleSectionExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
               </div>
            </div>
            
            {!isSaleSectionExpanded && (
               <p className="text-xs text-gray-500 italic mt-2" onClick={() => setIsSaleSectionExpanded(true)}>
                  Tap to securely expand sale inputs (Sale price, Holding period, STT, etc.)
               </p>
            )}

            {isSaleSectionExpanded && (
              <div className="flex flex-col gap-5 mt-4 ml-1">
                <div className="mb-1 group relative">
                  <label className="text-sm font-medium text-[#1A237E] mb-2 block">Selling Shares?</label>
                  <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                    <button onClick={() => setIsSelling(true)} className={`flex-1 text-xs py-2 rounded-md transition-all ${isSelling ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}>Yes — Planning to Sell</button>
                    <button onClick={() => setIsSelling(false)} className={`flex-1 text-xs py-2 rounded-md transition-all ${!isSelling ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}>No — Just Exercise</button>
                  </div>
                </div>

                {isSelling && (
                  <>
                    <SliderInput
                      label="Sale Price per Share"
                      value={salePrice}
                      onChange={(val) => setSalePrice(val)}
                      min={1} max={200000} step={1}
                      showCurrency={true}
                    />

                    {(salePrice < fmvAtExercise) && (
                      <div className="bg-blue-50 text-blue-800 text-xs p-2 rounded">
                        Capital loss of ₹{fmvAtExercise - salePrice} per share. Can be set off against other capital gains.
                      </div>
                    )}

                    <div className="relative">
                      <div className={`absolute top-0 right-0 text-xs font-semibold px-2 py-0.5 rounded ${isLTCG ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {getHoldingBadge()}
                      </div>
                      <SliderInput
                        label="Months Held After Exercise"
                        value={monthsHeld}
                        onChange={(val) => setMonthsHeld(val)}
                        min={0} max={120} step={1}
                      />
                    </div>
                    
                    {!isLTCG && result && result.capitalGains && result.capitalGains.totalCapitalGain > 0 && (
                      <div className="bg-blue-50 p-2 text-xs text-[#020288] rounded mt-[-10px]">
                        Nudge: Holding for just {(companyType === 'listed' ? 12 : 24) - monthsHeld + 1} more months converts this to LTCG, potentially saving taxes.
                      </div>
                    )}

                    {companyType === 'listed' && (
                      <div className="mt-2">
                         <label className="flex items-center text-sm font-medium text-[#1A237E] cursor-pointer">
                            <input type="checkbox" className="mr-3 accent-[#020288] w-4 h-4 rounded" checked={sttPaid} onChange={(e) => setSttPaid(e.target.checked)} />
                            STT Paid at Sale?
                         </label>
                         <p className="text-xs text-gray-400 mt-1 ml-7 italic">For listed shares sold on NSE/BSE, STT is automatically paid. Required for concessional 111A/112A rates.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="rounded-2xl p-6 relative bg-white">
            <div 
               className="flex justify-between items-center cursor-pointer border-b pb-2 mb-3"
               onClick={() => setIsAdvancedExpanded(!isAdvancedExpanded)}
            >
               <h2 className="text-[#020288] text-base font-semibold">4. Advanced / Comparison</h2>
               <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                  {isAdvancedExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
               </div>
            </div>

            {isAdvancedExpanded && (
              <div className="flex flex-col gap-5 mt-4 ml-1">
                <div className="mb-2">
                   <label className="flex items-center text-sm font-medium text-[#1A237E] cursor-pointer">
                      <input type="checkbox" className="mr-3 accent-[#020288] w-4 h-4 rounded" checked={showOldvsNew} onChange={(e) => setShowOldvsNew(e.target.checked)} />
                      Show Old vs New Regime Comparison?
                   </label>
                </div>

                <div className="mb-1">
                  <label className="text-sm font-medium text-[#1A237E] mb-2 block">
                    Surcharge Applicable? (Optional Override)
                  </label>
                  <div className="flex flex-wrap bg-[#EFEDF4] rounded-lg p-1 gap-1">
                    {[
                      {label: "Auto", val: -1},
                      {label: "No (<₹50L)", val: 0},
                      {label: "10%", val: 10},
                      {label: "15%", val: 15},
                      {label: "25%", val: 25},
                      {label: "37%", val: 37}
                    ].map(opt => (
                      <button 
                        key={opt.val}
                        onClick={() => setManualSurcharge(opt.val)}
                        className={`flex-1 min-w-[70px] text-xs py-2 rounded-md transition-all ${manualSurcharge === opt.val ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
           </div>
        </div>

        <button
          onClick={performCalculations}
          className="w-full sm:mt-2 mt-4 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90 transition-all active:scale-[0.98] shadow-md"
        >
          CALCULATE TAX
        </button>

        <ESOPResult result={result} />
        <ESOPGraph result={result} />
        <ESOPAssumptions />
        
      </div>
    </div>
  );
}
