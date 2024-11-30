import {Text, Box} from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
    getAttendanceParticipation,
    getClassUserParticipation
} from "../../../../services/client/attendanceStatistic.js";
import {useEffect, useState} from "react";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticComponent({tag,classId, fullUser, professorId, isAdmin}) {

    const [attendanceData, setAttendanceData] = useState()
    const [userParticipation, setUserParticipation] = useState()

    const fetchAttendanceParticipation = () =>{
        getAttendanceParticipation(tag)
            .then((res)=>{
                setAttendanceData(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const fetchUserClassParticipation = () =>{
        getClassUserParticipation(classId,fullUser.id)
            .then((res)=>{
                setUserParticipation(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    useEffect(() => {
        if (tag){
            fetchAttendanceParticipation();
        }
    }, [tag]);

    useEffect(() => {
        if (classId && fullUser){
            fetchUserClassParticipation()
        }
    }, [classId, fullUser]);

    const data = {
        labels: (isAdmin() || fullUser.id===professorId) ?
            [
                'Present',
                'Absent'
            ]
        :
            [
                'Attended',
                'Missed'
            ],
        datasets: [{
            label:" ",
            data: (isAdmin() || fullUser.id===professorId) ? (
                attendanceData ?
                        [attendanceData.attendedUsersCount , attendanceData.missingUsersCount] // Convert fractions to percentages
                        : [0, 0]
                ) : (
                    userParticipation ?
                        [userParticipation.presence, userParticipation.absence] // Convert fractions to percentages
                        : [0, 0]
                ),
            backgroundColor: [
                '#9363BA',
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
                {(isAdmin() || fullUser.id===professorId) ? "Attended People" : "My Total Attendance"}
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
