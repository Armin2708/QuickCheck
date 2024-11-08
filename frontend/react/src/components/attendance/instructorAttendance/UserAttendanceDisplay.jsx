import { Box, Stack, Tooltip, Text } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getUsersOfAttendance } from "../../../services/client.js";
import { errorNotification } from "../../../services/notification.js";

export default function UserAttendanceDisplay({ usersInClass, tag }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [attendedUsers, setAttendedUsers] = useState([]);

    // Determine icon color based on attendance status
    const getColor = (index) => {
        const userId = usersInClass[index]?.id;
        return attendedUsers.some((user) => user.id === userId) ? "#7E3BB5" : "#EBECFF";
    };

    // Get status color dynamically based on attendance
    const getStatusColor = (index) => {
        const userId = usersInClass[index]?.id;
        return attendedUsers.some((user) => user.id === userId) ? "#7E3BB5" : "#707070";
    };

    // Get tooltip text based on attendance status
    const getTooltipText = (index) => {
        const userId = usersInClass[index]?.id;
        const isPresent = attendedUsers.some((user) => user.id === userId);
        return `${usersInClass[index]?.name || `User ${index + 1}`}`;
    };

    const fetchAttendedUsers = () => {
        getUsersOfAttendance(tag)
            .then((res) => {
                setAttendedUsers(res.data);
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                errorNotification(err.code, err.response.data.message);
            });
    };

    useEffect(() => {
        fetchAttendedUsers();
    }, []);

    const totalUsers = usersInClass.length;
    const firstRowCount = totalUsers % 2 === 0 ? 6 : 3;

    return (
        <Stack direction="column" spacing={2} justify="center" marginTop="20px">
            {/* Render the first row */}
            <Stack direction="row" spacing={2} justifyContent="center">
                {Array.from({ length: Math.min(firstRowCount, totalUsers) }).map((_, index) => {
                    const currentUserIndex = index;
                    return (
                        <Tooltip
                            key={`firstRow-${usersInClass[currentUserIndex].id}-${currentUserIndex}`}
                            placement="bottom"
                            hasArrow
                            closeOnClick={false}
                            bg="white"
                            color="black"
                            borderRadius="8px"
                            boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25)"
                            label={
                                <Box textAlign="center">
                                    <Text fontWeight="bold">{getTooltipText(currentUserIndex)}</Text>
                                    <Text color={getStatusColor(currentUserIndex)} fontWeight="medium">
                                        {attendedUsers.some(user => user.id === usersInClass[currentUserIndex]?.id) ? "Present" : "Absent"}
                                    </Text>
                                </Box>
                            }
                        >
                            <div>
                                <FiUser
                                    size="80px"
                                    color={hoveredIndex === currentUserIndex ? "#D9C4EC" : getColor(currentUserIndex)}
                                    onMouseEnter={() => setHoveredIndex(currentUserIndex)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                />
                            </div>
                        </Tooltip>
                    );
                })}
            </Stack>

            {/* Render additional rows of 8 users each */}
            {Array.from({ length: Math.ceil((totalUsers - firstRowCount) / 8) }).map((_, rowIndex) => (
                <Stack key={`row-${rowIndex}`} direction="row" spacing={2} justifyContent="center">
                    {Array.from({
                        length: Math.min(8, totalUsers - firstRowCount - rowIndex * 8),
                    }).map((_, index) => {
                        const currentUserIndex = firstRowCount + rowIndex * 8 + index;
                        return (
                            <Tooltip
                                key={`row-${usersInClass[currentUserIndex].id}-${currentUserIndex}`}
                                placement="bottom"
                                hasArrow
                                closeOnClick={false}
                                bg="white"
                                color="black"
                                borderRadius="8px"
                                boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25)"
                                label={
                                    <Box textAlign="center">
                                        <Text fontWeight="bold">{getTooltipText(currentUserIndex)}</Text>
                                        <Text color={getStatusColor(currentUserIndex)} fontWeight="medium">
                                            {attendedUsers.some(user => user.id === usersInClass[currentUserIndex]?.id) ? "Present" : "Absent"}
                                        </Text>
                                    </Box>
                                }
                            >
                                <div>
                                    <FiUser
                                        size="80px"
                                        color={hoveredIndex === currentUserIndex ? "#D9C4EC" : getColor(currentUserIndex)}
                                        onMouseEnter={() => setHoveredIndex(currentUserIndex)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    />
                                </div>
                            </Tooltip>
                        );
                    })}
                </Stack>
            ))}
        </Stack>
    );
}
