import {Button, Stack, Text, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {getClassChats, getClassChatsUserJoined} from "../../../../services/client.js";
import {useParams} from "react-router-dom";
import ChatButtonCard from "./ChatButtonCard.jsx";
import BrowseChatButton from "./BrowseChatButton.jsx";
import {useAuth} from "../../../context/AuthContext.jsx";

export default function ChatListComponent({setChatId}){

    const [chats, setChats] = useState([])

    const {id:classId} = useParams()

    const {fullUser} = useAuth()

    const fetchChats = () =>{
        getClassChatsUserJoined(classId, fullUser.id)
            .then((res)=>{
                setChats(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    useEffect(() => {
        fetchChats()
    }, [classId]);


    return(
        <VStack bg={"green"} padding={"40px"}>
            {Array.isArray(chats) && chats.length > 0 ? (
                    chats.map((chat) => (
                        <ChatButtonCard {...chat} setChatId={setChatId} key={chat.id}/>
                    ))) : null}
            <BrowseChatButton setChatId={setChatId}/>
        </VStack>
    )
}