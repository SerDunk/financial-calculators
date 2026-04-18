"use client";

import { useState, useEffect } from "react";
import { calculateGratuityBreakdown } from "@/utils/calculation";
import Heading from "@/components/Heading";
import SliderInput from "@/components/SliderInput";
import GratuityResult from "@/components/GratuityResult";
import GratuityBreakdown from "@/components/GratuityBreakdown";
import GratuityAssumptions from "@/components/GratuityAssumptions";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function GratuityCalculator() {
  // Employee Details
  const [employmentType, setEmploymentType] = useState("Private (Act Covered)");
  const [separationReason, setSeparationReason] = useState("Retirement / Superannuation");
  const [yearsOfService, setYearsOfService] = useState(5);
  const [additionalMonths, setAdditionalMonths] = useState(0);

  // Salary Details
  const [basicSalary, setBasicSalary] = useState(50000);
  const [da, setDa] = useState(10000);
  const [retainingAllowance, setRetainingAllowance] = useState(0);

  // Tax Details
  const [isTaxExpanded, setIsTaxExpanded] = useState(false);
  const [taxRegime, setTaxRegime] = useState("New Regime");
  const [incomeTaxSlab, setIncomeTaxSlab] = useState("0%");

  const [result, setResult] = useState(null);

  useEffect(() => {
    performCalculations();
  }, [
    employmentType,
    separationReason,
    yearsOfService,
    additionalMonths,
    basicSalary,
    da,
    retainingAllowance,
    taxRegime,
    incomeTaxSlab
  ]);

  const performCalculations = () => {
    const inputs = {
      employmentType,
      separationReason,
      yearsOfService,
      additionalMonths,
      basicSalary,
      da,
      retainingAllowance,
      taxRegime,
      incomeTaxSlab
    };
    
    const breakdown = calculateGratuityBreakdown(inputs);
    setResult(breakdown);
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Gratuity Calculator"
          desc="Estimate your gratuity payout based on the 2026 Code on Social Security"
        />

        <div className="flex flex-col gap-2">
          {/* Employee Details Form */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">1. Employee Details</h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">
              
              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">Employment Type</label>
                <div className="flex flex-col sm:flex-row bg-[#EFEDF4] rounded-lg p-1 gap-1">
                  <button 
                    onClick={() => setEmploymentType("Government / PSU")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${employmentType === "Government / PSU" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Government / PSU</button>
                  <button 
                    onClick={() => setEmploymentType("Private (Act Covered)")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${employmentType === "Private (Act Covered)" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Private (Act Covered)</button>
                  <button 
                    onClick={() => setEmploymentType("Private (Not Covered)")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${employmentType === "Private (Not Covered)" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Private (Not Covered)</button>
                </div>
              </div>

              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">Separation Reason</label>
                <div className="flex flex-col sm:flex-row bg-[#EFEDF4] rounded-lg p-1 gap-1">
                  <button 
                    onClick={() => setSeparationReason("Retirement / Superannuation")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${separationReason === "Retirement / Superannuation" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Retirement</button>
                  <button 
                    onClick={() => setSeparationReason("Resignation")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${separationReason === "Resignation" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Resignation</button>
                  <button 
                    onClick={() => setSeparationReason("Death / Disability")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${separationReason === "Death / Disability" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Death / Disability</button>
                </div>
              </div>

              <SliderInput
                label="Years of Service"
                value={yearsOfService}
                onChange={(val) => setYearsOfService(val)}
                min={0}
                max={40}
                step={1}
                tooltip="Completed years of uninterrupted service"
                showCurrency={false}
              />
              
              <SliderInput
                label="Additional Months"
                value={additionalMonths}
                onChange={(val) => setAdditionalMonths(val)}
                min={0}
                max={11}
                step={1}
                tooltip="Additional months served. For Act-covered orgs, >= 6 months rounds up to a full year."
                showCurrency={false}
              />

            </div>
          </div>

          {/* Salary Details */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">2. Salary Details</h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">
              
              <SliderInput
                label="Basic Salary (Monthly)"
                value={basicSalary}
                onChange={(val) => setBasicSalary(val)}
                min={10000}
                max={1000000}
                step={1000}
                tooltip="Your monthly basic salary excluding HRA or special allowances"
                showCurrency={true}
              />

              <SliderInput
                label="Dearness Allowance / DA (Monthly)"
                value={da}
                onChange={(val) => setDa(val)}
                min={0}
                max={500000}
                step={500}
                tooltip="DA is included in the gratuity base as per the Code on Social Security, 2020"
                showCurrency={true}
              />
              
              <SliderInput
                label="Retaining Allowance (Monthly)"
                value={retainingAllowance}
                onChange={(val) => setRetainingAllowance(val)}
                min={0}
                max={100000}
                step={500}
                tooltip="Retaining allowance, if any, is included in the wage base under the new labour codes"
                showCurrency={true}
              />

            </div>
          </div>

          {/* Tax Details */}
          <div className="rounded-2xl p-6 relative bg-white">
            <div 
               className="flex justify-between items-center cursor-pointer border-b pb-2 mb-3"
               onClick={() => setIsTaxExpanded(!isTaxExpanded)}
            >
               <h2 className="text-[#020288] text-base font-semibold">3. Tax Details (Optional)</h2>
               <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                  {isTaxExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
               </div>
            </div>
            
            {!isTaxExpanded && (
               <p className="text-xs text-gray-500 italic mt-2 cursor-pointer" onClick={() => setIsTaxExpanded(true)}>
                  Tap to expand tax configuration and customize your marginal slab rate
               </p>
            )}

            {isTaxExpanded && (
              <div className="flex flex-col gap-6 mt-4 ml-1">
                
                <div className="mb-1">
                  <label className="text-sm font-medium text-[#1A237E] mb-2 block">Tax Regime</label>
                  <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                    <button 
                      onClick={() => setTaxRegime("Old Regime")}
                      className={`flex-1 text-xs py-2 rounded-md transition-all ${taxRegime === "Old Regime" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                    >Old Regime</button>
                    <button 
                      onClick={() => setTaxRegime("New Regime")}
                      className={`flex-1 text-xs py-2 rounded-md transition-all ${taxRegime === "New Regime" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                    >New Regime</button>
                  </div>
                </div>

                <div className="mb-1">
                  <label className="text-sm font-medium text-[#1A237E] mb-2 block">
                    Income Tax Slab (%)
                    <span className="block text-xs text-gray-400 font-normal mt-1 mb-2">Select your marginal income tax rate for computing tax on any taxable gratuity above the exemption limit</span>
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

        <GratuityResult result={result} />
        <GratuityBreakdown result={result} />
        <GratuityAssumptions />
        
      </div>
    </div>
  );
}
