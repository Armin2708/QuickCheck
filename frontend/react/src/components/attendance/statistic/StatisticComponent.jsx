import {Text, Box, Divider} from "@chakra-ui/react";
import DashboardCard from "../../dashboard/DashboardCard.jsx";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticComponent({ attendanceData }) {
    const chartData = {
        labels: attendanceData.labels,
        datasets: [
            {
                data: attendanceData.values,
                backgroundColor: ['#4CAF50', '#F44336', '#FFA500'], // Green for Present, Red for Absent, Orange for Late
                hoverBackgroundColor: ['#4CAF50', '#F44336', '#FFA500']
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    };

    useEffect(() => {
        return () => {
            // Destroy all chart instances on unmount
            Object.values(ChartJS.instances).forEach((instance) => {
                instance.destroy();
            });
        };
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
