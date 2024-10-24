import {Box, Wrap, WrapItem} from "@chakra-ui/react";
import UserAdminCard from "../components/user/UserAdminCard.jsx";
import {useEffect, useState} from "react";
import {getUsers} from "../services/client.js";
import SideBar from "../components/shared/SideBar.jsx";
import HeaderFooter from "../components/shared/HeaderFooter.jsx";

export default function UsersListPage(){

    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        getUsers()
            .then(res => {
                if (Array.isArray(res.data)) {
                    setUsers(res.data); // Set the users state
                } else {
                    console.error('Expected an array but got:', res.data);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error); // Log any errors
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <HeaderFooter>
            <SideBar/>
            <Wrap justify={'center'}>
                <Box p="4">
                    <Wrap justify={"center"} spacing={"30px"}>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map(user => (
                                <WrapItem key={user.id}>
                                    <UserAdminCard {...user} />
                                </WrapItem>
                            ))
                        ) : (
                            <WrapItem>No users found.</WrapItem> // Fallback message
                        )}
                    </Wrap>
                </Box>
            </Wrap>
        </HeaderFooter>
    )
}