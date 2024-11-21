import {HStack} from "@chakra-ui/react";
import ChatListComponent from "./ChatListComponent.jsx";
import ChatComponent from "./ChatComponent.jsx";
import {useState} from "react";
import BrowseChatComponent from "./BrowseChatComponent.jsx";

export default function ChatPage(){

    const [chatId, setChatId] = useState()

    return(
        <HStack
            padding={"20px"}
            spacing={"10px"}
            align="flex-start"
            h={"700px"}
        >
            <ChatListComponent setChatId={setChatId}/>
            {chatId === 0 ?
            <BrowseChatComponent/>
                : <ChatComponent chatId={chatId}/>
            }
        </HStack>
    )
}