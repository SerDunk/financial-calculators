"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ChartDisplay from "../../../components/ChartDisplay";

const DESTINATION_PRESETS = {
  bali: {
    name: "Bali, Indonesia",
    hotelCostPerNight: 6000,
    flightCostPerPerson: 35000,
    mealsPerDayPerPerson: 2000,
    activitiesPerDayPerPerson: 3000,
    miscellaneousPerDay: 2000,
  },
  goa: {
    name: "Goa, India",
    hotelCostPerNight: 4000,
    flightCostPerPerson: 8000,
    mealsPerDayPerPerson: 1500,
    activitiesPerDayPerPerson: 2000,
    miscellaneousPerDay: 1500,
  },
  europe: {
    name: "Europe (Paris/London)",
    hotelCostPerNight: 12000,
    flightCostPerPerson: 60000,
    mealsPerDayPerPerson: 4000,
    activitiesPerDayPerPerson: 5000,
    miscellaneousPerDay: 3000,
  },
  custom: {
    name: "Custom Destination",
    hotelCostPerNight: 0,
    flightCostPerPerson: 0,
    mealsPerDayPerPerson: 0,
    activitiesPerDayPerPerson: 0,
    miscellaneousPerDay: 0,
  },
};

const VacationPlanningCalculator = () => {
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState("custom");
  const [submittedValues, setSubmittedValues] = useState(null);

  const initialValues = {
    people: 2,
    duration: 7,
    hotelCostPerNight: 5000,
    flightCostPerPerson: 15000,
    mealsPerDayPerPerson: 1500,
    activitiesPerDayPerPerson: 2000,
    miscellaneousPerDay: 3000,
  };

  const validationSchema = Yup.object().shape({
    people: Yup.number()
      .min(1, "Minimum 1 person")
      .max(20, "Maximum 20 people")
      .required("Required"),
    duration: Yup.number()
      .min(1, "Minimum 1 day")
      .max(90, "Maximum 90 days")
      .required("Required"),
    hotelCostPerNight: Yup.number()
      .min(1000, "Minimum ₹1,000 per night")
      .required("Required"),
    flightCostPerPerson: Yup.number()
      .min(1000, "Minimum ₹1,000 per person")
      .required("Required"),
    mealsPerDayPerPerson: Yup.number()
      .min(100, "Minimum ₹100 per person per day")
      .required("Required"),
    activitiesPerDayPerPerson: Yup.number()
      .min(0, "Cannot be negative")
      .required("Required"),
    miscellaneousPerDay: Yup.number()
      .min(0, "Cannot be negative")
      .required("Required"),
  });

  const handlePresetChange = (presetKey, setFieldValue) => {
    setSelectedPreset(presetKey);
    if (presetKey !== "custom") {
      const preset = DESTINATION_PRESETS[presetKey];
      Object.entries(preset).forEach(([key, value]) => {
        if (key !== "name") setFieldValue(key, value, false);
      });
    }
  };

  const calculateTotalCost = (values) => {
    const {
      people,
      duration,
      hotelCostPerNight,
      flightCostPerPerson,
      mealsPerDayPerPerson,
      activitiesPerDayPerPerson,
      miscellaneousPerDay,
    } = values;

    const flightsTotal = flightCostPerPerson * people;
    const hotelTotal = hotelCostPerNight * duration;
    const mealsTotal = mealsPerDayPerPerson * people * duration;
    const activitiesTotal = activitiesPerDayPerPerson * people * duration;
    const miscellaneousTotal = miscellaneousPerDay * duration;

    const totalCost =
      flightsTotal +
      hotelTotal +
      mealsTotal +
      activitiesTotal +
      miscellaneousTotal;
    const costPerPerson = totalCost / people;

    return {
      flightsTotal,
      hotelTotal,
      mealsTotal,
      activitiesTotal,
      miscellaneousTotal,
      totalCost,
      costPerPerson,
      destination:
        selectedPreset !== "custom"
          ? DESTINATION_PRESETS[selectedPreset].name
          : "Custom Destination",
    };
  };

  const onSubmit = (values) => {
    setSubmittedValues(values);
    const totalCost = calculateTotalCost(values);
    setResult(totalCost);

    setChartData({
      labels: ["Flights", "Hotel", "Meals", "Activities", "Miscellaneous"],
      datasets: [
        {
          label: "Cost Breakdown (₹)",
          data: [
            totalCost.flightsTotal,
            totalCost.hotelTotal,
            totalCost.mealsTotal,
            totalCost.activitiesTotal,
            totalCost.miscellaneousTotal,
          ],
          backgroundColor: [
            "#6b46c1",
            "#9f7aea",
            "#f6ad55",
            "#f687b3",
            "#68d391",
          ],
          borderColor: ["#6b46c1", "#9f7aea", "#f6ad55", "#f687b3", "#68d391"],
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">
        Vacation Cost Calculator
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-6">
            {/* Destination Preset Selector */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">
                Destination Presets
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(DESTINATION_PRESETS).map(([key, preset]) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => handlePresetChange(key, setFieldValue)}
                    className={`p-3 rounded-md border transition-colors ${
                      selectedPreset === key
                        ? "bg-purple-100 border-purple-500 text-purple-800"
                        : "bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Input Fields */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">
                Travel Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="people"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of People
                  </label>
                  <Field
                    type="number"
                    name="people"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="people"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Duration (days)
                  </label>
                  <Field
                    type="number"
                    name="duration"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="duration"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hotelCostPerNight"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hotel Cost per Night (₹)
                  </label>
                  <Field
                    type="number"
                    name="hotelCostPerNight"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="hotelCostPerNight"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="flightCostPerPerson"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Flight Cost per Person (₹)
                  </label>
                  <Field
                    type="number"
                    name="flightCostPerPerson"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="flightCostPerPerson"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mealsPerDayPerPerson"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Meals per Day per Person (₹)
                  </label>
                  <Field
                    type="number"
                    name="mealsPerDayPerPerson"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="mealsPerDayPerPerson"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="activitiesPerDayPerPerson"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Activities per Day per Person (₹)
                  </label>
                  <Field
                    type="number"
                    name="activitiesPerDayPerPerson"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="activitiesPerDayPerPerson"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="miscellaneousPerDay"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Miscellaneous per Day (₹) - Transport, souvenirs, etc.
                  </label>
                  <Field
                    type="number"
                    name="miscellaneousPerDay"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="miscellaneousPerDay"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-lg font-medium"
            >
              Calculate Vacation Cost
            </button>
          </Form>
        )}
      </Formik>

      {/* Results Section */}
      {result && submittedValues && (
        <div className="mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">
              {result.destination} Cost Breakdown
            </h3>
            <p className="text-gray-600 mb-4">
              For {submittedValues.people} people over{" "}
              {submittedValues.duration} days
            </p>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Flights Cost:</span>
                <span className="font-bold">
                  ₹{result.flightsTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Hotel Cost:</span>
                <span className="font-bold">
                  ₹{result.hotelTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Meals Cost:</span>
                <span className="font-bold">
                  ₹{result.mealsTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Activities Cost:</span>
                <span className="font-bold">
                  ₹{result.activitiesTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Miscellaneous Cost:</span>
                <span className="font-bold">
                  ₹{result.miscellaneousTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-purple-800">Total Vacation Cost:</span>
                  <span className="text-purple-800">
                    ₹{result.totalCost.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-purple-800">Cost per Person:</span>
                  <span className="text-purple-800">
                    ₹{result.costPerPerson.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {chartData && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-medium text-purple-800 mb-3">
                Cost Distribution
              </h4>
              <ChartDisplay data={chartData} type="doughnut" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VacationPlanningCalculator;
