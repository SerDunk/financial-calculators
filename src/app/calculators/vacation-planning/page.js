"use client";

import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Heading from "@/components/Heading";

const VacationPlanner = () => {
  const [numPeople, setNumPeople] = useState(2);
  const [duration, setDuration] = useState(7);
  const [monthsUntil, setMonthsUntil] = useState(2);
  const [type, setType] = useState("Domestic");
  const [budget, setBudget] = useState("Mid-range");
  const [result, setResult] = useState(null);

  const formatIndianNumber = (num) => num.toLocaleString("en-IN");

  const estimateCosts = () => {
    let flightPerPerson = 0;
    let hotelPerNightPerPerson = 0;

    if (type === "Domestic") {
      flightPerPerson =
        budget === "Luxury" ? 8000 : budget === "Mid-range" ? 5000 : 3000;
      hotelPerNightPerPerson =
        budget === "Luxury" ? 6000 : budget === "Mid-range" ? 3500 : 2000;
    } else {
      flightPerPerson =
        budget === "Luxury" ? 55000 : budget === "Mid-range" ? 40000 : 25000;
      hotelPerNightPerPerson =
        budget === "Luxury" ? 10000 : budget === "Mid-range" ? 7000 : 4000;
    }

    const totalFlight = flightPerPerson * numPeople;
    const totalHotel = hotelPerNightPerPerson * duration * numPeople;
    const total = totalFlight + totalHotel;

    setResult({
      totalFlight,
      totalHotel,
      total,
    });
  };

  useEffect(() => {
    estimateCosts();
  }, []);

  const handleCalculate = () => {
    estimateCosts();
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] xs:px-0 px-1.5">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Vacation Planner"
          desc="Estimate your family vacation budget based on your preferences"
        />
        <div className="rounded-2xl p-6 relative bg-white">
          {/* Number of People */}
          <InputSlider
            label="Number of People"
            tooltip="Total number of people going on the trip"
            value={numPeople}
            min={1}
            max={10}
            step={1}
            onChange={setNumPeople}
          />

          {/* Vacation Duration */}
          <InputSlider
            label="Vacation Duration (days)"
            tooltip="How many days you’ll be on vacation"
            value={duration}
            min={1}
            max={30}
            step={1}
            onChange={setDuration}
          />

          {/* Time Until Vacation */}
          <InputSlider
            label="Time Until Vacation (months)"
            tooltip="How far in advance are you planning?"
            value={monthsUntil}
            min={0}
            max={24}
            step={1}
            onChange={setMonthsUntil}
          />

          {/* Type of Vacation */}
          <DropdownSelector
            label="Vacation Type"
            tooltip="Domestic or International travel"
            options={["Domestic", "International"]}
            value={type}
            onChange={setType}
          />

          {/* Budget Preference */}
          <DropdownSelector
            label="Budget Preference"
            tooltip="Choose travel and stay quality"
            options={["Economy", "Mid-range", "Luxury"]}
            value={budget}
            onChange={setBudget}
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full mt-2 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>
      </div>
    </div>
  );
};

const InputSlider = ({ label, tooltip, value, min, max, step, onChange }) => {
  return (
    <div className="mb-1">
      <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
        <div className="flex items-center gap-1.5">
          <label>{label}</label>
          <Popover>
            <PopoverTrigger>
              <Info width={15} />
            </PopoverTrigger>
            <PopoverContent className="text-xs border-[#666666]">
              {tooltip}
            </PopoverContent>
          </Popover>
        </div>
        <div className="bg-[#EAE9F0] px-2 py-1 rounded-lg text-[#020288] text-xs text-center w-16">
          {value}
        </div>
      </div>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e, val) => onChange(val)}
        sx={{
          color: "#020288",
          height: 6,
          "& .MuiSlider-thumb": {
            backgroundImage: "url('/slider.svg')",
            backgroundPosition: "center",
            width: 18,
            height: 18,
            transition: "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
  );
};

const DropdownSelector = ({ label, tooltip, options, value, onChange }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
        <div className="flex items-center gap-1.5">
          <label>{label}</label>
          <Popover>
            <PopoverTrigger>
              <Info width={15} />
            </PopoverTrigger>
            <PopoverContent className="text-xs border-[#666666]">
              {tooltip}
            </PopoverContent>
          </Popover>
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-[#EAE9F0] text-[#020288] text-xs px-2 py-1 rounded-lg"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VacationPlanner;
