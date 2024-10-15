import {Box, Wrap, WrapItem} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getClassrooms} from "../services/classroom.js";
import Header from "../shared/Header.jsx";
import ClassroomCard from "../components/ClassroomCard.jsx";

export default function ClassroomsListPage(){

    const [classrooms, setClassrooms] = useState([]);

    const fetchClassrooms = () => {
        getClassrooms()
            .then(res => {
                console.log('API Response:', res.data); // Log API response
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
        <>
            <Header/>
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
        </>
    )
}