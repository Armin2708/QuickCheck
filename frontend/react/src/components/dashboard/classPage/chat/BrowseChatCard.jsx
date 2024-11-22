import {useEffect, useState} from "react";
import {Box, Button, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {isUserInChat, joinChat} from "../../../../services/client.js";
import {useAuth} from "../../../context/AuthContext.jsx";

export default function BrowseChatCard({id,name}){
    const [joined,setJoined] = useState(false)
    const {fullUser} = useAuth()

    const fetchChatJoinedStatus = () =>{
        isUserInChat(id,fullUser.id)
            .then((res) =>{
                res.data ===true ?
                    setJoined(true)
                    : setJoined(false)
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    const handleJoinChat = () =>{
        joinChat(id, fullUser.id)
            .then((res)=>{
                setJoined(true)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    useEffect(() => {
        fetchChatJoinedStatus();
    }, [id]);

    return(
        <Stack bg={useColorModeValue("whiteAlpha.900","gray.900")} padding={"30px"} fontWeight={"bold"} borderRadius={"12px"} spacing={"10px"}>
            <Text textAlign={"center"}  padding={"10px"}>
                #{name}
            </Text>
            <Button isDisabled={joined} onClick={handleJoinChat}>
                <Text>
                    {!joined ? "Join" : "Joined"}
                </Text>
            </Button>
        </Stack>
    )
}