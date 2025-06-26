"use client";

import { useState, useEffect } from "react";
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
import SliderInput from "@/components/SliderInput";
import { calculateVacationBreakdown } from "@/utils/calculation";
import VacationResult from "@/components/VacationPlannerResult";
import VacationAssumptions from "@/components/VacationAssumptions";

const VacationPlanner = () => {
  // Basic trip details
  const [numAdults, setNumAdults] = useState(2);
  const [numChildren, setNumChildren] = useState(0);
  const [destination, setDestination] = useState("Domestic");
  const [tripDuration, setTripDuration] = useState(7);
  const [seasonalTiming, setSeasonalTiming] = useState("Off-Peak");
  const [cityTier, setCityTier] = useState("Tier2");

  // Transportation details
  const [transportMode, setTransportMode] = useState("Flight");
  const [flightClass, setFlightClass] = useState("Economy");
  const [trainClass, setTrainClass] = useState("3AC");
  const [roadVehicleType, setRoadVehicleType] = useState("Own Car");
  const [fuelType, setFuelType] = useState("Petrol");
  const [distance, setDistance] = useState(500);

  // Accommodation details
  const [accommodationType, setAccommodationType] = useState("Hotel");
  const [hotelLuxury, setHotelLuxury] = useState("Mid-range");
  const [numberOfRooms, setNumberOfRooms] = useState(1);

  // Meal and activity preferences
  const [mealPreference, setMealPreference] = useState("Mix");
  const [activitiesBudget, setActivitiesBudget] = useState(50000);
  const [shoppingBudget, setShoppingBudget] = useState(25000);

  // Transportation and documentation
  const [localTransportType, setLocalTransportType] =
    useState("Public Transport");
  const [travelInsurance, setTravelInsurance] = useState(false);
  const [visaRequired, setVisaRequired] = useState(false);

  // Derived amounts
  const [totalPeople, setTotalPeople] = useState(2);

  // Results
  const [result, setResult] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);
  const [calculationError, setCalculationError] = useState(null);

  // Calculate function
  const calculate = () => {
    try {
      setCalculationError(null);
      const calculationResult = calculateVacationBreakdown({
        numAdults,
        numChildren,
        destination,
        tripDuration,
        transportMode,
        flightClass,
        trainClass,
        roadVehicleType,
        fuelType,
        distance,
        hotelLuxury,
        mealPreference,
        activitiesBudget,
        shoppingBudget,
        localTransportType,
        travelInsurance,
        visaRequired,
        seasonalTiming,
        cityTier,
        accommodationType,
        numberOfRooms,
      });

      // Validate that the result has the expected structure
      if (
        calculationResult &&
        calculationResult.costs &&
        calculationResult.totals &&
        calculationResult.perPersonAnalysis
      ) {
        setResult(calculationResult);
        setIsCalculated(true);
      } else {
        throw new Error("Invalid calculation result structure");
      }
    } catch (error) {
      console.error("Calculation error:", error);
      setCalculationError(error.message);
      setResult(null);
      setIsCalculated(false);
    }
  };

  // Calculate total people whenever adults/children change
  useEffect(() => {
    const total = numAdults + numChildren;
    setTotalPeople(total);
  }, [numAdults, numChildren]);

  useEffect(() => {
    calculate();
  }, []);
  // Auto-calculate when significant parameters change
  useEffect(() => {
    if (isCalculated) {
      calculate();
    }
  }, [
    numAdults,
    numChildren,
    destination,
    tripDuration,
    transportMode,
    flightClass,
    trainClass,
    roadVehicleType,
    fuelType,
    distance,
    hotelLuxury,
    accommodationType,
    numberOfRooms,
    mealPreference,
    activitiesBudget,
    shoppingBudget,
    localTransportType,
    travelInsurance,
    visaRequired,
    seasonalTiming,
    cityTier,
  ]);

  const handleCalculate = () => {
    calculate();
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
          <SliderInput
            label="Number of Adults"
            value={numAdults}
            onChange={setNumAdults}
            min={1}
            max={10}
            step={1}
            tooltip="Adults traveling (12+ years)"
            showCurrency={false}
          />

          {/* Number of Children */}
          <SliderInput
            label="Number of Children"
            value={numChildren}
            onChange={setNumChildren}
            min={0}
            max={8}
            step={1}
            tooltip="Children traveling (2-11 years)"
            showCurrency={false}
          />

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
          <SliderInput
            label="Trip Duration (days)"
            value={tripDuration}
            onChange={setTripDuration}
            min={1}
            max={30}
            step={1}
            tooltip="Number of days for the vacation"
            showCurrency={false}
          />

          {/* Seasonal Timing */}
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Seasonal Timing</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Travel season affects pricing
                  </PopoverContent>
                </Popover>
              </div>
              <Select value={seasonalTiming} onValueChange={setSeasonalTiming}>
                <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Off-Peak">Off-Peak</SelectItem>
                  <SelectItem value="Mid">Mid Season</SelectItem>
                  <SelectItem value="Peak">Peak Season</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* City Tier */}
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>City Tier</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    City tier affects accommodation and meal prices
                  </PopoverContent>
                </Popover>
              </div>
              <Select value={cityTier} onValueChange={setCityTier}>
                <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tier1">Tier 1</SelectItem>
                  <SelectItem value="Tier2">Tier 2</SelectItem>
                  <SelectItem value="Tier3">Tier 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Transportation Mode */}
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Transportation</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Mode of transportation to destination
                  </PopoverContent>
                </Popover>
              </div>
              <Select value={transportMode} onValueChange={setTransportMode}>
                <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Flight">Flight</SelectItem>
                  <SelectItem value="Train">Train</SelectItem>
                  <SelectItem value="Road">Road</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Flight Class - Show only if Flight is selected */}
          {transportMode === "Flight" && (
            <div className="mb-3">
              <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
                <div className="flex items-center gap-1.5">
                  <label>Flight Class</label>
                  <Popover>
                    <PopoverTrigger>
                      <Info width={15} />
                    </PopoverTrigger>
                    <PopoverContent className="text-xs border-[#666666]">
                      Flight class affects ticket pricing
                    </PopoverContent>
                  </Popover>
                </div>
                <Select value={flightClass} onValueChange={setFlightClass}>
                  <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Economy">Economy</SelectItem>
                    <SelectItem value="Premium Economy">
                      Premium Economy
                    </SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="First Class">First Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Train Class - Show only if Train is selected */}
          {transportMode === "Train" && (
            <div className="mb-3">
              <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
                <div className="flex items-center gap-1.5">
                  <label>Train Class</label>
                  <Popover>
                    <PopoverTrigger>
                      <Info width={15} />
                    </PopoverTrigger>
                    <PopoverContent className="text-xs border-[#666666]">
                      Train class affects ticket pricing
                    </PopoverContent>
                  </Popover>
                </div>
                <Select value={trainClass} onValueChange={setTrainClass}>
                  <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sleeper">Sleeper</SelectItem>
                    <SelectItem value="3AC">3AC</SelectItem>
                    <SelectItem value="2AC">2AC</SelectItem>
                    <SelectItem value="1AC">1AC</SelectItem>
                    <SelectItem value="Vande Bharat">Vande Bharat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Road Vehicle Type - Show only if Road is selected */}
          {transportMode === "Road" && (
            <>
              <div className="mb-3">
                <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
                  <div className="flex items-center gap-1.5">
                    <label>Vehicle Type</label>
                    <Popover>
                      <PopoverTrigger>
                        <Info width={15} />
                      </PopoverTrigger>
                      <PopoverContent className="text-xs border-[#666666]">
                        Type of road vehicle
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Select
                    value={roadVehicleType}
                    onValueChange={setRoadVehicleType}
                  >
                    <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Own Car">Own Car</SelectItem>
                      <SelectItem value="Rental Car">Rental Car</SelectItem>
                      <SelectItem value="Taxi/Cab">Taxi/Cab</SelectItem>
                      <SelectItem value="Bus">Bus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fuel Type - Show only for car/taxi */}
              {(roadVehicleType === "Own Car" ||
                roadVehicleType === "Rental Car" ||
                roadVehicleType === "Taxi/Cab") && (
                <div className="mb-3">
                  <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
                    <div className="flex items-center gap-1.5">
                      <label>Fuel Type</label>
                      <Popover>
                        <PopoverTrigger>
                          <Info width={15} />
                        </PopoverTrigger>
                        <PopoverContent className="text-xs border-[#666666]">
                          Fuel type affects running costs
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Select value={fuelType} onValueChange={setFuelType}>
                      <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="CNG">CNG</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Distance - Show only for road travel */}
              <SliderInput
                label="Distance (km)"
                value={distance}
                onChange={setDistance}
                min={50}
                max={2000}
                step={50}
                tooltip="Distance to destination"
                showCurrency={false}
              />
            </>
          )}

          {/* Accommodation Type */}
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Accommodation</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Type of accommodation
                  </PopoverContent>
                </Popover>
              </div>
              <Select
                value={accommodationType}
                onValueChange={setAccommodationType}
              >
                <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hotel">Hotel</SelectItem>
                  <SelectItem value="Resort">Resort</SelectItem>
                  <SelectItem value="Airbnb/Homestay">
                    Airbnb/Homestay
                  </SelectItem>
                  <SelectItem value="Hostel">Hostel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Hotel Luxury Level */}
          {(accommodationType === "Hotel" ||
            accommodationType === "Resort") && (
            <div className="mb-3">
              <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
                <div className="flex items-center gap-1.5">
                  <label>Luxury Level</label>
                  <Popover>
                    <PopoverTrigger>
                      <Info width={15} />
                    </PopoverTrigger>
                    <PopoverContent className="text-xs border-[#666666]">
                      Luxury level affects pricing
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
                    <SelectItem value="Ultra Luxury">Ultra Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Number of Rooms */}
          <SliderInput
            label="Number of Rooms"
            value={numberOfRooms}
            onChange={setNumberOfRooms}
            min={1}
            max={5}
            step={1}
            tooltip="Number of rooms needed"
            showCurrency={false}
          />

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
                    Dining preference affects meal costs
                  </PopoverContent>
                </Popover>
              </div>
              <Select value={mealPreference} onValueChange={setMealPreference}>
                <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Street Food">Street Food</SelectItem>
                  <SelectItem value="Local Restaurants">
                    Local Restaurants
                  </SelectItem>
                  <SelectItem value="Mix">Mix</SelectItem>
                  <SelectItem value="Fine Dining">Fine Dining</SelectItem>
                  <SelectItem value="Hotel Included">Hotel Included</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Activities Budget */}
          <SliderInput
            label="Activities Budget"
            value={activitiesBudget}
            onChange={setActivitiesBudget}
            min={5000}
            max={200000}
            step={5000}
            tooltip="Budget for sightseeing and activities"
            showCurrency={true}
          />

          {/* Shopping Budget */}
          <SliderInput
            label="Shopping Budget"
            value={shoppingBudget}
            onChange={setShoppingBudget}
            min={5000}
            max={100000}
            step={2500}
            tooltip="Budget for shopping and souvenirs"
            showCurrency={true}
          />

          {/* Local Transport Type */}
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Local Transport</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Local transportation at destination
                  </PopoverContent>
                </Popover>
              </div>
              <Select
                value={localTransportType}
                onValueChange={setLocalTransportType}
              >
                <SelectTrigger className="w-32 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Public Transport">
                    Public Transport
                  </SelectItem>
                  <SelectItem value="Taxi/Uber">Taxi/Uber</SelectItem>
                  <SelectItem value="Rental Car">Rental Car</SelectItem>
                  <SelectItem value="Auto/Rickshaw">Auto/Rickshaw</SelectItem>
                  <SelectItem value="Walking">Walking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Travel Insurance */}
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm">
              <div className="flex items-center gap-1.5">
                <label>Travel Insurance</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Optional travel insurance coverage
                  </PopoverContent>
                </Popover>
              </div>
              <input
                type="checkbox"
                checked={travelInsurance}
                onChange={(e) => setTravelInsurance(e.target.checked)}
                className="w-4 h-4 text-[#020288] bg-gray-100 border-gray-300 rounded focus:ring-[#020288] focus:ring-2"
              />
            </div>
          </div>

          {/* Visa Required - Show only for International */}
          {destination === "International" && (
            <div className="mb-3">
              <div className="flex justify-between items-center text-[#323233] font-medium text-sm">
                <div className="flex items-center gap-1.5">
                  <label>Visa Required</label>
                  <Popover>
                    <PopoverTrigger>
                      <Info width={15} />
                    </PopoverTrigger>
                    <PopoverContent className="text-xs border-[#666666]">
                      Does destination require visa?
                    </PopoverContent>
                  </Popover>
                </div>
                <input
                  type="checkbox"
                  checked={visaRequired}
                  onChange={(e) => setVisaRequired(e.target.checked)}
                  className="w-4 h-4 text-[#020288] bg-[#020288]  border-gray-300 rounded-xl focus:ring-[#020288] focus:ring-2"
                />
              </div>
            </div>
          )}

          {/* Error Display */}
          {calculationError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">Error: {calculationError}</p>
            </div>
          )}
        </div>
      </div>
      {/* Calculate Button */}
      <div>
        <button
          onClick={handleCalculate}
          className="w-full mt-2 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>
        {/* Results Section */}

        <div className="mt-2">
          <VacationResult result={result} />
        </div>

        {/* Assumptions Section */}
        <div className="mt-2">
          <VacationAssumptions />
        </div>
      </div>
    </div>
  );
};

export default VacationPlanner;
