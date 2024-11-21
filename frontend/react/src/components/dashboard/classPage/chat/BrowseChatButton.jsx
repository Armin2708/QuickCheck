import {Button, Text} from "@chakra-ui/react";

export default function BrowseChatButton({setChatId}){

    return(
        <Button onClick={()=>{
            setChatId(0)
        }}>
            <Text>Browse Chats</Text>
        </Button>
    )
}