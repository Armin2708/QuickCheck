import {useColorModeValue, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {getClassChatsUserJoined} from "../../../../services/client/chat.js";
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
        <VStack
            background={()=>useColorModeValue("#FBFBFB","#1F1F1F")}
            padding={"20px"}
            height={"100%"}
            borderRadius={"12px"}
        >
            <VStack overflow={"auto"}>
                {Array.isArray(chats) && chats.length > 0 ? (
                    chats.map((chat) => (
                        <ChatButtonCard {...chat} setChatId={setChatId} key={chat.id}/>
                    ))) : null}
            </VStack>
            <BrowseChatButton setChatId={setChatId}/>
        </VStack>
    )
}