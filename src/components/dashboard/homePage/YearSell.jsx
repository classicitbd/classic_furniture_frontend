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

const YearSell = ({ thisYearSellData }) => {

    const [chartData, setChartData] = useState({
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
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
        // Initialize an array to store the total product count for each month
        const monthlySellData = Array(12).fill(0);

        // Update the total product count for each month
        thisYearSellData.forEach((order) => {
            const month = new Date(order.createdAt).getMonth();
            monthlySellData[month] += order.order.length;
        });

        // Update the chart data only if it has changed
        if (!chartData.datasets[0].data.every((value, index) => value === monthlySellData[index])) {
            setChartData({
                ...chartData,
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: monthlySellData,
                    },
                ],
            });
        }
    }, [thisYearSellData, chartData]);



    return (
        <div>
            <div className="flex items-center justify-between mx-6 mt-6">
                <h6 className="text-[18px] md:text-[26px] font-semibold"> This year sales</h6>
                <p className="font-semibold">View Report</p>
            </div>

            {/* Chart Start */}
            <div className="p-6">
                <Bar data={chartData} options={chartOptions} width={100} height={300} />
            </div>

        </div>
    );

};

export default YearSell;