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
          backgroundColor: ["#AB78FF", "#A197BA"],
          borderColor: ["#AB78FF", "#A197BA"],
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-[#EFEDF4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#2D14A0] mb-2">
            Mortgage Calculator
          </h2>
          <p className="text-gray-600">
            Calculate your monthly EMI for home loans based on loan amount,
            tenure, and interest rate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="loanAmount"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Loan Amount (₹)
                    </label>
                    <Field
                      type="number"
                      name="loanAmount"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <ErrorMessage
                      name="loanAmount"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="tenure"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Loan Tenure (years)
                    </label>
                    <Field
                      type="number"
                      name="tenure"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <ErrorMessage
                      name="tenure"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="interestRate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Interest Rate (% p.a.)
                    </label>
                    <Field
                      type="number"
                      step="0.01"
                      name="interestRate"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <ErrorMessage
                      name="interestRate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[radial-gradient(circle_at_center,_#AB78FF,_#192226)] text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 transition-colors"
                  >
                    Calculate EMI
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {result && (
            <div className="bg-white p-6 ">
              <h3 className="text-xl font-semibold text-[#2D14A0] mb-4">
                Results
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 shadow-sm">
                  <p className="text-gray-600 text-sm">Monthly EMI</p>
                  <p className="text-2xl font-bold text-[#2D14A0]">
                    ₹
                    {result.emi.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 shadow-sm">
                    <p className="text-gray-600 text-sm">Total Interest</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ₹
                      {result.totalInterest.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600 text-sm">Total Payment</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ₹
                      {result.totalPayment.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                {chartData && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium text-[#2D14A0] mb-3">
                      Payment Breakdown
                    </h4>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <ChartDisplay data={chartData} type="pie" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {schedule.length > 0 && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#2D14A0] mb-4">
              Amortization Schedule (First Year)
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#2D14A0]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      EMI
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Principal
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Interest
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schedule.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {row.month}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        ₹{row.emi.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        ₹{row.principal.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        ₹{row.interest.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
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
    </div>
  );
};

export default MortgageCalculator;
