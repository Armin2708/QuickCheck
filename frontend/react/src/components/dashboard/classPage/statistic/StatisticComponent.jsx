import {Text, Box} from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticComponent({ statsData }) {

    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                '#9363BA',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1000,
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 16,
                    },
                    color: "#FBFBFB", // Legend text color
                    boxWidth: 20, // Size of the legend color box
                },
            },
        },
    };

    return (
        <Box display="flex" flexDirection="column" gap="10px" flex={1}>
            <Text fontWeight="semibold" fontSize="30px">
                My Statistics
            </Text>

            <Box flex={1} display="flex" justifyContent="center" alignItems="center" minW={"400px"} minH={"300px"}>
                <Pie
                    data={data}
                    options={options}
                />
            </Box>
        </Box>
    );
}
