import {Box, Stack, Tooltip, Text} from "@chakra-ui/react";
import {FiUser} from "react-icons/fi";
import {useState} from "react";

export default function UserAttendanceDisplay({ usersInClass }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const getColor = (index) => "#EBECFF";
    const getStatusColor = (index) => "#707070";
    const getTooltipText = (index) => usersInClass[index]?.name || `User ${index + 1}`;

    // Create rows dynamically based on user count
    const rows = [];
    let userIndex = 0;
    const totalUsers = usersInClass.length;
    const firstRowCount = totalUsers % 2 === 0 ? 6 : 3;

    // Create first row
    rows.push(
        Array.from({ length: Math.min(firstRowCount, totalUsers) }).map((_, index) => {
            const currentUserIndex = userIndex;
            userIndex += 1;
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
                                {"Absent"}
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
        })
    );

    // Create additional rows of 8 users each
    while (userIndex < totalUsers) {
        rows.push(
            Array.from({ length: Math.min(8, totalUsers - userIndex) }).map((_, index) => {
                const currentUserIndex = userIndex;
                userIndex += 1;
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
                                    {"Absent"}
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
            })
        );
    }

    return (
        <Stack direction="column" spacing={2} justify="center" marginTop="20px">
            {rows.map((row, rowIndex) => (
                <Stack key={`row-${rowIndex}`} direction="row" spacing={2} justifyContent="center">
                    {row}
                </Stack>
            ))}
        </Stack>
    );
}

