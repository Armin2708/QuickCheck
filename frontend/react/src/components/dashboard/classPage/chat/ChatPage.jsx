import {Box, HStack, Text, useColorModeValue} from "@chakra-ui/react";
import ChatListComponent from "./ChatListComponent.jsx";
import ChatComponent from "./ChatComponent.jsx";
import BrowseChatComponent from "./BrowseChatComponent.jsx";
import {useParams} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext.jsx";
import {getClassById} from "../../../../services/client/classes.js";
import {useEffect, useState} from "react";
import {getClassChatsUserJoined} from "../../../../services/client/chat.js";

export default function ChatPage({chatId, setChatId}){

    const [classObject, setClassObject] = useState({})
    const [chats, setChats] = useState([])
    const {id:classId} = useParams()
    const {fullUser,isAdmin} = useAuth()

    const fetchClass = () =>{
        getClassById(classId)
            .then((res) =>{
                setClassObject(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }

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
        fetchClass();
        fetchChats()
    }, [classId]);


    return(
        <HStack
            padding={"10px"}
            spacing={"10px"}
            align="flex-start"
            h={"700px"}
        >
            <ChatListComponent chats={chats} setChatId={setChatId}/>
            {chatId === 0 ? (
                <BrowseChatComponent
                    classId={classId}
                    professorId={classObject.professorId}
                    fullUser={fullUser}
                    isAdmin={isAdmin}
                    onSuccess={fetchChats}
                />
            ) : ( chatId === -1 ? (
                <Box
                    maxWidth={"1270px"}
                    width={"100%"}
                    height="100%" // Make the Box take all available vertical space
                    borderRadius={"12px"}
                    padding="10px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    background={()=>useColorModeValue("#FBFBFB","#1F1F1F")}
                    boxShadow="lg"
                    gap={"10px"}
                >
                    <Text color={() => useColorModeValue()}>Select Chat</Text>
                </Box>
                ) : (
                    <ChatComponent chatId={chatId}/>
            ))}
        </HStack>
    )
}