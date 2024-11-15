import { Box, Text, Tooltip } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function AttendanceUserCard({ userId, userName, attendedUsers }) {
    const [isUserAttended, setIsUserAttended] = useState(false);

    useEffect(() => {
        const attended = attendedUsers.includes(userId);
        setIsUserAttended(attended);
    }, [attendedUsers, userId]);

    return (
        <Tooltip
            hasArrow
            placement="bottom"
            bg="white"
            color="black"
            borderRadius="8px"
            boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25)"
            label={
                <Box textAlign="center">
                    <Text fontWeight="bold">{userName}</Text>
                    <Text color={isUserAttended ? "#7E3BB5" : "#707070"} fontWeight="medium">
                        {isUserAttended ? "Present" : "Absent"}
                    </Text>
                </Box>
            }
        >
            <Box>
                <FiUser
                    size="80px"
                    color={isUserAttended ? "#7E3BB5" : "#EBECFF"}
                />
            </Box>
        </Tooltip>
    );
}
