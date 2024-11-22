import {Avatar, Box, HStack, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {getUserById, getUserProfilePictureUrl} from "../../../../services/client.js";
import {useEffect, useState} from "react";

export default function ChatMessageCard({userId, content, fullUser}){

    const [user,setUser] = useState({})

    const fetchUser = () =>{
        getUserById(userId)
            .then((res)=>{
                setUser(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    useEffect(() => {
        fetchUser();
    }, [userId]);

    return(
        <HStack
            justifyContent={userId === fullUser.id ? "flex-end" : "flex-start"}
            width="100%" // Ensure HStack spans the full width
        >
            <HStack
                backgroundColor={userId === fullUser.id ? "green.100" : "blue.100"}
                padding="6px"
                paddingRight={"10px"}
                paddingLeft={"10px"}
                borderRadius="8px"
                maxWidth="75%" // Limit message width to avoid overflow
                wordBreak="break-word" // Handle long text wrapping
                color={() => useColorModeValue("white", "black")}
                alignSelf={userId === fullUser.id ? "flex-end" : "flex-start"} // Align bubble
            >
                {userId !== fullUser.id && (
                    <Avatar src={getUserProfilePictureUrl(userId) || null} />
                )}
                <VStack
                    spacing={"0px"}
                    alignItems={userId === fullUser.id ? "flex-end" : "flex-start"}
                >
                    <Text fontSize="lg" fontWeight="bold">
                        {userId === fullUser.id ? "You" : user.name}
                    </Text>
                    <Text>{content}</Text>
                </VStack>
                {userId === fullUser.id && (
                    <Avatar src={getUserProfilePictureUrl(userId) || null} />
                )}
            </HStack>


        </HStack>
    )
}