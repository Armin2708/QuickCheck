import {Box, HStack, Text, useColorModeValue} from "@chakra-ui/react";
import {getUserById} from "../../../../services/client.js";
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
            <Box
                backgroundColor={userId === fullUser.id ? "green.100" : "blue.100"}
                padding="6px"
                paddingRight={userId === fullUser.id ? "30px" : "10px"}
                paddingLeft={userId === fullUser.id ? "10px" : "30px"}
                borderRadius="8px"
                maxWidth="75%" // Limit message width to avoid overflow
                wordBreak="break-word" // Handle long text wrapping
                color={() => useColorModeValue("white", "black")}
            >
                <Text fontSize="sm" fontWeight="bold" textAlign={"right"}>
                    {userId === fullUser.id ? "You" : user.name}
                </Text>
                <Text>{content}</Text>
            </Box>
        </HStack>
    )
}