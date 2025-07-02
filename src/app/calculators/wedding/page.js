// HybridWeddingCalculator.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Info, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Heading from "@/components/Heading";
import { calculateWeddingBreakdown, formatters } from "@/utils/calculation";
import WeddingResult from "@/components/WeddingResult";
import WeddingAssumptions from "@/components/WeddingAssumptions";
import SliderInput from "@/components/SliderInput"; // The only component for numerical input

const EventCard = ({ event, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const updateEvent = (field, value) =>
    onUpdate(event.id, { ...event, [field]: value });

  // Calculation for the total cost of this specific event
  const totalEventCost =
    (event.needsVenue === "Yes" ? event.venueCost : 0) +
    (event.foodType === "hotel_banquet" || event.foodType === "catered"
      ? event.foodCostPerPlate * event.totalGuests
      : event.homeCookingCost) +
    (event.needsVenue === "Yes" && event.stayingOver === "Yes"
      ? event.roomsNeeded * event.roomCostPerDay
      : 0) +
    event.decorationCost +
    event.photographyCost +
    event.makeupCost +
    event.entertainmentCost +
    event.otherEventCost;

  return (
    <div className="border border-[#E0E0E0] rounded-xl p-4 mb-4 bg-white">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="text"
            value={event.name}
            onChange={(e) => updateEvent("name", e.target.value)}
            className="text-[#020288] bg-[#EAE9F0] w-20 font-semibold p-2 rounded-lg text-base border-none outline-none focus:ring-0 flex-1 min-w-0"
            placeholder="Event Name"
          />
          <span className="text-[#666666] text-xs flex-shrink-0">
            {formatters.formatShortIndianCurrency(totalEventCost)}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#020288] p-1 flex-shrink-0"
          >
            <ChevronUp
              size={16}
              className={`transition-transform duration-200 ${
                !isExpanded && "rotate-180"
              }`}
            />
          </button>
        </div>
        <button
          onClick={() => onDelete(event.id)}
          className="text-red-500 p-1 hover:bg-red-50 rounded"
          title="Delete Event"
        >
          <Trash2 size={14} />
        </button>
      </div>
      {isExpanded && (
        <div className="space-y-5 pt-2 mt-2">
          <SliderInput
            label="Total Guests"
            value={event.totalGuests}
            onChange={(v) => updateEvent("totalGuests", v)}
            showCurrency={false}
            min={0}
            max={2000}
            step={10}
            tooltip="The total number of people attending this specific event."
          />

          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 space-y-4">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm">
              <label>Venue</label>
              <Select
                value={event.needsVenue}
                onValueChange={(v) => updateEvent("needsVenue", v)}
              >
                <SelectTrigger className="w-20 h-8 bg-white text-[#020288] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Professional Venue</SelectItem>
                  <SelectItem value="No">At Home</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {event.needsVenue === "Yes" && (
              <>
                <SliderInput
                  label="Venue Cost"
                  value={event.venueCost}
                  onChange={(v) => updateEvent("venueCost", v)}
                  min={0}
                  max={3000000}
                  step={10000}
                  tooltip="The rental cost for the banquet hall, lawn, or resort for this event."
                />
                <div className="flex justify-between items-center text-[#323233] font-medium text-sm pt-2 border-t">
                  <label>Staying Guests</label>
                  <Select
                    value={event.stayingOver}
                    onValueChange={(v) => updateEvent("stayingOver", v)}
                  >
                    <SelectTrigger className="w-28 h-8 bg-white text-[#020288] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {event.stayingOver === "Yes" && (
                  <>
                    <SliderInput
                      label="Rooms"
                      value={event.roomsNeeded}
                      onChange={(v) => updateEvent("roomsNeeded", v)}
                      showCurrency={false}
                      min={0}
                      max={500}
                      step={1}
                      tooltip="Total number of hotel rooms required for all staying guests."
                    />
                    <SliderInput
                      label="Room Cost/Day"
                      value={event.roomCostPerDay}
                      onChange={(v) => updateEvent("roomCostPerDay", v)}
                      min={0}
                      max={50000}
                      step={500}
                      tooltip="The average cost for a single hotel room per day."
                    />
                  </>
                )}
              </>
            )}
          </div>

          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 space-y-4">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm">
              <label>Food Arrangement</label>
              <Select
                value={event.foodType}
                onValueChange={(v) => updateEvent("foodType", v)}
              >
                <SelectTrigger className="w-20 h-8 bg-white text-[#020288] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel_banquet">
                    Hotel/Venue Banquet
                  </SelectItem>
                  <SelectItem value="catered">Caterer</SelectItem>
                  <SelectItem value="home_cooked">Home-Cooked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(event.foodType === "hotel_banquet" ||
              event.foodType === "catered") && (
              <SliderInput
                label="Cost Per Plate"
                value={event.foodCostPerPlate}
                onChange={(v) => updateEvent("foodCostPerPlate", v)}
                min={0}
                max={10000}
                step={100}
                tooltip="The all-inclusive cost per person for the main meal."
              />
            )}
            {event.foodType === "home_cooked" && (
              <SliderInput
                label="Cooking Cost"
                value={event.homeCookingCost}
                onChange={(v) => updateEvent("homeCookingCost", v)}
                min={0}
                max={500000}
                step={2500}
                tooltip="Estimated cost for all groceries, ingredients, and any hired help for home cooking."
              />
            )}
          </div>

          <SliderInput
            label="Decoration Cost"
            value={event.decorationCost}
            onChange={(v) => updateEvent("decorationCost", v)}
            min={0}
            max={1500000}
            step={5000}
            tooltip="The cost for flowers, lighting, stage setup, and other decor for this event."
          />
          <SliderInput
            label="Photo & Video"
            value={event.photographyCost}
            onChange={(v) => updateEvent("photographyCost", v)}
            min={0}
            max={500000}
            step={5000}
            tooltip="The fee for photographers and videographers to cover this specific event."
          />
          <SliderInput
            label="Hair & Makeup"
            value={event.makeupCost}
            onChange={(v) => updateEvent("makeupCost", v)}
            min={0}
            max={150000}
            step={2500}
            tooltip="Cost for makeup artists, hairstylists, and grooming services for this event."
          />
          <SliderInput
            label="Entertainment"
            value={event.entertainmentCost}
            onChange={(v) => updateEvent("entertainmentCost", v)}
            min={0}
            max={1000000}
            step={5000}
            tooltip="Cost for a DJ, live band, dancers, or other performers."
          />
          <SliderInput
            label="Other Event Costs"
            value={event.otherEventCost}
            onChange={(v) => updateEvent("otherEventCost", v)}
            min={0}
            max={500000}
            step={2500}
            tooltip="Budget for any other costs specific to this event, like pandit fees, special entry items, etc."
          />
        </div>
      )}
    </div>
  );
};

const HybridWeddingCalculator = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Sangeet",
      totalGuests: 150,
      needsVenue: "Yes",
      venueCost: 150000,
      stayingOver: "No",
      roomsNeeded: 0,
      roomCostPerDay: 0,
      foodType: "catered",
      foodCostPerPlate: 1200,
      homeCookingCost: 0,
      decorationCost: 80000,
      photographyCost: 50000,
      makeupCost: 25000,
      entertainmentCost: 75000,
      otherEventCost: 0,
    },
    {
      id: 2,
      name: "Wedding Day",
      totalGuests: 200,
      needsVenue: "Yes",
      venueCost: 250000,
      stayingOver: "Yes",
      roomsNeeded: 25,
      roomCostPerDay: 4000,
      foodType: "hotel_banquet",
      foodCostPerPlate: 2000,
      homeCookingCost: 0,
      decorationCost: 150000,
      photographyCost: 100000,
      makeupCost: 50000,
      entertainmentCost: 50000,
      otherEventCost: 21000,
    },
  ]);

  const [weddingDays, setWeddingDays] = useState(3);
  const [sharedExpenses, setSharedExpenses] = useState({
    brideAttireAmount: 400000,
    groomAttireAmount: 150000,
    invitationAmount: 50000,
    miscAmount: 50000,
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateResults = useCallback(() => {
    setIsCalculating(true);
    const calculationResult = calculateWeddingBreakdown({
      events,
      sharedExpenses,
      weddingDays,
    });
    setResult(calculationResult);
    setIsCalculating(false);
  }, [events, sharedExpenses, weddingDays]);

  // Initial calculation on mount
  useEffect(() => {
    calculateResults();
  }, []);

  const handleCalculate = () => {
    calculateResults();
  };

  const addEvent = () => {
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "New Event",
        totalGuests: 100,
        needsVenue: "No",
        venueCost: 0,
        stayingOver: "No",
        roomsNeeded: 0,
        roomCostPerDay: 0,
        foodType: "home_cooked",
        foodCostPerPlate: 0,
        homeCookingCost: 50000,
        decorationCost: 40000,
        photographyCost: 25000,
        makeupCost: 15000,
        entertainmentCost: 0,
        otherEventCost: 0,
      },
    ]);
  };

  const updateEvent = (id, updatedEvent) =>
    setEvents((prev) => prev.map((e) => (e.id === id ? updatedEvent : e)));
  const deleteEvent = (id) => {
    if (events.length > 0) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] xs:px-0 px-1.5">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Wedding Cost Calculator"
          desc="Plan your dream wedding from the ground up, event by event."
        />
        <div className="rounded-2xl p-6 relative bg-white mb-4">
          <h2 className="text-[#020288] font-semibold text-lg mb-4">
            Wedding Details
          </h2>
          <SliderInput
            label="Total Wedding Days"
            value={weddingDays}
            onChange={setWeddingDays}
            min={1}
            max={10}
            step={1}
            showCurrency={false}
            tooltip="Total number of days the wedding ceremonies will last. This affects multi-day accommodation costs."
          />
        </div>
        <div className="rounded-2xl p-6 relative bg-white mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#020288] font-semibold text-lg">
              Wedding Events
            </h2>
            <button
              onClick={addEvent}
              className="flex items-center gap-2 bg-[#020288] text-white px-3 py-2 rounded-lg text-sm hover:opacity-90"
            >
              <Plus size={16} />
              Add Event
            </button>
          </div>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onUpdate={updateEvent}
              onDelete={deleteEvent}
            />
          ))}
        </div>
        <div className="rounded-2xl p-6 relative bg-white mb-2">
          <h2 className="text-[#020288] font-semibold text-lg mb-4">
            Shared Wedding Expenses
          </h2>
          <SliderInput
            label="Bride's Attire & Jewelry"
            value={sharedExpenses.brideAttireAmount}
            onChange={(v) =>
              setSharedExpenses((p) => ({ ...p, brideAttireAmount: v }))
            }
            min={50000}
            max={5000000}
            step={25000}
            tooltip="The total budget for all of the bride's outfits, jewelry, shoes, and accessories across all events."
          />
          <SliderInput
            label="Groom's Outfit"
            value={sharedExpenses.groomAttireAmount}
            onChange={(v) =>
              setSharedExpenses((p) => ({ ...p, groomAttireAmount: v }))
            }
            min={20000}
            max={1000000}
            step={10000}
            tooltip="The total budget for all of the groom's outfits, shoes, and accessories across all events."
          />
          <SliderInput
            label="Invitations & Gifts"
            value={sharedExpenses.invitationAmount}
            onChange={(v) =>
              setSharedExpenses((p) => ({ ...p, invitationAmount: v }))
            }
            min={0}
            max={500000}
            step={2500}
            tooltip="Combined cost for printing invitation cards and purchasing return gifts for guests."
          />
          <SliderInput
            label="Miscellaneous & Buffer"
            value={sharedExpenses.miscAmount}
            onChange={(v) =>
              setSharedExpenses((p) => ({ ...p, miscAmount: v }))
            }
            min={0}
            max={1000000}
            step={5000}
            tooltip="A safety fund for tips, local transport, ritual items, and other small, unforeseen costs."
          />
        </div>

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

        <WeddingResult result={result} />
        <WeddingAssumptions />
      </div>
    </div>
  );
};
export default HybridWeddingCalculator;
