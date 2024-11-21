import {useParams} from "react-router-dom";
import {getClassChats} from "../../../../services/client.js";
import React, {useEffect, useState} from "react";
import {Box, HStack, Stack, useColorModeValue} from "@chakra-ui/react";
import BrowseChatCard from "./BrowseChatCard.jsx";
import CreateChatButton from "./CreateChatButton.jsx";

export default function BrowseChatComponent(){

    const [classChats, setClassChats] = useState([])

    const {id:classId} = useParams()

    const fetchClassChats = () =>{
        getClassChats(classId)
            .then((res) =>{
                setClassChats(res.data);
            })
            .catch((err) =>{
                console.log(err);
            })
    }

    useEffect(() => {
        fetchClassChats();
    }, [classId]);

    return(
        <Box maxWidth={"1270px"}
             width={"100%"}
             height="100%" // Make the Box take all available vertical space
             borderRadius={"12px"}
             padding="20px"
             display="flex"
             flexDirection="column"
             gap={"20px"}
             background={useColorModeValue("white", "gray")}
             boxShadow="lg"
        >
            <CreateChatButton onSuccess={fetchClassChats}/>
            <HStack padding={"20px"}>
                {Array.isArray(classChats) && classChats.length > 0 ? (
                    classChats.map((classChat) => (
                        <BrowseChatCard {...classChat} key={classChat.id} />
                    ))) : null}
            </HStack>
        </Box>
    )
}