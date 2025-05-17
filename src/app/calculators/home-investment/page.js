"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ChartDisplay from "../../../components/ChartDisplay";
import { calculateInvestmentReturn } from "@/utils/calculation";

const HomeInvestmentCalculator = () => {
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  const initialValues = {
    propertyPrice: 6000000,
    rentalYield: 2.5,
    appreciationRate: 7,
    years: 10,
  };

  const validationSchema = Yup.object().shape({
    propertyPrice: Yup.number()
      .min(100000, "Minimum property price is ₹1,00,000")
      .required("Required"),
    rentalYield: Yup.number()
      .min(0.1, "Minimum rental yield is 0.1%")
      .max(20, "Maximum rental yield is 20%")
      .required("Required"),
    appreciationRate: Yup.number()
      .min(0, "Minimum appreciation rate is 0%")
      .max(20, "Maximum appreciation rate is 20%")
      .required("Required"),
    years: Yup.number()
      .min(1, "Minimum duration is 1 year")
      .max(50, "Maximum duration is 50 years")
      .required("Required"),
  });

  const onSubmit = (values) => {
    const { propertyPrice, rentalYield, appreciationRate, years } = values;

    const totalReturn = calculateInvestmentReturn(
      propertyPrice,
      years,
      appreciationRate,
      rentalYield
    );
    const capitalGain = totalReturn - propertyPrice;
    const rentalIncome = propertyPrice * (rentalYield / 100) * years;

    setResult({
      totalReturn,
      capitalGain,
      rentalIncome,
      annualizedReturn: (
        (Math.pow(totalReturn / propertyPrice, 1 / years) - 1) *
        100
      ).toFixed(2),
    });

    setChartData({
      labels: ["Initial Investment", "Capital Appreciation", "Rental Income"],
      datasets: [
        {
          label: "Amount (₹)",
          data: [
            propertyPrice,
            totalReturn - propertyPrice - rentalIncome,
            rentalIncome,
          ],
          backgroundColor: ["#6b46c1", "#9f7aea", "#f6ad55"],
          borderColor: ["#6b46c1", "#9f7aea", "#f6ad55"],
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">
        Home Investment Calculator
      </h2>
      <p className="text-gray-600 mb-8">
        Estimate the potential returns from investing in residential real
        estate.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="propertyPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Property Price (₹)
                  </label>
                  <Field
                    type="number"
                    name="propertyPrice"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="propertyPrice"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="rentalYield"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Annual Rental Yield (%)
                  </label>
                  <Field
                    type="number"
                    step="0.1"
                    name="rentalYield"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="rentalYield"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="appreciationRate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Annual Appreciation Rate (%)
                  </label>
                  <Field
                    type="number"
                    step="0.1"
                    name="appreciationRate"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="appreciationRate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="years"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Investment Period (years)
                  </label>
                  <Field
                    type="number"
                    name="years"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="years"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Calculate Returns
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              Investment Returns
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Return:</span>
                <span className="font-bold">
                  ₹
                  {result.totalReturn.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Capital Appreciation:</span>
                <span className="font-bold">
                  ₹
                  {result.capitalGain.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rental Income:</span>
                <span className="font-bold">
                  ₹
                  {result.rentalIncome.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Annualized Return:</span>
                <span className="font-bold">{result.annualizedReturn}%</span>
              </div>
            </div>

            {chartData && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-purple-800 mb-3">
                  Return Breakdown
                </h4>
                <ChartDisplay data={chartData} type="doughnut" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeInvestmentCalculator;
