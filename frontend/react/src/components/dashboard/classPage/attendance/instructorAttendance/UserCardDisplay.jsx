import { Wrap, WrapItem } from "@chakra-ui/react";
import AttendanceUserCard from "./AttendanceUserCard.jsx";
import { useEffect, useState } from "react";
import { getUsersOfAttendance } from "../../../../../services/client/users.js";
import attendanceNotifications from "../../../../../services/attendanceNotifications.js";

export default function UserCardDisplay({ usersInClass, tag, existAttendance }) {
    const [attendedUsers, setAttendedUsers] = useState([]);

    const fetchAttendedUsers = () => {
        getUsersOfAttendance(tag)
            .then((res) => {
                const userIds = res.data.map(user => user.id); // Map to an array of user IDs only
                setAttendedUsers(userIds);
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
            });
    };

    const handleNewAttendance = (userId) => {
        setAttendedUsers((prevUsers) => {
            if (!prevUsers.includes(userId)) {
                return [...prevUsers, userId];
            }
            return prevUsers;
        });
    };

    useEffect(() => {
        if (tag && existAttendance){
            fetchAttendedUsers();
        }
        const disconnectWebSocket = attendanceNotifications(tag, handleNewAttendance);

        return () => {
            if (disconnectWebSocket) {
                disconnectWebSocket();
            }
        };
    }, [tag, existAttendance]);

    return (
        <Wrap spacing={2} justify="center" maxWidth="750px" marginTop="20px">
            {Array.isArray(usersInClass) && usersInClass.length > 0 ? (
                usersInClass.map((user) => (
                    <WrapItem key={user?.id}>
                        <AttendanceUserCard
                            userId={user?.id}
                            userName={user?.name}
                            attendedUsers={attendedUsers}
                        />
                    </WrapItem>
                ))
            ) : (
                <WrapItem>No Users in this class.</WrapItem>
            )}
        </Wrap>
    );
}
