"use client";

import { useState, useEffect } from "react";
import { calculateESPPBreakdown } from "@/utils/calculation";
import Heading from "@/components/Heading";
import SliderInput from "@/components/SliderInput";
import ESPPResult from "@/components/ESPPResult";
import ESPPGraph from "@/components/ESPPGraph";
import ESPPAssumptions from "@/components/ESPPAssumptions";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ESPPCalculator() {
  // Plan & Company Details
  const [shareType, setShareType] = useState("Foreign Listed (MNC)");
  const [offeringPeriod, setOfferingPeriod] = useState("6 Months");
  const [customOfferingMonths, setCustomOfferingMonths] = useState(6);
  const [lookback, setLookback] = useState(true);

  // Share Price Details
  const [fmv1, setFmv1] = useState(1500); // Start Price
  const [fmv2, setFmv2] = useState(1800); // Purchase Date Price
  const [discountPercent, setDiscountPercent] = useState(15);
  const [numberOfShares, setNumberOfShares] = useState(100);

  // Tax Profile
  const [incomeTaxSlab, setIncomeTaxSlab] = useState("30%");

  // Sale Details (Accordion)
  const [isSaleExpanded, setIsSaleExpanded] = useState(false);
  const [salePrice, setSalePrice] = useState(2500);
  const [holdingPeriodMonths, setHoldingPeriodMonths] = useState(12);
  const [isSTTpaid, setIsSTTpaid] = useState(true); // only relevant for Indian Listed realistically

  const [result, setResult] = useState(null);

  useEffect(() => {
    performCalculations();
  }, [
    shareType,
    offeringPeriod,
    customOfferingMonths,
    lookback,
    fmv1,
    fmv2,
    discountPercent,
    numberOfShares,
    incomeTaxSlab,
    salePrice,
    holdingPeriodMonths,
    isSTTpaid
  ]);

  const performCalculations = () => {
    const inputs = {
      shareType,
      lookback,
      fmv1,
      fmv2,
      discountPercent,
      numberOfShares,
      incomeTaxSlab,
      salePrice,
      holdingPeriodMonths,
      isSTTpaid
    };
    
    const breakdown = calculateESPPBreakdown(inputs);
    setResult(breakdown);
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0">
      <div className="max-w-xl mx-auto pb-10">
        <Heading
          header="ESPP Tax Calculator"
          desc="Calculate Perquisite & Capital Gains for Indian Employees (FY 2026-27)"
        />

        <div className="flex flex-col gap-2">
          {/* Plan Details Form */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">1. Plan & Company Details</h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">
              
              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">
                   Share Type
                   <span className="block text-xs text-gray-400 font-normal mt-1">Foreign-listed MNC shares are treated as unlisted for Indian tax — different CG rules apply</span>
                </label>
                <div className="flex flex-col sm:flex-row bg-[#EFEDF4] rounded-lg p-1 gap-1">
                  <button 
                    onClick={() => setShareType("Indian Listed Company")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${shareType === "Indian Listed Company" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Indian Listed Company</button>
                  <button 
                    onClick={() => setShareType("Foreign Listed (MNC)")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${shareType === "Foreign Listed (MNC)" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Foreign Listed (MNC)</button>
                </div>
              </div>

              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">Offering Period</label>
                <div className="flex flex-col sm:flex-row bg-[#EFEDF4] rounded-lg p-1 gap-1">
                  {["3 Months", "6 Months", "12 Months", "Custom"].map(opt => (
                     <button 
                       key={opt}
                       onClick={() => setOfferingPeriod(opt)}
                       className={`flex-1 text-xs py-2 rounded-md transition-all ${offeringPeriod === opt ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                     >{opt}</button>
                  ))}
                </div>
              </div>

              {offeringPeriod === "Custom" && (
                 <SliderInput
                    label="Custom Offering Months"
                    value={customOfferingMonths}
                    onChange={(val) => setCustomOfferingMonths(val)}
                    min={1}
                    max={24}
                    step={1}
                    tooltip="Length of the offering period in months"
                    showCurrency={false}
                 />
              )}

              <div className="mt-1 bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                 <div>
                    <label className="text-sm font-semibold text-[#1A237E] block">Lookback Provision</label>
                    <p className="text-xs text-gray-500 mt-1 mr-4">Lookback lets you buy at a discount off the lower of the start or end price of the offering period</p>
                 </div>
                 <div className="flex bg-[#EFEDF4] rounded-lg p-1 shrink-0">
                    <button 
                      onClick={() => setLookback(true)}
                      className={`px-4 text-xs py-2 rounded-md transition-all ${lookback ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                    >Yes</button>
                    <button 
                      onClick={() => setLookback(false)}
                      className={`px-4 text-xs py-2 rounded-md transition-all ${!lookback ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                    >No</button>
                 </div>
              </div>

            </div>
          </div>

          {/* Share Price Details */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">2. Share Price Details</h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">
              
              <SliderInput
                label="Stock Price at Offering Start (FMV₁)"
                value={fmv1}
                onChange={(val) => setFmv1(val)}
                min={1}
                max={50000}
                step={10}
                tooltip="The FMV explicitly at the start date. Utilized if Lookback is YES."
                showCurrency={true}
              />

              <SliderInput
                label="Stock Price at Purchase Date (FMV₂)"
                value={fmv2}
                onChange={(val) => setFmv2(val)}
                min={1}
                max={50000}
                step={10}
                tooltip="The FMV on the exact purchase date (End of Offering). Serves as Cost of Acquisition."
                showCurrency={true}
              />
              
              <SliderInput
                label="Discount % on ESPP"
                value={discountPercent}
                onChange={(val) => setDiscountPercent(val)}
                min={0}
                max={15}
                step={1}
                tooltip="Discount applied to the base price (after lookback). Typical range 5–15%"
                showCurrency={false}
              />

              <SliderInput
                label="Number of Shares Purchased"
                value={numberOfShares}
                onChange={(val) => setNumberOfShares(val)}
                min={1}
                max={10000}
                step={1}
                tooltip="Actual physical shares allotted in your Demat / external brokerage"
                showCurrency={false}
              />

            </div>
          </div>

          {/* Tax Profile */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">3. Your Tax Profile</h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">
              
              <div className="mb-1">
                  <label className="text-sm font-medium text-[#1A237E] mb-2 block">
                    Income Tax Slab (%)
                    <span className="block text-xs text-gray-400 font-normal mt-1 mb-2">Your marginal income tax rate for the year of purchase — applied directly calculating your perquisite TDS.</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 bg-[#EFEDF4] p-1 rounded-lg">
                    {["0%", "5%", "10%", "15%", "20%", "30%"].map((slab) => (
                      <button 
                        key={slab}
                        onClick={() => setIncomeTaxSlab(slab)}
                        className={`text-xs py-2 rounded-md transition-all ${incomeTaxSlab === slab ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        {slab}
                      </button>
                    ))}
                  </div>
              </div>

              <div className="mb-1 pointer-events-none opacity-60">
                 <label className="text-sm font-medium text-[#1A237E] mb-2 block">Tax Regime Selected</label>
                 <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                   <button className="flex-1 text-xs py-2 rounded-md bg-white shadow-sm font-semibold text-[#020288]">New Regime</button>
                   <button className="flex-1 text-xs py-2 rounded-md text-gray-500">Old Regime</button>
                 </div>
                 <p className="text-[10px] text-gray-500 mt-1 italic">Displayed for reference context; tax slab above overrides calculation mechanics directly.</p>
              </div>

            </div>
          </div>

          {/* Sale Details Accordion */}
          <div className="rounded-2xl p-6 relative bg-white">
            <div 
               className="flex justify-between items-center cursor-pointer border-b pb-2 mb-3"
               onClick={() => setIsSaleExpanded(!isSaleExpanded)}
            >
               <h2 className="text-[#020288] text-base font-semibold">4. Sale Details (Stage 2)</h2>
               <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                  {isSaleExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
               </div>
            </div>
            
            {!isSaleExpanded && (
               <p className="text-xs text-gray-500 italic mt-2 cursor-pointer" onClick={() => setIsSaleExpanded(true)}>
                  Tap to expand and configure your exact Sale Price and Holding configurations to estimate Capital Gains.
               </p>
            )}

            {isSaleExpanded && (
              <div className="flex flex-col gap-6 mt-4 ml-1">
                
                <SliderInput
                  label="Sale Price per Share"
                  value={salePrice}
                  onChange={(val) => setSalePrice(val)}
                  min={1}
                  max={100000}
                  step={10}
                  tooltip="The price exactly at the time of your exit scale."
                  showCurrency={true}
                />

                <div className="relative">
                   <div className="absolute top-0 right-0 z-10 flex gap-2">
                       {result && (
                          <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-md ${result.cgClassification === "STCG" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                             {result.cgClassification === "STCG" ? "Short-Term" : "Long-Term"}
                          </span>
                       )}
                   </div>
                   <SliderInput
                     label="Months Held After Purchase"
                     value={holdingPeriodMonths}
                     onChange={(val) => setHoldingPeriodMonths(val)}
                     min={0}
                     max={60}
                     step={1}
                     tooltip="Your holding duration determines exactly if your gains are assessed as STCG or LTCG."
                     showCurrency={false}
                   />
                </div>

                {shareType === "Indian Listed Company" && (
                   <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <input 
                         type="checkbox" 
                         checked={isSTTpaid} 
                         onChange={(e) => setIsSTTpaid(e.target.checked)}
                         className="w-5 h-5 accent-[#020288] rounded"
                      />
                      <div>
                         <label className="text-sm font-semibold text-[#1A237E] block">Sale involves STT Paid?</label>
                         <p className="text-xs text-gray-500 mt-1">Securities Transaction Tax is paid when selling listed shares through a recognised Indian exchange explicitly mapping 111A/112A</p>
                      </div>
                   </div>
                )}

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

        <ESPPResult result={result} inputs={{ shareType, lookback, holdingPeriodMonths }} />
        <ESPPGraph result={result} />
        <ESPPAssumptions />
        
      </div>
    </div>
  );
}
