import { FiUser } from "react-icons/fi";
import { Stack, Tooltip, Text, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

// A list of 30 names
const names = [
    "John Doe", "Jane Smith", "James Brown", "Emily White", "Michael Johnson",
    "Chris Evans", "Sarah Taylor", "Jessica Davis", "Daniel Moore", "Laura Harris",
    "William King", "Megan Scott", "Robert Green", "Sophia Hill", "Benjamin Lee",
    "Olivia Martin", "Lucas Thompson", "Ava Clark", "Henry Lewis", "Ella Walker",
    "Alexander Young", "Mia Allen", "Elijah Adams", "Amelia Nelson", "Mason Carter",
    "Isabella Baker", "Logan Wright", "Charlotte Roberts", "Ethan Gonzalez", "Harper Perez"
];

export default function ClassroomStudents() {
    const [randomValues, setRandomValues] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [randomNames, setRandomNames] = useState([]);

    useEffect(() => {
        // Generate random 0 or 1 for each icon
        const generateRandomValues = () => {
            const values = Array.from({ length: 30 }).map(() => Math.round(Math.random()));
            setRandomValues(values);
        };

        // Shuffle the names array and assign names to each icon
        const generateRandomNames = () => {
            const shuffledNames = names.sort(() => 0.5 - Math.random());
            setRandomNames(shuffledNames);
        };

        generateRandomValues();
        generateRandomNames();
    }, []);

    const getColor = (index) => (randomValues[index] === 0 ? "#EBECFF" : "#7E3BB5");
    const getStatusColor = (index) => (randomValues[index] === 0 ? "#707070" : "#7E3BB5");
    const getTooltipText = (index) => {
        const status = randomValues[index] === 0 ? "Absent" : "Present";
        return randomNames[index];
    };

    return (
        <Stack direction={"column"} spacing={2} justify="center">
            {/* First row with 6 icons, centered */}
            <Stack direction="row" spacing={2} justifyContent="center">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Tooltip
                        key={index}
                        placement="bottom"
                        hasArrow
                        closeOnClick={false}
                        bg="white"
                        color="black"
                        borderRadius={"8px"}
                        boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25)"
                        label={
                            <Box textAlign="center">
                                <Text fontWeight="bold">{getTooltipText(index)}</Text>
                                <Text color={getStatusColor(index)} fontWeight={"medium"}>{randomValues[index] === 0 ? "Absent" : "Present"}</Text>
                            </Box>
                        }
                    >
                        <div>
                            <FiUser
                                size="80px"  // Increased icon size
                                color={hoveredIndex === index ? "#D9C4EC" : getColor(index)}  // Hover color
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                        </div>
                    </Tooltip>
                ))}
            </Stack>

            {/* Second row with 8 icons */}
            <Stack direction="row" spacing={2} justifyContent="center">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Tooltip
                        key={index + 6}
                        placement="bottom"
                        hasArrow
                        closeOnClick={false}
                        bg="white"
                        color="black"
                        borderRadius={"8px"}
                        boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25)"
                        label={
                            <Box textAlign="center">
                                <Text fontWeight="bold">{getTooltipText(index + 6)}</Text>
                                <Text color={getStatusColor(index + 6)} fontWeight={"medium"}>{randomValues[index + 6] === 0 ? "Absent" : "Present"}</Text>
                            </Box>
                        }
                    >
                        <div>
                            <FiUser
                                size="80px"
                                color={hoveredIndex === index + 6 ? "#D9C4EC" : getColor(index + 6)}
                                onMouseEnter={() => setHoveredIndex(index + 6)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                        </div>
                    </Tooltip>
                ))}
            </Stack>

            {/* Third row with 8 icons */}
            <Stack direction="row" spacing={2} justifyContent="center">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Tooltip
                        key={index + 14}
                        placement="bottom"
                        hasArrow
                        closeOnClick={false}
                        bg="white"
                        color="black"
                        borderRadius={"8px"}
                        boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25)"
                        label={
                            <Box textAlign="center">
                                <Text fontWeight="bold">{getTooltipText(index + 14)}</Text>
                                <Text color={getStatusColor(index + 14)} fontWeight={"medium"}>{randomValues[index + 14] === 0 ? "Absent" : "Present"}</Text>
                            </Box>
                        }
                    >
                        <div>
                            <FiUser
                                size="80px"
                                color={hoveredIndex === index + 14 ? "#D9C4EC" : getColor(index + 14)}
                                onMouseEnter={() => setHoveredIndex(index + 14)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                        </div>
                    </Tooltip>
                ))}
            </Stack>

            {/* Fourth row with 8 icons */}
            <Stack direction="row" spacing={2} justifyContent="center">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Tooltip
                        key={index + 22}
                        placement="bottom"
                        hasArrow
                        closeOnClick={false}
                        bg="white"
                        color="black"
                        borderRadius={"8px"}
                        boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25)"
                        label={
                            <Box textAlign="center">
                                <Text fontWeight="bold">{getTooltipText(index + 22)}</Text>
                                <Text color={getStatusColor(index + 22)} fontWeight={"medium"}>{randomValues[index + 22] === 0 ? "Absent" : "Present"}</Text>
                            </Box>
                        }
                    >
                        <div>
                            <FiUser
                                size="80px"
                                color={hoveredIndex === index + 22 ? "#D9C4EC" : getColor(index + 22)}
                                onMouseEnter={() => setHoveredIndex(index + 22)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                        </div>
                    </Tooltip>
                ))}
            </Stack>
        </Stack>
    );
}
