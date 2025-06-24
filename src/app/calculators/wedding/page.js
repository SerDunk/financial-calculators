"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Info, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@mui/material";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Heading from "@/components/Heading";
import {
  calculateWeddingBreakdown,
  formatters,
  calculatorUtils,
} from "@/utils/calculation";
import WeddingResult from "@/components/WeddingResult";
import WeddingAssumptions from "@/components/WeddingAssumptions";
import SliderInput from "@/components/SliderInput";

const NumberInput = ({
  label,
  value,
  onChange,
  tooltip,
  min = 0,
  max = 10000,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  // Update input value when prop value changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(raw);
    const numValue = raw ? parseInt(raw) : 0;
    onChange(calculatorUtils.validateInput(numValue, min, max));
  };

  const handleBlur = () => {
    setInputValue(value.toString());
  };

  return (
    <div className="mb-1">
      <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
        <div className="flex items-center gap-1.5">
          <label>{label}</label>
          {tooltip && (
            <Popover>
              <PopoverTrigger>
                <Info width={15} />
              </PopoverTrigger>
              <PopoverContent className="text-xs border-[#666666] max-w-xs">
                {tooltip}
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="flex bg-[#EAE9F0] px-2 py-1 rounded-lg">
          <input
            type="text"
            className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0 bg-transparent"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event, onUpdate, onDelete, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const updateEvent = useCallback(
    (field, value) => {
      onUpdate(event.id, { ...event, [field]: value });
    },
    [event, onUpdate]
  );

  const totalFoodCost = event.totalGuests * event.foodCostPerPlate;
  const totalVenueCost = event.venueAmount;
  const accommodationCost =
    event.stayingGuests * event.accommodationCostPerGuest;
  const eventTotal =
    totalFoodCost +
    totalVenueCost +
    accommodationCost +
    (event.decorationAmount || 0);

  return (
    <div className="border border-[#E0E0E0] rounded-xl p-4 mb-4 bg-white">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="text"
            value={event.name}
            onChange={(e) => updateEvent("name", e.target.value)}
            className="text-[#020288] bg-[#EAE9F0] font-semibold w-[80px] p-2 rounded-lg text-base border-none outline-none focus:ring-0 flex-1 min-w-0"
            placeholder="Event Name"
          />
          <span className="text-[#666666] text-xs">
            {formatters.formatShortIndianCurrency(eventTotal)}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#020288] p-1 flex-shrink-0"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {!isLast && (
            <button
              onClick={() => onDelete(event.id)}
              className="text-red-500 p-1 hover:bg-red-50 rounded"
              title="Delete Event"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberInput
              label="Total Guests"
              value={event.totalGuests}
              onChange={(value) => updateEvent("totalGuests", value)}
              tooltip="Total number of guests for this event"
              max={2000}
            />
            <NumberInput
              label="Staying Guests"
              value={event.stayingGuests}
              onChange={(value) =>
                updateEvent("stayingGuests", Math.min(value, event.totalGuests))
              }
              tooltip="Number of guests requiring accommodation"
              max={event.totalGuests}
            />
          </div>

          <SliderInput
            label="Food Cost Per Plate"
            value={event.foodCostPerPlate}
            onChange={(val) => updateEvent("foodCostPerPlate", val)}
            min={200}
            max={5000}
            step={50}
            tooltip="Cost per plate for this event including all food items"
          />

          <div className="bg-[#F8F8FA] p-3 rounded-lg">
            <div className="text-[#020288] font-medium text-sm mb-2">
              Total Food Cost: ₹{formatters.formatIndianCurrency(totalFoodCost)}
            </div>
          </div>

          <SliderInput
            label="Venue Cost"
            value={event.venueAmount}
            onChange={(val) => updateEvent("venueAmount", val)}
            min={0}
            max={1000000}
            step={5000}
            tooltip="Total venue cost for this event"
          />

          <SliderInput
            label="Accommodation Cost Per Guest"
            value={event.accommodationCostPerGuest}
            onChange={(val) => updateEvent("accommodationCostPerGuest", val)}
            min={0}
            max={5000}
            step={100}
            tooltip="Cost per staying guest for accommodation"
          />

          <div className="bg-[#F8F8FA] p-3 rounded-lg">
            <div className="text-[#020288] font-medium text-sm mb-2">
              Total Accommodation Cost: ₹
              {formatters.formatIndianCurrency(accommodationCost)}
            </div>
          </div>

          <SliderInput
            label="Decoration Cost"
            value={event.decorationAmount || 0}
            onChange={(val) => updateEvent("decorationAmount", val)}
            min={0}
            max={200000}
            step={2500}
            tooltip="Decoration cost for this specific event including flowers, lighting, and stage setup"
          />

          <div className="bg-[#F8F8FA] p-3 rounded-lg">
            <div className="text-[#020288] font-medium text-sm mb-2">
              Total Decoration Cost: ₹
              {formatters.formatIndianCurrency(event.decorationAmount || 0)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HybridWeddingCalculator = () => {
  // Event-based state
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Engagement",
      totalGuests: 150,
      stayingGuests: 20,
      foodCostPerPlate: 800,
      venueAmount: 80000,
      accommodationCostPerGuest: 2000,
      decorationAmount: 25000,
    },
  ]);

  // Budget and expense state
  const [totalBudget, setTotalBudget] = useState(1500000);
  const [photographyAmount, setPhotographyAmount] = useState(120000);
  const [clothingAmount, setClothingAmount] = useState(150000);
  const [makeupAmount, setMakeupAmount] = useState(75000);
  const [invitationAmount, setInvitationAmount] = useState(30000);

  const [entertainmentAmount, setEntertainmentAmount] = useState(75000);
  const [weddingPlanner, setWeddingPlanner] = useState("No");

  // Results and UI state
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Memoize the calculation function to prevent unnecessary recalculations
  const calculateResults = useCallback(() => {
    setIsCalculating(true);

    try {
      // Calculate totals from events
      const eventTotals = calculatorUtils.calculateEventTotals(events);

      const calculationResult = calculateWeddingBreakdown({
        totalBudget,
        guestCount: eventTotals.maxGuestCount,
        foodAmount: eventTotals.totalFoodAmount,
        photographyAmount,
        venueAmount: eventTotals.totalVenueAmount,
        clothingAmount,
        makeupAmount,
        entertainmentAmount,
        accommodationAmount: eventTotals.totalAccommodationAmount,
        invitationAmount,
        weddingPlanner,
        events,
      });

      setResult(calculationResult);
    } catch (error) {
      console.error("Calculation error:", error);
      setResult(null);
    } finally {
      setIsCalculating(false);
    }
  }, [
    events,
    totalBudget,
    photographyAmount,
    clothingAmount,
    makeupAmount,
    entertainmentAmount,
    invitationAmount,
    weddingPlanner,
  ]);

  // Auto-calculate when dependencies change with debouncing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      calculateResults();
    }, 300); // Debounce for 300ms

    return () => clearTimeout(debounceTimer);
  }, [calculateResults]);

  // Initial calculation on mount
  useEffect(() => {
    calculateResults();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Event management functions
  const addEvent = useCallback(() => {
    const newEvent = {
      id: Date.now(),
      name: "New Event",
      totalGuests: 100,
      stayingGuests: 10,
      foodCostPerPlate: 600,
      venueAmount: 50000,
      accommodationCostPerGuest: 2000,
      decorationAmount: 25000,
    };
    setEvents((prev) => [...prev, newEvent]);
  }, []);

  const updateEvent = useCallback((id, updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? updatedEvent : event))
    );
  }, []);

  const deleteEvent = useCallback((id) => {
    setEvents((prev) => {
      if (prev.length > 1) {
        return prev.filter((event) => event.id !== id);
      }
      return prev;
    });
  }, []);

  // Manual calculation trigger
  const handleCalculate = () => {
    calculateResults();
  };

  // Handle budget input change with validation
  const handleBudgetChange = useCallback((value) => {
    const parsed =
      typeof value === "string"
        ? formatters.parseFormattedNumber(value)
        : value;
    setTotalBudget(calculatorUtils.validateInput(parsed, 500000, 50000000));
  }, []);

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] xs:px-0 px-1.5">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Wedding Budget Calculator"
          desc="Plan and allocate your wedding budget with event-wise breakdown"
        />

        {/* Total Budget Input */}
        <div className="rounded-2xl p-4 relative bg-white mb-4">
          <h2 className="text-[#020288] font-semibold text-lg mb-4">
            Overall Budget
          </h2>

          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Total Wedding Budget</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Total amount you plan to spend on the wedding including all
                    ceremonies
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0 bg-transparent"
                  value={formatters.formatIndianCurrency(totalBudget)}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              {formatters.formatShortIndianCurrency(totalBudget)}
            </div>

            <Slider
              value={totalBudget}
              min={500000}
              max={50000000}
              step={50000}
              onChange={(e, val) => setTotalBudget(val)}
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
        </div>

        {/* Event-based Inputs */}
        <div className="rounded-2xl p-6 relative bg-white mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
            <h2 className="text-[#020288] font-semibold text-lg">
              Wedding Events
            </h2>
            <button
              onClick={addEvent}
              className="flex items-center justify-center gap-2 bg-[#020288] text-white px-3 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity w-full sm:w-auto"
            >
              <Plus size={16} />
              Add Event
            </button>
          </div>

          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              onUpdate={updateEvent}
              onDelete={deleteEvent}
              isLast={events.length === 1}
            />
          ))}
        </div>

        {/* Fixed Category Inputs */}
        <div className="rounded-2xl p-6 relative bg-white mb-2">
          <h2 className="text-[#020288] font-semibold text-lg mb-4">
            Other Wedding Expenses
          </h2>

          <SliderInput
            label="Photography & Videography"
            value={photographyAmount}
            onChange={setPhotographyAmount}
            tooltip="Professional photography and videography for all ceremonies"
            min={0}
            max={500000}
            step={5000}
          />

          <SliderInput
            label="Clothing & Jewelry"
            value={clothingAmount}
            onChange={setClothingAmount}
            tooltip="Wedding outfits, jewelry, and accessories for bride and groom"
            min={0}
            max={1000000}
            step={10000}
          />

          <SliderInput
            label="Makeup & Grooming"
            value={makeupAmount}
            onChange={setMakeupAmount}
            tooltip="Professional makeup, hair styling, and grooming services"
            min={0}
            max={500000}
            step={5000}
          />

          <SliderInput
            label="Entertainment"
            value={entertainmentAmount}
            onChange={setEntertainmentAmount}
            min={0}
            max={500000}
            step={5000}
            tooltip="DJ, live band, sound system, and other entertainment arrangements"
          />

          <SliderInput
            label="Invitation Cards & Gifts"
            value={invitationAmount}
            onChange={setInvitationAmount}
            tooltip="Wedding invitations, return gifts, and ceremonial gifts"
            min={0}
            max={100000}
            step={2500}
          />

          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Wedding Planner</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Do you plan to hire a professional wedding planner?
                  </PopoverContent>
                </Popover>
              </div>
              <Select value={weddingPlanner} onValueChange={setWeddingPlanner}>
                <SelectTrigger className="w-24 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className={`w-full bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm transition-all ${
            isCalculating
              ? "opacity-70 cursor-not-allowed"
              : "hover:opacity-90 active:scale-[0.98]"
          }`}
        >
          {isCalculating ? "CALCULATING..." : "CALCULATE"}
        </button>

        {/* Results Section */}
        <WeddingResult result={result} />
        <WeddingAssumptions />
      </div>
    </div>
  );
};

export default HybridWeddingCalculator;
