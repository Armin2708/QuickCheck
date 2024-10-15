import {Box, Wrap, WrapItem} from "@chakra-ui/react";
import UserAdminCard from "../components/UserAdminCard.jsx";
import {useEffect, useState} from "react";
import {getAdmins} from "../services/admin.js";
import Header from "../shared/Header.jsx";

export default function AdminsListPage(){

    const [admins, setAdmins] = useState([]);

    const fetchAdmins = () => {
        getAdmins()
            .then(res => {
                console.log('API Response:', res.data); // Log API response
                if (Array.isArray(res.data)) {
                    setAdmins(res.data); // Set the admins state
                } else {
                    console.error('Expected an array but got:', res.data);
                }
            })
            .catch(error => {
                console.error('Error fetching admins:', error); // Log any errors
            });
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return(
        <>
            <Header/>
            <Wrap justify={'center'}>
                <Box p="4">
                    <Wrap justify={"center"} spacing={"30px"}>
                        {Array.isArray(admins) && admins.length > 0 ? (
                            admins.map(admin => (
                                <WrapItem key={admin.id}>
                                    <UserAdminCard {...admin} />
                                </WrapItem>
                            ))
                        ) : (
                            <WrapItem>No admins found.</WrapItem> // Fallback message
                        )}
                    </Wrap>
                </Box>
            </Wrap>
        </>
    )
}