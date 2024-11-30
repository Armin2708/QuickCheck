import {useColorModeValue, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {getClassChatsUserJoined} from "../../../../services/client/chat.js";
import {useParams} from "react-router-dom";
import ChatButtonCard from "./ChatButtonCard.jsx";
import BrowseChatButton from "./BrowseChatButton.jsx";
import {useAuth} from "../../../context/AuthContext.jsx";

export default function ChatListComponent({chats,setChatId}){

    return(
        <VStack
            background={()=>useColorModeValue("#FBFBFB","#1F1F1F")}
            padding={"20px"}
            height={"100%"}
            borderRadius={"12px"}
            boxShadow="lg"
        >
            <VStack overflow={"auto"}>
                {Array.isArray(chats) && chats.length > 0 ? (
                    chats.map((chat) => (
                        <ChatButtonCard {...chat} key={chat.id} setChatId={setChatId}/>
                    ))) : null}
            </VStack>
            <BrowseChatButton setChatId={setChatId}/>
        </VStack>
    )
}