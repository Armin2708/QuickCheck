import {Text, Box, Divider} from "@chakra-ui/react";
import DashboardCard from "../../DashboardCard.jsx";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticComponent({ statsData }) {
    const chartData = {
        labels: statsData.labels,
        datasets: [
            {
                data: statsData.values,
                backgroundColor: ['#9363BA', '#FFA9A9'], // Green for Present, Red for Absent, Orange for Late
                hoverBackgroundColor: ['#9363BA', '#FFA9A9']
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1000, // Set animation duration to 1 second
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    useEffect(() => {
        // Remove unnecessary cleanup unless Chart.js instances need manual handling
        return () => {};
    }, []);

    return (
        <DashboardCard>
            <Text fontWeight="semibold" fontSize="30px">
                My Statistics
            </Text>
            <Divider colorScheme={"gray"}/>
            <Box width="100%" height="300px" mt={4}>
                <Pie data={chartData} options={options} />
            </Box>
        </DashboardCard>
    );
}
