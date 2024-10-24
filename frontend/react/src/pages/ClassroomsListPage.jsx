import {Box, Wrap, WrapItem} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getClassrooms} from "../services/client.js";
import SideBar from "../components/shared/SideBar.jsx";
import ClassroomCard from "../components/classroom/ClassroomCard.jsx";
import HeaderFooter from "../components/shared/HeaderFooter.jsx";

export default function ClassroomsListPage(){

    const [classrooms, setClassrooms] = useState([]);

    const fetchClassrooms = () => {
        getClassrooms()
            .then(res => {
                if (Array.isArray(res.data)) {
                    setClassrooms(res.data); // Set the admins state
                } else {
                    console.error('Expected an array but got:', res.data);
                }
            })
            .catch(error => {
                console.error('Error fetching admins:', error); // Log any errors
            });
    };

    useEffect(() => {
        fetchClassrooms();
    }, []);

    return(
        <HeaderFooter>
            <SideBar/>
            <Wrap justify={'center'}>
                <Box p="4">
                    <Wrap justify={"center"} spacing={"30px"}>
                        {Array.isArray(classrooms) && classrooms.length > 0 ? (
                            classrooms.map(classroom => (
                                <WrapItem key={classroom.id}>
                                    <ClassroomCard {...classroom} />
                                </WrapItem>
                            ))
                        ) : (
                            <WrapItem>No admins found.</WrapItem> // Fallback message
                        )}
                    </Wrap>
                </Box>
            </Wrap>
        </HeaderFooter>
    )
}