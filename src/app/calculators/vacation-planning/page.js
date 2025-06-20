"use client";

import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import Heading from "@/components/Heading";
import { calculateVacationBreakdown } from "@/utils/calculation";
import VacationResult from "@/components/VacationPlannerResult";
import VacationAssumptions from "@/components/VacationAssumptions";

const VacationPlanner = () => {
  // States for inputs
  const [numAdults, setNumAdults] = useState(2);
  const [numChildren, setNumChildren] = useState(0);
  const [destination, setDestination] = useState("Domestic");
  const [tripDuration, setTripDuration] = useState(7);
  const [hotelLuxury, setHotelLuxury] = useState("Mid-range");
  const [flightClass, setFlightClass] = useState("Economy");
  const [mealPreference, setMealPreference] = useState("Mix");
  const [activitiesBudget, setActivitiesBudget] = useState(50000);

  // Derived amounts
  const [totalPeople, setTotalPeople] = useState(0);

  // Display strings
  const [activitiesBudgetInput, setActivitiesBudgetInput] = useState("50,000");

  // Results
  const [result, setResult] = useState(null);

  // Formatters
  // Formatters - Fixed version
  const formatIndianNumber = (num) => {
    // Add null/undefined/NaN checks
    if (num == null || isNaN(num)) return "0";
    return Number(num).toLocaleString("en-IN");
  };

  const formatShortIndianCurrency = (amt) => {
    // Add null/undefined checks and ensure we have a valid number
    if (amt == null) return "0";

    const num = parseInt(amt);
    if (isNaN(num)) return "0";

    if (num >= 1e7) return `${(num / 1e7).toFixed(1)}Cr`;
    if (num >= 1e5) return `${(num / 1e5).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return `${num}`;
  };

  const parseFormattedNumber = (str) => {
    if (!str) return 0;
    const parsed = parseInt(str.replace(/[^\d]/g, ""));
    return isNaN(parsed) ? 0 : parsed;
  };
  // Calculate total people and trigger calculation
  useEffect(() => {
    const total = numAdults + numChildren;
    setTotalPeople(total);

    // Auto-calculate results when inputs change
    calculate();
  }, [
    numAdults,
    numChildren,
    destination,
    tripDuration,
    hotelLuxury,
    flightClass,
    mealPreference,
    activitiesBudget,
  ]);

  // Initial trigger
  useEffect(() => handleCalculate(), []);

  const handleCalculate = () => {
    calculate();
  };

  const calculate = () => {
    const result = calculateVacationBreakdown({
      numAdults,
      numChildren,
      destination,
      tripDuration,
      hotelLuxury,
      flightClass,
      mealPreference,
      activitiesBudget,
    });

    setResult(result);
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] xs:px-0 px-1.5">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Vacation Planner"
          desc="Plan and estimate your perfect family vacation budget"
        />

        <div className="rounded-2xl p-6 relative bg-white">
          {/* Number of Adults */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Number of Adults</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Adults traveling (12+ years)
                  </PopoverContent>
                </Popover>
              </div>
              <div className="bg-[#EAE9F0] px-2 py-1 rounded-lg text-[#020288] text-xs text-center w-16">
                {numAdults}
              </div>
            </div>
            <Slider
              value={numAdults}
              min={1}
              max={10}
              step={1}
              onChange={(e, val) => setNumAdults(val)}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Number of Children */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Number of Children</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Children traveling (2-11 years)
                  </PopoverContent>
                </Popover>
              </div>
              <div className="bg-[#EAE9F0] px-2 py-1 rounded-lg text-[#020288] text-xs text-center w-16">
                {numChildren}
              </div>
            </div>
            <Slider
              value={numChildren}
              min={0}
              max={8}
              step={1}
              onChange={(e, val) => setNumChildren(val)}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Destination Type */}
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Destination</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Domestic or International travel
                  </PopoverContent>
                </Popover>
              </div>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Domestic">Domestic</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Trip Duration */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Trip Duration (days)</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Number of days for the vacation
                  </PopoverContent>
                </Popover>
              </div>
              <div className="bg-[#EAE9F0] px-2 py-1 rounded-lg text-[#020288] text-xs text-center w-16">
                {tripDuration}
              </div>
            </div>
            <Slider
              value={tripDuration}
              min={1}
              max={30}
              step={1}
              onChange={(e, val) => setTripDuration(val)}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Hotel Luxury Level */}
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Hotel Luxury Level</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Quality and luxury of accommodation
                  </PopoverContent>
                </Popover>
              </div>
              <Select value={hotelLuxury} onValueChange={setHotelLuxury}>
                <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Budget">Budget</SelectItem>
                  <SelectItem value="Mid-range">Mid-range</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Flight Class */}
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Flight Class</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Flight booking class preference
                  </PopoverContent>
                </Popover>
              </div>
              <Select value={flightClass} onValueChange={setFlightClass}>
                <SelectTrigger className="w-36 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Premium Economy">
                    Premium Economy
                  </SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Meal Preference */}
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Meal Preference</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Dining style and budget preference
                  </PopoverContent>
                </Popover>
              </div>
              <Select value={mealPreference} onValueChange={setMealPreference}>
                <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Street Food">Street Food</SelectItem>
                  <SelectItem value="Mix">Mix</SelectItem>
                  <SelectItem value="Fine Dining">Fine Dining</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Activities Budget */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Activities Budget</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Budget for sightseeing, tours, and activities
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0"
                  value={activitiesBudgetInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setActivitiesBudgetInput(
                      raw ? formatIndianNumber(+raw) : ""
                    );
                    setActivitiesBudget(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setActivitiesBudgetInput(
                      e.target.value.replace(/[^0-9]/g, "")
                    )
                  }
                  onBlur={() => {
                    const val = parseFormattedNumber(activitiesBudgetInput);
                    const cons = Math.min(Math.max(val, 0), 500000);
                    setActivitiesBudget(cons);
                    setActivitiesBudgetInput(formatIndianNumber(cons));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(activitiesBudget.toString())}
            </div>
            <Slider
              value={activitiesBudget}
              min={0}
              max={500000}
              step={5000}
              onChange={(e, val) => {
                setActivitiesBudget(val);
                setActivitiesBudgetInput(formatIndianNumber(val));
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Total People Display */}
          <div className="mt-4 p-3 bg-[#F8F7FB] rounded-lg">
            <div className="text-sm text-[#323233] font-medium">
              Total Travelers:{" "}
              <span className="text-[#020288] font-bold">{totalPeople}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full mt-2 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>

        <VacationResult result={result} />
        {/* <VacationAssumptions /> */}
      </div>
    </div>
  );
};

export default VacationPlanner;
