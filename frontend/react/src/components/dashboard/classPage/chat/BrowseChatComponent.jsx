import {useParams} from "react-router-dom";
import {getClassChats} from "../../../../services/client.js";
import React, {useEffect, useState} from "react";
import {Box, HStack, Stack} from "@chakra-ui/react";
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
        <Stack bg={"red"} padding={"40px"}>
            <CreateChatButton onSuccess={fetchClassChats}/>
            <HStack>
                {Array.isArray(classChats) && classChats.length > 0 ? (
                    classChats.map((classChat) => (
                        <BrowseChatCard {...classChat} key={classChat.id} />
                    ))) : null}
            </HStack>
        </Stack>
    )
}