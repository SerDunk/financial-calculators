"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ChartDisplay from "@/components/ChartDisplay";
import {
  calculateEMI,
  generateAmortizationSchedule,
} from "@/utils/calculation";

const MortgageCalculator = () => {
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const initialValues = {
    loanAmount: 5000000,
    tenure: 10,
    interestRate: 8,
  };

  const validationSchema = Yup.object().shape({
    loanAmount: Yup.number()
      .min(100000, "Minimum loan amount is ₹1,00,000")
      .required("Required"),
    tenure: Yup.number()
      .min(1, "Minimum tenure is 1 year")
      .max(30, "Maximum tenure is 30 years")
      .required("Required"),
    interestRate: Yup.number()
      .min(1, "Minimum interest rate is 1%")
      .max(20, "Maximum interest rate is 20%")
      .required("Required"),
  });

  const onSubmit = (values) => {
    const { loanAmount, tenure, interestRate } = values;
    const emi = calculateEMI(loanAmount, tenure, interestRate);
    const totalInterest = emi * tenure * 12 - loanAmount;
    const totalPayment = emi * tenure * 12;

    setResult({
      emi,
      totalInterest,
      totalPayment,
      loanAmount,
      tenure,
      interestRate,
    });

    // Generate amortization schedule
    const amortizationSchedule = generateAmortizationSchedule(
      loanAmount,
      tenure,
      interestRate
    );
    setSchedule(amortizationSchedule.slice(0, 12));

    setChartData({
      labels: ["Principal", "Interest"],
      datasets: [
        {
          data: [loanAmount, totalInterest],
          backgroundColor: ["#6b46c1", "#f6ad55"],
          borderColor: ["#6b46c1", "#f6ad55"],
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">
        Mortgage Calculator
      </h2>
      <p className="text-gray-600 mb-8">
        Calculate your monthly EMI for home loans based on loan amount, tenure,
        and interest rate.
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
                    htmlFor="loanAmount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Loan Amount (₹)
                  </label>
                  <Field
                    type="number"
                    name="loanAmount"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="loanAmount"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tenure"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Loan Tenure (years)
                  </label>
                  <Field
                    type="number"
                    name="tenure"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="tenure"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="interestRate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Interest Rate (% p.a.)
                  </label>
                  <Field
                    type="number"
                    step="0.01"
                    name="interestRate"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="interestRate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Calculate EMI
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              Results
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly EMI:</span>
                <span className="font-bold">
                  ₹
                  {result.emi.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interest:</span>
                <span className="font-bold">
                  ₹
                  {result.totalInterest.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Payment:</span>
                <span className="font-bold">
                  ₹
                  {result.totalPayment.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {chartData && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-purple-800 mb-3">
                  Payment Breakdown
                </h4>
                <ChartDisplay data={chartData} type="pie" />
              </div>
            )}
          </div>
        )}
      </div>

      {schedule.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-purple-800 mb-4">
            Amortization Schedule (First Year)
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EMI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Principal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedule.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{row.emi.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{row.principal.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{row.interest.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{row.balance.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
