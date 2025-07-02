// app/vacation-planner/page.jsx
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
import VacationPlannerResult from "@/components/VacationPlannerResult";
import VacationAssumptions from "@/components/VacationAssumptions";

const VacationPlanner = () => {
  // Basic Info
  const [numAdults, setNumAdults] = useState(2);
  const [numChildren, setNumChildren] = useState(0);
  const [destination, setDestination] = useState("Domestic");
  const [tripDuration, setTripDuration] = useState(7);

  // Transportation
  const [transportMode, setTransportMode] = useState("Flight");
  // Flight
  const [flightCost, setFlightCost] = useState(30000);
  const [airportTransferCost, setAirportTransferCost] = useState(2000);
  // Train
  const [trainTicketCost, setTrainTicketCost] = useState(10000);
  const [stationTransferCost, setStationTransferCost] = useState(1000);
  // Road
  const [roadVehicleType, setRoadVehicleType] = useState("Own Car");
  const [distance, setDistance] = useState(500);
  const [carMileage, setCarMileage] = useState(15);
  const [fuelPrice, setFuelPrice] = useState(100);
  const [tollAndTaxes, setTollAndTaxes] = useState(1000);
  const [overnightStayCost, setOvernightStayCost] = useState(0);
  const [rentalCostPerDay, setRentalCostPerDay] = useState(2500);
  const [fuelCostEstimate, setFuelCostEstimate] = useState(5000);
  const [securityDeposit, setSecurityDeposit] = useState(5000);
  const [totalCabFare, setTotalCabFare] = useState(12000);
  const [totalBusFare, setTotalBusFare] = useState(5000);

  // Accommodation
  const [accommodationType, setAccommodationType] = useState("Hotel");
  const [costPerNight, setCostPerNight] = useState(4000);
  const [numberOfRooms, setNumberOfRooms] = useState(1);

  // Meals
  const [mealCostPerDay, setMealCostPerDay] = useState(2000);

  // Activities & Shopping
  const [activitiesBudget, setActivitiesBudget] = useState(10000);
  const [shoppingBudget, setShoppingBudget] = useState(5000);

  // Local Transport
  const [localTransportType, setLocalTransportType] =
    useState("Taxi/Ride-sharing");
  const [publicTransportCostPerDay, setPublicTransportCostPerDay] =
    useState(500);
  const [taxiCostPerDay, setTaxiCostPerDay] = useState(1000);
  const [localRentalCostPerDay, setLocalRentalCostPerDay] = useState(1500);
  const [localRentalFuelCost, setLocalRentalFuelCost] = useState(2000);

  // Documentation & Insurance
  const [travelInsurance, setTravelInsurance] = useState("No");
  const [travelInsuranceCost, setTravelInsuranceCost] = useState(3000);
  const [visaRequired, setVisaRequired] = useState("No");
  const [visaCost, setVisaCost] = useState(16000);

  // Results
  const [result, setResult] = useState(null);

  const calculate = () => {
    const calculationResult = calculateVacationBreakdown({
      numAdults,
      numChildren,
      destination,
      tripDuration,
      transportMode,
      flightCost,
      airportTransferCost,
      trainTicketCost,
      stationTransferCost,
      roadVehicleType,
      distance,
      carMileage,
      fuelPrice,
      tollAndTaxes,
      overnightStayCost,
      rentalCostPerDay,
      fuelCostEstimate,
      securityDeposit,
      totalCabFare,
      totalBusFare,
      accommodationType,
      costPerNight,
      numberOfRooms,
      mealCostPerDay,
      activitiesBudget,
      shoppingBudget,
      localTransportType,
      publicTransportCostPerDay,
      taxiCostPerDay,
      localRentalCostPerDay,
      localRentalFuelCost,
      travelInsurance: travelInsurance === "Yes",
      travelInsuranceCost,
      visaRequired: visaRequired === "Yes",
      visaCost,
    });
    setResult(calculationResult);
  };

  // Run calculation on initial load to show a default estimate
  useEffect(() => {
    calculate();
  }, []);

  // Manual calculation handler for the button
  const handleCalculate = () => {
    calculate();
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] xs:px-0 px-1.5">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Vacation Planner"
          desc="Plan and estimate your perfect family vacation budget with your own inputs."
        />

        <div className="rounded-2xl p-6 relative bg-white">
          <h3 className="text-lg font-semibold text-[#2C178C] mb-4 pb-2">
            Basic Information
          </h3>
          <SliderInput
            label="Number of Adults"
            value={numAdults}
            onChange={setNumAdults}
            min={1}
            max={10}
            step={1}
            showCurrency={false}
          />
          <SliderInput
            label="Number of Children"
            value={numChildren}
            onChange={setNumChildren}
            min={0}
            max={10}
            step={1}
            showCurrency={false}
          />
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <label>Destination</label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="w-30 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Domestic">Domestic</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <SliderInput
            label="Trip Duration (days)"
            value={tripDuration}
            onChange={setTripDuration}
            min={1}
            max={60}
            step={1}
            showCurrency={false}
          />

          <h3 className="text-lg font-semibold text-[#2C178C] my-4 pb-2">
            Transportation to Destination
          </h3>
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <label>Mode of Transport</label>
              <Select value={transportMode} onValueChange={setTransportMode}>
                <SelectTrigger className="w-30 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
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

          {transportMode === "Flight" && (
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <SliderInput
                label="Round-trip Cost"
                value={flightCost}
                onChange={setFlightCost}
                min={1000}
                max={1000000}
                step={1000}
                tooltip="Enter the total cost for all travelers, for the round trip."
              />
              <SliderInput
                label="Airport Transfer Cost"
                value={airportTransferCost}
                onChange={setAirportTransferCost}
                min={0}
                max={20000}
                step={500}
                tooltip="Cost for taxis/cabs to and from the airport."
              />
            </div>
          )}
          {transportMode === "Train" && (
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <SliderInput
                label="Total Train Ticket Cost (Round-trip)"
                value={trainTicketCost}
                onChange={setTrainTicketCost}
                min={500}
                max={200000}
                step={500}
                tooltip="Enter the total ticket cost for all travelers for the round trip."
              />
              <SliderInput
                label="Station Transfer Cost"
                value={stationTransferCost}
                onChange={setStationTransferCost}
                min={0}
                max={10000}
                step={200}
                tooltip="Cost for auto/taxi to and from the railway station."
              />
            </div>
          )}
          {transportMode === "Road" && (
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <div className="mb-3">
                <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
                  <label>Vehicle Type</label>
                  <Select
                    value={roadVehicleType}
                    onValueChange={setRoadVehicleType}
                  >
                    <SelectTrigger className="w-40 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
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

              {roadVehicleType === "Own Car" && (
                <>
                  <SliderInput
                    label="One-way Distance (km)"
                    value={distance}
                    onChange={setDistance}
                    min={50}
                    max={5000}
                    step={50}
                    showCurrency={false}
                  />
                  <SliderInput
                    label="Car Mileage (km/l)"
                    value={carMileage}
                    onChange={setCarMileage}
                    min={5}
                    max={30}
                    step={1}
                    showCurrency={false}
                  />
                  <SliderInput
                    label="Fuel Price (₹/litre)"
                    value={fuelPrice}
                    onChange={setFuelPrice}
                    min={80}
                    max={150}
                    step={1}
                  />
                  <SliderInput
                    label="Total Toll & Other Charges"
                    value={tollAndTaxes}
                    onChange={setTollAndTaxes}
                    min={0}
                    max={20000}
                    step={100}
                    tooltip="Estimated round-trip cost for tolls, permits, etc."
                  />
                  <SliderInput
                    label="Overnight Stay Cost (En-route)"
                    value={overnightStayCost}
                    onChange={setOvernightStayCost}
                    min={0}
                    max={50000}
                    step={1000}
                    tooltip="Cost for any hotel stays during the journey itself."
                  />
                </>
              )}
              {roadVehicleType === "Rental Car" && (
                <>
                  <SliderInput
                    label="Rental Cost per Day"
                    value={rentalCostPerDay}
                    onChange={setRentalCostPerDay}
                    min={1000}
                    max={10000}
                    step={250}
                  />
                  <SliderInput
                    label="Total Fuel Cost Estimate"
                    value={fuelCostEstimate}
                    onChange={setFuelCostEstimate}
                    min={500}
                    max={50000}
                    step={500}
                  />
                  <SliderInput
                    label="Security Deposit (Refundable)"
                    value={securityDeposit}
                    onChange={setSecurityDeposit}
                    min={0}
                    max={50000}
                    step={1000}
                    tooltip="This is refundable and not added to the total trip cost."
                  />
                </>
              )}
              {roadVehicleType === "Taxi/Cab" && (
                <SliderInput
                  label="Total Cab Fare (Round-trip)"
                  value={totalCabFare}
                  onChange={setTotalCabFare}
                  min={1000}
                  max={200000}
                  step={1000}
                />
              )}
              {roadVehicleType === "Bus" && (
                <SliderInput
                  label="Total Bus Fare (Round-trip)"
                  value={totalBusFare}
                  onChange={setTotalBusFare}
                  min={500}
                  max={100000}
                  step={500}
                />
              )}
            </div>
          )}

          <h3 className="text-lg font-semibold text-[#2C178C] my-4 pb-2">
            Accommodation
          </h3>
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <label>Accommodation Type</label>
              <Select
                value={accommodationType}
                onValueChange={setAccommodationType}
              >
                <SelectTrigger className="w-30 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hotel">Hotel</SelectItem>
                  <SelectItem value="Resort">Resort</SelectItem>
                  <SelectItem value="Airbnb/Homestay">
                    Airbnb/Homestay
                  </SelectItem>
                  <SelectItem value="Hostel">Hostel</SelectItem>
                  <SelectItem value="Friends/Family">
                    With Friends/Family
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {accommodationType !== "Friends/Family" && (
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <SliderInput
                label="Room Cost per Night"
                value={costPerNight}
                onChange={setCostPerNight}
                min={500}
                max={100000}
                step={500}
              />
              <SliderInput
                label="Number of Rooms"
                value={numberOfRooms}
                onChange={setNumberOfRooms}
                min={1}
                max={10}
                step={1}
                showCurrency={false}
              />
            </div>
          )}

          <h3 className="text-lg font-semibold text-[#2C178C] my-4 pb-2">
            Daily Expenses
          </h3>
          <SliderInput
            label="Daily Food & Dining"
            value={mealCostPerDay}
            onChange={setMealCostPerDay}
            min={100}
            max={30000}
            step={100}
            tooltip="Estimated cost for all meals for the entire group per day."
          />
          <SliderInput
            label="Activities & Sightseeing"
            value={activitiesBudget}
            onChange={setActivitiesBudget}
            min={0}
            max={200000}
            step={1000}
            tooltip="Includes entry fees, guided tours, local attractions, and entertainment costs for the entire trip. Adjust based on the type and number of activities planned."
          />
          <SliderInput
            label="Shopping & Souvenirs"
            value={shoppingBudget}
            onChange={setShoppingBudget}
            min={0}
            max={100000}
            step={500}
            tooltip="Covers personal shopping, local souvenirs, gifts, and miscellaneous purchases made during the trip. This varies by destination and traveler preference."
          />

          <h3 className="text-lg font-semibold text-[#2C178C] my-4 pb-2">
            Local Transport at Destination
          </h3>
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <label>Local Transport Mode</label>
              <Select
                value={localTransportType}
                onValueChange={setLocalTransportType}
              >
                <SelectTrigger className="w-30 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Public Transport">
                    Public Transport
                  </SelectItem>
                  <SelectItem value="Taxi/Ride-sharing">
                    Taxi/Ride-sharing
                  </SelectItem>
                  <SelectItem value="Rental Car/Scooter">
                    Rental Car/Scooter
                  </SelectItem>
                  <SelectItem value="Walking/None">Walking/None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {localTransportType === "Public Transport" && (
            <SliderInput
              label="Cost Per Day"
              value={publicTransportCostPerDay}
              onChange={setPublicTransportCostPerDay}
              min={0}
              max={5000}
              step={100}
            />
          )}
          {localTransportType === "Taxi/Ride-sharing" && (
            <SliderInput
              label="Cost Per Day"
              value={taxiCostPerDay}
              onChange={setTaxiCostPerDay}
              min={0}
              max={10000}
              step={200}
            />
          )}
          {localTransportType === "Rental Car/Scooter" && (
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <SliderInput
                label="Rental Cost Per Day"
                value={localRentalCostPerDay}
                onChange={setLocalRentalCostPerDay}
                min={0}
                max={10000}
                step={200}
              />
              <SliderInput
                label="Total Fuel Cost"
                value={localRentalFuelCost}
                onChange={setLocalRentalFuelCost}
                min={0}
                max={20000}
                step={500}
              />
            </div>
          )}

          <h3 className="text-lg font-semibold text-[#2C178C] my-4 pb-2">
            Documentation & Insurance
          </h3>
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <label>Travel Insurance</label>
              <Select
                value={travelInsurance}
                onValueChange={setTravelInsurance}
              >
                <SelectTrigger className="w-30 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {travelInsurance === "Yes" && (
            <SliderInput
              label="Total Insurance Cost"
              value={travelInsuranceCost}
              onChange={setTravelInsuranceCost}
              min={500}
              max={50000}
              step={500}
            />
          )}

          {destination === "International" && (
            <>
              <div className="mt-3 mb-3">
                <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
                  <label>Visa Required</label>
                  <Select value={visaRequired} onValueChange={setVisaRequired}>
                    <SelectTrigger className="w-40 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {visaRequired === "Yes" && (
                <SliderInput
                  label="Total Visa Cost for All"
                  value={visaCost}
                  onChange={setVisaCost}
                  min={1000}
                  max={200000}
                  step={1000}
                />
              )}
            </>
          )}
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full mt-2 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>

        {/* Results Section */}
        <div className="mt-2">
          <VacationPlannerResult result={result} />
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
