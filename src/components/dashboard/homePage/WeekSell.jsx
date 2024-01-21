/* eslint-disable react/prop-types */
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

const WeekSell = ({ thisWeekSellData }) => {
    
    const [chartData, setChartData] = useState({
        labels: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
            {
                label: "Total Sell Count",
                data: Array(7).fill(0),
                backgroundColor: "#EFADF3",
                borderRadius: 8,
                barThickness: 32,
                hoverBackgroundColor: "#837DFB",
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
        responsive: true
    });

    useEffect(() => {
        // Update total product count for each day
        const updatedData = Array(7).fill(0);

        thisWeekSellData.forEach((order) => {
            const dayOfWeek = new Date(order.createdAt).getDay();
            updatedData[dayOfWeek] += order.order.length;
        });

        // Update the chart data only if it has changed
        if (!chartData.datasets[0].data.every((value, index) => value === updatedData[index])) {
            setChartData({
                ...chartData,
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: updatedData,
                    },
                ],
            });
        }
    }, [thisWeekSellData, chartData]);


    return (
        <div>
            <div className="ml-6 mt-6">
                <h6 className="text-[18px] md:text-[26px] font-semibold"> This week sales</h6>
            </div>

            {/* Chart Start */}
            <div className="p-6">
                <Bar data={chartData} options={chartOptions} width={100} height={300} />
            </div>

        </div>
    );

};

export default WeekSell;