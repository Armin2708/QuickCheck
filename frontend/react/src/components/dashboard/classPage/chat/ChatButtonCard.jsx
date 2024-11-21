import {Button, Text} from "@chakra-ui/react";
import React from "react";

export default function ChatButtonCard({id,name,setChatId}){

    const handleOnClick = () =>{
        setChatId(id);
    }
    return(
        <Button
            width={"200px"}
            onClick={()=> {
            handleOnClick()
            }}
            justifyContent={"flex-start"} // Aligns content to the left
            textAlign={"left"} // Applies text alignment to the button content
            paddingLeft={"10px"} // Optional: Add padding for a nicer look
        >
            <Text>
                #{name}
            </Text>
        </Button>
    )
}