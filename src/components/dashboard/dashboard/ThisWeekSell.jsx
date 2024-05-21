"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ThisWeekSell = ({ thisWeekSellData }) => {
  const [chartData, setChartData] = useState({
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Total Order Count",
        data: Array(7).fill(0),
        backgroundColor: "#3BB77E",
        borderRadius: 8,
        barThickness: 16,
        hoverBackgroundColor: "#F27F21",
      },
      {
        label: "Total Sell Count",
        data: Array(7).fill(0),
        backgroundColor: "#9771FF",
        borderRadius: 8,
        barThickness: 16,
        hoverBackgroundColor: "#FEB60D",
      },
    ],
  });

  const [chartOptions] = useState({
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 0,
          boxHeight: 0,
          borderRadius: 0,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  });

  useEffect(() => {
    // Initialize arrays to store the total sell count and total order count for each day
    const dailySellData = Array(7).fill(0);
    const dailyOrderCountData = Array(7).fill(0);

    // Update the total sell count and total order count for each day
    thisWeekSellData?.forEach((order) => {
      const dayOfWeek = new Date(order?.createdAt).getDay();
      dailySellData[dayOfWeek] += 1; // Assuming each order contributes to the sell count
      dailyOrderCountData[dayOfWeek] += order?.order_products?.length;
    });

    // Update the chart data only if it has changed
    if (
      !chartData.datasets[0].data.every(
        (value, index) => value === dailySellData[index]
      ) ||
      !chartData.datasets[1].data.every(
        (value, index) => value === dailyOrderCountData[index]
      )
    ) {
      setChartData({
        ...chartData,
        datasets: [
          {
            ...chartData.datasets[0],
            data: dailySellData,
          },
          {
            ...chartData.datasets[1],
            data: dailyOrderCountData,
          },
        ],
      });
    }
  }, [thisWeekSellData, chartData]);

  return (
    <div>
      <div className="ml-6 mt-6">
        <h6 className="text-[18px] md:text-[26px] font-semibold">
          {" "}
          This week sales
        </h6>
      </div>

      {/* Chart Start */}
      <div className="p-6">
        <Bar data={chartData} options={chartOptions} width={100} height={300} />
      </div>
    </div>
  );
};

export default ThisWeekSell;
