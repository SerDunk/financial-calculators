"use client";

import { useState, useEffect } from "react";
import { calculateCarLeaseVsLoanBreakdown } from "@/utils/calculation";
import Heading from "@/components/Heading";
import SliderInput from "@/components/SliderInput";
import CarLeaseResult from "@/components/CarLeaseResult";
import CarLeaseGraph from "@/components/CarLeaseGraph";
import CarLeaseAssumptions from "@/components/CarLeaseAssumptions";

const CarLeaseCalculator = () => {
  const [exShowroomPrice, setExShowroomPrice] = useState(2500000);
  const [gstSlabPercent, setGstSlabPercent] = useState(40);
  const [isEV, setIsEV] = useState(false);
  const [engineAbove1600cc, setEngineAbove1600cc] = useState(true);
  const [driverProvided, setDriverProvided] = useState(false);
  const [tenureYears, setTenureYears] = useState(4);
  const [residualValuePercent, setResidualValuePercent] = useState(20);
  const [annualCTC, setAnnualCTC] = useState(3000000);
  const [interestRate, setInterestRate] = useState(9);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(5000);

  const [result, setResult] = useState(null);

  useEffect(() => {
    performCalculations();
  }, []);

  const formatShortIndianCurrency = (amount) => {
    const num = parseInt(amount);
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    else if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    else if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const performCalculations = () => {
    const breakdown = calculateCarLeaseVsLoanBreakdown({
      exShowroomPrice,
      gstSlabPercent,
      isEV,
      engineAbove1600cc,
      driverProvided,
      tenureYears,
      residualValuePercent,
      annualCTC,
      interestRate,
      monthlyMaintenance
    });
    setResult(breakdown);
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0">
      <div className="max-w-xl mx-auto pb-10">
        <Heading
          header="Car Lease Calculator"
          desc="Compare the financial impact of a Corporate Lease versus an Auto Loan"
        />

        <div className="flex flex-col gap-2">
          {/* Car Details Form */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3">Car Details</h2>
            <div className="flex flex-col gap-4 mt-3 ml-2">
              <SliderInput
                label="Ex-Showroom Price"
                value={exShowroomPrice}
                onChange={(val) => setExShowroomPrice(val)}
                min={500000}
                max={50000000}
                step={50000}
                tooltip="The Ex-Showroom price of the car"
                showCurrency={true}
              />

              <div className="mb-4">
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">GST Category (Slab)</label>
                <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                  <button 
                    onClick={() => { setGstSlabPercent(5); setIsEV(true); }}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${gstSlabPercent === 5 ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Electric (5%)</button>
                  <button 
                    onClick={() => { setGstSlabPercent(18); setIsEV(false); }}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${gstSlabPercent === 18 ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Small/Comp (18%)</button>
                  <button 
                    onClick={() => { setGstSlabPercent(40); setIsEV(false); setEngineAbove1600cc(true); }}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${gstSlabPercent === 40 ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >SUV/Luxury (40%)</button>
                </div>
              </div>

              {!isEV && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-[#1A237E] mb-2 block">Engine Specifications</label>
                  <div className="flex gap-4">
                    <label className="flex items-center text-xs">
                      <input type="radio" className="mr-2 accent-[#020288]" checked={!engineAbove1600cc} onChange={() => setEngineAbove1600cc(false)} />
                      Below 1.6L
                    </label>
                    <label className="flex items-center text-xs">
                      <input type="radio" className="mr-2 accent-[#020288]" checked={engineAbove1600cc} onChange={() => setEngineAbove1600cc(true)} />
                      Above 1.6L
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lease/Loan Settings */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3">Lease / Loan Parameters</h2>
            <div className="flex flex-col gap-4 mt-3 ml-2">
              <SliderInput
                label="Annual Salary (CTC)"
                value={annualCTC}
                onChange={(val) => setAnnualCTC(val)}
                min={1000000}
                max={15000000}
                step={100000}
                tooltip="Your Annual Gross Salary to calculate marginal tax rate"
                showCurrency={true}
              />
               
              <SliderInput
                label="Tenure (Years)"
                value={tenureYears}
                onChange={(val) => setTenureYears(val)}
                min={1}
                max={5}
                step={1}
                tooltip="Duration of lease/loan"
                showCurrency={false}
              />

              <SliderInput
                label="Residual Value (%)"
                value={residualValuePercent}
                onChange={(val) => setResidualValuePercent(val)}
                min={10}
                max={45}
                step={1}
                tooltip="The buyback value percentage at the end of the term"
                showCurrency={false}
              />

              <SliderInput
                label="Interest Rate (%)"
                value={interestRate}
                onChange={(val) => setInterestRate(val)}
                min={8}
                max={16}
                step={0.5}
                tooltip="The annual interest rate loaded onto the lease/loan"
                showCurrency={false}
              />

              <SliderInput
                label="Monthly Maintenance & Ins."
                value={monthlyMaintenance}
                onChange={(val) => setMonthlyMaintenance(val)}
                min={2000}
                max={15000}
                step={500}
                tooltip="Monthly allowance provided for maintenance and insurance running costs"
                showCurrency={true}
              />
              
              <div className="mt-2">
                 <label className="flex items-center text-sm font-medium text-[#1A237E]">
                    <input type="checkbox" className="mr-2 accent-[#020288] w-4 h-4" checked={driverProvided} onChange={(e) => setDriverProvided(e.target.checked)} />
                    Include Company Driver Deductions (₹3,000/mo Perk)
                 </label>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={performCalculations}
          className="w-full sm:mt-2 mt-4 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>

        <CarLeaseResult result={result} comparisonPeriod={tenureYears} />
        <CarLeaseGraph result={result} />
        <CarLeaseAssumptions />
      </div>
    </div>
  );
};
export default CarLeaseCalculator;
